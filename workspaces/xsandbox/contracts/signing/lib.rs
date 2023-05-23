#![cfg_attr(not(feature = "std"), no_std, no_main)]
extern crate alloc;

use pink_extension as pink;

#[pink::contract(env=PinkEnvironment)]
mod signing {
    use super::pink;
    use pink::chain_extension::signing as sig;
    use sig::SigType;
    use pink::PinkEnvironment;
    use alloc::{string::String, vec::Vec};

    #[ink(storage)]
    pub struct Signing {
        privkey: Vec<u8>,
        pubkey: Vec<u8>,
    }

    impl Signing {
        #[ink(constructor)]
        pub fn default() -> Self {
            let gen_privkey = sig::derive_sr25519_key(b"a spoon of salt");
            let gen_pubkey = sig::get_public_key(&gen_privkey, SigType::Sr25519);
            Self {
                privkey: gen_privkey,
                pubkey: gen_pubkey,
            }
        }

        #[ink(message)]
        pub fn sign(&self, message: String) -> Vec<u8> {
            let signature = sig::sign(message.as_bytes(), &self.privkey, SigType::Sr25519);
            signature
        }

        #[ink(message)]
        pub fn verify(&self, message: String, signature: Vec<u8>) -> bool {
            let pass = sig::verify(message.as_bytes(), &self.pubkey, &signature, SigType::Sr25519);
            pass
        }

        #[ink(message)]
        pub fn test(&self, message: String) {
            let message_bytes = message.as_bytes();
            let signature = sig::sign(message_bytes, &self.privkey, SigType::Sr25519);
            let pass = sig::verify(message_bytes, &self.pubkey, &signature, SigType::Sr25519);
            assert!(pass);
            let pass = sig::verify(b"Fake", &self.pubkey, &signature, SigType::Sr25519);
            assert!(!pass);
        }
    }

    #[cfg(test)]
    mod tests {
        use super::*;

        #[ink::test]
        fn it_works() {
            pink_extension_runtime::mock_ext::mock_all_ext();

            let contract = Signing::default();
            let message = String::from("hello world");
            let sign_message = contract.sign(message.clone());
            let verify_signature = contract.verify(message.clone(), sign_message);
            assert!(verify_signature);
            contract.test(message);
        }
    }
}
