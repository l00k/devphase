#![cfg_attr(not(feature = "std"), no_std, no_main)]
extern crate alloc;
use pink_extension as pink;

#[pink::contract(env = PinkEnvironment)]
mod {{contract_name}} {
    use pink::PinkEnvironment;
    use pink_s3 as s3;

    use super::pink;

    use alloc::{vec::Vec, string::String};
    use scale::{Decode, Encode};

    /// Type alias for the contract's result type.
    pub type Result<T> = core::result::Result<T, Error>;

    #[derive(Debug, PartialEq, Eq, Encode, Decode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub enum Error {
        NoPermissions,
        InvalidRequest,
        KeysNotConfigured,
    }
    #[ink(storage)]
    pub struct {{ContractName}} {
        admin: AccountId,
        access_key: String,
        secret_key: String
    }

    impl {{ContractName}} {
        #[ink(constructor)]
        pub fn new() -> Self {
            let admin = Self::env().caller();
            Self {
                admin,
                access_key: String::default(),
                secret_key: String::default()
            }
        }

        #[ink(message)]
        pub fn set_admin(&mut self, new_admin: AccountId) -> Result<()> {
            if self.admin != self.env().caller() {
                return Err(Error::NoPermissions);
            }
            self.admin = new_admin;
            Ok(())
        }

        #[ink(message)]
        pub fn seal_keys(&mut self, access_key: String, secret_key: String) -> Result<()> {
            if self.admin != self.env().caller() {
                return Err(Error::NoPermissions);
            }
            self.access_key = access_key;
            self.secret_key = secret_key;
            Ok(())
        }

        #[ink(message)]
        pub fn s3_put(&self, endpoint: String, region: String, bucket: String, object_key: String, value: Vec<u8>) -> Result<()> {
            if self.admin != self.env().caller() {
                return Err(Error::NoPermissions);
            }
            if self.access_key == String::default() || self.secret_key == String::default() {
                return Err(Error::KeysNotConfigured)
            }
            let s3_vhm = s3::S3::new(&endpoint.as_str(), &region.as_str(), &self.access_key.as_str(), &self.secret_key.as_str()).unwrap().virtual_host_mode();

            s3_vhm.put(&bucket.as_str(), &object_key.as_str(), &value).or(Err(Error::InvalidRequest));

            Ok(())
        }

        #[ink(message)]
        pub fn s3_head(&self, endpoint: String, region: String, bucket: String, object_key: String) -> Result<u64> {
            if self.access_key == String::default() || self.secret_key == String::default() {
                return Err(Error::KeysNotConfigured)
            }
            let s3_vhm = s3::S3::new(&endpoint.as_str(), &region.as_str(), &self.access_key.as_str(), &self.secret_key.as_str()).unwrap().virtual_host_mode();
            let head = s3_vhm.head(&bucket.as_str(), &object_key.as_str()).or(Err(Error::InvalidRequest));

            Ok(head.unwrap().content_length)
        }

        #[ink(message)]
        pub fn s3_get(&self, endpoint: String, region: String, bucket: String, object_key: String) -> Result<Vec<u8>> {
            if self.access_key == String::default() || self.secret_key == String::default() {
                return Err(Error::KeysNotConfigured)
            }
            let s3_vhm = s3::S3::new(&endpoint.as_str(), &region.as_str(), &self.access_key.as_str(), &self.secret_key.as_str()).unwrap().virtual_host_mode();
            let value = s3_vhm.get(&bucket.as_str(), &object_key.as_str()).or(Err(Error::InvalidRequest));

            value
        }

        #[ink(message)]
        pub fn s3_delete(&self, endpoint: String, region: String, bucket: String, object_key: String) -> Result<()> {
            if self.admin != self.env().caller() {
                return Err(Error::NoPermissions);
            }
            if self.access_key == String::default() || self.secret_key == String::default() {
                return Err(Error::KeysNotConfigured)
            }
            let s3_vhm = s3::S3::new(&endpoint.as_str(), &region.as_str(), &self.access_key.as_str(), &self.secret_key.as_str()).unwrap().virtual_host_mode();
            s3_vhm.delete(&bucket.as_str(), &object_key.as_str()).or(Err(Error::InvalidRequest));

            Ok(())
        }

        #[ink(message)]
        pub fn it_works(&self) {
            // I don't care to expose them.
            let endpoint = "s3.us-west-1.amazonaws.com";
            let region = "us-west-1";
            let access_key = &self.access_key.as_str();
            let secret_key = &self.secret_key.as_str();

            let s3 = s3::S3::new(endpoint, region, access_key, secret_key)
                .unwrap()
                .virtual_host_mode(); // virtual host mode is required for newly created AWS S3 buckets.

            let bucket = "wrlx-aws-s3";
            let object_key = "path/to/foo";
            let value = b"bar";

            s3.put(bucket, object_key, value).unwrap();

            let head = s3.head(bucket, object_key).unwrap();
            assert_eq!(head.content_length, value.len() as u64);

            let v = s3.get(bucket, object_key).unwrap();
            assert_eq!(v, value);

            s3.delete(bucket, object_key).unwrap();
        }
    }
}