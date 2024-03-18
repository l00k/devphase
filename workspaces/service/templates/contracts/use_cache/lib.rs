#![cfg_attr(not(feature = "std"), no_std, no_main)]
extern crate alloc;
use pink_extension as pink;

#[pink::contract(env=PinkEnvironment)]
mod {{contract_name}} {
    use super::pink;
    use pink::chain_extension::pink_extension_instance as ext;
    use pink::PinkEnvironment;
    use alloc::vec::Vec;
    use scale::{Decode, Encode};

    /// Type alias for the contract's result type.
    pub type Result<T> = core::result::Result<T, Error>;

    #[derive(Debug, PartialEq, Eq, Encode, Decode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub enum Error {
        KeyValueNotSet,
        InvalidKeyValue,
    }

    #[ink(storage)]
    pub struct {{ContractName}} {}

    impl {{ContractName}} {
        #[ink(constructor)]
        pub fn default() -> Self {
            Self {}
        }

        #[ink(message)]
        pub fn get_key_value(&self) -> Option<Vec<u8>> {
            ext().cache_get(b"key")
        }

        #[ink(message)]
        pub fn set_key_value(&self, value: Vec<u8>) -> Result<()> {
            ext().cache_set(b"key", &value).or(Err(Error::KeyValueNotSet))
        }

        #[ink(message)]
        pub fn test(&self) {
            assert!(ext().cache_set(b"key", b"value").is_ok());
            assert_eq!(ext().cache_get(b"key"), Some(b"value".to_vec()));
            assert_eq!(ext().cache_remove(b"key"), Some(b"value".to_vec()));
            assert_eq!(ext().cache_get(b"key"), None);
        }
    }

    #[cfg(test)]
    mod tests {
        use super::*;

        #[ink::test]
        fn it_works() {
            use pink_extension::chain_extension::mock;
            use std::{cell::RefCell, collections::HashMap, rc::Rc};

            let storage: Rc<RefCell<HashMap<Vec<u8>, Vec<u8>>>> = Default::default();

            {
                let storage = storage.clone();
                mock::mock_cache_set(move |k, v| {
                    storage.borrow_mut().insert(k.to_vec(), v.to_vec());
                    Ok(())
                });
            }
            {
                let storage = storage.clone();
                mock::mock_cache_get(move |k| storage.borrow().get(k).map(|v| v.to_vec()));
            }
            {
                let storage = storage.clone();
                mock::mock_cache_remove(move |k| {
                    storage.borrow_mut().remove(k).map(|v| v.to_vec())
                });
            }

            let contract = {{ContractName}}::default();
            contract.test();
            contract.set_key_value(b"hashwarlock was here".to_vec());
            assert_eq!(contract.get_key_value(), Some(b"hashwarlock was here".to_vec()));
            contract.test();
            assert_ne!(contract.get_key_value(), Some(b"hashwarlock was here".to_vec()));
        }
    }
}
