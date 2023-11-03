#![cfg_attr(not(feature = "std"), no_std, no_main)]

extern crate alloc;

#[ink::contract(env = pink::PinkEnvironment)]
mod qjs_test {
    use alloc::string::String;
    use alloc::vec::Vec;
    use phat_js::{GenericValue};

    #[ink(storage)]
    pub struct QjsTest {}

    impl QjsTest {
        #[ink(constructor)]
        pub fn default() -> Self {
            Self {}
        }

        #[ink(message)]
        pub fn run(&self, args: Vec<String>) -> phat_js::Output {
            let script = include_str!("./js/dist/index.js");
            let result = phat_js::eval(script, &args);

            if let Ok(ok_result) = result {
                return ok_result;
            }
            else {
                return GenericValue::Undefined;
            }
        }
    }
}
