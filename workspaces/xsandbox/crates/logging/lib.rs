#![cfg_attr(not(feature = "std"), no_std)]

#[macro_use]
extern crate alloc;

use alloc::{
    fmt::Arguments,
    string::{String, ToString},
    vec::Vec,
};

use ink::primitives::AccountId;
use pink_macro::driver;

/// An extension for Result<T, E> to log error conveniently.
pub trait ResultExt {
    /// Log the the error message with `pink::error!` with a tip `msg` in front if the Result is Err.
    fn log_err(self, msg: &str) -> Self
    where
        Self: Sized;
}

impl<T, E: core::fmt::Debug> ResultExt for Result<T, E> {
    fn log_err(self, msg: &str) -> Self
    where
        Self: Sized,
    {
        if let Err(err) = &self {
            error!("{msg}: {err:?}");
        }
        self
    }
}

#[driver]
#[ink::trait_definition]
pub trait TagStack {
    #[ink(message)]
    fn push_tag(&mut self, tag: String);
    #[ink(message)]
    fn pop_tag(&mut self);
    #[ink(message)]
    fn tags(&self) -> Vec<String>;
}

#[derive(Default)]
pub struct Span {
    bag: Option<TagStackRef>,
}

impl Drop for Span {
    fn drop(&mut self) {
        if let Some(mut bag) = self.bag.take() {
            bag.pop_tag();
        }
    }
}

/// Enter a log span. The span will be exited when the returned value is dropped.
pub fn enter_span(span: &str) -> Span {
    if pink::ext().is_in_transaction() {
        return Span::default();
    }
    let Some(mut bag) = TagStackRef::instance() else {
        return Span::default();
    };
    bag.push_tag(span.to_string());
    Span { bag: Some(bag) }
}

pub fn tagged_prefix() -> Option<String> {
    let bag = TagStackRef::instance()?;
    Some(bag.tags().join(","))
}

pub fn log(level: u8, args: Arguments<'_>) {
    let message = match tagged_prefix() {
        Some(prefix) => {
            format!("[{}]: {}", prefix, args)
        }
        None => {
            format!("{}", args)
        }
    };
    pink::ext().log(level, &message);
}

/// The `log!` macro allows you to log messages with specific logging levels in pink contract.
///
/// It is a flexible macro that uses a provided log level (trace, debug, info, warn, error),
/// followed by a format string and an optional list of arguments to generate the final log message.
#[macro_export]
macro_rules! log {
    ($level: expr, $($arg:tt)+) => {{ $crate::log($level, ::core::format_args!($($arg)+)) }}
}

/// Same as `info!` but at Error level.
#[macro_export(local_inner_macros)]
macro_rules! error {
    ($($arg:tt)+) => {{ log!(1, $($arg)+) }}
}

/// Same as `info!` but at Warn level.
#[macro_export(local_inner_macros)]
macro_rules! warn {
    ($($arg:tt)+) => {{ log!(2, $($arg)+) }}
}

/// Macro `info!` logs messages at the Info level in pink contract.
///
/// This macro is used to log information that would be helpful to understand the general flow
/// of the system's execution. It is similar to `log::info`, but it is specifically designed
/// to work within the pink contract environment.
///
/// # Examples
///
/// Basic usage:
///
/// ```ignore
/// logging::info!("This is an information message.");
/// let answer = 42;
/// logging::info!("The answer is {}.", answer);
/// ```
///
/// The above example would log "This is an information message." and
/// "The answer is 42." at the Info level.
#[macro_export(local_inner_macros)]
macro_rules! info {
    ($($arg:tt)+) => {{ log!(3, $($arg)+) }}
}

/// Same as `info!` but at Debug level.
#[macro_export(local_inner_macros)]
macro_rules! debug {
    ($($arg:tt)+) => {{ log!(4, $($arg)+) }}
}
