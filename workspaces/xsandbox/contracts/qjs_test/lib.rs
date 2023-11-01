#![cfg_attr(not(feature = "std"), no_std, no_main)]

extern crate alloc;

#[ink::contract(env = pink::PinkEnvironment)]
mod qjs_test {
    use logging::ResultExt;
    use phat_js::{GenericValue};
    use alloc::string::String;

    #[ink(storage)]
    pub struct QjsTest {}

    impl QjsTest {
        #[ink(constructor)]
        pub fn default() -> Self {
            Self {}
        }

        #[ink(message)]
        pub fn run(&self, actions: String) -> String {
            let script = include_str!("./js/dist/index.js");
            let result = phat_js::eval(script, &[actions])
                .log_err("Failed to run script");

            if let Ok(ok_result) = result {
                if let GenericValue::String(value) = ok_result {
                    return value;
                }
                else {
                    return String::from("{\"error\":\"Could not be handled\",\"code\":1698804286430}");
                }
            }
            else {
                return String::from("{\"error\":\"Error while executing JS\",\"code\":1698804330957}");
            }
        }
    }
}
