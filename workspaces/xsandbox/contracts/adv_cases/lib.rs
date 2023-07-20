#![cfg_attr(not(feature = "std"), no_std, no_main)]

extern crate alloc;

use ink as ink;
use pink_extension as pink;


#[pink::contract(env=PinkEnvironment)]
mod adv_cases {
    use super::pink;
    use pink::{PinkEnvironment};

    use alloc::{
        string::String,
        vec::Vec
    };
    use ink::storage::traits::StorageLayout;
    use ink::storage::Mapping;
    use ink::storage::Lazy;
    use scale::{Decode, Encode};


    #[derive(Debug, PartialEq, Eq, Encode, Decode)]
    #[cfg_attr(
        feature = "std",
        derive(scale_info::TypeInfo, StorageLayout)
    )]
    pub enum Error {
        NotFound,
        Unknonw,
    }

    #[derive(Debug, PartialEq, Eq, Encode, Decode)]
    #[cfg_attr(
        feature = "std",
        derive(scale_info::TypeInfo, StorageLayout)
    )]
    pub enum Error2 {
    }

    pub type Result<T> = core::result::Result<T, Error>;

    #[derive(
        Debug, PartialEq, Eq, Encode, Decode, Clone
    )]
    #[cfg_attr(
        feature = "std",
        derive(scale_info::TypeInfo, StorageLayout)
    )]
    pub enum Role {
        User,
        Admin,
    }

    #[derive(
        Debug, PartialEq, Eq, Encode, Decode, Clone
    )]
    #[cfg_attr(
        feature = "std",
        derive(scale_info::TypeInfo, StorageLayout)
    )]
    pub struct User {
        active: bool,
        name: String,
        role: Role,
        age: u8,
        salery: u64,
        favorite_numbers: Vec<u32>,
    }

    #[ink(storage)]
    pub struct AdvCases {
        users: Mapping<u32, User>,
        users_num: u32,
        users_by_account: Mapping<AccountId, u64>,
        lazy_user: Lazy<User>,
    }

    impl AdvCases {
        #[ink(constructor)]
        pub fn default() -> Self {
            Self {
                users: Mapping::new(),
                users_num: 0,
                users_by_account: Mapping::new(),
                lazy_user: Default::default(),
            }
        }

        #[ink(message)]
        pub fn add(&mut self, user : User) {
            self.users.insert(self.users_num.clone(), &user);
            self.users_num += 1;
        }

        #[ink(message)]
        pub fn get_user(&self, idx : u32) -> User {
            let user = self.users.get(idx);
            match user {
                None => User {
                    active: false,
                    name: String::from("none"),
                    role: Role::Admin,
                    age: 0,
                    salery: 0,
                    favorite_numbers: Vec::new(),
                },
                Some(user) => user,
            }
        }

        #[ink(message)]
        pub fn get_integers(&self) -> (u8, u128, i8, i128) {
            (1, 2, -3, 4)
        }

        #[ink(message)]
        pub fn get_user_by_result(&self, idx : u32) -> Result<User> {
            self.users.get(idx).ok_or(Error::NotFound)
        }

        #[ink(message)]
        pub fn get_lazy_user(&self) -> Option<User> {
            self.lazy_user.get()
        }

        #[ink(message)]
        pub fn get_array(&self, text : String) -> Vec<u64> {
            Vec::new()
        }

        #[ink(message)]
        pub fn get_tuple(&self, text : String) -> (u64, String) {
            (10, text)
        }

        #[ink(message)]
        pub fn sample(&self, value : Error2) -> u8 {
            1
        }

        #[ink(message)]
        pub fn handle_req(&self) {
        }
    }
}
