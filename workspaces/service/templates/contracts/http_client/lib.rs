#![cfg_attr(not(feature = "std"), no_std, no_main)]
extern crate alloc;

use pink_extension as pink;

#[pink::contract(env=PinkEnvironment)]
#[pink(inner=ink::contract)]
mod {{contract_name}} {
    use super::pink;
    use alloc::string::String;
    use alloc::vec::Vec;
    use pink::{http_get, http_post, PinkEnvironment};

    #[ink(storage)]
    pub struct {{ContractName}} {}

    impl {{ContractName}} {
        #[ink(constructor)]
        pub fn default() -> Self {
            Self {}
        }

        #[ink(message)]
        pub fn get_ip(&self) -> (u16, Vec<u8>) {
            let response = http_get!("https://ip.kvin.wang");
            (response.status_code, response.body)
        }

        #[ink(message)]
        pub fn post_data(&self) -> (u16, Vec<u8>) {
            let response = http_post!("https://example.com", b"payload".to_vec());
            (response.status_code, response.body)
        }

        #[ink(message)]
        pub fn proxy(&self, url: String) -> (u16, Vec<u8>) {
            let response = http_get!(&url);
            (response.status_code, response.body)
        }
    }

    #[cfg(test)]
    mod tests {
        use super::*;
        #[ink::test]
        fn get_ip_works() {
            use pink_extension::chain_extension::{mock, HttpResponse};

            mock::mock_http_request(|request| {
                if request.url == "https://ip.kvin.wang" {
                    HttpResponse::ok(b"1.1.1.1".to_vec())
                } else {
                HttpResponse::not_found()
                }
            });

            let contract = {{contract_name}}::default();
            assert_eq!(contract.get_ip().1, b"1.1.1.1");
        }
    }
}