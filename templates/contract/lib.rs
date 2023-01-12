#![cfg_attr(not(feature = "std"), no_std)]

use ink_lang as ink;

#[ink::contract]
mod {{contract_name}} {
    #[ink(storage)]
    pub struct {{ContractName}} {
        value: bool,
    }

    impl {{ContractName}} {
        #[ink(constructor)]
        pub fn new(init_value: bool) -> Self {
            Self {
                value: init_value
            }
        }

        #[ink(constructor)]
        pub fn default() -> Self {
            Self::new(Default::default())
        }

        #[ink(message)]
        pub fn flip(&mut self) {
            self.value = !self.value.clone();
        }

        #[ink(message)]
        pub fn get(&self) -> bool {
            self.value.clone()
        }
    }
}
