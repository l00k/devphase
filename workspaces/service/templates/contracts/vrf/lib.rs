#![cfg_attr(not(feature = "std"), no_std, no_main)]
extern crate alloc;

use pink_extension as pink;

#[pink::contract(env=PinkEnvironment)]
#[pink(inner=ink::contract)]
mod {{contract_name}} {
    use super::pink;
    use pink::PinkEnvironment;
    use this_crate::{version_tuple, VersionTuple};
    use alloc::vec::Vec;

    #[ink(storage)]
    pub struct {{ContractName}} {
    }


    impl {{ContractName}} {
        #[ink(constructor)]
        pub fn default() -> Self {
            Self {}
        }

        #[ink(message)]
        pub fn version(&self) -> VersionTuple {
            version_tuple!()
        }

        #[ink(message)]
        pub fn get_randomness(&self, salt: Vec<u8>) -> (Vec<u8>, Vec<u8>) {
            let result = pink::vrf(&salt);
            (salt, result)
        }
    }
}
