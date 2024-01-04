#![cfg_attr(not(feature = "std"), no_std, no_main)]

use pink_extension as pink;

#[pink::contract(env = PinkEnvironment)]
mod http_proxy {
    use pink::{http_req, PinkEnvironment};
    use pink::chain_extension::{HttpRequest, HttpResponse};

    use super::pink;

    #[ink(storage)]
    pub struct HttpProxy {}

    impl HttpProxy {
        #[ink(constructor)]
        pub fn new() -> Self {
            Self {}
        }

        #[ink(message)]
        pub fn request(
            &self,
            request: HttpRequest,
        ) -> HttpResponse {
            http_req!(
                request.method,
                request.url,
                request.body,
                request.headers
            )
        }
    }
}
