#![cfg_attr(not(feature = "std"), no_std)]

extern crate alloc;

use pink;
use alloc::string::String;
use alloc::vec::Vec;
use scale::{Decode, Encode};
use logging::info;

#[derive(Debug, Encode, Decode)]
#[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
pub enum Output {
    String(String),
    Bytes(Vec<u8>),
}

pub fn eval(script: &str, args: &[String]) -> Result<Output, String> {
    use ink::env::call;
    let system = pink::system::SystemRef::instance();
    let delegate = system
        .get_driver("JsDelegate".into())
        .ok_or("No JS driver found")?;

    let result = call::build_call::<pink::PinkEnvironment>()
        .call_type(call::DelegateCall::new(delegate.convert_to()))
        .exec_input(
            call::ExecutionInput::new(call::Selector::new(0x49bfcd24_u32.to_be_bytes()))
                .push_arg(script)
                .push_arg(args),
        )
        .returns::<Result<Result<Output, String>, ink::LangError>>()
        .invoke()
        .expect("Failed to invoke delegate call");
    info!("eval result: {result:?}");
    result
}

pub trait ConvertTo<To> {
    fn convert_to(&self) -> To;
}

impl<F, T> ConvertTo<T> for F
where
    F: AsRef<[u8; 32]>,
    T: From<[u8; 32]>,
{
    fn convert_to(&self) -> T {
        (*self.as_ref()).into()
    }
}
