#![cfg_attr(not(feature = "std"), no_std, no_main)]

extern crate alloc;

#[ink::contract(env = pink::PinkEnvironment)]
mod qjs_test {
    use phat_js as js;
    use logging::ResultExt;
    use alloc::string::String;

    #[ink(storage)]
    pub struct QjsTest {}

    impl QjsTest {
        #[ink(constructor)]
        pub fn default() -> Self {
            Self {}
        }

        #[ink(message)]
        pub fn run(&self) -> bool {
            let script = include_str!("./js/dist/index.js");
            js::eval(script, &[String::from("test")])
                .log_err("Failed to run script")
                .is_ok()
        }
    }
}
