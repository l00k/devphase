#![cfg_attr(not(feature = "std"), no_std, no_main)]

use ink;

#[ink::contract]
mod logtest {
    #[ink(storage)]
    pub struct Logtest {
        value: bool,
    }

    impl Logtest {
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
            pink::ext().log(3, "Flip");
            self.value = !self.value.clone();
        }

        #[ink(message)]
        pub fn get(&self) -> bool {
            pink::ext().log(4, "Get");
            self.value.clone()
        }
    }
}
