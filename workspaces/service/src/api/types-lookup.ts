// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

// import type lookup before we augment - in some environments
// this is required to allow for ambient/previous definitions
import '@polkadot/types/lookup';

import type { Data } from '@polkadot/types';
import type { BTreeMap, Bytes, Compact, Enum, Null, Option, Result, Set, Struct, Text, U8aFixed, Vec, bool, u128, u16, u32, u64, u8 } from '@polkadot/types-codec';
import type { ITuple } from '@polkadot/types-codec/types';
import type { Vote } from '@polkadot/types/interfaces/elections';
import type { AccountId32, Call, H256, MultiAddress, PerU16, Perbill, Percent, Permill } from '@polkadot/types/interfaces/runtime';
import type { Event } from '@polkadot/types/interfaces/system';

declare module '@polkadot/types/lookup' {
  /** @name PalletAssetsAssetDetails (1) */
  interface PalletAssetsAssetDetails extends Struct {
    readonly owner: AccountId32;
    readonly issuer: AccountId32;
    readonly admin: AccountId32;
    readonly freezer: AccountId32;
    readonly supply: u128;
    readonly deposit: u128;
    readonly minBalance: u128;
    readonly isSufficient: bool;
    readonly accounts: u32;
    readonly sufficients: u32;
    readonly approvals: u32;
    readonly status: PalletAssetsAssetStatus;
  }

  /** @name PalletAssetsAssetStatus (7) */
  interface PalletAssetsAssetStatus extends Enum {
    readonly isLive: boolean;
    readonly isFrozen: boolean;
    readonly isDestroying: boolean;
    readonly type: 'Live' | 'Frozen' | 'Destroying';
  }

  /** @name PalletAssetsAssetAccount (9) */
  interface PalletAssetsAssetAccount extends Struct {
    readonly balance: u128;
    readonly status: PalletAssetsAccountStatus;
    readonly reason: PalletAssetsExistenceReason;
    readonly extra: Null;
  }

  /** @name PalletAssetsAccountStatus (11) */
  interface PalletAssetsAccountStatus extends Enum {
    readonly isLiquid: boolean;
    readonly isFrozen: boolean;
    readonly isBlocked: boolean;
    readonly type: 'Liquid' | 'Frozen' | 'Blocked';
  }

  /** @name PalletAssetsExistenceReason (12) */
  interface PalletAssetsExistenceReason extends Enum {
    readonly isConsumer: boolean;
    readonly isSufficient: boolean;
    readonly isDepositHeld: boolean;
    readonly asDepositHeld: u128;
    readonly isDepositRefunded: boolean;
    readonly isDepositFrom: boolean;
    readonly asDepositFrom: ITuple<[AccountId32, u128]>;
    readonly type: 'Consumer' | 'Sufficient' | 'DepositHeld' | 'DepositRefunded' | 'DepositFrom';
  }

  /** @name PalletAssetsApproval (14) */
  interface PalletAssetsApproval extends Struct {
    readonly amount: u128;
    readonly deposit: u128;
  }

  /** @name PalletAssetsAssetMetadata (15) */
  interface PalletAssetsAssetMetadata extends Struct {
    readonly deposit: u128;
    readonly name: Bytes;
    readonly symbol: Bytes;
    readonly decimals: u8;
    readonly isFrozen: bool;
  }

  /** @name PalletAssetsCall (18) */
  interface PalletAssetsCall extends Enum {
    readonly isCreate: boolean;
    readonly asCreate: {
      readonly id: Compact<u32>;
      readonly admin: MultiAddress;
      readonly minBalance: u128;
    } & Struct;
    readonly isForceCreate: boolean;
    readonly asForceCreate: {
      readonly id: Compact<u32>;
      readonly owner: MultiAddress;
      readonly isSufficient: bool;
      readonly minBalance: Compact<u128>;
    } & Struct;
    readonly isStartDestroy: boolean;
    readonly asStartDestroy: {
      readonly id: Compact<u32>;
    } & Struct;
    readonly isDestroyAccounts: boolean;
    readonly asDestroyAccounts: {
      readonly id: Compact<u32>;
    } & Struct;
    readonly isDestroyApprovals: boolean;
    readonly asDestroyApprovals: {
      readonly id: Compact<u32>;
    } & Struct;
    readonly isFinishDestroy: boolean;
    readonly asFinishDestroy: {
      readonly id: Compact<u32>;
    } & Struct;
    readonly isMint: boolean;
    readonly asMint: {
      readonly id: Compact<u32>;
      readonly beneficiary: MultiAddress;
      readonly amount: Compact<u128>;
    } & Struct;
    readonly isBurn: boolean;
    readonly asBurn: {
      readonly id: Compact<u32>;
      readonly who: MultiAddress;
      readonly amount: Compact<u128>;
    } & Struct;
    readonly isTransfer: boolean;
    readonly asTransfer: {
      readonly id: Compact<u32>;
      readonly target: MultiAddress;
      readonly amount: Compact<u128>;
    } & Struct;
    readonly isTransferKeepAlive: boolean;
    readonly asTransferKeepAlive: {
      readonly id: Compact<u32>;
      readonly target: MultiAddress;
      readonly amount: Compact<u128>;
    } & Struct;
    readonly isForceTransfer: boolean;
    readonly asForceTransfer: {
      readonly id: Compact<u32>;
      readonly source: MultiAddress;
      readonly dest: MultiAddress;
      readonly amount: Compact<u128>;
    } & Struct;
    readonly isFreeze: boolean;
    readonly asFreeze: {
      readonly id: Compact<u32>;
      readonly who: MultiAddress;
    } & Struct;
    readonly isThaw: boolean;
    readonly asThaw: {
      readonly id: Compact<u32>;
      readonly who: MultiAddress;
    } & Struct;
    readonly isFreezeAsset: boolean;
    readonly asFreezeAsset: {
      readonly id: Compact<u32>;
    } & Struct;
    readonly isThawAsset: boolean;
    readonly asThawAsset: {
      readonly id: Compact<u32>;
    } & Struct;
    readonly isTransferOwnership: boolean;
    readonly asTransferOwnership: {
      readonly id: Compact<u32>;
      readonly owner: MultiAddress;
    } & Struct;
    readonly isSetTeam: boolean;
    readonly asSetTeam: {
      readonly id: Compact<u32>;
      readonly issuer: MultiAddress;
      readonly admin: MultiAddress;
      readonly freezer: MultiAddress;
    } & Struct;
    readonly isSetMetadata: boolean;
    readonly asSetMetadata: {
      readonly id: Compact<u32>;
      readonly name: Bytes;
      readonly symbol: Bytes;
      readonly decimals: u8;
    } & Struct;
    readonly isClearMetadata: boolean;
    readonly asClearMetadata: {
      readonly id: Compact<u32>;
    } & Struct;
    readonly isForceSetMetadata: boolean;
    readonly asForceSetMetadata: {
      readonly id: Compact<u32>;
      readonly name: Bytes;
      readonly symbol: Bytes;
      readonly decimals: u8;
      readonly isFrozen: bool;
    } & Struct;
    readonly isForceClearMetadata: boolean;
    readonly asForceClearMetadata: {
      readonly id: Compact<u32>;
    } & Struct;
    readonly isForceAssetStatus: boolean;
    readonly asForceAssetStatus: {
      readonly id: Compact<u32>;
      readonly owner: MultiAddress;
      readonly issuer: MultiAddress;
      readonly admin: MultiAddress;
      readonly freezer: MultiAddress;
      readonly minBalance: Compact<u128>;
      readonly isSufficient: bool;
      readonly isFrozen: bool;
    } & Struct;
    readonly isApproveTransfer: boolean;
    readonly asApproveTransfer: {
      readonly id: Compact<u32>;
      readonly delegate: MultiAddress;
      readonly amount: Compact<u128>;
    } & Struct;
    readonly isCancelApproval: boolean;
    readonly asCancelApproval: {
      readonly id: Compact<u32>;
      readonly delegate: MultiAddress;
    } & Struct;
    readonly isForceCancelApproval: boolean;
    readonly asForceCancelApproval: {
      readonly id: Compact<u32>;
      readonly owner: MultiAddress;
      readonly delegate: MultiAddress;
    } & Struct;
    readonly isTransferApproved: boolean;
    readonly asTransferApproved: {
      readonly id: Compact<u32>;
      readonly owner: MultiAddress;
      readonly destination: MultiAddress;
      readonly amount: Compact<u128>;
    } & Struct;
    readonly isTouch: boolean;
    readonly asTouch: {
      readonly id: Compact<u32>;
    } & Struct;
    readonly isRefund: boolean;
    readonly asRefund: {
      readonly id: Compact<u32>;
      readonly allowBurn: bool;
    } & Struct;
    readonly isSetMinBalance: boolean;
    readonly asSetMinBalance: {
      readonly id: Compact<u32>;
      readonly minBalance: u128;
    } & Struct;
    readonly isTouchOther: boolean;
    readonly asTouchOther: {
      readonly id: Compact<u32>;
      readonly who: MultiAddress;
    } & Struct;
    readonly isRefundOther: boolean;
    readonly asRefundOther: {
      readonly id: Compact<u32>;
      readonly who: MultiAddress;
    } & Struct;
    readonly isBlock: boolean;
    readonly asBlock: {
      readonly id: Compact<u32>;
      readonly who: MultiAddress;
    } & Struct;
    readonly type: 'Create' | 'ForceCreate' | 'StartDestroy' | 'DestroyAccounts' | 'DestroyApprovals' | 'FinishDestroy' | 'Mint' | 'Burn' | 'Transfer' | 'TransferKeepAlive' | 'ForceTransfer' | 'Freeze' | 'Thaw' | 'FreezeAsset' | 'ThawAsset' | 'TransferOwnership' | 'SetTeam' | 'SetMetadata' | 'ClearMetadata' | 'ForceSetMetadata' | 'ForceClearMetadata' | 'ForceAssetStatus' | 'ApproveTransfer' | 'CancelApproval' | 'ForceCancelApproval' | 'TransferApproved' | 'Touch' | 'Refund' | 'SetMinBalance' | 'TouchOther' | 'RefundOther' | 'Block';
  }

  /** @name PalletAssetsEvent (23) */
  interface PalletAssetsEvent extends Enum {
    readonly isCreated: boolean;
    readonly asCreated: {
      readonly assetId: u32;
      readonly creator: AccountId32;
      readonly owner: AccountId32;
    } & Struct;
    readonly isIssued: boolean;
    readonly asIssued: {
      readonly assetId: u32;
      readonly owner: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isTransferred: boolean;
    readonly asTransferred: {
      readonly assetId: u32;
      readonly from: AccountId32;
      readonly to: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isBurned: boolean;
    readonly asBurned: {
      readonly assetId: u32;
      readonly owner: AccountId32;
      readonly balance: u128;
    } & Struct;
    readonly isTeamChanged: boolean;
    readonly asTeamChanged: {
      readonly assetId: u32;
      readonly issuer: AccountId32;
      readonly admin: AccountId32;
      readonly freezer: AccountId32;
    } & Struct;
    readonly isOwnerChanged: boolean;
    readonly asOwnerChanged: {
      readonly assetId: u32;
      readonly owner: AccountId32;
    } & Struct;
    readonly isFrozen: boolean;
    readonly asFrozen: {
      readonly assetId: u32;
      readonly who: AccountId32;
    } & Struct;
    readonly isThawed: boolean;
    readonly asThawed: {
      readonly assetId: u32;
      readonly who: AccountId32;
    } & Struct;
    readonly isAssetFrozen: boolean;
    readonly asAssetFrozen: {
      readonly assetId: u32;
    } & Struct;
    readonly isAssetThawed: boolean;
    readonly asAssetThawed: {
      readonly assetId: u32;
    } & Struct;
    readonly isAccountsDestroyed: boolean;
    readonly asAccountsDestroyed: {
      readonly assetId: u32;
      readonly accountsDestroyed: u32;
      readonly accountsRemaining: u32;
    } & Struct;
    readonly isApprovalsDestroyed: boolean;
    readonly asApprovalsDestroyed: {
      readonly assetId: u32;
      readonly approvalsDestroyed: u32;
      readonly approvalsRemaining: u32;
    } & Struct;
    readonly isDestructionStarted: boolean;
    readonly asDestructionStarted: {
      readonly assetId: u32;
    } & Struct;
    readonly isDestroyed: boolean;
    readonly asDestroyed: {
      readonly assetId: u32;
    } & Struct;
    readonly isForceCreated: boolean;
    readonly asForceCreated: {
      readonly assetId: u32;
      readonly owner: AccountId32;
    } & Struct;
    readonly isMetadataSet: boolean;
    readonly asMetadataSet: {
      readonly assetId: u32;
      readonly name: Bytes;
      readonly symbol: Bytes;
      readonly decimals: u8;
      readonly isFrozen: bool;
    } & Struct;
    readonly isMetadataCleared: boolean;
    readonly asMetadataCleared: {
      readonly assetId: u32;
    } & Struct;
    readonly isApprovedTransfer: boolean;
    readonly asApprovedTransfer: {
      readonly assetId: u32;
      readonly source: AccountId32;
      readonly delegate: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isApprovalCancelled: boolean;
    readonly asApprovalCancelled: {
      readonly assetId: u32;
      readonly owner: AccountId32;
      readonly delegate: AccountId32;
    } & Struct;
    readonly isTransferredApproved: boolean;
    readonly asTransferredApproved: {
      readonly assetId: u32;
      readonly owner: AccountId32;
      readonly delegate: AccountId32;
      readonly destination: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isAssetStatusChanged: boolean;
    readonly asAssetStatusChanged: {
      readonly assetId: u32;
    } & Struct;
    readonly isAssetMinBalanceChanged: boolean;
    readonly asAssetMinBalanceChanged: {
      readonly assetId: u32;
      readonly newMinBalance: u128;
    } & Struct;
    readonly isTouched: boolean;
    readonly asTouched: {
      readonly assetId: u32;
      readonly who: AccountId32;
      readonly depositor: AccountId32;
    } & Struct;
    readonly isBlocked: boolean;
    readonly asBlocked: {
      readonly assetId: u32;
      readonly who: AccountId32;
    } & Struct;
    readonly type: 'Created' | 'Issued' | 'Transferred' | 'Burned' | 'TeamChanged' | 'OwnerChanged' | 'Frozen' | 'Thawed' | 'AssetFrozen' | 'AssetThawed' | 'AccountsDestroyed' | 'ApprovalsDestroyed' | 'DestructionStarted' | 'Destroyed' | 'ForceCreated' | 'MetadataSet' | 'MetadataCleared' | 'ApprovedTransfer' | 'ApprovalCancelled' | 'TransferredApproved' | 'AssetStatusChanged' | 'AssetMinBalanceChanged' | 'Touched' | 'Blocked';
  }

  /** @name PalletAssetsError (24) */
  interface PalletAssetsError extends Enum {
    readonly isBalanceLow: boolean;
    readonly isNoAccount: boolean;
    readonly isNoPermission: boolean;
    readonly isUnknown: boolean;
    readonly isFrozen: boolean;
    readonly isInUse: boolean;
    readonly isBadWitness: boolean;
    readonly isMinBalanceZero: boolean;
    readonly isUnavailableConsumer: boolean;
    readonly isBadMetadata: boolean;
    readonly isUnapproved: boolean;
    readonly isWouldDie: boolean;
    readonly isAlreadyExists: boolean;
    readonly isNoDeposit: boolean;
    readonly isWouldBurn: boolean;
    readonly isLiveAsset: boolean;
    readonly isAssetNotLive: boolean;
    readonly isIncorrectStatus: boolean;
    readonly isNotFrozen: boolean;
    readonly isCallbackFailed: boolean;
    readonly type: 'BalanceLow' | 'NoAccount' | 'NoPermission' | 'Unknown' | 'Frozen' | 'InUse' | 'BadWitness' | 'MinBalanceZero' | 'UnavailableConsumer' | 'BadMetadata' | 'Unapproved' | 'WouldDie' | 'AlreadyExists' | 'NoDeposit' | 'WouldBurn' | 'LiveAsset' | 'AssetNotLive' | 'IncorrectStatus' | 'NotFrozen' | 'CallbackFailed';
  }

  /** @name FrameSystemAccountInfo (25) */
  interface FrameSystemAccountInfo extends Struct {
    readonly nonce: u32;
    readonly consumers: u32;
    readonly providers: u32;
    readonly sufficients: u32;
    readonly data: PalletBalancesAccountData;
  }

  /** @name PalletBalancesAccountData (26) */
  interface PalletBalancesAccountData extends Struct {
    readonly free: u128;
    readonly reserved: u128;
    readonly frozen: u128;
    readonly flags: u128;
  }

  /** @name FrameSupportDispatchPerDispatchClassWeight (28) */
  interface FrameSupportDispatchPerDispatchClassWeight extends Struct {
    readonly normal: SpWeightsWeightV2Weight;
    readonly operational: SpWeightsWeightV2Weight;
    readonly mandatory: SpWeightsWeightV2Weight;
  }

  /** @name SpWeightsWeightV2Weight (29) */
  interface SpWeightsWeightV2Weight extends Struct {
    readonly refTime: Compact<u64>;
    readonly proofSize: Compact<u64>;
  }

  /** @name SpRuntimeDigest (33) */
  interface SpRuntimeDigest extends Struct {
    readonly logs: Vec<SpRuntimeDigestDigestItem>;
  }

  /** @name SpRuntimeDigestDigestItem (35) */
  interface SpRuntimeDigestDigestItem extends Enum {
    readonly isOther: boolean;
    readonly asOther: Bytes;
    readonly isConsensus: boolean;
    readonly asConsensus: ITuple<[U8aFixed, Bytes]>;
    readonly isSeal: boolean;
    readonly asSeal: ITuple<[U8aFixed, Bytes]>;
    readonly isPreRuntime: boolean;
    readonly asPreRuntime: ITuple<[U8aFixed, Bytes]>;
    readonly isRuntimeEnvironmentUpdated: boolean;
    readonly type: 'Other' | 'Consensus' | 'Seal' | 'PreRuntime' | 'RuntimeEnvironmentUpdated';
  }

  /** @name FrameSystemEventRecord (38) */
  interface FrameSystemEventRecord extends Struct {
    readonly phase: FrameSystemPhase;
    readonly event: Event;
    readonly topics: Vec<H256>;
  }

  /** @name FrameSystemEvent (40) */
  interface FrameSystemEvent extends Enum {
    readonly isExtrinsicSuccess: boolean;
    readonly asExtrinsicSuccess: {
      readonly dispatchInfo: FrameSupportDispatchDispatchInfo;
    } & Struct;
    readonly isExtrinsicFailed: boolean;
    readonly asExtrinsicFailed: {
      readonly dispatchError: SpRuntimeDispatchError;
      readonly dispatchInfo: FrameSupportDispatchDispatchInfo;
    } & Struct;
    readonly isCodeUpdated: boolean;
    readonly isNewAccount: boolean;
    readonly asNewAccount: {
      readonly account: AccountId32;
    } & Struct;
    readonly isKilledAccount: boolean;
    readonly asKilledAccount: {
      readonly account: AccountId32;
    } & Struct;
    readonly isRemarked: boolean;
    readonly asRemarked: {
      readonly sender: AccountId32;
      readonly hash_: H256;
    } & Struct;
    readonly type: 'ExtrinsicSuccess' | 'ExtrinsicFailed' | 'CodeUpdated' | 'NewAccount' | 'KilledAccount' | 'Remarked';
  }

  /** @name FrameSupportDispatchDispatchInfo (41) */
  interface FrameSupportDispatchDispatchInfo extends Struct {
    readonly weight: SpWeightsWeightV2Weight;
    readonly class: FrameSupportDispatchDispatchClass;
    readonly paysFee: FrameSupportDispatchPays;
  }

  /** @name FrameSupportDispatchDispatchClass (42) */
  interface FrameSupportDispatchDispatchClass extends Enum {
    readonly isNormal: boolean;
    readonly isOperational: boolean;
    readonly isMandatory: boolean;
    readonly type: 'Normal' | 'Operational' | 'Mandatory';
  }

  /** @name FrameSupportDispatchPays (43) */
  interface FrameSupportDispatchPays extends Enum {
    readonly isYes: boolean;
    readonly isNo: boolean;
    readonly type: 'Yes' | 'No';
  }

  /** @name SpRuntimeDispatchError (44) */
  interface SpRuntimeDispatchError extends Enum {
    readonly isOther: boolean;
    readonly isCannotLookup: boolean;
    readonly isBadOrigin: boolean;
    readonly isModule: boolean;
    readonly asModule: SpRuntimeModuleError;
    readonly isConsumerRemaining: boolean;
    readonly isNoProviders: boolean;
    readonly isTooManyConsumers: boolean;
    readonly isToken: boolean;
    readonly asToken: SpRuntimeTokenError;
    readonly isArithmetic: boolean;
    readonly asArithmetic: SpArithmeticArithmeticError;
    readonly isTransactional: boolean;
    readonly asTransactional: SpRuntimeTransactionalError;
    readonly isExhausted: boolean;
    readonly isCorruption: boolean;
    readonly isUnavailable: boolean;
    readonly isRootNotAllowed: boolean;
    readonly type: 'Other' | 'CannotLookup' | 'BadOrigin' | 'Module' | 'ConsumerRemaining' | 'NoProviders' | 'TooManyConsumers' | 'Token' | 'Arithmetic' | 'Transactional' | 'Exhausted' | 'Corruption' | 'Unavailable' | 'RootNotAllowed';
  }

  /** @name SpRuntimeModuleError (45) */
  interface SpRuntimeModuleError extends Struct {
    readonly index: u8;
    readonly error: U8aFixed;
  }

  /** @name SpRuntimeTokenError (46) */
  interface SpRuntimeTokenError extends Enum {
    readonly isFundsUnavailable: boolean;
    readonly isOnlyProvider: boolean;
    readonly isBelowMinimum: boolean;
    readonly isCannotCreate: boolean;
    readonly isUnknownAsset: boolean;
    readonly isFrozen: boolean;
    readonly isUnsupported: boolean;
    readonly isCannotCreateHold: boolean;
    readonly isNotExpendable: boolean;
    readonly isBlocked: boolean;
    readonly type: 'FundsUnavailable' | 'OnlyProvider' | 'BelowMinimum' | 'CannotCreate' | 'UnknownAsset' | 'Frozen' | 'Unsupported' | 'CannotCreateHold' | 'NotExpendable' | 'Blocked';
  }

  /** @name SpArithmeticArithmeticError (47) */
  interface SpArithmeticArithmeticError extends Enum {
    readonly isUnderflow: boolean;
    readonly isOverflow: boolean;
    readonly isDivisionByZero: boolean;
    readonly type: 'Underflow' | 'Overflow' | 'DivisionByZero';
  }

  /** @name SpRuntimeTransactionalError (48) */
  interface SpRuntimeTransactionalError extends Enum {
    readonly isLimitReached: boolean;
    readonly isNoLayer: boolean;
    readonly type: 'LimitReached' | 'NoLayer';
  }

  /** @name PalletUtilityEvent (49) */
  interface PalletUtilityEvent extends Enum {
    readonly isBatchInterrupted: boolean;
    readonly asBatchInterrupted: {
      readonly index: u32;
      readonly error: SpRuntimeDispatchError;
    } & Struct;
    readonly isBatchCompleted: boolean;
    readonly isBatchCompletedWithErrors: boolean;
    readonly isItemCompleted: boolean;
    readonly isItemFailed: boolean;
    readonly asItemFailed: {
      readonly error: SpRuntimeDispatchError;
    } & Struct;
    readonly isDispatchedAs: boolean;
    readonly asDispatchedAs: {
      readonly result: Result<Null, SpRuntimeDispatchError>;
    } & Struct;
    readonly type: 'BatchInterrupted' | 'BatchCompleted' | 'BatchCompletedWithErrors' | 'ItemCompleted' | 'ItemFailed' | 'DispatchedAs';
  }

  /** @name PalletIndicesEvent (51) */
  interface PalletIndicesEvent extends Enum {
    readonly isIndexAssigned: boolean;
    readonly asIndexAssigned: {
      readonly who: AccountId32;
      readonly index: u32;
    } & Struct;
    readonly isIndexFreed: boolean;
    readonly asIndexFreed: {
      readonly index: u32;
    } & Struct;
    readonly isIndexFrozen: boolean;
    readonly asIndexFrozen: {
      readonly index: u32;
      readonly who: AccountId32;
    } & Struct;
    readonly type: 'IndexAssigned' | 'IndexFreed' | 'IndexFrozen';
  }

  /** @name PalletBalancesEvent (52) */
  interface PalletBalancesEvent extends Enum {
    readonly isEndowed: boolean;
    readonly asEndowed: {
      readonly account: AccountId32;
      readonly freeBalance: u128;
    } & Struct;
    readonly isDustLost: boolean;
    readonly asDustLost: {
      readonly account: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isTransfer: boolean;
    readonly asTransfer: {
      readonly from: AccountId32;
      readonly to: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isBalanceSet: boolean;
    readonly asBalanceSet: {
      readonly who: AccountId32;
      readonly free: u128;
    } & Struct;
    readonly isReserved: boolean;
    readonly asReserved: {
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isUnreserved: boolean;
    readonly asUnreserved: {
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isReserveRepatriated: boolean;
    readonly asReserveRepatriated: {
      readonly from: AccountId32;
      readonly to: AccountId32;
      readonly amount: u128;
      readonly destinationStatus: FrameSupportTokensMiscBalanceStatus;
    } & Struct;
    readonly isDeposit: boolean;
    readonly asDeposit: {
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isWithdraw: boolean;
    readonly asWithdraw: {
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isSlashed: boolean;
    readonly asSlashed: {
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isMinted: boolean;
    readonly asMinted: {
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isBurned: boolean;
    readonly asBurned: {
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isSuspended: boolean;
    readonly asSuspended: {
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isRestored: boolean;
    readonly asRestored: {
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isUpgraded: boolean;
    readonly asUpgraded: {
      readonly who: AccountId32;
    } & Struct;
    readonly isIssued: boolean;
    readonly asIssued: {
      readonly amount: u128;
    } & Struct;
    readonly isRescinded: boolean;
    readonly asRescinded: {
      readonly amount: u128;
    } & Struct;
    readonly isLocked: boolean;
    readonly asLocked: {
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isUnlocked: boolean;
    readonly asUnlocked: {
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isFrozen: boolean;
    readonly asFrozen: {
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isThawed: boolean;
    readonly asThawed: {
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly type: 'Endowed' | 'DustLost' | 'Transfer' | 'BalanceSet' | 'Reserved' | 'Unreserved' | 'ReserveRepatriated' | 'Deposit' | 'Withdraw' | 'Slashed' | 'Minted' | 'Burned' | 'Suspended' | 'Restored' | 'Upgraded' | 'Issued' | 'Rescinded' | 'Locked' | 'Unlocked' | 'Frozen' | 'Thawed';
  }

  /** @name FrameSupportTokensMiscBalanceStatus (53) */
  interface FrameSupportTokensMiscBalanceStatus extends Enum {
    readonly isFree: boolean;
    readonly isReserved: boolean;
    readonly type: 'Free' | 'Reserved';
  }

  /** @name PalletTransactionPaymentEvent (54) */
  interface PalletTransactionPaymentEvent extends Enum {
    readonly isTransactionFeePaid: boolean;
    readonly asTransactionFeePaid: {
      readonly who: AccountId32;
      readonly actualFee: u128;
      readonly tip: u128;
    } & Struct;
    readonly type: 'TransactionFeePaid';
  }

  /** @name PalletElectionProviderMultiPhaseEvent (55) */
  interface PalletElectionProviderMultiPhaseEvent extends Enum {
    readonly isSolutionStored: boolean;
    readonly asSolutionStored: {
      readonly compute: PalletElectionProviderMultiPhaseElectionCompute;
      readonly origin: Option<AccountId32>;
      readonly prevEjected: bool;
    } & Struct;
    readonly isElectionFinalized: boolean;
    readonly asElectionFinalized: {
      readonly compute: PalletElectionProviderMultiPhaseElectionCompute;
      readonly score: SpNposElectionsElectionScore;
    } & Struct;
    readonly isElectionFailed: boolean;
    readonly isRewarded: boolean;
    readonly asRewarded: {
      readonly account: AccountId32;
      readonly value: u128;
    } & Struct;
    readonly isSlashed: boolean;
    readonly asSlashed: {
      readonly account: AccountId32;
      readonly value: u128;
    } & Struct;
    readonly isPhaseTransitioned: boolean;
    readonly asPhaseTransitioned: {
      readonly from: PalletElectionProviderMultiPhasePhase;
      readonly to: PalletElectionProviderMultiPhasePhase;
      readonly round: u32;
    } & Struct;
    readonly type: 'SolutionStored' | 'ElectionFinalized' | 'ElectionFailed' | 'Rewarded' | 'Slashed' | 'PhaseTransitioned';
  }

  /** @name PalletElectionProviderMultiPhaseElectionCompute (56) */
  interface PalletElectionProviderMultiPhaseElectionCompute extends Enum {
    readonly isOnChain: boolean;
    readonly isSigned: boolean;
    readonly isUnsigned: boolean;
    readonly isFallback: boolean;
    readonly isEmergency: boolean;
    readonly type: 'OnChain' | 'Signed' | 'Unsigned' | 'Fallback' | 'Emergency';
  }

  /** @name SpNposElectionsElectionScore (58) */
  interface SpNposElectionsElectionScore extends Struct {
    readonly minimalStake: u128;
    readonly sumStake: u128;
    readonly sumStakeSquared: u128;
  }

  /** @name PalletElectionProviderMultiPhasePhase (59) */
  interface PalletElectionProviderMultiPhasePhase extends Enum {
    readonly isOff: boolean;
    readonly isSigned: boolean;
    readonly isUnsigned: boolean;
    readonly asUnsigned: ITuple<[bool, u32]>;
    readonly isEmergency: boolean;
    readonly type: 'Off' | 'Signed' | 'Unsigned' | 'Emergency';
  }

  /** @name PalletStakingPalletEvent (61) */
  interface PalletStakingPalletEvent extends Enum {
    readonly isEraPaid: boolean;
    readonly asEraPaid: {
      readonly eraIndex: u32;
      readonly validatorPayout: u128;
      readonly remainder: u128;
    } & Struct;
    readonly isRewarded: boolean;
    readonly asRewarded: {
      readonly stash: AccountId32;
      readonly dest: PalletStakingRewardDestination;
      readonly amount: u128;
    } & Struct;
    readonly isSlashed: boolean;
    readonly asSlashed: {
      readonly staker: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isSlashReported: boolean;
    readonly asSlashReported: {
      readonly validator: AccountId32;
      readonly fraction: Perbill;
      readonly slashEra: u32;
    } & Struct;
    readonly isOldSlashingReportDiscarded: boolean;
    readonly asOldSlashingReportDiscarded: {
      readonly sessionIndex: u32;
    } & Struct;
    readonly isStakersElected: boolean;
    readonly isBonded: boolean;
    readonly asBonded: {
      readonly stash: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isUnbonded: boolean;
    readonly asUnbonded: {
      readonly stash: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isWithdrawn: boolean;
    readonly asWithdrawn: {
      readonly stash: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isKicked: boolean;
    readonly asKicked: {
      readonly nominator: AccountId32;
      readonly stash: AccountId32;
    } & Struct;
    readonly isStakingElectionFailed: boolean;
    readonly isChilled: boolean;
    readonly asChilled: {
      readonly stash: AccountId32;
    } & Struct;
    readonly isPayoutStarted: boolean;
    readonly asPayoutStarted: {
      readonly eraIndex: u32;
      readonly validatorStash: AccountId32;
    } & Struct;
    readonly isValidatorPrefsSet: boolean;
    readonly asValidatorPrefsSet: {
      readonly stash: AccountId32;
      readonly prefs: PalletStakingValidatorPrefs;
    } & Struct;
    readonly isSnapshotVotersSizeExceeded: boolean;
    readonly asSnapshotVotersSizeExceeded: {
      readonly size_: u32;
    } & Struct;
    readonly isSnapshotTargetsSizeExceeded: boolean;
    readonly asSnapshotTargetsSizeExceeded: {
      readonly size_: u32;
    } & Struct;
    readonly isForceEra: boolean;
    readonly asForceEra: {
      readonly mode: PalletStakingForcing;
    } & Struct;
    readonly type: 'EraPaid' | 'Rewarded' | 'Slashed' | 'SlashReported' | 'OldSlashingReportDiscarded' | 'StakersElected' | 'Bonded' | 'Unbonded' | 'Withdrawn' | 'Kicked' | 'StakingElectionFailed' | 'Chilled' | 'PayoutStarted' | 'ValidatorPrefsSet' | 'SnapshotVotersSizeExceeded' | 'SnapshotTargetsSizeExceeded' | 'ForceEra';
  }

  /** @name PalletStakingRewardDestination (62) */
  interface PalletStakingRewardDestination extends Enum {
    readonly isStaked: boolean;
    readonly isStash: boolean;
    readonly isController: boolean;
    readonly isAccount: boolean;
    readonly asAccount: AccountId32;
    readonly isNone: boolean;
    readonly type: 'Staked' | 'Stash' | 'Controller' | 'Account' | 'None';
  }

  /** @name PalletStakingValidatorPrefs (64) */
  interface PalletStakingValidatorPrefs extends Struct {
    readonly commission: Compact<Perbill>;
    readonly blocked: bool;
  }

  /** @name PalletStakingForcing (66) */
  interface PalletStakingForcing extends Enum {
    readonly isNotForcing: boolean;
    readonly isForceNew: boolean;
    readonly isForceNone: boolean;
    readonly isForceAlways: boolean;
    readonly type: 'NotForcing' | 'ForceNew' | 'ForceNone' | 'ForceAlways';
  }

  /** @name PalletFastUnstakeEvent (67) */
  interface PalletFastUnstakeEvent extends Enum {
    readonly isUnstaked: boolean;
    readonly asUnstaked: {
      readonly stash: AccountId32;
      readonly result: Result<Null, SpRuntimeDispatchError>;
    } & Struct;
    readonly isSlashed: boolean;
    readonly asSlashed: {
      readonly stash: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isBatchChecked: boolean;
    readonly asBatchChecked: {
      readonly eras: Vec<u32>;
    } & Struct;
    readonly isBatchFinished: boolean;
    readonly asBatchFinished: {
      readonly size_: u32;
    } & Struct;
    readonly isInternalError: boolean;
    readonly type: 'Unstaked' | 'Slashed' | 'BatchChecked' | 'BatchFinished' | 'InternalError';
  }

  /** @name PalletBagsListEvent (69) */
  interface PalletBagsListEvent extends Enum {
    readonly isRebagged: boolean;
    readonly asRebagged: {
      readonly who: AccountId32;
      readonly from: u64;
      readonly to: u64;
    } & Struct;
    readonly isScoreUpdated: boolean;
    readonly asScoreUpdated: {
      readonly who: AccountId32;
      readonly newScore: u64;
    } & Struct;
    readonly type: 'Rebagged' | 'ScoreUpdated';
  }

  /** @name PalletNominationPoolsEvent (70) */
  interface PalletNominationPoolsEvent extends Enum {
    readonly isCreated: boolean;
    readonly asCreated: {
      readonly depositor: AccountId32;
      readonly poolId: u32;
    } & Struct;
    readonly isBonded: boolean;
    readonly asBonded: {
      readonly member: AccountId32;
      readonly poolId: u32;
      readonly bonded: u128;
      readonly joined: bool;
    } & Struct;
    readonly isPaidOut: boolean;
    readonly asPaidOut: {
      readonly member: AccountId32;
      readonly poolId: u32;
      readonly payout: u128;
    } & Struct;
    readonly isUnbonded: boolean;
    readonly asUnbonded: {
      readonly member: AccountId32;
      readonly poolId: u32;
      readonly balance: u128;
      readonly points: u128;
      readonly era: u32;
    } & Struct;
    readonly isWithdrawn: boolean;
    readonly asWithdrawn: {
      readonly member: AccountId32;
      readonly poolId: u32;
      readonly balance: u128;
      readonly points: u128;
    } & Struct;
    readonly isDestroyed: boolean;
    readonly asDestroyed: {
      readonly poolId: u32;
    } & Struct;
    readonly isStateChanged: boolean;
    readonly asStateChanged: {
      readonly poolId: u32;
      readonly newState: PalletNominationPoolsPoolState;
    } & Struct;
    readonly isMemberRemoved: boolean;
    readonly asMemberRemoved: {
      readonly poolId: u32;
      readonly member: AccountId32;
    } & Struct;
    readonly isRolesUpdated: boolean;
    readonly asRolesUpdated: {
      readonly root: Option<AccountId32>;
      readonly bouncer: Option<AccountId32>;
      readonly nominator: Option<AccountId32>;
    } & Struct;
    readonly isPoolSlashed: boolean;
    readonly asPoolSlashed: {
      readonly poolId: u32;
      readonly balance: u128;
    } & Struct;
    readonly isUnbondingPoolSlashed: boolean;
    readonly asUnbondingPoolSlashed: {
      readonly poolId: u32;
      readonly era: u32;
      readonly balance: u128;
    } & Struct;
    readonly isPoolCommissionUpdated: boolean;
    readonly asPoolCommissionUpdated: {
      readonly poolId: u32;
      readonly current: Option<ITuple<[Perbill, AccountId32]>>;
    } & Struct;
    readonly isPoolMaxCommissionUpdated: boolean;
    readonly asPoolMaxCommissionUpdated: {
      readonly poolId: u32;
      readonly maxCommission: Perbill;
    } & Struct;
    readonly isPoolCommissionChangeRateUpdated: boolean;
    readonly asPoolCommissionChangeRateUpdated: {
      readonly poolId: u32;
      readonly changeRate: PalletNominationPoolsCommissionChangeRate;
    } & Struct;
    readonly isPoolCommissionClaimed: boolean;
    readonly asPoolCommissionClaimed: {
      readonly poolId: u32;
      readonly commission: u128;
    } & Struct;
    readonly type: 'Created' | 'Bonded' | 'PaidOut' | 'Unbonded' | 'Withdrawn' | 'Destroyed' | 'StateChanged' | 'MemberRemoved' | 'RolesUpdated' | 'PoolSlashed' | 'UnbondingPoolSlashed' | 'PoolCommissionUpdated' | 'PoolMaxCommissionUpdated' | 'PoolCommissionChangeRateUpdated' | 'PoolCommissionClaimed';
  }

  /** @name PalletNominationPoolsPoolState (71) */
  interface PalletNominationPoolsPoolState extends Enum {
    readonly isOpen: boolean;
    readonly isBlocked: boolean;
    readonly isDestroying: boolean;
    readonly type: 'Open' | 'Blocked' | 'Destroying';
  }

  /** @name PalletNominationPoolsCommissionChangeRate (74) */
  interface PalletNominationPoolsCommissionChangeRate extends Struct {
    readonly maxIncrease: Perbill;
    readonly minDelay: u32;
  }

  /** @name PalletSessionEvent (75) */
  interface PalletSessionEvent extends Enum {
    readonly isNewSession: boolean;
    readonly asNewSession: {
      readonly sessionIndex: u32;
    } & Struct;
    readonly type: 'NewSession';
  }

  /** @name PalletDemocracyEvent (76) */
  interface PalletDemocracyEvent extends Enum {
    readonly isProposed: boolean;
    readonly asProposed: {
      readonly proposalIndex: u32;
      readonly deposit: u128;
    } & Struct;
    readonly isTabled: boolean;
    readonly asTabled: {
      readonly proposalIndex: u32;
      readonly deposit: u128;
    } & Struct;
    readonly isExternalTabled: boolean;
    readonly isStarted: boolean;
    readonly asStarted: {
      readonly refIndex: u32;
      readonly threshold: PalletDemocracyVoteThreshold;
    } & Struct;
    readonly isPassed: boolean;
    readonly asPassed: {
      readonly refIndex: u32;
    } & Struct;
    readonly isNotPassed: boolean;
    readonly asNotPassed: {
      readonly refIndex: u32;
    } & Struct;
    readonly isCancelled: boolean;
    readonly asCancelled: {
      readonly refIndex: u32;
    } & Struct;
    readonly isDelegated: boolean;
    readonly asDelegated: {
      readonly who: AccountId32;
      readonly target: AccountId32;
    } & Struct;
    readonly isUndelegated: boolean;
    readonly asUndelegated: {
      readonly account: AccountId32;
    } & Struct;
    readonly isVetoed: boolean;
    readonly asVetoed: {
      readonly who: AccountId32;
      readonly proposalHash: H256;
      readonly until: u32;
    } & Struct;
    readonly isBlacklisted: boolean;
    readonly asBlacklisted: {
      readonly proposalHash: H256;
    } & Struct;
    readonly isVoted: boolean;
    readonly asVoted: {
      readonly voter: AccountId32;
      readonly refIndex: u32;
      readonly vote: PalletDemocracyVoteAccountVote;
    } & Struct;
    readonly isSeconded: boolean;
    readonly asSeconded: {
      readonly seconder: AccountId32;
      readonly propIndex: u32;
    } & Struct;
    readonly isProposalCanceled: boolean;
    readonly asProposalCanceled: {
      readonly propIndex: u32;
    } & Struct;
    readonly isMetadataSet: boolean;
    readonly asMetadataSet: {
      readonly owner: PalletDemocracyMetadataOwner;
      readonly hash_: H256;
    } & Struct;
    readonly isMetadataCleared: boolean;
    readonly asMetadataCleared: {
      readonly owner: PalletDemocracyMetadataOwner;
      readonly hash_: H256;
    } & Struct;
    readonly isMetadataTransferred: boolean;
    readonly asMetadataTransferred: {
      readonly prevOwner: PalletDemocracyMetadataOwner;
      readonly owner: PalletDemocracyMetadataOwner;
      readonly hash_: H256;
    } & Struct;
    readonly type: 'Proposed' | 'Tabled' | 'ExternalTabled' | 'Started' | 'Passed' | 'NotPassed' | 'Cancelled' | 'Delegated' | 'Undelegated' | 'Vetoed' | 'Blacklisted' | 'Voted' | 'Seconded' | 'ProposalCanceled' | 'MetadataSet' | 'MetadataCleared' | 'MetadataTransferred';
  }

  /** @name PalletDemocracyVoteThreshold (77) */
  interface PalletDemocracyVoteThreshold extends Enum {
    readonly isSuperMajorityApprove: boolean;
    readonly isSuperMajorityAgainst: boolean;
    readonly isSimpleMajority: boolean;
    readonly type: 'SuperMajorityApprove' | 'SuperMajorityAgainst' | 'SimpleMajority';
  }

  /** @name PalletDemocracyVoteAccountVote (78) */
  interface PalletDemocracyVoteAccountVote extends Enum {
    readonly isStandard: boolean;
    readonly asStandard: {
      readonly vote: Vote;
      readonly balance: u128;
    } & Struct;
    readonly isSplit: boolean;
    readonly asSplit: {
      readonly aye: u128;
      readonly nay: u128;
    } & Struct;
    readonly type: 'Standard' | 'Split';
  }

  /** @name PalletDemocracyMetadataOwner (80) */
  interface PalletDemocracyMetadataOwner extends Enum {
    readonly isExternal: boolean;
    readonly isProposal: boolean;
    readonly asProposal: u32;
    readonly isReferendum: boolean;
    readonly asReferendum: u32;
    readonly type: 'External' | 'Proposal' | 'Referendum';
  }

  /** @name PalletCollectiveEvent (81) */
  interface PalletCollectiveEvent extends Enum {
    readonly isProposed: boolean;
    readonly asProposed: {
      readonly account: AccountId32;
      readonly proposalIndex: u32;
      readonly proposalHash: H256;
      readonly threshold: u32;
    } & Struct;
    readonly isVoted: boolean;
    readonly asVoted: {
      readonly account: AccountId32;
      readonly proposalHash: H256;
      readonly voted: bool;
      readonly yes: u32;
      readonly no: u32;
    } & Struct;
    readonly isApproved: boolean;
    readonly asApproved: {
      readonly proposalHash: H256;
    } & Struct;
    readonly isDisapproved: boolean;
    readonly asDisapproved: {
      readonly proposalHash: H256;
    } & Struct;
    readonly isExecuted: boolean;
    readonly asExecuted: {
      readonly proposalHash: H256;
      readonly result: Result<Null, SpRuntimeDispatchError>;
    } & Struct;
    readonly isMemberExecuted: boolean;
    readonly asMemberExecuted: {
      readonly proposalHash: H256;
      readonly result: Result<Null, SpRuntimeDispatchError>;
    } & Struct;
    readonly isClosed: boolean;
    readonly asClosed: {
      readonly proposalHash: H256;
      readonly yes: u32;
      readonly no: u32;
    } & Struct;
    readonly type: 'Proposed' | 'Voted' | 'Approved' | 'Disapproved' | 'Executed' | 'MemberExecuted' | 'Closed';
  }

  /** @name PalletElectionsPhragmenEvent (83) */
  interface PalletElectionsPhragmenEvent extends Enum {
    readonly isNewTerm: boolean;
    readonly asNewTerm: {
      readonly newMembers: Vec<ITuple<[AccountId32, u128]>>;
    } & Struct;
    readonly isEmptyTerm: boolean;
    readonly isElectionError: boolean;
    readonly isMemberKicked: boolean;
    readonly asMemberKicked: {
      readonly member: AccountId32;
    } & Struct;
    readonly isRenounced: boolean;
    readonly asRenounced: {
      readonly candidate: AccountId32;
    } & Struct;
    readonly isCandidateSlashed: boolean;
    readonly asCandidateSlashed: {
      readonly candidate: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isSeatHolderSlashed: boolean;
    readonly asSeatHolderSlashed: {
      readonly seatHolder: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly type: 'NewTerm' | 'EmptyTerm' | 'ElectionError' | 'MemberKicked' | 'Renounced' | 'CandidateSlashed' | 'SeatHolderSlashed';
  }

  /** @name PalletMembershipEvent (86) */
  interface PalletMembershipEvent extends Enum {
    readonly isMemberAdded: boolean;
    readonly isMemberRemoved: boolean;
    readonly isMembersSwapped: boolean;
    readonly isMembersReset: boolean;
    readonly isKeyChanged: boolean;
    readonly isDummy: boolean;
    readonly type: 'MemberAdded' | 'MemberRemoved' | 'MembersSwapped' | 'MembersReset' | 'KeyChanged' | 'Dummy';
  }

  /** @name PalletGrandpaEvent (87) */
  interface PalletGrandpaEvent extends Enum {
    readonly isNewAuthorities: boolean;
    readonly asNewAuthorities: {
      readonly authoritySet: Vec<ITuple<[SpConsensusGrandpaAppPublic, u64]>>;
    } & Struct;
    readonly isPaused: boolean;
    readonly isResumed: boolean;
    readonly type: 'NewAuthorities' | 'Paused' | 'Resumed';
  }

  /** @name SpConsensusGrandpaAppPublic (90) */
  interface SpConsensusGrandpaAppPublic extends SpCoreEd25519Public {}

  /** @name SpCoreEd25519Public (91) */
  interface SpCoreEd25519Public extends U8aFixed {}

  /** @name PalletTreasuryEvent (92) */
  interface PalletTreasuryEvent extends Enum {
    readonly isProposed: boolean;
    readonly asProposed: {
      readonly proposalIndex: u32;
    } & Struct;
    readonly isSpending: boolean;
    readonly asSpending: {
      readonly budgetRemaining: u128;
    } & Struct;
    readonly isAwarded: boolean;
    readonly asAwarded: {
      readonly proposalIndex: u32;
      readonly award: u128;
      readonly account: AccountId32;
    } & Struct;
    readonly isRejected: boolean;
    readonly asRejected: {
      readonly proposalIndex: u32;
      readonly slashed: u128;
    } & Struct;
    readonly isBurnt: boolean;
    readonly asBurnt: {
      readonly burntFunds: u128;
    } & Struct;
    readonly isRollover: boolean;
    readonly asRollover: {
      readonly rolloverBalance: u128;
    } & Struct;
    readonly isDeposit: boolean;
    readonly asDeposit: {
      readonly value: u128;
    } & Struct;
    readonly isSpendApproved: boolean;
    readonly asSpendApproved: {
      readonly proposalIndex: u32;
      readonly amount: u128;
      readonly beneficiary: AccountId32;
    } & Struct;
    readonly isUpdatedInactive: boolean;
    readonly asUpdatedInactive: {
      readonly reactivated: u128;
      readonly deactivated: u128;
    } & Struct;
    readonly type: 'Proposed' | 'Spending' | 'Awarded' | 'Rejected' | 'Burnt' | 'Rollover' | 'Deposit' | 'SpendApproved' | 'UpdatedInactive';
  }

  /** @name PalletSudoEvent (93) */
  interface PalletSudoEvent extends Enum {
    readonly isSudid: boolean;
    readonly asSudid: {
      readonly sudoResult: Result<Null, SpRuntimeDispatchError>;
    } & Struct;
    readonly isKeyChanged: boolean;
    readonly asKeyChanged: {
      readonly oldSudoer: Option<AccountId32>;
    } & Struct;
    readonly isSudoAsDone: boolean;
    readonly asSudoAsDone: {
      readonly sudoResult: Result<Null, SpRuntimeDispatchError>;
    } & Struct;
    readonly type: 'Sudid' | 'KeyChanged' | 'SudoAsDone';
  }

  /** @name PalletImOnlineEvent (94) */
  interface PalletImOnlineEvent extends Enum {
    readonly isHeartbeatReceived: boolean;
    readonly asHeartbeatReceived: {
      readonly authorityId: PalletImOnlineSr25519AppSr25519Public;
    } & Struct;
    readonly isAllGood: boolean;
    readonly isSomeOffline: boolean;
    readonly asSomeOffline: {
      readonly offline: Vec<ITuple<[AccountId32, PalletStakingExposure]>>;
    } & Struct;
    readonly type: 'HeartbeatReceived' | 'AllGood' | 'SomeOffline';
  }

  /** @name PalletImOnlineSr25519AppSr25519Public (95) */
  interface PalletImOnlineSr25519AppSr25519Public extends SpCoreSr25519Public {}

  /** @name SpCoreSr25519Public (96) */
  interface SpCoreSr25519Public extends U8aFixed {}

  /** @name PalletStakingExposure (99) */
  interface PalletStakingExposure extends Struct {
    readonly total: Compact<u128>;
    readonly own: Compact<u128>;
    readonly others: Vec<PalletStakingIndividualExposure>;
  }

  /** @name PalletStakingIndividualExposure (101) */
  interface PalletStakingIndividualExposure extends Struct {
    readonly who: AccountId32;
    readonly value: Compact<u128>;
  }

  /** @name PalletOffencesEvent (102) */
  interface PalletOffencesEvent extends Enum {
    readonly isOffence: boolean;
    readonly asOffence: {
      readonly kind: U8aFixed;
      readonly timeslot: Bytes;
    } & Struct;
    readonly type: 'Offence';
  }

  /** @name PalletIdentityEvent (104) */
  interface PalletIdentityEvent extends Enum {
    readonly isIdentitySet: boolean;
    readonly asIdentitySet: {
      readonly who: AccountId32;
    } & Struct;
    readonly isIdentityCleared: boolean;
    readonly asIdentityCleared: {
      readonly who: AccountId32;
      readonly deposit: u128;
    } & Struct;
    readonly isIdentityKilled: boolean;
    readonly asIdentityKilled: {
      readonly who: AccountId32;
      readonly deposit: u128;
    } & Struct;
    readonly isJudgementRequested: boolean;
    readonly asJudgementRequested: {
      readonly who: AccountId32;
      readonly registrarIndex: u32;
    } & Struct;
    readonly isJudgementUnrequested: boolean;
    readonly asJudgementUnrequested: {
      readonly who: AccountId32;
      readonly registrarIndex: u32;
    } & Struct;
    readonly isJudgementGiven: boolean;
    readonly asJudgementGiven: {
      readonly target: AccountId32;
      readonly registrarIndex: u32;
    } & Struct;
    readonly isRegistrarAdded: boolean;
    readonly asRegistrarAdded: {
      readonly registrarIndex: u32;
    } & Struct;
    readonly isSubIdentityAdded: boolean;
    readonly asSubIdentityAdded: {
      readonly sub: AccountId32;
      readonly main: AccountId32;
      readonly deposit: u128;
    } & Struct;
    readonly isSubIdentityRemoved: boolean;
    readonly asSubIdentityRemoved: {
      readonly sub: AccountId32;
      readonly main: AccountId32;
      readonly deposit: u128;
    } & Struct;
    readonly isSubIdentityRevoked: boolean;
    readonly asSubIdentityRevoked: {
      readonly sub: AccountId32;
      readonly main: AccountId32;
      readonly deposit: u128;
    } & Struct;
    readonly type: 'IdentitySet' | 'IdentityCleared' | 'IdentityKilled' | 'JudgementRequested' | 'JudgementUnrequested' | 'JudgementGiven' | 'RegistrarAdded' | 'SubIdentityAdded' | 'SubIdentityRemoved' | 'SubIdentityRevoked';
  }

  /** @name PalletSocietyEvent (105) */
  interface PalletSocietyEvent extends Enum {
    readonly isFounded: boolean;
    readonly asFounded: {
      readonly founder: AccountId32;
    } & Struct;
    readonly isBid: boolean;
    readonly asBid: {
      readonly candidateId: AccountId32;
      readonly offer: u128;
    } & Struct;
    readonly isVouch: boolean;
    readonly asVouch: {
      readonly candidateId: AccountId32;
      readonly offer: u128;
      readonly vouching: AccountId32;
    } & Struct;
    readonly isAutoUnbid: boolean;
    readonly asAutoUnbid: {
      readonly candidate: AccountId32;
    } & Struct;
    readonly isUnbid: boolean;
    readonly asUnbid: {
      readonly candidate: AccountId32;
    } & Struct;
    readonly isUnvouch: boolean;
    readonly asUnvouch: {
      readonly candidate: AccountId32;
    } & Struct;
    readonly isInducted: boolean;
    readonly asInducted: {
      readonly primary: AccountId32;
      readonly candidates: Vec<AccountId32>;
    } & Struct;
    readonly isSuspendedMemberJudgement: boolean;
    readonly asSuspendedMemberJudgement: {
      readonly who: AccountId32;
      readonly judged: bool;
    } & Struct;
    readonly isCandidateSuspended: boolean;
    readonly asCandidateSuspended: {
      readonly candidate: AccountId32;
    } & Struct;
    readonly isMemberSuspended: boolean;
    readonly asMemberSuspended: {
      readonly member: AccountId32;
    } & Struct;
    readonly isChallenged: boolean;
    readonly asChallenged: {
      readonly member: AccountId32;
    } & Struct;
    readonly isVote: boolean;
    readonly asVote: {
      readonly candidate: AccountId32;
      readonly voter: AccountId32;
      readonly vote: bool;
    } & Struct;
    readonly isDefenderVote: boolean;
    readonly asDefenderVote: {
      readonly voter: AccountId32;
      readonly vote: bool;
    } & Struct;
    readonly isNewParams: boolean;
    readonly asNewParams: {
      readonly params: PalletSocietyGroupParams;
    } & Struct;
    readonly isUnfounded: boolean;
    readonly asUnfounded: {
      readonly founder: AccountId32;
    } & Struct;
    readonly isDeposit: boolean;
    readonly asDeposit: {
      readonly value: u128;
    } & Struct;
    readonly isElevated: boolean;
    readonly asElevated: {
      readonly member: AccountId32;
      readonly rank: u32;
    } & Struct;
    readonly type: 'Founded' | 'Bid' | 'Vouch' | 'AutoUnbid' | 'Unbid' | 'Unvouch' | 'Inducted' | 'SuspendedMemberJudgement' | 'CandidateSuspended' | 'MemberSuspended' | 'Challenged' | 'Vote' | 'DefenderVote' | 'NewParams' | 'Unfounded' | 'Deposit' | 'Elevated';
  }

  /** @name PalletSocietyGroupParams (107) */
  interface PalletSocietyGroupParams extends Struct {
    readonly maxMembers: u32;
    readonly maxIntake: u32;
    readonly maxStrikes: u32;
    readonly candidateDeposit: u128;
  }

  /** @name PalletRecoveryEvent (108) */
  interface PalletRecoveryEvent extends Enum {
    readonly isRecoveryCreated: boolean;
    readonly asRecoveryCreated: {
      readonly account: AccountId32;
    } & Struct;
    readonly isRecoveryInitiated: boolean;
    readonly asRecoveryInitiated: {
      readonly lostAccount: AccountId32;
      readonly rescuerAccount: AccountId32;
    } & Struct;
    readonly isRecoveryVouched: boolean;
    readonly asRecoveryVouched: {
      readonly lostAccount: AccountId32;
      readonly rescuerAccount: AccountId32;
      readonly sender: AccountId32;
    } & Struct;
    readonly isRecoveryClosed: boolean;
    readonly asRecoveryClosed: {
      readonly lostAccount: AccountId32;
      readonly rescuerAccount: AccountId32;
    } & Struct;
    readonly isAccountRecovered: boolean;
    readonly asAccountRecovered: {
      readonly lostAccount: AccountId32;
      readonly rescuerAccount: AccountId32;
    } & Struct;
    readonly isRecoveryRemoved: boolean;
    readonly asRecoveryRemoved: {
      readonly lostAccount: AccountId32;
    } & Struct;
    readonly type: 'RecoveryCreated' | 'RecoveryInitiated' | 'RecoveryVouched' | 'RecoveryClosed' | 'AccountRecovered' | 'RecoveryRemoved';
  }

  /** @name PalletVestingEvent (109) */
  interface PalletVestingEvent extends Enum {
    readonly isVestingUpdated: boolean;
    readonly asVestingUpdated: {
      readonly account: AccountId32;
      readonly unvested: u128;
    } & Struct;
    readonly isVestingCompleted: boolean;
    readonly asVestingCompleted: {
      readonly account: AccountId32;
    } & Struct;
    readonly type: 'VestingUpdated' | 'VestingCompleted';
  }

  /** @name PalletSchedulerEvent (110) */
  interface PalletSchedulerEvent extends Enum {
    readonly isScheduled: boolean;
    readonly asScheduled: {
      readonly when: u32;
      readonly index: u32;
    } & Struct;
    readonly isCanceled: boolean;
    readonly asCanceled: {
      readonly when: u32;
      readonly index: u32;
    } & Struct;
    readonly isDispatched: boolean;
    readonly asDispatched: {
      readonly task: ITuple<[u32, u32]>;
      readonly id: Option<U8aFixed>;
      readonly result: Result<Null, SpRuntimeDispatchError>;
    } & Struct;
    readonly isCallUnavailable: boolean;
    readonly asCallUnavailable: {
      readonly task: ITuple<[u32, u32]>;
      readonly id: Option<U8aFixed>;
    } & Struct;
    readonly isPeriodicFailed: boolean;
    readonly asPeriodicFailed: {
      readonly task: ITuple<[u32, u32]>;
      readonly id: Option<U8aFixed>;
    } & Struct;
    readonly isPermanentlyOverweight: boolean;
    readonly asPermanentlyOverweight: {
      readonly task: ITuple<[u32, u32]>;
      readonly id: Option<U8aFixed>;
    } & Struct;
    readonly type: 'Scheduled' | 'Canceled' | 'Dispatched' | 'CallUnavailable' | 'PeriodicFailed' | 'PermanentlyOverweight';
  }

  /** @name PalletPreimageEvent (113) */
  interface PalletPreimageEvent extends Enum {
    readonly isNoted: boolean;
    readonly asNoted: {
      readonly hash_: H256;
    } & Struct;
    readonly isRequested: boolean;
    readonly asRequested: {
      readonly hash_: H256;
    } & Struct;
    readonly isCleared: boolean;
    readonly asCleared: {
      readonly hash_: H256;
    } & Struct;
    readonly type: 'Noted' | 'Requested' | 'Cleared';
  }

  /** @name PalletProxyEvent (114) */
  interface PalletProxyEvent extends Enum {
    readonly isProxyExecuted: boolean;
    readonly asProxyExecuted: {
      readonly result: Result<Null, SpRuntimeDispatchError>;
    } & Struct;
    readonly isPureCreated: boolean;
    readonly asPureCreated: {
      readonly pure: AccountId32;
      readonly who: AccountId32;
      readonly proxyType: PhalaNodeRuntimeProxyType;
      readonly disambiguationIndex: u16;
    } & Struct;
    readonly isAnnounced: boolean;
    readonly asAnnounced: {
      readonly real: AccountId32;
      readonly proxy: AccountId32;
      readonly callHash: H256;
    } & Struct;
    readonly isProxyAdded: boolean;
    readonly asProxyAdded: {
      readonly delegator: AccountId32;
      readonly delegatee: AccountId32;
      readonly proxyType: PhalaNodeRuntimeProxyType;
      readonly delay: u32;
    } & Struct;
    readonly isProxyRemoved: boolean;
    readonly asProxyRemoved: {
      readonly delegator: AccountId32;
      readonly delegatee: AccountId32;
      readonly proxyType: PhalaNodeRuntimeProxyType;
      readonly delay: u32;
    } & Struct;
    readonly type: 'ProxyExecuted' | 'PureCreated' | 'Announced' | 'ProxyAdded' | 'ProxyRemoved';
  }

  /** @name PhalaNodeRuntimeProxyType (115) */
  interface PhalaNodeRuntimeProxyType extends Enum {
    readonly isAny: boolean;
    readonly isNonTransfer: boolean;
    readonly isGovernance: boolean;
    readonly isStaking: boolean;
    readonly isStakePoolManager: boolean;
    readonly type: 'Any' | 'NonTransfer' | 'Governance' | 'Staking' | 'StakePoolManager';
  }

  /** @name PalletMultisigEvent (117) */
  interface PalletMultisigEvent extends Enum {
    readonly isNewMultisig: boolean;
    readonly asNewMultisig: {
      readonly approving: AccountId32;
      readonly multisig: AccountId32;
      readonly callHash: U8aFixed;
    } & Struct;
    readonly isMultisigApproval: boolean;
    readonly asMultisigApproval: {
      readonly approving: AccountId32;
      readonly timepoint: PalletMultisigTimepoint;
      readonly multisig: AccountId32;
      readonly callHash: U8aFixed;
    } & Struct;
    readonly isMultisigExecuted: boolean;
    readonly asMultisigExecuted: {
      readonly approving: AccountId32;
      readonly timepoint: PalletMultisigTimepoint;
      readonly multisig: AccountId32;
      readonly callHash: U8aFixed;
      readonly result: Result<Null, SpRuntimeDispatchError>;
    } & Struct;
    readonly isMultisigCancelled: boolean;
    readonly asMultisigCancelled: {
      readonly cancelling: AccountId32;
      readonly timepoint: PalletMultisigTimepoint;
      readonly multisig: AccountId32;
      readonly callHash: U8aFixed;
    } & Struct;
    readonly type: 'NewMultisig' | 'MultisigApproval' | 'MultisigExecuted' | 'MultisigCancelled';
  }

  /** @name PalletMultisigTimepoint (118) */
  interface PalletMultisigTimepoint extends Struct {
    readonly height: u32;
    readonly index: u32;
  }

  /** @name PalletBountiesEvent (119) */
  interface PalletBountiesEvent extends Enum {
    readonly isBountyProposed: boolean;
    readonly asBountyProposed: {
      readonly index: u32;
    } & Struct;
    readonly isBountyRejected: boolean;
    readonly asBountyRejected: {
      readonly index: u32;
      readonly bond: u128;
    } & Struct;
    readonly isBountyBecameActive: boolean;
    readonly asBountyBecameActive: {
      readonly index: u32;
    } & Struct;
    readonly isBountyAwarded: boolean;
    readonly asBountyAwarded: {
      readonly index: u32;
      readonly beneficiary: AccountId32;
    } & Struct;
    readonly isBountyClaimed: boolean;
    readonly asBountyClaimed: {
      readonly index: u32;
      readonly payout: u128;
      readonly beneficiary: AccountId32;
    } & Struct;
    readonly isBountyCanceled: boolean;
    readonly asBountyCanceled: {
      readonly index: u32;
    } & Struct;
    readonly isBountyExtended: boolean;
    readonly asBountyExtended: {
      readonly index: u32;
    } & Struct;
    readonly type: 'BountyProposed' | 'BountyRejected' | 'BountyBecameActive' | 'BountyAwarded' | 'BountyClaimed' | 'BountyCanceled' | 'BountyExtended';
  }

  /** @name PalletTipsEvent (120) */
  interface PalletTipsEvent extends Enum {
    readonly isNewTip: boolean;
    readonly asNewTip: {
      readonly tipHash: H256;
    } & Struct;
    readonly isTipClosing: boolean;
    readonly asTipClosing: {
      readonly tipHash: H256;
    } & Struct;
    readonly isTipClosed: boolean;
    readonly asTipClosed: {
      readonly tipHash: H256;
      readonly who: AccountId32;
      readonly payout: u128;
    } & Struct;
    readonly isTipRetracted: boolean;
    readonly asTipRetracted: {
      readonly tipHash: H256;
    } & Struct;
    readonly isTipSlashed: boolean;
    readonly asTipSlashed: {
      readonly tipHash: H256;
      readonly finder: AccountId32;
      readonly deposit: u128;
    } & Struct;
    readonly type: 'NewTip' | 'TipClosing' | 'TipClosed' | 'TipRetracted' | 'TipSlashed';
  }

  /** @name PalletLotteryEvent (121) */
  interface PalletLotteryEvent extends Enum {
    readonly isLotteryStarted: boolean;
    readonly isCallsUpdated: boolean;
    readonly isWinner: boolean;
    readonly asWinner: {
      readonly winner: AccountId32;
      readonly lotteryBalance: u128;
    } & Struct;
    readonly isTicketBought: boolean;
    readonly asTicketBought: {
      readonly who: AccountId32;
      readonly callIndex: ITuple<[u8, u8]>;
    } & Struct;
    readonly type: 'LotteryStarted' | 'CallsUpdated' | 'Winner' | 'TicketBought';
  }

  /** @name PalletChildBountiesEvent (123) */
  interface PalletChildBountiesEvent extends Enum {
    readonly isAdded: boolean;
    readonly asAdded: {
      readonly index: u32;
      readonly childIndex: u32;
    } & Struct;
    readonly isAwarded: boolean;
    readonly asAwarded: {
      readonly index: u32;
      readonly childIndex: u32;
      readonly beneficiary: AccountId32;
    } & Struct;
    readonly isClaimed: boolean;
    readonly asClaimed: {
      readonly index: u32;
      readonly childIndex: u32;
      readonly payout: u128;
      readonly beneficiary: AccountId32;
    } & Struct;
    readonly isCanceled: boolean;
    readonly asCanceled: {
      readonly index: u32;
      readonly childIndex: u32;
    } & Struct;
    readonly type: 'Added' | 'Awarded' | 'Claimed' | 'Canceled';
  }

  /** @name PhalaPalletsRegistryPalletEvent (124) */
  interface PhalaPalletsRegistryPalletEvent extends Enum {
    readonly isGatekeeperAdded: boolean;
    readonly asGatekeeperAdded: {
      readonly pubkey: SpCoreSr25519Public;
    } & Struct;
    readonly isGatekeeperRemoved: boolean;
    readonly asGatekeeperRemoved: {
      readonly pubkey: SpCoreSr25519Public;
    } & Struct;
    readonly isWorkerAdded: boolean;
    readonly asWorkerAdded: {
      readonly pubkey: SpCoreSr25519Public;
      readonly attestationProvider: Option<PhalaTypesAttestationProvider>;
      readonly confidenceLevel: u8;
    } & Struct;
    readonly isWorkerUpdated: boolean;
    readonly asWorkerUpdated: {
      readonly pubkey: SpCoreSr25519Public;
      readonly attestationProvider: Option<PhalaTypesAttestationProvider>;
      readonly confidenceLevel: u8;
    } & Struct;
    readonly isMasterKeyRotated: boolean;
    readonly asMasterKeyRotated: {
      readonly rotationId: u64;
      readonly masterPubkey: SpCoreSr25519Public;
    } & Struct;
    readonly isMasterKeyRotationFailed: boolean;
    readonly asMasterKeyRotationFailed: {
      readonly rotationLock: Option<u64>;
      readonly gatekeeperRotationId: u64;
    } & Struct;
    readonly isInitialScoreSet: boolean;
    readonly asInitialScoreSet: {
      readonly pubkey: SpCoreSr25519Public;
      readonly initScore: u32;
    } & Struct;
    readonly isMinimumPRuntimeVersionChangedTo: boolean;
    readonly asMinimumPRuntimeVersionChangedTo: ITuple<[u32, u32, u32]>;
    readonly isPRuntimeConsensusVersionChangedTo: boolean;
    readonly asPRuntimeConsensusVersionChangedTo: u32;
    readonly isGatekeeperLaunched: boolean;
    readonly type: 'GatekeeperAdded' | 'GatekeeperRemoved' | 'WorkerAdded' | 'WorkerUpdated' | 'MasterKeyRotated' | 'MasterKeyRotationFailed' | 'InitialScoreSet' | 'MinimumPRuntimeVersionChangedTo' | 'PRuntimeConsensusVersionChangedTo' | 'GatekeeperLaunched';
  }

  /** @name PhalaTypesAttestationProvider (126) */
  interface PhalaTypesAttestationProvider extends Enum {
    readonly isRoot: boolean;
    readonly isIas: boolean;
    readonly type: 'Root' | 'Ias';
  }

  /** @name PhalaPalletsComputeComputationPalletEvent (128) */
  interface PhalaPalletsComputeComputationPalletEvent extends Enum {
    readonly isCoolDownExpirationChanged: boolean;
    readonly asCoolDownExpirationChanged: {
      readonly period: u64;
    } & Struct;
    readonly isWorkerStarted: boolean;
    readonly asWorkerStarted: {
      readonly session: AccountId32;
      readonly initV: u128;
      readonly initP: u32;
    } & Struct;
    readonly isWorkerStopped: boolean;
    readonly asWorkerStopped: {
      readonly session: AccountId32;
    } & Struct;
    readonly isWorkerReclaimed: boolean;
    readonly asWorkerReclaimed: {
      readonly session: AccountId32;
      readonly originalStake: u128;
      readonly slashed: u128;
    } & Struct;
    readonly isSessionBound: boolean;
    readonly asSessionBound: {
      readonly session: AccountId32;
      readonly worker: SpCoreSr25519Public;
    } & Struct;
    readonly isSessionUnbound: boolean;
    readonly asSessionUnbound: {
      readonly session: AccountId32;
      readonly worker: SpCoreSr25519Public;
    } & Struct;
    readonly isWorkerEnterUnresponsive: boolean;
    readonly asWorkerEnterUnresponsive: {
      readonly session: AccountId32;
    } & Struct;
    readonly isWorkerExitUnresponsive: boolean;
    readonly asWorkerExitUnresponsive: {
      readonly session: AccountId32;
    } & Struct;
    readonly isSessionSettled: boolean;
    readonly asSessionSettled: {
      readonly session: AccountId32;
      readonly vBits: u128;
      readonly payoutBits: u128;
    } & Struct;
    readonly isInternalErrorWorkerSettleFailed: boolean;
    readonly asInternalErrorWorkerSettleFailed: {
      readonly worker: SpCoreSr25519Public;
    } & Struct;
    readonly isSubsidyBudgetHalved: boolean;
    readonly isInternalErrorWrongHalvingConfigured: boolean;
    readonly isTokenomicParametersChanged: boolean;
    readonly isSessionSettlementDropped: boolean;
    readonly asSessionSettlementDropped: {
      readonly session: AccountId32;
      readonly v: u128;
      readonly payout: u128;
    } & Struct;
    readonly isBenchmarkUpdated: boolean;
    readonly asBenchmarkUpdated: {
      readonly session: AccountId32;
      readonly pInstant: u32;
    } & Struct;
    readonly isBudgetUpdated: boolean;
    readonly asBudgetUpdated: {
      readonly nonce: u64;
      readonly budget: u128;
    } & Struct;
    readonly type: 'CoolDownExpirationChanged' | 'WorkerStarted' | 'WorkerStopped' | 'WorkerReclaimed' | 'SessionBound' | 'SessionUnbound' | 'WorkerEnterUnresponsive' | 'WorkerExitUnresponsive' | 'SessionSettled' | 'InternalErrorWorkerSettleFailed' | 'SubsidyBudgetHalved' | 'InternalErrorWrongHalvingConfigured' | 'TokenomicParametersChanged' | 'SessionSettlementDropped' | 'BenchmarkUpdated' | 'BudgetUpdated';
  }

  /** @name PhalaPalletsComputeStakePoolV2PalletEvent (129) */
  interface PhalaPalletsComputeStakePoolV2PalletEvent extends Enum {
    readonly isPoolCreated: boolean;
    readonly asPoolCreated: {
      readonly owner: AccountId32;
      readonly pid: u64;
      readonly cid: u32;
      readonly poolAccountId: AccountId32;
    } & Struct;
    readonly isPoolCommissionSet: boolean;
    readonly asPoolCommissionSet: {
      readonly pid: u64;
      readonly commission: u32;
    } & Struct;
    readonly isPoolCapacitySet: boolean;
    readonly asPoolCapacitySet: {
      readonly pid: u64;
      readonly cap: u128;
    } & Struct;
    readonly isPoolWorkerAdded: boolean;
    readonly asPoolWorkerAdded: {
      readonly pid: u64;
      readonly worker: SpCoreSr25519Public;
      readonly session: AccountId32;
    } & Struct;
    readonly isContribution: boolean;
    readonly asContribution: {
      readonly pid: u64;
      readonly user: AccountId32;
      readonly amount: u128;
      readonly shares: u128;
      readonly asVault: Option<u64>;
    } & Struct;
    readonly isOwnerRewardsWithdrawn: boolean;
    readonly asOwnerRewardsWithdrawn: {
      readonly pid: u64;
      readonly user: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isPoolSlashed: boolean;
    readonly asPoolSlashed: {
      readonly pid: u64;
      readonly amount: u128;
    } & Struct;
    readonly isSlashSettled: boolean;
    readonly asSlashSettled: {
      readonly pid: u64;
      readonly user: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isRewardDismissedNotInPool: boolean;
    readonly asRewardDismissedNotInPool: {
      readonly worker: SpCoreSr25519Public;
      readonly amount: u128;
    } & Struct;
    readonly isRewardDismissedNoShare: boolean;
    readonly asRewardDismissedNoShare: {
      readonly pid: u64;
      readonly amount: u128;
    } & Struct;
    readonly isRewardDismissedDust: boolean;
    readonly asRewardDismissedDust: {
      readonly pid: u64;
      readonly amount: u128;
    } & Struct;
    readonly isPoolWorkerRemoved: boolean;
    readonly asPoolWorkerRemoved: {
      readonly pid: u64;
      readonly worker: SpCoreSr25519Public;
    } & Struct;
    readonly isWorkerReclaimed: boolean;
    readonly asWorkerReclaimed: {
      readonly pid: u64;
      readonly worker: SpCoreSr25519Public;
    } & Struct;
    readonly isRewardReceived: boolean;
    readonly asRewardReceived: {
      readonly pid: u64;
      readonly toOwner: u128;
      readonly toStakers: u128;
    } & Struct;
    readonly isWorkingStarted: boolean;
    readonly asWorkingStarted: {
      readonly pid: u64;
      readonly worker: SpCoreSr25519Public;
      readonly amount: u128;
    } & Struct;
    readonly isRewardToOwnerDismissedDust: boolean;
    readonly asRewardToOwnerDismissedDust: {
      readonly pid: u64;
      readonly amount: u128;
    } & Struct;
    readonly isRewardToDistributionDismissedDust: boolean;
    readonly asRewardToDistributionDismissedDust: {
      readonly pid: u64;
      readonly amount: u128;
    } & Struct;
    readonly type: 'PoolCreated' | 'PoolCommissionSet' | 'PoolCapacitySet' | 'PoolWorkerAdded' | 'Contribution' | 'OwnerRewardsWithdrawn' | 'PoolSlashed' | 'SlashSettled' | 'RewardDismissedNotInPool' | 'RewardDismissedNoShare' | 'RewardDismissedDust' | 'PoolWorkerRemoved' | 'WorkerReclaimed' | 'RewardReceived' | 'WorkingStarted' | 'RewardToOwnerDismissedDust' | 'RewardToDistributionDismissedDust';
  }

  /** @name PhalaPalletsStakePoolPalletEvent (130) */
  type PhalaPalletsStakePoolPalletEvent = Null;

  /** @name PhalaPalletsComputeVaultPalletEvent (131) */
  interface PhalaPalletsComputeVaultPalletEvent extends Enum {
    readonly isPoolCreated: boolean;
    readonly asPoolCreated: {
      readonly owner: AccountId32;
      readonly pid: u64;
      readonly cid: u32;
      readonly poolAccountId: AccountId32;
    } & Struct;
    readonly isVaultCommissionSet: boolean;
    readonly asVaultCommissionSet: {
      readonly pid: u64;
      readonly commission: u32;
    } & Struct;
    readonly isOwnerSharesClaimed: boolean;
    readonly asOwnerSharesClaimed: {
      readonly pid: u64;
      readonly user: AccountId32;
      readonly shares: u128;
    } & Struct;
    readonly isOwnerSharesGained: boolean;
    readonly asOwnerSharesGained: {
      readonly pid: u64;
      readonly shares: u128;
      readonly checkoutPrice: u128;
    } & Struct;
    readonly isContribution: boolean;
    readonly asContribution: {
      readonly pid: u64;
      readonly user: AccountId32;
      readonly amount: u128;
      readonly shares: u128;
    } & Struct;
    readonly type: 'PoolCreated' | 'VaultCommissionSet' | 'OwnerSharesClaimed' | 'OwnerSharesGained' | 'Contribution';
  }

  /** @name PhalaPalletsComputeWrappedBalancesPalletEvent (132) */
  interface PhalaPalletsComputeWrappedBalancesPalletEvent extends Enum {
    readonly isDustRemoved: boolean;
    readonly asDustRemoved: {
      readonly user: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isWrapped: boolean;
    readonly asWrapped: {
      readonly user: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isUnwrapped: boolean;
    readonly asUnwrapped: {
      readonly user: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isVoted: boolean;
    readonly asVoted: {
      readonly user: AccountId32;
      readonly voteId: u32;
      readonly ayeAmount: u128;
      readonly nayAmount: u128;
    } & Struct;
    readonly type: 'DustRemoved' | 'Wrapped' | 'Unwrapped' | 'Voted';
  }

  /** @name PhalaPalletsComputeBasePoolPalletEvent (133) */
  interface PhalaPalletsComputeBasePoolPalletEvent extends Enum {
    readonly isNftCreated: boolean;
    readonly asNftCreated: {
      readonly pid: u64;
      readonly cid: u32;
      readonly nftId: u32;
      readonly owner: AccountId32;
      readonly shares: u128;
    } & Struct;
    readonly isWithdrawalQueued: boolean;
    readonly asWithdrawalQueued: {
      readonly pid: u64;
      readonly user: AccountId32;
      readonly shares: u128;
      readonly nftId: u32;
      readonly asVault: Option<u64>;
    } & Struct;
    readonly isWithdrawal: boolean;
    readonly asWithdrawal: {
      readonly pid: u64;
      readonly user: AccountId32;
      readonly amount: u128;
      readonly shares: u128;
    } & Struct;
    readonly isPoolWhitelistCreated: boolean;
    readonly asPoolWhitelistCreated: {
      readonly pid: u64;
    } & Struct;
    readonly isPoolWhitelistDeleted: boolean;
    readonly asPoolWhitelistDeleted: {
      readonly pid: u64;
    } & Struct;
    readonly isPoolWhitelistStakerAdded: boolean;
    readonly asPoolWhitelistStakerAdded: {
      readonly pid: u64;
      readonly staker: AccountId32;
    } & Struct;
    readonly isPoolWhitelistStakerRemoved: boolean;
    readonly asPoolWhitelistStakerRemoved: {
      readonly pid: u64;
      readonly staker: AccountId32;
    } & Struct;
    readonly type: 'NftCreated' | 'WithdrawalQueued' | 'Withdrawal' | 'PoolWhitelistCreated' | 'PoolWhitelistDeleted' | 'PoolWhitelistStakerAdded' | 'PoolWhitelistStakerRemoved';
  }

  /** @name PhalaPalletsPhatPalletEvent (134) */
  interface PhalaPalletsPhatPalletEvent extends Enum {
    readonly isClusterCreated: boolean;
    readonly asClusterCreated: {
      readonly cluster: H256;
      readonly systemContract: H256;
    } & Struct;
    readonly isClusterPubkeyAvailable: boolean;
    readonly asClusterPubkeyAvailable: {
      readonly cluster: H256;
      readonly pubkey: SpCoreSr25519Public;
    } & Struct;
    readonly isClusterDeployed: boolean;
    readonly asClusterDeployed: {
      readonly cluster: H256;
      readonly pubkey: SpCoreSr25519Public;
      readonly worker: SpCoreSr25519Public;
    } & Struct;
    readonly isClusterDeploymentFailed: boolean;
    readonly asClusterDeploymentFailed: {
      readonly cluster: H256;
      readonly worker: SpCoreSr25519Public;
    } & Struct;
    readonly isInstantiating: boolean;
    readonly asInstantiating: {
      readonly contract: H256;
      readonly cluster: H256;
      readonly deployer: AccountId32;
    } & Struct;
    readonly isContractPubkeyAvailable: boolean;
    readonly asContractPubkeyAvailable: {
      readonly contract: H256;
      readonly cluster: H256;
      readonly pubkey: SpCoreSr25519Public;
    } & Struct;
    readonly isInstantiated: boolean;
    readonly asInstantiated: {
      readonly contract: H256;
      readonly cluster: H256;
      readonly deployer: H256;
    } & Struct;
    readonly isClusterDestroyed: boolean;
    readonly asClusterDestroyed: {
      readonly cluster: H256;
    } & Struct;
    readonly isTransfered: boolean;
    readonly asTransfered: {
      readonly cluster: H256;
      readonly account: H256;
      readonly amount: u128;
    } & Struct;
    readonly isWorkerAddedToCluster: boolean;
    readonly asWorkerAddedToCluster: {
      readonly worker: SpCoreSr25519Public;
      readonly cluster: H256;
    } & Struct;
    readonly isWorkerRemovedFromCluster: boolean;
    readonly asWorkerRemovedFromCluster: {
      readonly worker: SpCoreSr25519Public;
      readonly cluster: H256;
    } & Struct;
    readonly type: 'ClusterCreated' | 'ClusterPubkeyAvailable' | 'ClusterDeployed' | 'ClusterDeploymentFailed' | 'Instantiating' | 'ContractPubkeyAvailable' | 'Instantiated' | 'ClusterDestroyed' | 'Transfered' | 'WorkerAddedToCluster' | 'WorkerRemovedFromCluster';
  }

  /** @name PhalaPalletsPhatTokenomicPalletEvent (135) */
  interface PhalaPalletsPhatTokenomicPalletEvent extends Enum {
    readonly isContractDepositChanged: boolean;
    readonly asContractDepositChanged: {
      readonly cluster: Option<H256>;
      readonly contract: H256;
      readonly deposit: u128;
    } & Struct;
    readonly isUserStakeChanged: boolean;
    readonly asUserStakeChanged: {
      readonly cluster: Option<H256>;
      readonly account: AccountId32;
      readonly contract: H256;
      readonly stake: u128;
    } & Struct;
    readonly type: 'ContractDepositChanged' | 'UserStakeChanged';
  }

  /** @name PhatOffchainRollupAnchorPalletEvent (137) */
  interface PhatOffchainRollupAnchorPalletEvent extends Enum {
    readonly isNameClaimed: boolean;
    readonly asNameClaimed: {
      readonly submitter: AccountId32;
      readonly name: H256;
    } & Struct;
    readonly isRollupExecuted: boolean;
    readonly asRollupExecuted: {
      readonly submitter: AccountId32;
      readonly name: H256;
      readonly nonce: u128;
    } & Struct;
    readonly type: 'NameClaimed' | 'RollupExecuted';
  }

  /** @name PhatOffchainRollupOraclePalletEvent (138) */
  interface PhatOffchainRollupOraclePalletEvent extends Enum {
    readonly isQuoteReceived: boolean;
    readonly asQuoteReceived: {
      readonly contract: H256;
      readonly submitter: AccountId32;
      readonly owner: AccountId32;
      readonly pair: Bytes;
      readonly price: u128;
    } & Struct;
    readonly type: 'QuoteReceived';
  }

  /** @name PalletUniquesEvent (140) */
  interface PalletUniquesEvent extends Enum {
    readonly isCreated: boolean;
    readonly asCreated: {
      readonly collection: u32;
      readonly creator: AccountId32;
      readonly owner: AccountId32;
    } & Struct;
    readonly isForceCreated: boolean;
    readonly asForceCreated: {
      readonly collection: u32;
      readonly owner: AccountId32;
    } & Struct;
    readonly isDestroyed: boolean;
    readonly asDestroyed: {
      readonly collection: u32;
    } & Struct;
    readonly isIssued: boolean;
    readonly asIssued: {
      readonly collection: u32;
      readonly item: u32;
      readonly owner: AccountId32;
    } & Struct;
    readonly isTransferred: boolean;
    readonly asTransferred: {
      readonly collection: u32;
      readonly item: u32;
      readonly from: AccountId32;
      readonly to: AccountId32;
    } & Struct;
    readonly isBurned: boolean;
    readonly asBurned: {
      readonly collection: u32;
      readonly item: u32;
      readonly owner: AccountId32;
    } & Struct;
    readonly isFrozen: boolean;
    readonly asFrozen: {
      readonly collection: u32;
      readonly item: u32;
    } & Struct;
    readonly isThawed: boolean;
    readonly asThawed: {
      readonly collection: u32;
      readonly item: u32;
    } & Struct;
    readonly isCollectionFrozen: boolean;
    readonly asCollectionFrozen: {
      readonly collection: u32;
    } & Struct;
    readonly isCollectionThawed: boolean;
    readonly asCollectionThawed: {
      readonly collection: u32;
    } & Struct;
    readonly isOwnerChanged: boolean;
    readonly asOwnerChanged: {
      readonly collection: u32;
      readonly newOwner: AccountId32;
    } & Struct;
    readonly isTeamChanged: boolean;
    readonly asTeamChanged: {
      readonly collection: u32;
      readonly issuer: AccountId32;
      readonly admin: AccountId32;
      readonly freezer: AccountId32;
    } & Struct;
    readonly isApprovedTransfer: boolean;
    readonly asApprovedTransfer: {
      readonly collection: u32;
      readonly item: u32;
      readonly owner: AccountId32;
      readonly delegate: AccountId32;
    } & Struct;
    readonly isApprovalCancelled: boolean;
    readonly asApprovalCancelled: {
      readonly collection: u32;
      readonly item: u32;
      readonly owner: AccountId32;
      readonly delegate: AccountId32;
    } & Struct;
    readonly isItemStatusChanged: boolean;
    readonly asItemStatusChanged: {
      readonly collection: u32;
    } & Struct;
    readonly isCollectionMetadataSet: boolean;
    readonly asCollectionMetadataSet: {
      readonly collection: u32;
      readonly data: Bytes;
      readonly isFrozen: bool;
    } & Struct;
    readonly isCollectionMetadataCleared: boolean;
    readonly asCollectionMetadataCleared: {
      readonly collection: u32;
    } & Struct;
    readonly isMetadataSet: boolean;
    readonly asMetadataSet: {
      readonly collection: u32;
      readonly item: u32;
      readonly data: Bytes;
      readonly isFrozen: bool;
    } & Struct;
    readonly isMetadataCleared: boolean;
    readonly asMetadataCleared: {
      readonly collection: u32;
      readonly item: u32;
    } & Struct;
    readonly isRedeposited: boolean;
    readonly asRedeposited: {
      readonly collection: u32;
      readonly successfulItems: Vec<u32>;
    } & Struct;
    readonly isAttributeSet: boolean;
    readonly asAttributeSet: {
      readonly collection: u32;
      readonly maybeItem: Option<u32>;
      readonly key: Bytes;
      readonly value: Bytes;
    } & Struct;
    readonly isAttributeCleared: boolean;
    readonly asAttributeCleared: {
      readonly collection: u32;
      readonly maybeItem: Option<u32>;
      readonly key: Bytes;
    } & Struct;
    readonly isOwnershipAcceptanceChanged: boolean;
    readonly asOwnershipAcceptanceChanged: {
      readonly who: AccountId32;
      readonly maybeCollection: Option<u32>;
    } & Struct;
    readonly isCollectionMaxSupplySet: boolean;
    readonly asCollectionMaxSupplySet: {
      readonly collection: u32;
      readonly maxSupply: u32;
    } & Struct;
    readonly isItemPriceSet: boolean;
    readonly asItemPriceSet: {
      readonly collection: u32;
      readonly item: u32;
      readonly price: u128;
      readonly whitelistedBuyer: Option<AccountId32>;
    } & Struct;
    readonly isItemPriceRemoved: boolean;
    readonly asItemPriceRemoved: {
      readonly collection: u32;
      readonly item: u32;
    } & Struct;
    readonly isItemBought: boolean;
    readonly asItemBought: {
      readonly collection: u32;
      readonly item: u32;
      readonly price: u128;
      readonly seller: AccountId32;
      readonly buyer: AccountId32;
    } & Struct;
    readonly type: 'Created' | 'ForceCreated' | 'Destroyed' | 'Issued' | 'Transferred' | 'Burned' | 'Frozen' | 'Thawed' | 'CollectionFrozen' | 'CollectionThawed' | 'OwnerChanged' | 'TeamChanged' | 'ApprovedTransfer' | 'ApprovalCancelled' | 'ItemStatusChanged' | 'CollectionMetadataSet' | 'CollectionMetadataCleared' | 'MetadataSet' | 'MetadataCleared' | 'Redeposited' | 'AttributeSet' | 'AttributeCleared' | 'OwnershipAcceptanceChanged' | 'CollectionMaxSupplySet' | 'ItemPriceSet' | 'ItemPriceRemoved' | 'ItemBought';
  }

  /** @name PalletRmrkCoreEvent (145) */
  interface PalletRmrkCoreEvent extends Enum {
    readonly isCollectionCreated: boolean;
    readonly asCollectionCreated: {
      readonly issuer: AccountId32;
      readonly collectionId: u32;
    } & Struct;
    readonly isNftMinted: boolean;
    readonly asNftMinted: {
      readonly owner: RmrkTraitsNftAccountIdOrCollectionNftTuple;
      readonly collectionId: u32;
      readonly nftId: u32;
    } & Struct;
    readonly isNftBurned: boolean;
    readonly asNftBurned: {
      readonly owner: AccountId32;
      readonly collectionId: u32;
      readonly nftId: u32;
    } & Struct;
    readonly isCollectionDestroyed: boolean;
    readonly asCollectionDestroyed: {
      readonly issuer: AccountId32;
      readonly collectionId: u32;
    } & Struct;
    readonly isNftSent: boolean;
    readonly asNftSent: {
      readonly sender: AccountId32;
      readonly recipient: RmrkTraitsNftAccountIdOrCollectionNftTuple;
      readonly collectionId: u32;
      readonly nftId: u32;
      readonly approvalRequired: bool;
    } & Struct;
    readonly isNftAccepted: boolean;
    readonly asNftAccepted: {
      readonly sender: AccountId32;
      readonly recipient: RmrkTraitsNftAccountIdOrCollectionNftTuple;
      readonly collectionId: u32;
      readonly nftId: u32;
    } & Struct;
    readonly isNftRejected: boolean;
    readonly asNftRejected: {
      readonly sender: AccountId32;
      readonly collectionId: u32;
      readonly nftId: u32;
    } & Struct;
    readonly isIssuerChanged: boolean;
    readonly asIssuerChanged: {
      readonly oldIssuer: AccountId32;
      readonly newIssuer: AccountId32;
      readonly collectionId: u32;
    } & Struct;
    readonly isPropertySet: boolean;
    readonly asPropertySet: {
      readonly collectionId: u32;
      readonly maybeNftId: Option<u32>;
      readonly key: Bytes;
      readonly value: Bytes;
    } & Struct;
    readonly isPropertyRemoved: boolean;
    readonly asPropertyRemoved: {
      readonly collectionId: u32;
      readonly maybeNftId: Option<u32>;
      readonly key: Bytes;
    } & Struct;
    readonly isPropertiesRemoved: boolean;
    readonly asPropertiesRemoved: {
      readonly collectionId: u32;
      readonly maybeNftId: Option<u32>;
    } & Struct;
    readonly isCollectionLocked: boolean;
    readonly asCollectionLocked: {
      readonly issuer: AccountId32;
      readonly collectionId: u32;
    } & Struct;
    readonly isResourceAdded: boolean;
    readonly asResourceAdded: {
      readonly nftId: u32;
      readonly resourceId: u32;
      readonly collectionId: u32;
    } & Struct;
    readonly isResourceReplaced: boolean;
    readonly asResourceReplaced: {
      readonly nftId: u32;
      readonly resourceId: u32;
      readonly collectionId: u32;
    } & Struct;
    readonly isResourceAccepted: boolean;
    readonly asResourceAccepted: {
      readonly nftId: u32;
      readonly resourceId: u32;
      readonly collectionId: u32;
    } & Struct;
    readonly isResourceRemoval: boolean;
    readonly asResourceRemoval: {
      readonly nftId: u32;
      readonly resourceId: u32;
      readonly collectionId: u32;
    } & Struct;
    readonly isResourceRemovalAccepted: boolean;
    readonly asResourceRemovalAccepted: {
      readonly nftId: u32;
      readonly resourceId: u32;
      readonly collectionId: u32;
    } & Struct;
    readonly isPrioritySet: boolean;
    readonly asPrioritySet: {
      readonly collectionId: u32;
      readonly nftId: u32;
    } & Struct;
    readonly type: 'CollectionCreated' | 'NftMinted' | 'NftBurned' | 'CollectionDestroyed' | 'NftSent' | 'NftAccepted' | 'NftRejected' | 'IssuerChanged' | 'PropertySet' | 'PropertyRemoved' | 'PropertiesRemoved' | 'CollectionLocked' | 'ResourceAdded' | 'ResourceReplaced' | 'ResourceAccepted' | 'ResourceRemoval' | 'ResourceRemovalAccepted' | 'PrioritySet';
  }

  /** @name RmrkTraitsNftAccountIdOrCollectionNftTuple (146) */
  interface RmrkTraitsNftAccountIdOrCollectionNftTuple extends Enum {
    readonly isAccountId: boolean;
    readonly asAccountId: AccountId32;
    readonly isCollectionAndNftTuple: boolean;
    readonly asCollectionAndNftTuple: ITuple<[u32, u32]>;
    readonly type: 'AccountId' | 'CollectionAndNftTuple';
  }

  /** @name PalletEvmAccountMappingEvent (147) */
  interface PalletEvmAccountMappingEvent extends Enum {
    readonly isServiceFeePaid: boolean;
    readonly asServiceFeePaid: {
      readonly who: AccountId32;
      readonly actualFee: u128;
      readonly expectedFee: u128;
    } & Struct;
    readonly isTransactionFeePaid: boolean;
    readonly asTransactionFeePaid: {
      readonly who: AccountId32;
      readonly actualFee: u128;
      readonly tip: u128;
    } & Struct;
    readonly isCallDone: boolean;
    readonly asCallDone: {
      readonly who: AccountId32;
      readonly callResult: Result<FrameSupportDispatchPostDispatchInfo, SpRuntimeDispatchErrorWithPostInfo>;
    } & Struct;
    readonly type: 'ServiceFeePaid' | 'TransactionFeePaid' | 'CallDone';
  }

  /** @name FrameSupportDispatchPostDispatchInfo (149) */
  interface FrameSupportDispatchPostDispatchInfo extends Struct {
    readonly actualWeight: Option<SpWeightsWeightV2Weight>;
    readonly paysFee: FrameSupportDispatchPays;
  }

  /** @name SpRuntimeDispatchErrorWithPostInfo (151) */
  interface SpRuntimeDispatchErrorWithPostInfo extends Struct {
    readonly postInfo: FrameSupportDispatchPostDispatchInfo;
    readonly error: SpRuntimeDispatchError;
  }

  /** @name FrameSystemPhase (152) */
  interface FrameSystemPhase extends Enum {
    readonly isApplyExtrinsic: boolean;
    readonly asApplyExtrinsic: u32;
    readonly isFinalization: boolean;
    readonly isInitialization: boolean;
    readonly type: 'ApplyExtrinsic' | 'Finalization' | 'Initialization';
  }

  /** @name FrameSystemLastRuntimeUpgradeInfo (155) */
  interface FrameSystemLastRuntimeUpgradeInfo extends Struct {
    readonly specVersion: Compact<u32>;
    readonly specName: Text;
  }

  /** @name FrameSystemCall (157) */
  interface FrameSystemCall extends Enum {
    readonly isRemark: boolean;
    readonly asRemark: {
      readonly remark: Bytes;
    } & Struct;
    readonly isSetHeapPages: boolean;
    readonly asSetHeapPages: {
      readonly pages: u64;
    } & Struct;
    readonly isSetCode: boolean;
    readonly asSetCode: {
      readonly code: Bytes;
    } & Struct;
    readonly isSetCodeWithoutChecks: boolean;
    readonly asSetCodeWithoutChecks: {
      readonly code: Bytes;
    } & Struct;
    readonly isSetStorage: boolean;
    readonly asSetStorage: {
      readonly items: Vec<ITuple<[Bytes, Bytes]>>;
    } & Struct;
    readonly isKillStorage: boolean;
    readonly asKillStorage: {
      readonly keys_: Vec<Bytes>;
    } & Struct;
    readonly isKillPrefix: boolean;
    readonly asKillPrefix: {
      readonly prefix: Bytes;
      readonly subkeys: u32;
    } & Struct;
    readonly isRemarkWithEvent: boolean;
    readonly asRemarkWithEvent: {
      readonly remark: Bytes;
    } & Struct;
    readonly type: 'Remark' | 'SetHeapPages' | 'SetCode' | 'SetCodeWithoutChecks' | 'SetStorage' | 'KillStorage' | 'KillPrefix' | 'RemarkWithEvent';
  }

  /** @name FrameSystemLimitsBlockWeights (161) */
  interface FrameSystemLimitsBlockWeights extends Struct {
    readonly baseBlock: SpWeightsWeightV2Weight;
    readonly maxBlock: SpWeightsWeightV2Weight;
    readonly perClass: FrameSupportDispatchPerDispatchClassWeightsPerClass;
  }

  /** @name FrameSupportDispatchPerDispatchClassWeightsPerClass (162) */
  interface FrameSupportDispatchPerDispatchClassWeightsPerClass extends Struct {
    readonly normal: FrameSystemLimitsWeightsPerClass;
    readonly operational: FrameSystemLimitsWeightsPerClass;
    readonly mandatory: FrameSystemLimitsWeightsPerClass;
  }

  /** @name FrameSystemLimitsWeightsPerClass (163) */
  interface FrameSystemLimitsWeightsPerClass extends Struct {
    readonly baseExtrinsic: SpWeightsWeightV2Weight;
    readonly maxExtrinsic: Option<SpWeightsWeightV2Weight>;
    readonly maxTotal: Option<SpWeightsWeightV2Weight>;
    readonly reserved: Option<SpWeightsWeightV2Weight>;
  }

  /** @name FrameSystemLimitsBlockLength (164) */
  interface FrameSystemLimitsBlockLength extends Struct {
    readonly max: FrameSupportDispatchPerDispatchClassU32;
  }

  /** @name FrameSupportDispatchPerDispatchClassU32 (165) */
  interface FrameSupportDispatchPerDispatchClassU32 extends Struct {
    readonly normal: u32;
    readonly operational: u32;
    readonly mandatory: u32;
  }

  /** @name SpWeightsRuntimeDbWeight (166) */
  interface SpWeightsRuntimeDbWeight extends Struct {
    readonly read: u64;
    readonly write: u64;
  }

  /** @name SpVersionRuntimeVersion (167) */
  interface SpVersionRuntimeVersion extends Struct {
    readonly specName: Text;
    readonly implName: Text;
    readonly authoringVersion: u32;
    readonly specVersion: u32;
    readonly implVersion: u32;
    readonly apis: Vec<ITuple<[U8aFixed, u32]>>;
    readonly transactionVersion: u32;
    readonly stateVersion: u8;
  }

  /** @name FrameSystemError (172) */
  interface FrameSystemError extends Enum {
    readonly isInvalidSpecName: boolean;
    readonly isSpecVersionNeedsToIncrease: boolean;
    readonly isFailedToExtractRuntimeVersion: boolean;
    readonly isNonDefaultComposite: boolean;
    readonly isNonZeroRefCount: boolean;
    readonly isCallFiltered: boolean;
    readonly type: 'InvalidSpecName' | 'SpecVersionNeedsToIncrease' | 'FailedToExtractRuntimeVersion' | 'NonDefaultComposite' | 'NonZeroRefCount' | 'CallFiltered';
  }

  /** @name PalletUtilityCall (173) */
  interface PalletUtilityCall extends Enum {
    readonly isBatch: boolean;
    readonly asBatch: {
      readonly calls: Vec<Call>;
    } & Struct;
    readonly isAsDerivative: boolean;
    readonly asAsDerivative: {
      readonly index: u16;
      readonly call: Call;
    } & Struct;
    readonly isBatchAll: boolean;
    readonly asBatchAll: {
      readonly calls: Vec<Call>;
    } & Struct;
    readonly isDispatchAs: boolean;
    readonly asDispatchAs: {
      readonly asOrigin: PhalaNodeRuntimeOriginCaller;
      readonly call: Call;
    } & Struct;
    readonly isForceBatch: boolean;
    readonly asForceBatch: {
      readonly calls: Vec<Call>;
    } & Struct;
    readonly isWithWeight: boolean;
    readonly asWithWeight: {
      readonly call: Call;
      readonly weight: SpWeightsWeightV2Weight;
    } & Struct;
    readonly type: 'Batch' | 'AsDerivative' | 'BatchAll' | 'DispatchAs' | 'ForceBatch' | 'WithWeight';
  }

  /** @name PalletBabeCall (176) */
  interface PalletBabeCall extends Enum {
    readonly isReportEquivocation: boolean;
    readonly asReportEquivocation: {
      readonly equivocationProof: SpConsensusSlotsEquivocationProof;
      readonly keyOwnerProof: SpSessionMembershipProof;
    } & Struct;
    readonly isReportEquivocationUnsigned: boolean;
    readonly asReportEquivocationUnsigned: {
      readonly equivocationProof: SpConsensusSlotsEquivocationProof;
      readonly keyOwnerProof: SpSessionMembershipProof;
    } & Struct;
    readonly isPlanConfigChange: boolean;
    readonly asPlanConfigChange: {
      readonly config: SpConsensusBabeDigestsNextConfigDescriptor;
    } & Struct;
    readonly type: 'ReportEquivocation' | 'ReportEquivocationUnsigned' | 'PlanConfigChange';
  }

  /** @name SpConsensusSlotsEquivocationProof (177) */
  interface SpConsensusSlotsEquivocationProof extends Struct {
    readonly offender: SpConsensusBabeAppPublic;
    readonly slot: u64;
    readonly firstHeader: SpRuntimeHeader;
    readonly secondHeader: SpRuntimeHeader;
  }

  /** @name SpRuntimeHeader (178) */
  interface SpRuntimeHeader extends Struct {
    readonly parentHash: H256;
    readonly number: Compact<u32>;
    readonly stateRoot: H256;
    readonly extrinsicsRoot: H256;
    readonly digest: SpRuntimeDigest;
  }

  /** @name SpConsensusBabeAppPublic (179) */
  interface SpConsensusBabeAppPublic extends SpCoreSr25519Public {}

  /** @name SpSessionMembershipProof (181) */
  interface SpSessionMembershipProof extends Struct {
    readonly session: u32;
    readonly trieNodes: Vec<Bytes>;
    readonly validatorCount: u32;
  }

  /** @name SpConsensusBabeDigestsNextConfigDescriptor (182) */
  interface SpConsensusBabeDigestsNextConfigDescriptor extends Enum {
    readonly isV1: boolean;
    readonly asV1: {
      readonly c: ITuple<[u64, u64]>;
      readonly allowedSlots: SpConsensusBabeAllowedSlots;
    } & Struct;
    readonly type: 'V1';
  }

  /** @name SpConsensusBabeAllowedSlots (184) */
  interface SpConsensusBabeAllowedSlots extends Enum {
    readonly isPrimarySlots: boolean;
    readonly isPrimaryAndSecondaryPlainSlots: boolean;
    readonly isPrimaryAndSecondaryVRFSlots: boolean;
    readonly type: 'PrimarySlots' | 'PrimaryAndSecondaryPlainSlots' | 'PrimaryAndSecondaryVRFSlots';
  }

  /** @name PalletTimestampCall (185) */
  interface PalletTimestampCall extends Enum {
    readonly isSet: boolean;
    readonly asSet: {
      readonly now: Compact<u64>;
    } & Struct;
    readonly type: 'Set';
  }

  /** @name PalletIndicesCall (186) */
  interface PalletIndicesCall extends Enum {
    readonly isClaim: boolean;
    readonly asClaim: {
      readonly index: u32;
    } & Struct;
    readonly isTransfer: boolean;
    readonly asTransfer: {
      readonly new_: MultiAddress;
      readonly index: u32;
    } & Struct;
    readonly isFree: boolean;
    readonly asFree: {
      readonly index: u32;
    } & Struct;
    readonly isForceTransfer: boolean;
    readonly asForceTransfer: {
      readonly new_: MultiAddress;
      readonly index: u32;
      readonly freeze: bool;
    } & Struct;
    readonly isFreeze: boolean;
    readonly asFreeze: {
      readonly index: u32;
    } & Struct;
    readonly type: 'Claim' | 'Transfer' | 'Free' | 'ForceTransfer' | 'Freeze';
  }

  /** @name PalletBalancesCall (187) */
  interface PalletBalancesCall extends Enum {
    readonly isTransferAllowDeath: boolean;
    readonly asTransferAllowDeath: {
      readonly dest: MultiAddress;
      readonly value: Compact<u128>;
    } & Struct;
    readonly isForceTransfer: boolean;
    readonly asForceTransfer: {
      readonly source: MultiAddress;
      readonly dest: MultiAddress;
      readonly value: Compact<u128>;
    } & Struct;
    readonly isTransferKeepAlive: boolean;
    readonly asTransferKeepAlive: {
      readonly dest: MultiAddress;
      readonly value: Compact<u128>;
    } & Struct;
    readonly isTransferAll: boolean;
    readonly asTransferAll: {
      readonly dest: MultiAddress;
      readonly keepAlive: bool;
    } & Struct;
    readonly isForceUnreserve: boolean;
    readonly asForceUnreserve: {
      readonly who: MultiAddress;
      readonly amount: u128;
    } & Struct;
    readonly isUpgradeAccounts: boolean;
    readonly asUpgradeAccounts: {
      readonly who: Vec<AccountId32>;
    } & Struct;
    readonly isForceSetBalance: boolean;
    readonly asForceSetBalance: {
      readonly who: MultiAddress;
      readonly newFree: Compact<u128>;
    } & Struct;
    readonly type: 'TransferAllowDeath' | 'ForceTransfer' | 'TransferKeepAlive' | 'TransferAll' | 'ForceUnreserve' | 'UpgradeAccounts' | 'ForceSetBalance';
  }

  /** @name PalletElectionProviderMultiPhaseCall (188) */
  interface PalletElectionProviderMultiPhaseCall extends Enum {
    readonly isSubmitUnsigned: boolean;
    readonly asSubmitUnsigned: {
      readonly rawSolution: PalletElectionProviderMultiPhaseRawSolution;
      readonly witness: PalletElectionProviderMultiPhaseSolutionOrSnapshotSize;
    } & Struct;
    readonly isSetMinimumUntrustedScore: boolean;
    readonly asSetMinimumUntrustedScore: {
      readonly maybeNextScore: Option<SpNposElectionsElectionScore>;
    } & Struct;
    readonly isSetEmergencyElectionResult: boolean;
    readonly asSetEmergencyElectionResult: {
      readonly supports: Vec<ITuple<[AccountId32, SpNposElectionsSupport]>>;
    } & Struct;
    readonly isSubmit: boolean;
    readonly asSubmit: {
      readonly rawSolution: PalletElectionProviderMultiPhaseRawSolution;
    } & Struct;
    readonly isGovernanceFallback: boolean;
    readonly asGovernanceFallback: {
      readonly maybeMaxVoters: Option<u32>;
      readonly maybeMaxTargets: Option<u32>;
    } & Struct;
    readonly type: 'SubmitUnsigned' | 'SetMinimumUntrustedScore' | 'SetEmergencyElectionResult' | 'Submit' | 'GovernanceFallback';
  }

  /** @name PalletElectionProviderMultiPhaseRawSolution (189) */
  interface PalletElectionProviderMultiPhaseRawSolution extends Struct {
    readonly solution: PhalaNodeRuntimeNposSolution16;
    readonly score: SpNposElectionsElectionScore;
    readonly round: u32;
  }

  /** @name PhalaNodeRuntimeNposSolution16 (190) */
  interface PhalaNodeRuntimeNposSolution16 extends Struct {
    readonly votes1: Vec<ITuple<[Compact<u32>, Compact<u16>]>>;
    readonly votes2: Vec<ITuple<[Compact<u32>, ITuple<[Compact<u16>, Compact<PerU16>]>, Compact<u16>]>>;
    readonly votes3: Vec<ITuple<[Compact<u32>, Vec<ITuple<[Compact<u16>, Compact<PerU16>]>>, Compact<u16>]>>;
    readonly votes4: Vec<ITuple<[Compact<u32>, Vec<ITuple<[Compact<u16>, Compact<PerU16>]>>, Compact<u16>]>>;
    readonly votes5: Vec<ITuple<[Compact<u32>, Vec<ITuple<[Compact<u16>, Compact<PerU16>]>>, Compact<u16>]>>;
    readonly votes6: Vec<ITuple<[Compact<u32>, Vec<ITuple<[Compact<u16>, Compact<PerU16>]>>, Compact<u16>]>>;
    readonly votes7: Vec<ITuple<[Compact<u32>, Vec<ITuple<[Compact<u16>, Compact<PerU16>]>>, Compact<u16>]>>;
    readonly votes8: Vec<ITuple<[Compact<u32>, Vec<ITuple<[Compact<u16>, Compact<PerU16>]>>, Compact<u16>]>>;
    readonly votes9: Vec<ITuple<[Compact<u32>, Vec<ITuple<[Compact<u16>, Compact<PerU16>]>>, Compact<u16>]>>;
    readonly votes10: Vec<ITuple<[Compact<u32>, Vec<ITuple<[Compact<u16>, Compact<PerU16>]>>, Compact<u16>]>>;
    readonly votes11: Vec<ITuple<[Compact<u32>, Vec<ITuple<[Compact<u16>, Compact<PerU16>]>>, Compact<u16>]>>;
    readonly votes12: Vec<ITuple<[Compact<u32>, Vec<ITuple<[Compact<u16>, Compact<PerU16>]>>, Compact<u16>]>>;
    readonly votes13: Vec<ITuple<[Compact<u32>, Vec<ITuple<[Compact<u16>, Compact<PerU16>]>>, Compact<u16>]>>;
    readonly votes14: Vec<ITuple<[Compact<u32>, Vec<ITuple<[Compact<u16>, Compact<PerU16>]>>, Compact<u16>]>>;
    readonly votes15: Vec<ITuple<[Compact<u32>, Vec<ITuple<[Compact<u16>, Compact<PerU16>]>>, Compact<u16>]>>;
    readonly votes16: Vec<ITuple<[Compact<u32>, Vec<ITuple<[Compact<u16>, Compact<PerU16>]>>, Compact<u16>]>>;
  }

  /** @name PalletElectionProviderMultiPhaseSolutionOrSnapshotSize (241) */
  interface PalletElectionProviderMultiPhaseSolutionOrSnapshotSize extends Struct {
    readonly voters: Compact<u32>;
    readonly targets: Compact<u32>;
  }

  /** @name SpNposElectionsSupport (245) */
  interface SpNposElectionsSupport extends Struct {
    readonly total: u128;
    readonly voters: Vec<ITuple<[AccountId32, u128]>>;
  }

  /** @name PalletStakingPalletCall (246) */
  interface PalletStakingPalletCall extends Enum {
    readonly isBond: boolean;
    readonly asBond: {
      readonly value: Compact<u128>;
      readonly payee: PalletStakingRewardDestination;
    } & Struct;
    readonly isBondExtra: boolean;
    readonly asBondExtra: {
      readonly maxAdditional: Compact<u128>;
    } & Struct;
    readonly isUnbond: boolean;
    readonly asUnbond: {
      readonly value: Compact<u128>;
    } & Struct;
    readonly isWithdrawUnbonded: boolean;
    readonly asWithdrawUnbonded: {
      readonly numSlashingSpans: u32;
    } & Struct;
    readonly isValidate: boolean;
    readonly asValidate: {
      readonly prefs: PalletStakingValidatorPrefs;
    } & Struct;
    readonly isNominate: boolean;
    readonly asNominate: {
      readonly targets: Vec<MultiAddress>;
    } & Struct;
    readonly isChill: boolean;
    readonly isSetPayee: boolean;
    readonly asSetPayee: {
      readonly payee: PalletStakingRewardDestination;
    } & Struct;
    readonly isSetController: boolean;
    readonly isSetValidatorCount: boolean;
    readonly asSetValidatorCount: {
      readonly new_: Compact<u32>;
    } & Struct;
    readonly isIncreaseValidatorCount: boolean;
    readonly asIncreaseValidatorCount: {
      readonly additional: Compact<u32>;
    } & Struct;
    readonly isScaleValidatorCount: boolean;
    readonly asScaleValidatorCount: {
      readonly factor: Percent;
    } & Struct;
    readonly isForceNoEras: boolean;
    readonly isForceNewEra: boolean;
    readonly isSetInvulnerables: boolean;
    readonly asSetInvulnerables: {
      readonly invulnerables: Vec<AccountId32>;
    } & Struct;
    readonly isForceUnstake: boolean;
    readonly asForceUnstake: {
      readonly stash: AccountId32;
      readonly numSlashingSpans: u32;
    } & Struct;
    readonly isForceNewEraAlways: boolean;
    readonly isCancelDeferredSlash: boolean;
    readonly asCancelDeferredSlash: {
      readonly era: u32;
      readonly slashIndices: Vec<u32>;
    } & Struct;
    readonly isPayoutStakers: boolean;
    readonly asPayoutStakers: {
      readonly validatorStash: AccountId32;
      readonly era: u32;
    } & Struct;
    readonly isRebond: boolean;
    readonly asRebond: {
      readonly value: Compact<u128>;
    } & Struct;
    readonly isReapStash: boolean;
    readonly asReapStash: {
      readonly stash: AccountId32;
      readonly numSlashingSpans: u32;
    } & Struct;
    readonly isKick: boolean;
    readonly asKick: {
      readonly who: Vec<MultiAddress>;
    } & Struct;
    readonly isSetStakingConfigs: boolean;
    readonly asSetStakingConfigs: {
      readonly minNominatorBond: PalletStakingPalletConfigOpU128;
      readonly minValidatorBond: PalletStakingPalletConfigOpU128;
      readonly maxNominatorCount: PalletStakingPalletConfigOpU32;
      readonly maxValidatorCount: PalletStakingPalletConfigOpU32;
      readonly chillThreshold: PalletStakingPalletConfigOpPercent;
      readonly minCommission: PalletStakingPalletConfigOpPerbill;
    } & Struct;
    readonly isChillOther: boolean;
    readonly asChillOther: {
      readonly controller: AccountId32;
    } & Struct;
    readonly isForceApplyMinCommission: boolean;
    readonly asForceApplyMinCommission: {
      readonly validatorStash: AccountId32;
    } & Struct;
    readonly isSetMinCommission: boolean;
    readonly asSetMinCommission: {
      readonly new_: Perbill;
    } & Struct;
    readonly type: 'Bond' | 'BondExtra' | 'Unbond' | 'WithdrawUnbonded' | 'Validate' | 'Nominate' | 'Chill' | 'SetPayee' | 'SetController' | 'SetValidatorCount' | 'IncreaseValidatorCount' | 'ScaleValidatorCount' | 'ForceNoEras' | 'ForceNewEra' | 'SetInvulnerables' | 'ForceUnstake' | 'ForceNewEraAlways' | 'CancelDeferredSlash' | 'PayoutStakers' | 'Rebond' | 'ReapStash' | 'Kick' | 'SetStakingConfigs' | 'ChillOther' | 'ForceApplyMinCommission' | 'SetMinCommission';
  }

  /** @name PalletStakingPalletConfigOpU128 (249) */
  interface PalletStakingPalletConfigOpU128 extends Enum {
    readonly isNoop: boolean;
    readonly isSet: boolean;
    readonly asSet: u128;
    readonly isRemove: boolean;
    readonly type: 'Noop' | 'Set' | 'Remove';
  }

  /** @name PalletStakingPalletConfigOpU32 (250) */
  interface PalletStakingPalletConfigOpU32 extends Enum {
    readonly isNoop: boolean;
    readonly isSet: boolean;
    readonly asSet: u32;
    readonly isRemove: boolean;
    readonly type: 'Noop' | 'Set' | 'Remove';
  }

  /** @name PalletStakingPalletConfigOpPercent (251) */
  interface PalletStakingPalletConfigOpPercent extends Enum {
    readonly isNoop: boolean;
    readonly isSet: boolean;
    readonly asSet: Percent;
    readonly isRemove: boolean;
    readonly type: 'Noop' | 'Set' | 'Remove';
  }

  /** @name PalletStakingPalletConfigOpPerbill (252) */
  interface PalletStakingPalletConfigOpPerbill extends Enum {
    readonly isNoop: boolean;
    readonly isSet: boolean;
    readonly asSet: Perbill;
    readonly isRemove: boolean;
    readonly type: 'Noop' | 'Set' | 'Remove';
  }

  /** @name PalletFastUnstakeCall (253) */
  interface PalletFastUnstakeCall extends Enum {
    readonly isRegisterFastUnstake: boolean;
    readonly isDeregister: boolean;
    readonly isControl: boolean;
    readonly asControl: {
      readonly erasToCheck: u32;
    } & Struct;
    readonly type: 'RegisterFastUnstake' | 'Deregister' | 'Control';
  }

  /** @name PalletBagsListCall (254) */
  interface PalletBagsListCall extends Enum {
    readonly isRebag: boolean;
    readonly asRebag: {
      readonly dislocated: MultiAddress;
    } & Struct;
    readonly isPutInFrontOf: boolean;
    readonly asPutInFrontOf: {
      readonly lighter: MultiAddress;
    } & Struct;
    readonly isPutInFrontOfOther: boolean;
    readonly asPutInFrontOfOther: {
      readonly heavier: MultiAddress;
      readonly lighter: MultiAddress;
    } & Struct;
    readonly type: 'Rebag' | 'PutInFrontOf' | 'PutInFrontOfOther';
  }

  /** @name PalletNominationPoolsCall (255) */
  interface PalletNominationPoolsCall extends Enum {
    readonly isJoin: boolean;
    readonly asJoin: {
      readonly amount: Compact<u128>;
      readonly poolId: u32;
    } & Struct;
    readonly isBondExtra: boolean;
    readonly asBondExtra: {
      readonly extra: PalletNominationPoolsBondExtra;
    } & Struct;
    readonly isClaimPayout: boolean;
    readonly isUnbond: boolean;
    readonly asUnbond: {
      readonly memberAccount: MultiAddress;
      readonly unbondingPoints: Compact<u128>;
    } & Struct;
    readonly isPoolWithdrawUnbonded: boolean;
    readonly asPoolWithdrawUnbonded: {
      readonly poolId: u32;
      readonly numSlashingSpans: u32;
    } & Struct;
    readonly isWithdrawUnbonded: boolean;
    readonly asWithdrawUnbonded: {
      readonly memberAccount: MultiAddress;
      readonly numSlashingSpans: u32;
    } & Struct;
    readonly isCreate: boolean;
    readonly asCreate: {
      readonly amount: Compact<u128>;
      readonly root: MultiAddress;
      readonly nominator: MultiAddress;
      readonly bouncer: MultiAddress;
    } & Struct;
    readonly isCreateWithPoolId: boolean;
    readonly asCreateWithPoolId: {
      readonly amount: Compact<u128>;
      readonly root: MultiAddress;
      readonly nominator: MultiAddress;
      readonly bouncer: MultiAddress;
      readonly poolId: u32;
    } & Struct;
    readonly isNominate: boolean;
    readonly asNominate: {
      readonly poolId: u32;
      readonly validators: Vec<AccountId32>;
    } & Struct;
    readonly isSetState: boolean;
    readonly asSetState: {
      readonly poolId: u32;
      readonly state: PalletNominationPoolsPoolState;
    } & Struct;
    readonly isSetMetadata: boolean;
    readonly asSetMetadata: {
      readonly poolId: u32;
      readonly metadata: Bytes;
    } & Struct;
    readonly isSetConfigs: boolean;
    readonly asSetConfigs: {
      readonly minJoinBond: PalletNominationPoolsConfigOpU128;
      readonly minCreateBond: PalletNominationPoolsConfigOpU128;
      readonly maxPools: PalletNominationPoolsConfigOpU32;
      readonly maxMembers: PalletNominationPoolsConfigOpU32;
      readonly maxMembersPerPool: PalletNominationPoolsConfigOpU32;
      readonly globalMaxCommission: PalletNominationPoolsConfigOpPerbill;
    } & Struct;
    readonly isUpdateRoles: boolean;
    readonly asUpdateRoles: {
      readonly poolId: u32;
      readonly newRoot: PalletNominationPoolsConfigOpAccountId32;
      readonly newNominator: PalletNominationPoolsConfigOpAccountId32;
      readonly newBouncer: PalletNominationPoolsConfigOpAccountId32;
    } & Struct;
    readonly isChill: boolean;
    readonly asChill: {
      readonly poolId: u32;
    } & Struct;
    readonly isBondExtraOther: boolean;
    readonly asBondExtraOther: {
      readonly member: MultiAddress;
      readonly extra: PalletNominationPoolsBondExtra;
    } & Struct;
    readonly isSetClaimPermission: boolean;
    readonly asSetClaimPermission: {
      readonly permission: PalletNominationPoolsClaimPermission;
    } & Struct;
    readonly isClaimPayoutOther: boolean;
    readonly asClaimPayoutOther: {
      readonly other: AccountId32;
    } & Struct;
    readonly isSetCommission: boolean;
    readonly asSetCommission: {
      readonly poolId: u32;
      readonly newCommission: Option<ITuple<[Perbill, AccountId32]>>;
    } & Struct;
    readonly isSetCommissionMax: boolean;
    readonly asSetCommissionMax: {
      readonly poolId: u32;
      readonly maxCommission: Perbill;
    } & Struct;
    readonly isSetCommissionChangeRate: boolean;
    readonly asSetCommissionChangeRate: {
      readonly poolId: u32;
      readonly changeRate: PalletNominationPoolsCommissionChangeRate;
    } & Struct;
    readonly isClaimCommission: boolean;
    readonly asClaimCommission: {
      readonly poolId: u32;
    } & Struct;
    readonly type: 'Join' | 'BondExtra' | 'ClaimPayout' | 'Unbond' | 'PoolWithdrawUnbonded' | 'WithdrawUnbonded' | 'Create' | 'CreateWithPoolId' | 'Nominate' | 'SetState' | 'SetMetadata' | 'SetConfigs' | 'UpdateRoles' | 'Chill' | 'BondExtraOther' | 'SetClaimPermission' | 'ClaimPayoutOther' | 'SetCommission' | 'SetCommissionMax' | 'SetCommissionChangeRate' | 'ClaimCommission';
  }

  /** @name PalletNominationPoolsBondExtra (256) */
  interface PalletNominationPoolsBondExtra extends Enum {
    readonly isFreeBalance: boolean;
    readonly asFreeBalance: u128;
    readonly isRewards: boolean;
    readonly type: 'FreeBalance' | 'Rewards';
  }

  /** @name PalletNominationPoolsConfigOpU128 (257) */
  interface PalletNominationPoolsConfigOpU128 extends Enum {
    readonly isNoop: boolean;
    readonly isSet: boolean;
    readonly asSet: u128;
    readonly isRemove: boolean;
    readonly type: 'Noop' | 'Set' | 'Remove';
  }

  /** @name PalletNominationPoolsConfigOpU32 (258) */
  interface PalletNominationPoolsConfigOpU32 extends Enum {
    readonly isNoop: boolean;
    readonly isSet: boolean;
    readonly asSet: u32;
    readonly isRemove: boolean;
    readonly type: 'Noop' | 'Set' | 'Remove';
  }

  /** @name PalletNominationPoolsConfigOpPerbill (259) */
  interface PalletNominationPoolsConfigOpPerbill extends Enum {
    readonly isNoop: boolean;
    readonly isSet: boolean;
    readonly asSet: Perbill;
    readonly isRemove: boolean;
    readonly type: 'Noop' | 'Set' | 'Remove';
  }

  /** @name PalletNominationPoolsConfigOpAccountId32 (260) */
  interface PalletNominationPoolsConfigOpAccountId32 extends Enum {
    readonly isNoop: boolean;
    readonly isSet: boolean;
    readonly asSet: AccountId32;
    readonly isRemove: boolean;
    readonly type: 'Noop' | 'Set' | 'Remove';
  }

  /** @name PalletNominationPoolsClaimPermission (261) */
  interface PalletNominationPoolsClaimPermission extends Enum {
    readonly isPermissioned: boolean;
    readonly isPermissionlessCompound: boolean;
    readonly isPermissionlessWithdraw: boolean;
    readonly isPermissionlessAll: boolean;
    readonly type: 'Permissioned' | 'PermissionlessCompound' | 'PermissionlessWithdraw' | 'PermissionlessAll';
  }

  /** @name PalletSessionCall (262) */
  interface PalletSessionCall extends Enum {
    readonly isSetKeys: boolean;
    readonly asSetKeys: {
      readonly keys_: PhalaNodeRuntimeSessionKeys;
      readonly proof: Bytes;
    } & Struct;
    readonly isPurgeKeys: boolean;
    readonly type: 'SetKeys' | 'PurgeKeys';
  }

  /** @name PhalaNodeRuntimeSessionKeys (263) */
  interface PhalaNodeRuntimeSessionKeys extends Struct {
    readonly grandpa: SpConsensusGrandpaAppPublic;
    readonly babe: SpConsensusBabeAppPublic;
    readonly imOnline: PalletImOnlineSr25519AppSr25519Public;
    readonly authorityDiscovery: SpAuthorityDiscoveryAppPublic;
  }

  /** @name SpAuthorityDiscoveryAppPublic (264) */
  interface SpAuthorityDiscoveryAppPublic extends SpCoreSr25519Public {}

  /** @name PalletDemocracyCall (265) */
  interface PalletDemocracyCall extends Enum {
    readonly isPropose: boolean;
    readonly asPropose: {
      readonly proposal: FrameSupportPreimagesBounded;
      readonly value: Compact<u128>;
    } & Struct;
    readonly isSecond: boolean;
    readonly asSecond: {
      readonly proposal: Compact<u32>;
    } & Struct;
    readonly isVote: boolean;
    readonly asVote: {
      readonly refIndex: Compact<u32>;
      readonly vote: PalletDemocracyVoteAccountVote;
    } & Struct;
    readonly isEmergencyCancel: boolean;
    readonly asEmergencyCancel: {
      readonly refIndex: u32;
    } & Struct;
    readonly isExternalPropose: boolean;
    readonly asExternalPropose: {
      readonly proposal: FrameSupportPreimagesBounded;
    } & Struct;
    readonly isExternalProposeMajority: boolean;
    readonly asExternalProposeMajority: {
      readonly proposal: FrameSupportPreimagesBounded;
    } & Struct;
    readonly isExternalProposeDefault: boolean;
    readonly asExternalProposeDefault: {
      readonly proposal: FrameSupportPreimagesBounded;
    } & Struct;
    readonly isFastTrack: boolean;
    readonly asFastTrack: {
      readonly proposalHash: H256;
      readonly votingPeriod: u32;
      readonly delay: u32;
    } & Struct;
    readonly isVetoExternal: boolean;
    readonly asVetoExternal: {
      readonly proposalHash: H256;
    } & Struct;
    readonly isCancelReferendum: boolean;
    readonly asCancelReferendum: {
      readonly refIndex: Compact<u32>;
    } & Struct;
    readonly isDelegate: boolean;
    readonly asDelegate: {
      readonly to: MultiAddress;
      readonly conviction: PalletDemocracyConviction;
      readonly balance: u128;
    } & Struct;
    readonly isUndelegate: boolean;
    readonly isClearPublicProposals: boolean;
    readonly isUnlock: boolean;
    readonly asUnlock: {
      readonly target: MultiAddress;
    } & Struct;
    readonly isRemoveVote: boolean;
    readonly asRemoveVote: {
      readonly index: u32;
    } & Struct;
    readonly isRemoveOtherVote: boolean;
    readonly asRemoveOtherVote: {
      readonly target: MultiAddress;
      readonly index: u32;
    } & Struct;
    readonly isBlacklist: boolean;
    readonly asBlacklist: {
      readonly proposalHash: H256;
      readonly maybeRefIndex: Option<u32>;
    } & Struct;
    readonly isCancelProposal: boolean;
    readonly asCancelProposal: {
      readonly propIndex: Compact<u32>;
    } & Struct;
    readonly isSetMetadata: boolean;
    readonly asSetMetadata: {
      readonly owner: PalletDemocracyMetadataOwner;
      readonly maybeHash: Option<H256>;
    } & Struct;
    readonly type: 'Propose' | 'Second' | 'Vote' | 'EmergencyCancel' | 'ExternalPropose' | 'ExternalProposeMajority' | 'ExternalProposeDefault' | 'FastTrack' | 'VetoExternal' | 'CancelReferendum' | 'Delegate' | 'Undelegate' | 'ClearPublicProposals' | 'Unlock' | 'RemoveVote' | 'RemoveOtherVote' | 'Blacklist' | 'CancelProposal' | 'SetMetadata';
  }

  /** @name FrameSupportPreimagesBounded (266) */
  interface FrameSupportPreimagesBounded extends Enum {
    readonly isLegacy: boolean;
    readonly asLegacy: {
      readonly hash_: H256;
    } & Struct;
    readonly isInline: boolean;
    readonly asInline: Bytes;
    readonly isLookup: boolean;
    readonly asLookup: {
      readonly hash_: H256;
      readonly len: u32;
    } & Struct;
    readonly type: 'Legacy' | 'Inline' | 'Lookup';
  }

  /** @name SpRuntimeBlakeTwo256 (267) */
  type SpRuntimeBlakeTwo256 = Null;

  /** @name PalletDemocracyConviction (269) */
  interface PalletDemocracyConviction extends Enum {
    readonly isNone: boolean;
    readonly isLocked1x: boolean;
    readonly isLocked2x: boolean;
    readonly isLocked3x: boolean;
    readonly isLocked4x: boolean;
    readonly isLocked5x: boolean;
    readonly isLocked6x: boolean;
    readonly type: 'None' | 'Locked1x' | 'Locked2x' | 'Locked3x' | 'Locked4x' | 'Locked5x' | 'Locked6x';
  }

  /** @name PalletCollectiveCall (270) */
  interface PalletCollectiveCall extends Enum {
    readonly isSetMembers: boolean;
    readonly asSetMembers: {
      readonly newMembers: Vec<AccountId32>;
      readonly prime: Option<AccountId32>;
      readonly oldCount: u32;
    } & Struct;
    readonly isExecute: boolean;
    readonly asExecute: {
      readonly proposal: Call;
      readonly lengthBound: Compact<u32>;
    } & Struct;
    readonly isPropose: boolean;
    readonly asPropose: {
      readonly threshold: Compact<u32>;
      readonly proposal: Call;
      readonly lengthBound: Compact<u32>;
    } & Struct;
    readonly isVote: boolean;
    readonly asVote: {
      readonly proposal: H256;
      readonly index: Compact<u32>;
      readonly approve: bool;
    } & Struct;
    readonly isDisapproveProposal: boolean;
    readonly asDisapproveProposal: {
      readonly proposalHash: H256;
    } & Struct;
    readonly isClose: boolean;
    readonly asClose: {
      readonly proposalHash: H256;
      readonly index: Compact<u32>;
      readonly proposalWeightBound: SpWeightsWeightV2Weight;
      readonly lengthBound: Compact<u32>;
    } & Struct;
    readonly type: 'SetMembers' | 'Execute' | 'Propose' | 'Vote' | 'DisapproveProposal' | 'Close';
  }

  /** @name PalletElectionsPhragmenCall (272) */
  interface PalletElectionsPhragmenCall extends Enum {
    readonly isVote: boolean;
    readonly asVote: {
      readonly votes: Vec<AccountId32>;
      readonly value: Compact<u128>;
    } & Struct;
    readonly isRemoveVoter: boolean;
    readonly isSubmitCandidacy: boolean;
    readonly asSubmitCandidacy: {
      readonly candidateCount: Compact<u32>;
    } & Struct;
    readonly isRenounceCandidacy: boolean;
    readonly asRenounceCandidacy: {
      readonly renouncing: PalletElectionsPhragmenRenouncing;
    } & Struct;
    readonly isRemoveMember: boolean;
    readonly asRemoveMember: {
      readonly who: MultiAddress;
      readonly slashBond: bool;
      readonly rerunElection: bool;
    } & Struct;
    readonly isCleanDefunctVoters: boolean;
    readonly asCleanDefunctVoters: {
      readonly numVoters: u32;
      readonly numDefunct: u32;
    } & Struct;
    readonly type: 'Vote' | 'RemoveVoter' | 'SubmitCandidacy' | 'RenounceCandidacy' | 'RemoveMember' | 'CleanDefunctVoters';
  }

  /** @name PalletElectionsPhragmenRenouncing (273) */
  interface PalletElectionsPhragmenRenouncing extends Enum {
    readonly isMember: boolean;
    readonly isRunnerUp: boolean;
    readonly isCandidate: boolean;
    readonly asCandidate: Compact<u32>;
    readonly type: 'Member' | 'RunnerUp' | 'Candidate';
  }

  /** @name PalletMembershipCall (274) */
  interface PalletMembershipCall extends Enum {
    readonly isAddMember: boolean;
    readonly asAddMember: {
      readonly who: MultiAddress;
    } & Struct;
    readonly isRemoveMember: boolean;
    readonly asRemoveMember: {
      readonly who: MultiAddress;
    } & Struct;
    readonly isSwapMember: boolean;
    readonly asSwapMember: {
      readonly remove: MultiAddress;
      readonly add: MultiAddress;
    } & Struct;
    readonly isResetMembers: boolean;
    readonly asResetMembers: {
      readonly members: Vec<AccountId32>;
    } & Struct;
    readonly isChangeKey: boolean;
    readonly asChangeKey: {
      readonly new_: MultiAddress;
    } & Struct;
    readonly isSetPrime: boolean;
    readonly asSetPrime: {
      readonly who: MultiAddress;
    } & Struct;
    readonly isClearPrime: boolean;
    readonly type: 'AddMember' | 'RemoveMember' | 'SwapMember' | 'ResetMembers' | 'ChangeKey' | 'SetPrime' | 'ClearPrime';
  }

  /** @name PalletGrandpaCall (275) */
  interface PalletGrandpaCall extends Enum {
    readonly isReportEquivocation: boolean;
    readonly asReportEquivocation: {
      readonly equivocationProof: SpConsensusGrandpaEquivocationProof;
      readonly keyOwnerProof: SpSessionMembershipProof;
    } & Struct;
    readonly isReportEquivocationUnsigned: boolean;
    readonly asReportEquivocationUnsigned: {
      readonly equivocationProof: SpConsensusGrandpaEquivocationProof;
      readonly keyOwnerProof: SpSessionMembershipProof;
    } & Struct;
    readonly isNoteStalled: boolean;
    readonly asNoteStalled: {
      readonly delay: u32;
      readonly bestFinalizedBlockNumber: u32;
    } & Struct;
    readonly type: 'ReportEquivocation' | 'ReportEquivocationUnsigned' | 'NoteStalled';
  }

  /** @name SpConsensusGrandpaEquivocationProof (276) */
  interface SpConsensusGrandpaEquivocationProof extends Struct {
    readonly setId: u64;
    readonly equivocation: SpConsensusGrandpaEquivocation;
  }

  /** @name SpConsensusGrandpaEquivocation (277) */
  interface SpConsensusGrandpaEquivocation extends Enum {
    readonly isPrevote: boolean;
    readonly asPrevote: FinalityGrandpaEquivocationPrevote;
    readonly isPrecommit: boolean;
    readonly asPrecommit: FinalityGrandpaEquivocationPrecommit;
    readonly type: 'Prevote' | 'Precommit';
  }

  /** @name FinalityGrandpaEquivocationPrevote (278) */
  interface FinalityGrandpaEquivocationPrevote extends Struct {
    readonly roundNumber: u64;
    readonly identity: SpConsensusGrandpaAppPublic;
    readonly first: ITuple<[FinalityGrandpaPrevote, SpConsensusGrandpaAppSignature]>;
    readonly second: ITuple<[FinalityGrandpaPrevote, SpConsensusGrandpaAppSignature]>;
  }

  /** @name FinalityGrandpaPrevote (279) */
  interface FinalityGrandpaPrevote extends Struct {
    readonly targetHash: H256;
    readonly targetNumber: u32;
  }

  /** @name SpConsensusGrandpaAppSignature (280) */
  interface SpConsensusGrandpaAppSignature extends SpCoreEd25519Signature {}

  /** @name SpCoreEd25519Signature (281) */
  interface SpCoreEd25519Signature extends U8aFixed {}

  /** @name FinalityGrandpaEquivocationPrecommit (284) */
  interface FinalityGrandpaEquivocationPrecommit extends Struct {
    readonly roundNumber: u64;
    readonly identity: SpConsensusGrandpaAppPublic;
    readonly first: ITuple<[FinalityGrandpaPrecommit, SpConsensusGrandpaAppSignature]>;
    readonly second: ITuple<[FinalityGrandpaPrecommit, SpConsensusGrandpaAppSignature]>;
  }

  /** @name FinalityGrandpaPrecommit (285) */
  interface FinalityGrandpaPrecommit extends Struct {
    readonly targetHash: H256;
    readonly targetNumber: u32;
  }

  /** @name PalletTreasuryCall (287) */
  interface PalletTreasuryCall extends Enum {
    readonly isProposeSpend: boolean;
    readonly asProposeSpend: {
      readonly value: Compact<u128>;
      readonly beneficiary: MultiAddress;
    } & Struct;
    readonly isRejectProposal: boolean;
    readonly asRejectProposal: {
      readonly proposalId: Compact<u32>;
    } & Struct;
    readonly isApproveProposal: boolean;
    readonly asApproveProposal: {
      readonly proposalId: Compact<u32>;
    } & Struct;
    readonly isSpend: boolean;
    readonly asSpend: {
      readonly amount: Compact<u128>;
      readonly beneficiary: MultiAddress;
    } & Struct;
    readonly isRemoveApproval: boolean;
    readonly asRemoveApproval: {
      readonly proposalId: Compact<u32>;
    } & Struct;
    readonly type: 'ProposeSpend' | 'RejectProposal' | 'ApproveProposal' | 'Spend' | 'RemoveApproval';
  }

  /** @name PalletSudoCall (288) */
  interface PalletSudoCall extends Enum {
    readonly isSudo: boolean;
    readonly asSudo: {
      readonly call: Call;
    } & Struct;
    readonly isSudoUncheckedWeight: boolean;
    readonly asSudoUncheckedWeight: {
      readonly call: Call;
      readonly weight: SpWeightsWeightV2Weight;
    } & Struct;
    readonly isSetKey: boolean;
    readonly asSetKey: {
      readonly new_: MultiAddress;
    } & Struct;
    readonly isSudoAs: boolean;
    readonly asSudoAs: {
      readonly who: MultiAddress;
      readonly call: Call;
    } & Struct;
    readonly type: 'Sudo' | 'SudoUncheckedWeight' | 'SetKey' | 'SudoAs';
  }

  /** @name PalletImOnlineCall (289) */
  interface PalletImOnlineCall extends Enum {
    readonly isHeartbeat: boolean;
    readonly asHeartbeat: {
      readonly heartbeat: PalletImOnlineHeartbeat;
      readonly signature: PalletImOnlineSr25519AppSr25519Signature;
    } & Struct;
    readonly type: 'Heartbeat';
  }

  /** @name PalletImOnlineHeartbeat (290) */
  interface PalletImOnlineHeartbeat extends Struct {
    readonly blockNumber: u32;
    readonly sessionIndex: u32;
    readonly authorityIndex: u32;
    readonly validatorsLen: u32;
  }

  /** @name PalletImOnlineSr25519AppSr25519Signature (291) */
  interface PalletImOnlineSr25519AppSr25519Signature extends SpCoreSr25519Signature {}

  /** @name SpCoreSr25519Signature (292) */
  interface SpCoreSr25519Signature extends U8aFixed {}

  /** @name PalletIdentityCall (293) */
  interface PalletIdentityCall extends Enum {
    readonly isAddRegistrar: boolean;
    readonly asAddRegistrar: {
      readonly account: MultiAddress;
    } & Struct;
    readonly isSetIdentity: boolean;
    readonly asSetIdentity: {
      readonly info: PalletIdentityIdentityInfo;
    } & Struct;
    readonly isSetSubs: boolean;
    readonly asSetSubs: {
      readonly subs: Vec<ITuple<[AccountId32, Data]>>;
    } & Struct;
    readonly isClearIdentity: boolean;
    readonly isRequestJudgement: boolean;
    readonly asRequestJudgement: {
      readonly regIndex: Compact<u32>;
      readonly maxFee: Compact<u128>;
    } & Struct;
    readonly isCancelRequest: boolean;
    readonly asCancelRequest: {
      readonly regIndex: u32;
    } & Struct;
    readonly isSetFee: boolean;
    readonly asSetFee: {
      readonly index: Compact<u32>;
      readonly fee: Compact<u128>;
    } & Struct;
    readonly isSetAccountId: boolean;
    readonly asSetAccountId: {
      readonly index: Compact<u32>;
      readonly new_: MultiAddress;
    } & Struct;
    readonly isSetFields: boolean;
    readonly asSetFields: {
      readonly index: Compact<u32>;
      readonly fields: PalletIdentityBitFlags;
    } & Struct;
    readonly isProvideJudgement: boolean;
    readonly asProvideJudgement: {
      readonly regIndex: Compact<u32>;
      readonly target: MultiAddress;
      readonly judgement: PalletIdentityJudgement;
      readonly identity: H256;
    } & Struct;
    readonly isKillIdentity: boolean;
    readonly asKillIdentity: {
      readonly target: MultiAddress;
    } & Struct;
    readonly isAddSub: boolean;
    readonly asAddSub: {
      readonly sub: MultiAddress;
      readonly data: Data;
    } & Struct;
    readonly isRenameSub: boolean;
    readonly asRenameSub: {
      readonly sub: MultiAddress;
      readonly data: Data;
    } & Struct;
    readonly isRemoveSub: boolean;
    readonly asRemoveSub: {
      readonly sub: MultiAddress;
    } & Struct;
    readonly isQuitSub: boolean;
    readonly type: 'AddRegistrar' | 'SetIdentity' | 'SetSubs' | 'ClearIdentity' | 'RequestJudgement' | 'CancelRequest' | 'SetFee' | 'SetAccountId' | 'SetFields' | 'ProvideJudgement' | 'KillIdentity' | 'AddSub' | 'RenameSub' | 'RemoveSub' | 'QuitSub';
  }

  /** @name PalletIdentityIdentityInfo (294) */
  interface PalletIdentityIdentityInfo extends Struct {
    readonly additional: Vec<ITuple<[Data, Data]>>;
    readonly display: Data;
    readonly legal: Data;
    readonly web: Data;
    readonly riot: Data;
    readonly email: Data;
    readonly pgpFingerprint: Option<U8aFixed>;
    readonly image: Data;
    readonly twitter: Data;
  }

  /** @name PalletIdentityBitFlags (330) */
  interface PalletIdentityBitFlags extends Set {
    readonly isDisplay: boolean;
    readonly isLegal: boolean;
    readonly isWeb: boolean;
    readonly isRiot: boolean;
    readonly isEmail: boolean;
    readonly isPgpFingerprint: boolean;
    readonly isImage: boolean;
    readonly isTwitter: boolean;
  }

  /** @name PalletIdentityIdentityField (331) */
  interface PalletIdentityIdentityField extends Enum {
    readonly isDisplay: boolean;
    readonly isLegal: boolean;
    readonly isWeb: boolean;
    readonly isRiot: boolean;
    readonly isEmail: boolean;
    readonly isPgpFingerprint: boolean;
    readonly isImage: boolean;
    readonly isTwitter: boolean;
    readonly type: 'Display' | 'Legal' | 'Web' | 'Riot' | 'Email' | 'PgpFingerprint' | 'Image' | 'Twitter';
  }

  /** @name PalletIdentityJudgement (332) */
  interface PalletIdentityJudgement extends Enum {
    readonly isUnknown: boolean;
    readonly isFeePaid: boolean;
    readonly asFeePaid: u128;
    readonly isReasonable: boolean;
    readonly isKnownGood: boolean;
    readonly isOutOfDate: boolean;
    readonly isLowQuality: boolean;
    readonly isErroneous: boolean;
    readonly type: 'Unknown' | 'FeePaid' | 'Reasonable' | 'KnownGood' | 'OutOfDate' | 'LowQuality' | 'Erroneous';
  }

  /** @name PalletSocietyCall (333) */
  interface PalletSocietyCall extends Enum {
    readonly isBid: boolean;
    readonly asBid: {
      readonly value: u128;
    } & Struct;
    readonly isUnbid: boolean;
    readonly isVouch: boolean;
    readonly asVouch: {
      readonly who: MultiAddress;
      readonly value: u128;
      readonly tip: u128;
    } & Struct;
    readonly isUnvouch: boolean;
    readonly isVote: boolean;
    readonly asVote: {
      readonly candidate: MultiAddress;
      readonly approve: bool;
    } & Struct;
    readonly isDefenderVote: boolean;
    readonly asDefenderVote: {
      readonly approve: bool;
    } & Struct;
    readonly isPayout: boolean;
    readonly isWaiveRepay: boolean;
    readonly asWaiveRepay: {
      readonly amount: u128;
    } & Struct;
    readonly isFoundSociety: boolean;
    readonly asFoundSociety: {
      readonly founder: MultiAddress;
      readonly maxMembers: u32;
      readonly maxIntake: u32;
      readonly maxStrikes: u32;
      readonly candidateDeposit: u128;
      readonly rules: Bytes;
    } & Struct;
    readonly isDissolve: boolean;
    readonly isJudgeSuspendedMember: boolean;
    readonly asJudgeSuspendedMember: {
      readonly who: MultiAddress;
      readonly forgive: bool;
    } & Struct;
    readonly isSetParameters: boolean;
    readonly asSetParameters: {
      readonly maxMembers: u32;
      readonly maxIntake: u32;
      readonly maxStrikes: u32;
      readonly candidateDeposit: u128;
    } & Struct;
    readonly isPunishSkeptic: boolean;
    readonly isClaimMembership: boolean;
    readonly isBestowMembership: boolean;
    readonly asBestowMembership: {
      readonly candidate: AccountId32;
    } & Struct;
    readonly isKickCandidate: boolean;
    readonly asKickCandidate: {
      readonly candidate: AccountId32;
    } & Struct;
    readonly isResignCandidacy: boolean;
    readonly isDropCandidate: boolean;
    readonly asDropCandidate: {
      readonly candidate: AccountId32;
    } & Struct;
    readonly isCleanupCandidacy: boolean;
    readonly asCleanupCandidacy: {
      readonly candidate: AccountId32;
      readonly max: u32;
    } & Struct;
    readonly isCleanupChallenge: boolean;
    readonly asCleanupChallenge: {
      readonly challengeRound: u32;
      readonly max: u32;
    } & Struct;
    readonly type: 'Bid' | 'Unbid' | 'Vouch' | 'Unvouch' | 'Vote' | 'DefenderVote' | 'Payout' | 'WaiveRepay' | 'FoundSociety' | 'Dissolve' | 'JudgeSuspendedMember' | 'SetParameters' | 'PunishSkeptic' | 'ClaimMembership' | 'BestowMembership' | 'KickCandidate' | 'ResignCandidacy' | 'DropCandidate' | 'CleanupCandidacy' | 'CleanupChallenge';
  }

  /** @name PalletRecoveryCall (334) */
  interface PalletRecoveryCall extends Enum {
    readonly isAsRecovered: boolean;
    readonly asAsRecovered: {
      readonly account: MultiAddress;
      readonly call: Call;
    } & Struct;
    readonly isSetRecovered: boolean;
    readonly asSetRecovered: {
      readonly lost: MultiAddress;
      readonly rescuer: MultiAddress;
    } & Struct;
    readonly isCreateRecovery: boolean;
    readonly asCreateRecovery: {
      readonly friends: Vec<AccountId32>;
      readonly threshold: u16;
      readonly delayPeriod: u32;
    } & Struct;
    readonly isInitiateRecovery: boolean;
    readonly asInitiateRecovery: {
      readonly account: MultiAddress;
    } & Struct;
    readonly isVouchRecovery: boolean;
    readonly asVouchRecovery: {
      readonly lost: MultiAddress;
      readonly rescuer: MultiAddress;
    } & Struct;
    readonly isClaimRecovery: boolean;
    readonly asClaimRecovery: {
      readonly account: MultiAddress;
    } & Struct;
    readonly isCloseRecovery: boolean;
    readonly asCloseRecovery: {
      readonly rescuer: MultiAddress;
    } & Struct;
    readonly isRemoveRecovery: boolean;
    readonly isCancelRecovered: boolean;
    readonly asCancelRecovered: {
      readonly account: MultiAddress;
    } & Struct;
    readonly type: 'AsRecovered' | 'SetRecovered' | 'CreateRecovery' | 'InitiateRecovery' | 'VouchRecovery' | 'ClaimRecovery' | 'CloseRecovery' | 'RemoveRecovery' | 'CancelRecovered';
  }

  /** @name PalletVestingCall (335) */
  interface PalletVestingCall extends Enum {
    readonly isVest: boolean;
    readonly isVestOther: boolean;
    readonly asVestOther: {
      readonly target: MultiAddress;
    } & Struct;
    readonly isVestedTransfer: boolean;
    readonly asVestedTransfer: {
      readonly target: MultiAddress;
      readonly schedule: PalletVestingVestingInfo;
    } & Struct;
    readonly isForceVestedTransfer: boolean;
    readonly asForceVestedTransfer: {
      readonly source: MultiAddress;
      readonly target: MultiAddress;
      readonly schedule: PalletVestingVestingInfo;
    } & Struct;
    readonly isMergeSchedules: boolean;
    readonly asMergeSchedules: {
      readonly schedule1Index: u32;
      readonly schedule2Index: u32;
    } & Struct;
    readonly type: 'Vest' | 'VestOther' | 'VestedTransfer' | 'ForceVestedTransfer' | 'MergeSchedules';
  }

  /** @name PalletVestingVestingInfo (336) */
  interface PalletVestingVestingInfo extends Struct {
    readonly locked: u128;
    readonly perBlock: u128;
    readonly startingBlock: u32;
  }

  /** @name PalletSchedulerCall (337) */
  interface PalletSchedulerCall extends Enum {
    readonly isSchedule: boolean;
    readonly asSchedule: {
      readonly when: u32;
      readonly maybePeriodic: Option<ITuple<[u32, u32]>>;
      readonly priority: u8;
      readonly call: Call;
    } & Struct;
    readonly isCancel: boolean;
    readonly asCancel: {
      readonly when: u32;
      readonly index: u32;
    } & Struct;
    readonly isScheduleNamed: boolean;
    readonly asScheduleNamed: {
      readonly id: U8aFixed;
      readonly when: u32;
      readonly maybePeriodic: Option<ITuple<[u32, u32]>>;
      readonly priority: u8;
      readonly call: Call;
    } & Struct;
    readonly isCancelNamed: boolean;
    readonly asCancelNamed: {
      readonly id: U8aFixed;
    } & Struct;
    readonly isScheduleAfter: boolean;
    readonly asScheduleAfter: {
      readonly after: u32;
      readonly maybePeriodic: Option<ITuple<[u32, u32]>>;
      readonly priority: u8;
      readonly call: Call;
    } & Struct;
    readonly isScheduleNamedAfter: boolean;
    readonly asScheduleNamedAfter: {
      readonly id: U8aFixed;
      readonly after: u32;
      readonly maybePeriodic: Option<ITuple<[u32, u32]>>;
      readonly priority: u8;
      readonly call: Call;
    } & Struct;
    readonly type: 'Schedule' | 'Cancel' | 'ScheduleNamed' | 'CancelNamed' | 'ScheduleAfter' | 'ScheduleNamedAfter';
  }

  /** @name PalletPreimageCall (339) */
  interface PalletPreimageCall extends Enum {
    readonly isNotePreimage: boolean;
    readonly asNotePreimage: {
      readonly bytes: Bytes;
    } & Struct;
    readonly isUnnotePreimage: boolean;
    readonly asUnnotePreimage: {
      readonly hash_: H256;
    } & Struct;
    readonly isRequestPreimage: boolean;
    readonly asRequestPreimage: {
      readonly hash_: H256;
    } & Struct;
    readonly isUnrequestPreimage: boolean;
    readonly asUnrequestPreimage: {
      readonly hash_: H256;
    } & Struct;
    readonly isEnsureUpdated: boolean;
    readonly asEnsureUpdated: {
      readonly hashes: Vec<H256>;
    } & Struct;
    readonly type: 'NotePreimage' | 'UnnotePreimage' | 'RequestPreimage' | 'UnrequestPreimage' | 'EnsureUpdated';
  }

  /** @name PalletProxyCall (340) */
  interface PalletProxyCall extends Enum {
    readonly isProxy: boolean;
    readonly asProxy: {
      readonly real: MultiAddress;
      readonly forceProxyType: Option<PhalaNodeRuntimeProxyType>;
      readonly call: Call;
    } & Struct;
    readonly isAddProxy: boolean;
    readonly asAddProxy: {
      readonly delegate: MultiAddress;
      readonly proxyType: PhalaNodeRuntimeProxyType;
      readonly delay: u32;
    } & Struct;
    readonly isRemoveProxy: boolean;
    readonly asRemoveProxy: {
      readonly delegate: MultiAddress;
      readonly proxyType: PhalaNodeRuntimeProxyType;
      readonly delay: u32;
    } & Struct;
    readonly isRemoveProxies: boolean;
    readonly isCreatePure: boolean;
    readonly asCreatePure: {
      readonly proxyType: PhalaNodeRuntimeProxyType;
      readonly delay: u32;
      readonly index: u16;
    } & Struct;
    readonly isKillPure: boolean;
    readonly asKillPure: {
      readonly spawner: MultiAddress;
      readonly proxyType: PhalaNodeRuntimeProxyType;
      readonly index: u16;
      readonly height: Compact<u32>;
      readonly extIndex: Compact<u32>;
    } & Struct;
    readonly isAnnounce: boolean;
    readonly asAnnounce: {
      readonly real: MultiAddress;
      readonly callHash: H256;
    } & Struct;
    readonly isRemoveAnnouncement: boolean;
    readonly asRemoveAnnouncement: {
      readonly real: MultiAddress;
      readonly callHash: H256;
    } & Struct;
    readonly isRejectAnnouncement: boolean;
    readonly asRejectAnnouncement: {
      readonly delegate: MultiAddress;
      readonly callHash: H256;
    } & Struct;
    readonly isProxyAnnounced: boolean;
    readonly asProxyAnnounced: {
      readonly delegate: MultiAddress;
      readonly real: MultiAddress;
      readonly forceProxyType: Option<PhalaNodeRuntimeProxyType>;
      readonly call: Call;
    } & Struct;
    readonly type: 'Proxy' | 'AddProxy' | 'RemoveProxy' | 'RemoveProxies' | 'CreatePure' | 'KillPure' | 'Announce' | 'RemoveAnnouncement' | 'RejectAnnouncement' | 'ProxyAnnounced';
  }

  /** @name PalletMultisigCall (342) */
  interface PalletMultisigCall extends Enum {
    readonly isAsMultiThreshold1: boolean;
    readonly asAsMultiThreshold1: {
      readonly otherSignatories: Vec<AccountId32>;
      readonly call: Call;
    } & Struct;
    readonly isAsMulti: boolean;
    readonly asAsMulti: {
      readonly threshold: u16;
      readonly otherSignatories: Vec<AccountId32>;
      readonly maybeTimepoint: Option<PalletMultisigTimepoint>;
      readonly call: Call;
      readonly maxWeight: SpWeightsWeightV2Weight;
    } & Struct;
    readonly isApproveAsMulti: boolean;
    readonly asApproveAsMulti: {
      readonly threshold: u16;
      readonly otherSignatories: Vec<AccountId32>;
      readonly maybeTimepoint: Option<PalletMultisigTimepoint>;
      readonly callHash: U8aFixed;
      readonly maxWeight: SpWeightsWeightV2Weight;
    } & Struct;
    readonly isCancelAsMulti: boolean;
    readonly asCancelAsMulti: {
      readonly threshold: u16;
      readonly otherSignatories: Vec<AccountId32>;
      readonly timepoint: PalletMultisigTimepoint;
      readonly callHash: U8aFixed;
    } & Struct;
    readonly type: 'AsMultiThreshold1' | 'AsMulti' | 'ApproveAsMulti' | 'CancelAsMulti';
  }

  /** @name PalletBountiesCall (344) */
  interface PalletBountiesCall extends Enum {
    readonly isProposeBounty: boolean;
    readonly asProposeBounty: {
      readonly value: Compact<u128>;
      readonly description: Bytes;
    } & Struct;
    readonly isApproveBounty: boolean;
    readonly asApproveBounty: {
      readonly bountyId: Compact<u32>;
    } & Struct;
    readonly isProposeCurator: boolean;
    readonly asProposeCurator: {
      readonly bountyId: Compact<u32>;
      readonly curator: MultiAddress;
      readonly fee: Compact<u128>;
    } & Struct;
    readonly isUnassignCurator: boolean;
    readonly asUnassignCurator: {
      readonly bountyId: Compact<u32>;
    } & Struct;
    readonly isAcceptCurator: boolean;
    readonly asAcceptCurator: {
      readonly bountyId: Compact<u32>;
    } & Struct;
    readonly isAwardBounty: boolean;
    readonly asAwardBounty: {
      readonly bountyId: Compact<u32>;
      readonly beneficiary: MultiAddress;
    } & Struct;
    readonly isClaimBounty: boolean;
    readonly asClaimBounty: {
      readonly bountyId: Compact<u32>;
    } & Struct;
    readonly isCloseBounty: boolean;
    readonly asCloseBounty: {
      readonly bountyId: Compact<u32>;
    } & Struct;
    readonly isExtendBountyExpiry: boolean;
    readonly asExtendBountyExpiry: {
      readonly bountyId: Compact<u32>;
      readonly remark: Bytes;
    } & Struct;
    readonly type: 'ProposeBounty' | 'ApproveBounty' | 'ProposeCurator' | 'UnassignCurator' | 'AcceptCurator' | 'AwardBounty' | 'ClaimBounty' | 'CloseBounty' | 'ExtendBountyExpiry';
  }

  /** @name PalletTipsCall (345) */
  interface PalletTipsCall extends Enum {
    readonly isReportAwesome: boolean;
    readonly asReportAwesome: {
      readonly reason: Bytes;
      readonly who: MultiAddress;
    } & Struct;
    readonly isRetractTip: boolean;
    readonly asRetractTip: {
      readonly hash_: H256;
    } & Struct;
    readonly isTipNew: boolean;
    readonly asTipNew: {
      readonly reason: Bytes;
      readonly who: MultiAddress;
      readonly tipValue: Compact<u128>;
    } & Struct;
    readonly isTip: boolean;
    readonly asTip: {
      readonly hash_: H256;
      readonly tipValue: Compact<u128>;
    } & Struct;
    readonly isCloseTip: boolean;
    readonly asCloseTip: {
      readonly hash_: H256;
    } & Struct;
    readonly isSlashTip: boolean;
    readonly asSlashTip: {
      readonly hash_: H256;
    } & Struct;
    readonly type: 'ReportAwesome' | 'RetractTip' | 'TipNew' | 'Tip' | 'CloseTip' | 'SlashTip';
  }

  /** @name PalletLotteryCall (346) */
  interface PalletLotteryCall extends Enum {
    readonly isBuyTicket: boolean;
    readonly asBuyTicket: {
      readonly call: Call;
    } & Struct;
    readonly isSetCalls: boolean;
    readonly asSetCalls: {
      readonly calls: Vec<Call>;
    } & Struct;
    readonly isStartLottery: boolean;
    readonly asStartLottery: {
      readonly price: u128;
      readonly length: u32;
      readonly delay: u32;
      readonly repeat: bool;
    } & Struct;
    readonly isStopRepeat: boolean;
    readonly type: 'BuyTicket' | 'SetCalls' | 'StartLottery' | 'StopRepeat';
  }

  /** @name PalletChildBountiesCall (347) */
  interface PalletChildBountiesCall extends Enum {
    readonly isAddChildBounty: boolean;
    readonly asAddChildBounty: {
      readonly parentBountyId: Compact<u32>;
      readonly value: Compact<u128>;
      readonly description: Bytes;
    } & Struct;
    readonly isProposeCurator: boolean;
    readonly asProposeCurator: {
      readonly parentBountyId: Compact<u32>;
      readonly childBountyId: Compact<u32>;
      readonly curator: MultiAddress;
      readonly fee: Compact<u128>;
    } & Struct;
    readonly isAcceptCurator: boolean;
    readonly asAcceptCurator: {
      readonly parentBountyId: Compact<u32>;
      readonly childBountyId: Compact<u32>;
    } & Struct;
    readonly isUnassignCurator: boolean;
    readonly asUnassignCurator: {
      readonly parentBountyId: Compact<u32>;
      readonly childBountyId: Compact<u32>;
    } & Struct;
    readonly isAwardChildBounty: boolean;
    readonly asAwardChildBounty: {
      readonly parentBountyId: Compact<u32>;
      readonly childBountyId: Compact<u32>;
      readonly beneficiary: MultiAddress;
    } & Struct;
    readonly isClaimChildBounty: boolean;
    readonly asClaimChildBounty: {
      readonly parentBountyId: Compact<u32>;
      readonly childBountyId: Compact<u32>;
    } & Struct;
    readonly isCloseChildBounty: boolean;
    readonly asCloseChildBounty: {
      readonly parentBountyId: Compact<u32>;
      readonly childBountyId: Compact<u32>;
    } & Struct;
    readonly type: 'AddChildBounty' | 'ProposeCurator' | 'AcceptCurator' | 'UnassignCurator' | 'AwardChildBounty' | 'ClaimChildBounty' | 'CloseChildBounty';
  }

  /** @name PhalaPalletsMqPalletCall (348) */
  interface PhalaPalletsMqPalletCall extends Enum {
    readonly isSyncOffchainMessage: boolean;
    readonly asSyncOffchainMessage: {
      readonly signedMessage: PhalaMqSignedMessage;
    } & Struct;
    readonly isPushMessage: boolean;
    readonly asPushMessage: {
      readonly destination: Bytes;
      readonly payload: Bytes;
    } & Struct;
    readonly isForcePushPalletMessage: boolean;
    readonly asForcePushPalletMessage: {
      readonly destination: Bytes;
      readonly payload: Bytes;
    } & Struct;
    readonly type: 'SyncOffchainMessage' | 'PushMessage' | 'ForcePushPalletMessage';
  }

  /** @name PhalaMqSignedMessage (349) */
  interface PhalaMqSignedMessage extends Struct {
    readonly message: PhalaMqMessage;
    readonly sequence: u64;
    readonly signature: Bytes;
  }

  /** @name PhalaMqMessage (350) */
  interface PhalaMqMessage extends Struct {
    readonly sender: PhalaMqMessageOrigin;
    readonly destination: Bytes;
    readonly payload: Bytes;
  }

  /** @name PhalaMqMessageOrigin (351) */
  interface PhalaMqMessageOrigin extends Enum {
    readonly isPallet: boolean;
    readonly asPallet: Bytes;
    readonly isContract: boolean;
    readonly asContract: H256;
    readonly isWorker: boolean;
    readonly asWorker: SpCoreSr25519Public;
    readonly isAccountId: boolean;
    readonly asAccountId: H256;
    readonly isMultiLocation: boolean;
    readonly asMultiLocation: Bytes;
    readonly isGatekeeper: boolean;
    readonly isCluster: boolean;
    readonly asCluster: H256;
    readonly isReserved: boolean;
    readonly type: 'Pallet' | 'Contract' | 'Worker' | 'AccountId' | 'MultiLocation' | 'Gatekeeper' | 'Cluster' | 'Reserved';
  }

  /** @name PhalaPalletsRegistryPalletCall (353) */
  interface PhalaPalletsRegistryPalletCall extends Enum {
    readonly isForceSetBenchmarkDuration: boolean;
    readonly asForceSetBenchmarkDuration: {
      readonly value: u32;
    } & Struct;
    readonly isForceRegisterWorker: boolean;
    readonly asForceRegisterWorker: {
      readonly pubkey: SpCoreSr25519Public;
      readonly ecdhPubkey: SpCoreSr25519Public;
      readonly operator: Option<AccountId32>;
    } & Struct;
    readonly isForceRegisterTopicPubkey: boolean;
    readonly asForceRegisterTopicPubkey: {
      readonly topic: Bytes;
      readonly pubkey: Bytes;
    } & Struct;
    readonly isRegisterGatekeeper: boolean;
    readonly asRegisterGatekeeper: {
      readonly gatekeeper: SpCoreSr25519Public;
    } & Struct;
    readonly isUnregisterGatekeeper: boolean;
    readonly asUnregisterGatekeeper: {
      readonly gatekeeper: SpCoreSr25519Public;
    } & Struct;
    readonly isRotateMasterKey: boolean;
    readonly isRegisterWorker: boolean;
    readonly asRegisterWorker: {
      readonly pruntimeInfo: PhalaTypesWorkerRegistrationInfo;
      readonly attestation: PhalaPalletsUtilsAttestationLegacyAttestation;
    } & Struct;
    readonly isRegisterWorkerV2: boolean;
    readonly asRegisterWorkerV2: {
      readonly pruntimeInfo: PhalaTypesWorkerRegistrationInfoV2;
      readonly attestation: Option<PhalaTypesAttestationReport>;
    } & Struct;
    readonly isUpdateWorkerEndpoint: boolean;
    readonly asUpdateWorkerEndpoint: {
      readonly endpointPayload: PhalaTypesWorkerEndpointPayload;
      readonly signature: Bytes;
    } & Struct;
    readonly isAddPruntime: boolean;
    readonly asAddPruntime: {
      readonly pruntimeHash: Bytes;
    } & Struct;
    readonly isRemovePruntime: boolean;
    readonly asRemovePruntime: {
      readonly pruntimeHash: Bytes;
    } & Struct;
    readonly isAddRelaychainGenesisBlockHash: boolean;
    readonly asAddRelaychainGenesisBlockHash: {
      readonly genesisBlockHash: H256;
    } & Struct;
    readonly isRemoveRelaychainGenesisBlockHash: boolean;
    readonly asRemoveRelaychainGenesisBlockHash: {
      readonly genesisBlockHash: H256;
    } & Struct;
    readonly isSetMinimumPruntimeVersion: boolean;
    readonly asSetMinimumPruntimeVersion: {
      readonly major: u32;
      readonly minor: u32;
      readonly patch: u32;
    } & Struct;
    readonly isSetPruntimeConsensusVersion: boolean;
    readonly asSetPruntimeConsensusVersion: {
      readonly version: u32;
    } & Struct;
    readonly type: 'ForceSetBenchmarkDuration' | 'ForceRegisterWorker' | 'ForceRegisterTopicPubkey' | 'RegisterGatekeeper' | 'UnregisterGatekeeper' | 'RotateMasterKey' | 'RegisterWorker' | 'RegisterWorkerV2' | 'UpdateWorkerEndpoint' | 'AddPruntime' | 'RemovePruntime' | 'AddRelaychainGenesisBlockHash' | 'RemoveRelaychainGenesisBlockHash' | 'SetMinimumPruntimeVersion' | 'SetPruntimeConsensusVersion';
  }

  /** @name PhalaTypesWorkerRegistrationInfo (354) */
  interface PhalaTypesWorkerRegistrationInfo extends Struct {
    readonly version: u32;
    readonly machineId: Bytes;
    readonly pubkey: SpCoreSr25519Public;
    readonly ecdhPubkey: SpCoreSr25519Public;
    readonly genesisBlockHash: H256;
    readonly features: Vec<u32>;
    readonly operator: Option<AccountId32>;
  }

  /** @name PhalaPalletsUtilsAttestationLegacyAttestation (355) */
  interface PhalaPalletsUtilsAttestationLegacyAttestation extends Enum {
    readonly isSgxIas: boolean;
    readonly asSgxIas: {
      readonly raReport: Bytes;
      readonly signature: Bytes;
      readonly rawSigningCert: Bytes;
    } & Struct;
    readonly type: 'SgxIas';
  }

  /** @name PhalaTypesWorkerRegistrationInfoV2 (356) */
  interface PhalaTypesWorkerRegistrationInfoV2 extends Struct {
    readonly version: u32;
    readonly machineId: Bytes;
    readonly pubkey: SpCoreSr25519Public;
    readonly ecdhPubkey: SpCoreSr25519Public;
    readonly genesisBlockHash: H256;
    readonly features: Vec<u32>;
    readonly operator: Option<AccountId32>;
    readonly paraId: u32;
    readonly maxConsensusVersion: u32;
  }

  /** @name PhalaTypesAttestationReport (358) */
  interface PhalaTypesAttestationReport extends Enum {
    readonly isSgxIas: boolean;
    readonly asSgxIas: {
      readonly raReport: Bytes;
      readonly signature: Bytes;
      readonly rawSigningCert: Bytes;
    } & Struct;
    readonly type: 'SgxIas';
  }

  /** @name PhalaTypesWorkerEndpointPayload (359) */
  interface PhalaTypesWorkerEndpointPayload extends Struct {
    readonly pubkey: SpCoreSr25519Public;
    readonly versionedEndpoints: PhalaTypesVersionedWorkerEndpoints;
    readonly signingTime: u64;
  }

  /** @name PhalaTypesVersionedWorkerEndpoints (360) */
  interface PhalaTypesVersionedWorkerEndpoints extends Enum {
    readonly isV1: boolean;
    readonly asV1: Vec<Text>;
    readonly type: 'V1';
  }

  /** @name PhalaPalletsComputeComputationPalletCall (362) */
  interface PhalaPalletsComputeComputationPalletCall extends Enum {
    readonly isSetCoolDownExpiration: boolean;
    readonly asSetCoolDownExpiration: {
      readonly period: u64;
    } & Struct;
    readonly isUnbind: boolean;
    readonly asUnbind: {
      readonly session: AccountId32;
    } & Struct;
    readonly isForceHeartbeat: boolean;
    readonly isForceStartComputing: boolean;
    readonly asForceStartComputing: {
      readonly session: AccountId32;
      readonly stake: u128;
    } & Struct;
    readonly isForceStopComputing: boolean;
    readonly asForceStopComputing: {
      readonly session: AccountId32;
    } & Struct;
    readonly isUpdateTokenomic: boolean;
    readonly asUpdateTokenomic: {
      readonly newParams: PhalaTypesMessagingTokenomicParameters;
    } & Struct;
    readonly isSetHeartbeatPaused: boolean;
    readonly asSetHeartbeatPaused: {
      readonly paused: bool;
    } & Struct;
    readonly isSetBudgetPerBlock: boolean;
    readonly asSetBudgetPerBlock: {
      readonly nonce: u64;
      readonly blockNumber: u32;
      readonly budget: u128;
    } & Struct;
    readonly isUpdateContractRoot: boolean;
    readonly asUpdateContractRoot: {
      readonly accountId: AccountId32;
    } & Struct;
    readonly type: 'SetCoolDownExpiration' | 'Unbind' | 'ForceHeartbeat' | 'ForceStartComputing' | 'ForceStopComputing' | 'UpdateTokenomic' | 'SetHeartbeatPaused' | 'SetBudgetPerBlock' | 'UpdateContractRoot';
  }

  /** @name PhalaTypesMessagingTokenomicParameters (363) */
  interface PhalaTypesMessagingTokenomicParameters extends Struct {
    readonly phaRate: u128;
    readonly rho: u128;
    readonly budgetPerBlock: u128;
    readonly vMax: u128;
    readonly costK: u128;
    readonly costB: u128;
    readonly slashRate: u128;
    readonly treasuryRatio: u128;
    readonly heartbeatWindow: u32;
    readonly rigK: u128;
    readonly rigB: u128;
    readonly re: u128;
    readonly k: u128;
    readonly kappa: u128;
  }

  /** @name PhalaPalletsComputeStakePoolV2PalletCall (364) */
  interface PhalaPalletsComputeStakePoolV2PalletCall extends Enum {
    readonly isCreate: boolean;
    readonly isAddWorker: boolean;
    readonly asAddWorker: {
      readonly pid: u64;
      readonly pubkey: SpCoreSr25519Public;
    } & Struct;
    readonly isRemoveWorker: boolean;
    readonly asRemoveWorker: {
      readonly pid: u64;
      readonly worker: SpCoreSr25519Public;
    } & Struct;
    readonly isSetCap: boolean;
    readonly asSetCap: {
      readonly pid: u64;
      readonly cap: u128;
    } & Struct;
    readonly isSetPayoutPref: boolean;
    readonly asSetPayoutPref: {
      readonly pid: u64;
      readonly payoutCommission: Option<Permill>;
    } & Struct;
    readonly isClaimLegacyRewards: boolean;
    readonly asClaimLegacyRewards: {
      readonly pid: u64;
      readonly target: AccountId32;
    } & Struct;
    readonly isBackfillAddMissingReward: boolean;
    readonly asBackfillAddMissingReward: {
      readonly input: Vec<ITuple<[AccountId32, u64, u128]>>;
    } & Struct;
    readonly isClaimOwnerRewards: boolean;
    readonly asClaimOwnerRewards: {
      readonly pid: u64;
      readonly target: AccountId32;
    } & Struct;
    readonly isCheckAndMaybeForceWithdraw: boolean;
    readonly asCheckAndMaybeForceWithdraw: {
      readonly pid: u64;
    } & Struct;
    readonly isContribute: boolean;
    readonly asContribute: {
      readonly pid: u64;
      readonly amount: u128;
      readonly asVault: Option<u64>;
    } & Struct;
    readonly isWithdraw: boolean;
    readonly asWithdraw: {
      readonly pid: u64;
      readonly shares: u128;
      readonly asVault: Option<u64>;
    } & Struct;
    readonly isResetIterPos: boolean;
    readonly isFixMissingWorkerLock: boolean;
    readonly asFixMissingWorkerLock: {
      readonly maxIterations: u32;
    } & Struct;
    readonly isStartComputing: boolean;
    readonly asStartComputing: {
      readonly pid: u64;
      readonly worker: SpCoreSr25519Public;
      readonly stake: u128;
    } & Struct;
    readonly isStopComputing: boolean;
    readonly asStopComputing: {
      readonly pid: u64;
      readonly worker: SpCoreSr25519Public;
    } & Struct;
    readonly isReclaimPoolWorker: boolean;
    readonly asReclaimPoolWorker: {
      readonly pid: u64;
      readonly worker: SpCoreSr25519Public;
    } & Struct;
    readonly isRestartComputing: boolean;
    readonly asRestartComputing: {
      readonly pid: u64;
      readonly worker: SpCoreSr25519Public;
      readonly stake: u128;
    } & Struct;
    readonly type: 'Create' | 'AddWorker' | 'RemoveWorker' | 'SetCap' | 'SetPayoutPref' | 'ClaimLegacyRewards' | 'BackfillAddMissingReward' | 'ClaimOwnerRewards' | 'CheckAndMaybeForceWithdraw' | 'Contribute' | 'Withdraw' | 'ResetIterPos' | 'FixMissingWorkerLock' | 'StartComputing' | 'StopComputing' | 'ReclaimPoolWorker' | 'RestartComputing';
  }

  /** @name PhalaPalletsComputeVaultPalletCall (369) */
  interface PhalaPalletsComputeVaultPalletCall extends Enum {
    readonly isCreate: boolean;
    readonly isSetPayoutPref: boolean;
    readonly asSetPayoutPref: {
      readonly pid: u64;
      readonly payoutCommission: Option<Permill>;
    } & Struct;
    readonly isClaimOwnerShares: boolean;
    readonly asClaimOwnerShares: {
      readonly vaultPid: u64;
      readonly target: AccountId32;
      readonly shares: u128;
    } & Struct;
    readonly isMaybeGainOwnerShares: boolean;
    readonly asMaybeGainOwnerShares: {
      readonly vaultPid: u64;
    } & Struct;
    readonly isCheckAndMaybeForceWithdraw: boolean;
    readonly asCheckAndMaybeForceWithdraw: {
      readonly vaultPid: u64;
    } & Struct;
    readonly isContribute: boolean;
    readonly asContribute: {
      readonly pid: u64;
      readonly amount: u128;
    } & Struct;
    readonly isWithdraw: boolean;
    readonly asWithdraw: {
      readonly pid: u64;
      readonly shares: u128;
    } & Struct;
    readonly isRefreshVaultLockAndCheck: boolean;
    readonly asRefreshVaultLockAndCheck: {
      readonly pid: u64;
    } & Struct;
    readonly type: 'Create' | 'SetPayoutPref' | 'ClaimOwnerShares' | 'MaybeGainOwnerShares' | 'CheckAndMaybeForceWithdraw' | 'Contribute' | 'Withdraw' | 'RefreshVaultLockAndCheck';
  }

  /** @name PhalaPalletsComputeWrappedBalancesPalletCall (370) */
  interface PhalaPalletsComputeWrappedBalancesPalletCall extends Enum {
    readonly isWrap: boolean;
    readonly asWrap: {
      readonly amount: u128;
    } & Struct;
    readonly isUnwrapAll: boolean;
    readonly isUnwrap: boolean;
    readonly asUnwrap: {
      readonly amount: u128;
    } & Struct;
    readonly isVote: boolean;
    readonly asVote: {
      readonly ayeAmount: u128;
      readonly nayAmount: u128;
      readonly voteId: u32;
    } & Struct;
    readonly isUnlock: boolean;
    readonly asUnlock: {
      readonly voteId: u32;
      readonly maxIterations: u32;
    } & Struct;
    readonly isBackfillVoteLock: boolean;
    readonly type: 'Wrap' | 'UnwrapAll' | 'Unwrap' | 'Vote' | 'Unlock' | 'BackfillVoteLock';
  }

  /** @name PhalaPalletsComputeBasePoolPalletCall (371) */
  interface PhalaPalletsComputeBasePoolPalletCall extends Enum {
    readonly isAddStakerToWhitelist: boolean;
    readonly asAddStakerToWhitelist: {
      readonly pid: u64;
      readonly staker: AccountId32;
    } & Struct;
    readonly isSetPoolDescription: boolean;
    readonly asSetPoolDescription: {
      readonly pid: u64;
      readonly description: Bytes;
    } & Struct;
    readonly isResetLockIterPos: boolean;
    readonly isRemoveUnusedLock: boolean;
    readonly asRemoveUnusedLock: {
      readonly maxIterations: u32;
    } & Struct;
    readonly isRemoveStakerFromWhitelist: boolean;
    readonly asRemoveStakerFromWhitelist: {
      readonly pid: u64;
      readonly staker: AccountId32;
    } & Struct;
    readonly type: 'AddStakerToWhitelist' | 'SetPoolDescription' | 'ResetLockIterPos' | 'RemoveUnusedLock' | 'RemoveStakerFromWhitelist';
  }

  /** @name PhalaPalletsPhatPalletCall (373) */
  interface PhalaPalletsPhatPalletCall extends Enum {
    readonly isAddCluster: boolean;
    readonly asAddCluster: {
      readonly owner: AccountId32;
      readonly permission: PhalaTypesContractClusterPermission;
      readonly deployWorkers: Vec<SpCoreSr25519Public>;
      readonly deposit: u128;
      readonly gasPrice: u128;
      readonly depositPerItem: u128;
      readonly depositPerByte: u128;
      readonly treasuryAccount: AccountId32;
    } & Struct;
    readonly isClusterUploadResource: boolean;
    readonly asClusterUploadResource: {
      readonly clusterId: H256;
      readonly resourceType: PhalaTypesContractMessagingResourceType;
      readonly resourceData: Bytes;
    } & Struct;
    readonly isTransferToCluster: boolean;
    readonly asTransferToCluster: {
      readonly amount: u128;
      readonly clusterId: H256;
      readonly destAccount: AccountId32;
    } & Struct;
    readonly isPushContractMessage: boolean;
    readonly asPushContractMessage: {
      readonly contractId: H256;
      readonly payload: Bytes;
      readonly deposit: u128;
    } & Struct;
    readonly isInstantiateContract: boolean;
    readonly asInstantiateContract: {
      readonly codeIndex: PhalaTypesContractCodeIndex;
      readonly data: Bytes;
      readonly salt: Bytes;
      readonly clusterId: H256;
      readonly transfer: u128;
      readonly gasLimit: u64;
      readonly storageDepositLimit: Option<u128>;
      readonly deposit: u128;
    } & Struct;
    readonly isClusterDestroy: boolean;
    readonly asClusterDestroy: {
      readonly cluster: H256;
    } & Struct;
    readonly isSetPinkSystemCode: boolean;
    readonly asSetPinkSystemCode: {
      readonly code: Bytes;
    } & Struct;
    readonly isSetPinkRuntimeVersion: boolean;
    readonly asSetPinkRuntimeVersion: {
      readonly version: ITuple<[u32, u32]>;
    } & Struct;
    readonly isAddWorkerToCluster: boolean;
    readonly asAddWorkerToCluster: {
      readonly workerPubkey: SpCoreSr25519Public;
      readonly clusterId: H256;
    } & Struct;
    readonly isRemoveWorkerFromCluster: boolean;
    readonly asRemoveWorkerFromCluster: {
      readonly workerPubkey: SpCoreSr25519Public;
      readonly clusterId: H256;
    } & Struct;
    readonly type: 'AddCluster' | 'ClusterUploadResource' | 'TransferToCluster' | 'PushContractMessage' | 'InstantiateContract' | 'ClusterDestroy' | 'SetPinkSystemCode' | 'SetPinkRuntimeVersion' | 'AddWorkerToCluster' | 'RemoveWorkerFromCluster';
  }

  /** @name PhalaTypesContractClusterPermission (374) */
  interface PhalaTypesContractClusterPermission extends Enum {
    readonly isPublic: boolean;
    readonly isOnlyOwner: boolean;
    readonly asOnlyOwner: AccountId32;
    readonly type: 'Public' | 'OnlyOwner';
  }

  /** @name PhalaTypesContractMessagingResourceType (376) */
  interface PhalaTypesContractMessagingResourceType extends Enum {
    readonly isInkCode: boolean;
    readonly isSidevmCode: boolean;
    readonly isIndeterministicInkCode: boolean;
    readonly type: 'InkCode' | 'SidevmCode' | 'IndeterministicInkCode';
  }

  /** @name PhalaTypesContractCodeIndex (377) */
  interface PhalaTypesContractCodeIndex extends Enum {
    readonly isWasmCode: boolean;
    readonly asWasmCode: H256;
    readonly type: 'WasmCode';
  }

  /** @name PhalaPalletsPhatTokenomicPalletCall (380) */
  interface PhalaPalletsPhatTokenomicPalletCall extends Enum {
    readonly isAdjustStake: boolean;
    readonly asAdjustStake: {
      readonly contract: H256;
      readonly amount: u128;
    } & Struct;
    readonly type: 'AdjustStake';
  }

  /** @name PhatOffchainRollupAnchorPalletCall (381) */
  interface PhatOffchainRollupAnchorPalletCall extends Enum {
    readonly isClaimName: boolean;
    readonly asClaimName: {
      readonly name: H256;
    } & Struct;
    readonly isRollup: boolean;
    readonly asRollup: {
      readonly name: H256;
      readonly tx: PhatOffchainRollupRollupTx;
      readonly nonce: u128;
    } & Struct;
    readonly type: 'ClaimName' | 'Rollup';
  }

  /** @name PhatOffchainRollupRollupTx (382) */
  interface PhatOffchainRollupRollupTx extends Struct {
    readonly conds: Vec<PhatOffchainRollupCond>;
    readonly actions: Vec<Bytes>;
    readonly updates: Vec<ITuple<[Bytes, Option<Bytes>]>>;
  }

  /** @name PhatOffchainRollupCond (384) */
  interface PhatOffchainRollupCond extends Enum {
    readonly isEq: boolean;
    readonly asEq: ITuple<[Bytes, Option<Bytes>]>;
    readonly type: 'Eq';
  }

  /** @name PhatOffchainRollupOraclePalletCall (391) */
  interface PhatOffchainRollupOraclePalletCall extends Enum {
    readonly isRequest: boolean;
    readonly asRequest: {
      readonly name: H256;
      readonly data: Bytes;
      readonly nonce: u128;
    } & Struct;
    readonly type: 'Request';
  }

  /** @name PhalaPalletsPuppetsParachainInfoPalletCall (392) */
  type PhalaPalletsPuppetsParachainInfoPalletCall = Null;

  /** @name PhalaPalletsPuppetsParachainSystemPalletCall (393) */
  type PhalaPalletsPuppetsParachainSystemPalletCall = Null;

  /** @name PalletRmrkCoreCall (394) */
  interface PalletRmrkCoreCall extends Enum {
    readonly isMintNft: boolean;
    readonly asMintNft: {
      readonly owner: Option<AccountId32>;
      readonly nftId: u32;
      readonly collectionId: u32;
      readonly royaltyRecipient: Option<AccountId32>;
      readonly royalty: Option<Permill>;
      readonly metadata: Bytes;
      readonly transferable: bool;
      readonly resources: Option<Vec<RmrkTraitsResourceResourceInfoMin>>;
    } & Struct;
    readonly isMintNftDirectlyToNft: boolean;
    readonly asMintNftDirectlyToNft: {
      readonly owner: ITuple<[u32, u32]>;
      readonly nftId: u32;
      readonly collectionId: u32;
      readonly royaltyRecipient: Option<AccountId32>;
      readonly royalty: Option<Permill>;
      readonly metadata: Bytes;
      readonly transferable: bool;
      readonly resources: Option<Vec<RmrkTraitsResourceResourceInfoMin>>;
    } & Struct;
    readonly isCreateCollection: boolean;
    readonly asCreateCollection: {
      readonly collectionId: u32;
      readonly metadata: Bytes;
      readonly max: Option<u32>;
      readonly symbol: Bytes;
    } & Struct;
    readonly isBurnNft: boolean;
    readonly asBurnNft: {
      readonly collectionId: u32;
      readonly nftId: u32;
    } & Struct;
    readonly isDestroyCollection: boolean;
    readonly asDestroyCollection: {
      readonly collectionId: u32;
    } & Struct;
    readonly isSend: boolean;
    readonly asSend: {
      readonly collectionId: u32;
      readonly nftId: u32;
      readonly newOwner: RmrkTraitsNftAccountIdOrCollectionNftTuple;
    } & Struct;
    readonly isAcceptNft: boolean;
    readonly asAcceptNft: {
      readonly collectionId: u32;
      readonly nftId: u32;
      readonly newOwner: RmrkTraitsNftAccountIdOrCollectionNftTuple;
    } & Struct;
    readonly isRejectNft: boolean;
    readonly asRejectNft: {
      readonly collectionId: u32;
      readonly nftId: u32;
    } & Struct;
    readonly isChangeCollectionIssuer: boolean;
    readonly asChangeCollectionIssuer: {
      readonly collectionId: u32;
      readonly newIssuer: MultiAddress;
    } & Struct;
    readonly isSetProperty: boolean;
    readonly asSetProperty: {
      readonly collectionId: u32;
      readonly maybeNftId: Option<u32>;
      readonly key: Bytes;
      readonly value: Bytes;
    } & Struct;
    readonly isLockCollection: boolean;
    readonly asLockCollection: {
      readonly collectionId: u32;
    } & Struct;
    readonly isAddBasicResource: boolean;
    readonly asAddBasicResource: {
      readonly collectionId: u32;
      readonly nftId: u32;
      readonly resource: RmrkTraitsResourceBasicResource;
      readonly resourceId: u32;
    } & Struct;
    readonly isAddComposableResource: boolean;
    readonly asAddComposableResource: {
      readonly collectionId: u32;
      readonly nftId: u32;
      readonly resource: RmrkTraitsResourceComposableResource;
      readonly resourceId: u32;
    } & Struct;
    readonly isAddSlotResource: boolean;
    readonly asAddSlotResource: {
      readonly collectionId: u32;
      readonly nftId: u32;
      readonly resource: RmrkTraitsResourceSlotResource;
      readonly resourceId: u32;
    } & Struct;
    readonly isReplaceResource: boolean;
    readonly asReplaceResource: {
      readonly collectionId: u32;
      readonly nftId: u32;
      readonly resource: RmrkTraitsResourceResourceTypes;
      readonly resourceId: u32;
    } & Struct;
    readonly isAcceptResource: boolean;
    readonly asAcceptResource: {
      readonly collectionId: u32;
      readonly nftId: u32;
      readonly resourceId: u32;
    } & Struct;
    readonly isRemoveResource: boolean;
    readonly asRemoveResource: {
      readonly collectionId: u32;
      readonly nftId: u32;
      readonly resourceId: u32;
    } & Struct;
    readonly isAcceptResourceRemoval: boolean;
    readonly asAcceptResourceRemoval: {
      readonly collectionId: u32;
      readonly nftId: u32;
      readonly resourceId: u32;
    } & Struct;
    readonly isSetPriority: boolean;
    readonly asSetPriority: {
      readonly collectionId: u32;
      readonly nftId: u32;
      readonly priorities: Vec<u32>;
    } & Struct;
    readonly type: 'MintNft' | 'MintNftDirectlyToNft' | 'CreateCollection' | 'BurnNft' | 'DestroyCollection' | 'Send' | 'AcceptNft' | 'RejectNft' | 'ChangeCollectionIssuer' | 'SetProperty' | 'LockCollection' | 'AddBasicResource' | 'AddComposableResource' | 'AddSlotResource' | 'ReplaceResource' | 'AcceptResource' | 'RemoveResource' | 'AcceptResourceRemoval' | 'SetPriority';
  }

  /** @name RmrkTraitsResourceResourceInfoMin (397) */
  interface RmrkTraitsResourceResourceInfoMin extends Struct {
    readonly id: u32;
    readonly resource: RmrkTraitsResourceResourceTypes;
  }

  /** @name RmrkTraitsResourceResourceTypes (399) */
  interface RmrkTraitsResourceResourceTypes extends Enum {
    readonly isBasic: boolean;
    readonly asBasic: RmrkTraitsResourceBasicResource;
    readonly isComposable: boolean;
    readonly asComposable: RmrkTraitsResourceComposableResource;
    readonly isSlot: boolean;
    readonly asSlot: RmrkTraitsResourceSlotResource;
    readonly type: 'Basic' | 'Composable' | 'Slot';
  }

  /** @name RmrkTraitsResourceBasicResource (400) */
  interface RmrkTraitsResourceBasicResource extends Struct {
    readonly metadata: Bytes;
  }

  /** @name RmrkTraitsResourceComposableResource (401) */
  interface RmrkTraitsResourceComposableResource extends Struct {
    readonly parts: Vec<u32>;
    readonly base: u32;
    readonly metadata: Option<Bytes>;
    readonly slot: Option<ITuple<[u32, u32]>>;
  }

  /** @name RmrkTraitsResourceSlotResource (403) */
  interface RmrkTraitsResourceSlotResource extends Struct {
    readonly base: u32;
    readonly metadata: Option<Bytes>;
    readonly slot: u32;
  }

  /** @name PalletEvmAccountMappingCall (407) */
  interface PalletEvmAccountMappingCall extends Enum {
    readonly isMetaCall: boolean;
    readonly asMetaCall: {
      readonly who: AccountId32;
      readonly call: Call;
      readonly nonce: u64;
      readonly signature: U8aFixed;
      readonly tip: Option<u128>;
    } & Struct;
    readonly type: 'MetaCall';
  }

  /** @name PhalaNodeRuntimeOriginCaller (409) */
  interface PhalaNodeRuntimeOriginCaller extends Enum {
    readonly isSystem: boolean;
    readonly asSystem: FrameSupportDispatchRawOrigin;
    readonly isVoid: boolean;
    readonly isCouncil: boolean;
    readonly asCouncil: PalletCollectiveRawOrigin;
    readonly isTechnicalCommittee: boolean;
    readonly asTechnicalCommittee: PalletCollectiveRawOrigin;
    readonly type: 'System' | 'Void' | 'Council' | 'TechnicalCommittee';
  }

  /** @name FrameSupportDispatchRawOrigin (410) */
  interface FrameSupportDispatchRawOrigin extends Enum {
    readonly isRoot: boolean;
    readonly isSigned: boolean;
    readonly asSigned: AccountId32;
    readonly isNone: boolean;
    readonly type: 'Root' | 'Signed' | 'None';
  }

  /** @name PalletCollectiveRawOrigin (411) */
  interface PalletCollectiveRawOrigin extends Enum {
    readonly isMembers: boolean;
    readonly asMembers: ITuple<[u32, u32]>;
    readonly isMember: boolean;
    readonly asMember: AccountId32;
    readonly isPhantom: boolean;
    readonly type: 'Members' | 'Member' | 'Phantom';
  }

  /** @name SpCoreVoid (413) */
  type SpCoreVoid = Null;

  /** @name PalletUtilityError (414) */
  interface PalletUtilityError extends Enum {
    readonly isTooManyCalls: boolean;
    readonly type: 'TooManyCalls';
  }

  /** @name SpConsensusBabeDigestsPreDigest (421) */
  interface SpConsensusBabeDigestsPreDigest extends Enum {
    readonly isPrimary: boolean;
    readonly asPrimary: SpConsensusBabeDigestsPrimaryPreDigest;
    readonly isSecondaryPlain: boolean;
    readonly asSecondaryPlain: SpConsensusBabeDigestsSecondaryPlainPreDigest;
    readonly isSecondaryVRF: boolean;
    readonly asSecondaryVRF: SpConsensusBabeDigestsSecondaryVRFPreDigest;
    readonly type: 'Primary' | 'SecondaryPlain' | 'SecondaryVRF';
  }

  /** @name SpConsensusBabeDigestsPrimaryPreDigest (422) */
  interface SpConsensusBabeDigestsPrimaryPreDigest extends Struct {
    readonly authorityIndex: u32;
    readonly slot: u64;
    readonly vrfSignature: SpCoreSr25519VrfVrfSignature;
  }

  /** @name SpCoreSr25519VrfVrfSignature (423) */
  interface SpCoreSr25519VrfVrfSignature extends Struct {
    readonly output: U8aFixed;
    readonly proof: U8aFixed;
  }

  /** @name SpConsensusBabeDigestsSecondaryPlainPreDigest (424) */
  interface SpConsensusBabeDigestsSecondaryPlainPreDigest extends Struct {
    readonly authorityIndex: u32;
    readonly slot: u64;
  }

  /** @name SpConsensusBabeDigestsSecondaryVRFPreDigest (425) */
  interface SpConsensusBabeDigestsSecondaryVRFPreDigest extends Struct {
    readonly authorityIndex: u32;
    readonly slot: u64;
    readonly vrfSignature: SpCoreSr25519VrfVrfSignature;
  }

  /** @name SpConsensusBabeBabeEpochConfiguration (426) */
  interface SpConsensusBabeBabeEpochConfiguration extends Struct {
    readonly c: ITuple<[u64, u64]>;
    readonly allowedSlots: SpConsensusBabeAllowedSlots;
  }

  /** @name PalletBabeError (430) */
  interface PalletBabeError extends Enum {
    readonly isInvalidEquivocationProof: boolean;
    readonly isInvalidKeyOwnershipProof: boolean;
    readonly isDuplicateOffenceReport: boolean;
    readonly isInvalidConfiguration: boolean;
    readonly type: 'InvalidEquivocationProof' | 'InvalidKeyOwnershipProof' | 'DuplicateOffenceReport' | 'InvalidConfiguration';
  }

  /** @name PalletIndicesError (432) */
  interface PalletIndicesError extends Enum {
    readonly isNotAssigned: boolean;
    readonly isNotOwner: boolean;
    readonly isInUse: boolean;
    readonly isNotTransfer: boolean;
    readonly isPermanent: boolean;
    readonly type: 'NotAssigned' | 'NotOwner' | 'InUse' | 'NotTransfer' | 'Permanent';
  }

  /** @name PalletBalancesBalanceLock (434) */
  interface PalletBalancesBalanceLock extends Struct {
    readonly id: U8aFixed;
    readonly amount: u128;
    readonly reasons: PalletBalancesReasons;
  }

  /** @name PalletBalancesReasons (435) */
  interface PalletBalancesReasons extends Enum {
    readonly isFee: boolean;
    readonly isMisc: boolean;
    readonly isAll: boolean;
    readonly type: 'Fee' | 'Misc' | 'All';
  }

  /** @name PalletBalancesReserveData (438) */
  interface PalletBalancesReserveData extends Struct {
    readonly id: U8aFixed;
    readonly amount: u128;
  }

  /** @name PhalaNodeRuntimeRuntimeHoldReason (442) */
  interface PhalaNodeRuntimeRuntimeHoldReason extends Enum {
    readonly isPreimage: boolean;
    readonly asPreimage: PalletPreimageHoldReason;
    readonly type: 'Preimage';
  }

  /** @name PalletPreimageHoldReason (443) */
  interface PalletPreimageHoldReason extends Enum {
    readonly isPreimage: boolean;
    readonly type: 'Preimage';
  }

  /** @name PalletBalancesIdAmount (446) */
  interface PalletBalancesIdAmount extends Struct {
    readonly id: Null;
    readonly amount: u128;
  }

  /** @name PalletBalancesError (448) */
  interface PalletBalancesError extends Enum {
    readonly isVestingBalance: boolean;
    readonly isLiquidityRestrictions: boolean;
    readonly isInsufficientBalance: boolean;
    readonly isExistentialDeposit: boolean;
    readonly isExpendability: boolean;
    readonly isExistingVestingSchedule: boolean;
    readonly isDeadAccount: boolean;
    readonly isTooManyReserves: boolean;
    readonly isTooManyHolds: boolean;
    readonly isTooManyFreezes: boolean;
    readonly type: 'VestingBalance' | 'LiquidityRestrictions' | 'InsufficientBalance' | 'ExistentialDeposit' | 'Expendability' | 'ExistingVestingSchedule' | 'DeadAccount' | 'TooManyReserves' | 'TooManyHolds' | 'TooManyFreezes';
  }

  /** @name PalletTransactionPaymentReleases (450) */
  interface PalletTransactionPaymentReleases extends Enum {
    readonly isV1Ancient: boolean;
    readonly isV2: boolean;
    readonly type: 'V1Ancient' | 'V2';
  }

  /** @name PalletElectionProviderMultiPhaseReadySolution (451) */
  interface PalletElectionProviderMultiPhaseReadySolution extends Struct {
    readonly supports: Vec<ITuple<[AccountId32, SpNposElectionsSupport]>>;
    readonly score: SpNposElectionsElectionScore;
    readonly compute: PalletElectionProviderMultiPhaseElectionCompute;
  }

  /** @name PalletElectionProviderMultiPhaseRoundSnapshot (453) */
  interface PalletElectionProviderMultiPhaseRoundSnapshot extends Struct {
    readonly voters: Vec<ITuple<[AccountId32, u64, Vec<AccountId32>]>>;
    readonly targets: Vec<AccountId32>;
  }

  /** @name PalletElectionProviderMultiPhaseSignedSignedSubmission (460) */
  interface PalletElectionProviderMultiPhaseSignedSignedSubmission extends Struct {
    readonly who: AccountId32;
    readonly deposit: u128;
    readonly rawSolution: PalletElectionProviderMultiPhaseRawSolution;
    readonly callFee: u128;
  }

  /** @name PalletElectionProviderMultiPhaseError (461) */
  interface PalletElectionProviderMultiPhaseError extends Enum {
    readonly isPreDispatchEarlySubmission: boolean;
    readonly isPreDispatchWrongWinnerCount: boolean;
    readonly isPreDispatchWeakSubmission: boolean;
    readonly isSignedQueueFull: boolean;
    readonly isSignedCannotPayDeposit: boolean;
    readonly isSignedInvalidWitness: boolean;
    readonly isSignedTooMuchWeight: boolean;
    readonly isOcwCallWrongEra: boolean;
    readonly isMissingSnapshotMetadata: boolean;
    readonly isInvalidSubmissionIndex: boolean;
    readonly isCallNotAllowed: boolean;
    readonly isFallbackFailed: boolean;
    readonly isBoundNotMet: boolean;
    readonly isTooManyWinners: boolean;
    readonly type: 'PreDispatchEarlySubmission' | 'PreDispatchWrongWinnerCount' | 'PreDispatchWeakSubmission' | 'SignedQueueFull' | 'SignedCannotPayDeposit' | 'SignedInvalidWitness' | 'SignedTooMuchWeight' | 'OcwCallWrongEra' | 'MissingSnapshotMetadata' | 'InvalidSubmissionIndex' | 'CallNotAllowed' | 'FallbackFailed' | 'BoundNotMet' | 'TooManyWinners';
  }

  /** @name PalletStakingStakingLedger (462) */
  interface PalletStakingStakingLedger extends Struct {
    readonly stash: AccountId32;
    readonly total: Compact<u128>;
    readonly active: Compact<u128>;
    readonly unlocking: Vec<PalletStakingUnlockChunk>;
    readonly claimedRewards: Vec<u32>;
  }

  /** @name PalletStakingUnlockChunk (464) */
  interface PalletStakingUnlockChunk extends Struct {
    readonly value: Compact<u128>;
    readonly era: Compact<u32>;
  }

  /** @name PalletStakingNominations (467) */
  interface PalletStakingNominations extends Struct {
    readonly targets: Vec<AccountId32>;
    readonly submittedIn: u32;
    readonly suppressed: bool;
  }

  /** @name PalletStakingActiveEraInfo (468) */
  interface PalletStakingActiveEraInfo extends Struct {
    readonly index: u32;
    readonly start: Option<u64>;
  }

  /** @name PalletStakingEraRewardPoints (469) */
  interface PalletStakingEraRewardPoints extends Struct {
    readonly total: u32;
    readonly individual: BTreeMap<AccountId32, u32>;
  }

  /** @name PalletStakingUnappliedSlash (474) */
  interface PalletStakingUnappliedSlash extends Struct {
    readonly validator: AccountId32;
    readonly own: u128;
    readonly others: Vec<ITuple<[AccountId32, u128]>>;
    readonly reporters: Vec<AccountId32>;
    readonly payout: u128;
  }

  /** @name PalletStakingSlashingSlashingSpans (476) */
  interface PalletStakingSlashingSlashingSpans extends Struct {
    readonly spanIndex: u32;
    readonly lastStart: u32;
    readonly lastNonzeroSlash: u32;
    readonly prior: Vec<u32>;
  }

  /** @name PalletStakingSlashingSpanRecord (477) */
  interface PalletStakingSlashingSpanRecord extends Struct {
    readonly slashed: u128;
    readonly paidOut: u128;
  }

  /** @name PalletStakingPalletError (480) */
  interface PalletStakingPalletError extends Enum {
    readonly isNotController: boolean;
    readonly isNotStash: boolean;
    readonly isAlreadyBonded: boolean;
    readonly isAlreadyPaired: boolean;
    readonly isEmptyTargets: boolean;
    readonly isDuplicateIndex: boolean;
    readonly isInvalidSlashIndex: boolean;
    readonly isInsufficientBond: boolean;
    readonly isNoMoreChunks: boolean;
    readonly isNoUnlockChunk: boolean;
    readonly isFundedTarget: boolean;
    readonly isInvalidEraToReward: boolean;
    readonly isInvalidNumberOfNominations: boolean;
    readonly isNotSortedAndUnique: boolean;
    readonly isAlreadyClaimed: boolean;
    readonly isIncorrectHistoryDepth: boolean;
    readonly isIncorrectSlashingSpans: boolean;
    readonly isBadState: boolean;
    readonly isTooManyTargets: boolean;
    readonly isBadTarget: boolean;
    readonly isCannotChillOther: boolean;
    readonly isTooManyNominators: boolean;
    readonly isTooManyValidators: boolean;
    readonly isCommissionTooLow: boolean;
    readonly isBoundNotMet: boolean;
    readonly type: 'NotController' | 'NotStash' | 'AlreadyBonded' | 'AlreadyPaired' | 'EmptyTargets' | 'DuplicateIndex' | 'InvalidSlashIndex' | 'InsufficientBond' | 'NoMoreChunks' | 'NoUnlockChunk' | 'FundedTarget' | 'InvalidEraToReward' | 'InvalidNumberOfNominations' | 'NotSortedAndUnique' | 'AlreadyClaimed' | 'IncorrectHistoryDepth' | 'IncorrectSlashingSpans' | 'BadState' | 'TooManyTargets' | 'BadTarget' | 'CannotChillOther' | 'TooManyNominators' | 'TooManyValidators' | 'CommissionTooLow' | 'BoundNotMet';
  }

  /** @name PalletFastUnstakeUnstakeRequest (481) */
  interface PalletFastUnstakeUnstakeRequest extends Struct {
    readonly stashes: Vec<ITuple<[AccountId32, u128]>>;
    readonly checked: Vec<u32>;
  }

  /** @name PalletFastUnstakeError (484) */
  interface PalletFastUnstakeError extends Enum {
    readonly isNotController: boolean;
    readonly isAlreadyQueued: boolean;
    readonly isNotFullyBonded: boolean;
    readonly isNotQueued: boolean;
    readonly isAlreadyHead: boolean;
    readonly isCallNotAllowed: boolean;
    readonly type: 'NotController' | 'AlreadyQueued' | 'NotFullyBonded' | 'NotQueued' | 'AlreadyHead' | 'CallNotAllowed';
  }

  /** @name PalletBagsListListNode (485) */
  interface PalletBagsListListNode extends Struct {
    readonly id: AccountId32;
    readonly prev: Option<AccountId32>;
    readonly next: Option<AccountId32>;
    readonly bagUpper: u64;
    readonly score: u64;
  }

  /** @name PalletBagsListListBag (486) */
  interface PalletBagsListListBag extends Struct {
    readonly head: Option<AccountId32>;
    readonly tail: Option<AccountId32>;
  }

  /** @name PalletBagsListError (488) */
  interface PalletBagsListError extends Enum {
    readonly isList: boolean;
    readonly asList: PalletBagsListListListError;
    readonly type: 'List';
  }

  /** @name PalletBagsListListListError (489) */
  interface PalletBagsListListListError extends Enum {
    readonly isDuplicate: boolean;
    readonly isNotHeavier: boolean;
    readonly isNotInSameBag: boolean;
    readonly isNodeNotFound: boolean;
    readonly type: 'Duplicate' | 'NotHeavier' | 'NotInSameBag' | 'NodeNotFound';
  }

  /** @name PalletNominationPoolsPoolMember (490) */
  interface PalletNominationPoolsPoolMember extends Struct {
    readonly poolId: u32;
    readonly points: u128;
    readonly lastRecordedRewardCounter: u128;
    readonly unbondingEras: BTreeMap<u32, u128>;
  }

  /** @name PalletNominationPoolsBondedPoolInner (495) */
  interface PalletNominationPoolsBondedPoolInner extends Struct {
    readonly commission: PalletNominationPoolsCommission;
    readonly memberCounter: u32;
    readonly points: u128;
    readonly roles: PalletNominationPoolsPoolRoles;
    readonly state: PalletNominationPoolsPoolState;
  }

  /** @name PalletNominationPoolsCommission (496) */
  interface PalletNominationPoolsCommission extends Struct {
    readonly current: Option<ITuple<[Perbill, AccountId32]>>;
    readonly max: Option<Perbill>;
    readonly changeRate: Option<PalletNominationPoolsCommissionChangeRate>;
    readonly throttleFrom: Option<u32>;
  }

  /** @name PalletNominationPoolsPoolRoles (499) */
  interface PalletNominationPoolsPoolRoles extends Struct {
    readonly depositor: AccountId32;
    readonly root: Option<AccountId32>;
    readonly nominator: Option<AccountId32>;
    readonly bouncer: Option<AccountId32>;
  }

  /** @name PalletNominationPoolsRewardPool (500) */
  interface PalletNominationPoolsRewardPool extends Struct {
    readonly lastRecordedRewardCounter: u128;
    readonly lastRecordedTotalPayouts: u128;
    readonly totalRewardsClaimed: u128;
    readonly totalCommissionPending: u128;
    readonly totalCommissionClaimed: u128;
  }

  /** @name PalletNominationPoolsSubPools (501) */
  interface PalletNominationPoolsSubPools extends Struct {
    readonly noEra: PalletNominationPoolsUnbondPool;
    readonly withEra: BTreeMap<u32, PalletNominationPoolsUnbondPool>;
  }

  /** @name PalletNominationPoolsUnbondPool (502) */
  interface PalletNominationPoolsUnbondPool extends Struct {
    readonly points: u128;
    readonly balance: u128;
  }

  /** @name FrameSupportPalletId (507) */
  interface FrameSupportPalletId extends U8aFixed {}

  /** @name PalletNominationPoolsError (508) */
  interface PalletNominationPoolsError extends Enum {
    readonly isPoolNotFound: boolean;
    readonly isPoolMemberNotFound: boolean;
    readonly isRewardPoolNotFound: boolean;
    readonly isSubPoolsNotFound: boolean;
    readonly isAccountBelongsToOtherPool: boolean;
    readonly isFullyUnbonding: boolean;
    readonly isMaxUnbondingLimit: boolean;
    readonly isCannotWithdrawAny: boolean;
    readonly isMinimumBondNotMet: boolean;
    readonly isOverflowRisk: boolean;
    readonly isNotDestroying: boolean;
    readonly isNotNominator: boolean;
    readonly isNotKickerOrDestroying: boolean;
    readonly isNotOpen: boolean;
    readonly isMaxPools: boolean;
    readonly isMaxPoolMembers: boolean;
    readonly isCanNotChangeState: boolean;
    readonly isDoesNotHavePermission: boolean;
    readonly isMetadataExceedsMaxLen: boolean;
    readonly isDefensive: boolean;
    readonly asDefensive: PalletNominationPoolsDefensiveError;
    readonly isPartialUnbondNotAllowedPermissionlessly: boolean;
    readonly isMaxCommissionRestricted: boolean;
    readonly isCommissionExceedsMaximum: boolean;
    readonly isCommissionExceedsGlobalMaximum: boolean;
    readonly isCommissionChangeThrottled: boolean;
    readonly isCommissionChangeRateNotAllowed: boolean;
    readonly isNoPendingCommission: boolean;
    readonly isNoCommissionCurrentSet: boolean;
    readonly isPoolIdInUse: boolean;
    readonly isInvalidPoolId: boolean;
    readonly isBondExtraRestricted: boolean;
    readonly type: 'PoolNotFound' | 'PoolMemberNotFound' | 'RewardPoolNotFound' | 'SubPoolsNotFound' | 'AccountBelongsToOtherPool' | 'FullyUnbonding' | 'MaxUnbondingLimit' | 'CannotWithdrawAny' | 'MinimumBondNotMet' | 'OverflowRisk' | 'NotDestroying' | 'NotNominator' | 'NotKickerOrDestroying' | 'NotOpen' | 'MaxPools' | 'MaxPoolMembers' | 'CanNotChangeState' | 'DoesNotHavePermission' | 'MetadataExceedsMaxLen' | 'Defensive' | 'PartialUnbondNotAllowedPermissionlessly' | 'MaxCommissionRestricted' | 'CommissionExceedsMaximum' | 'CommissionExceedsGlobalMaximum' | 'CommissionChangeThrottled' | 'CommissionChangeRateNotAllowed' | 'NoPendingCommission' | 'NoCommissionCurrentSet' | 'PoolIdInUse' | 'InvalidPoolId' | 'BondExtraRestricted';
  }

  /** @name PalletNominationPoolsDefensiveError (509) */
  interface PalletNominationPoolsDefensiveError extends Enum {
    readonly isNotEnoughSpaceInUnbondPool: boolean;
    readonly isPoolNotFound: boolean;
    readonly isRewardPoolNotFound: boolean;
    readonly isSubPoolsNotFound: boolean;
    readonly isBondedStashKilledPrematurely: boolean;
    readonly type: 'NotEnoughSpaceInUnbondPool' | 'PoolNotFound' | 'RewardPoolNotFound' | 'SubPoolsNotFound' | 'BondedStashKilledPrematurely';
  }

  /** @name SpCoreCryptoKeyTypeId (513) */
  interface SpCoreCryptoKeyTypeId extends U8aFixed {}

  /** @name PalletSessionError (514) */
  interface PalletSessionError extends Enum {
    readonly isInvalidProof: boolean;
    readonly isNoAssociatedValidatorId: boolean;
    readonly isDuplicatedKey: boolean;
    readonly isNoKeys: boolean;
    readonly isNoAccount: boolean;
    readonly type: 'InvalidProof' | 'NoAssociatedValidatorId' | 'DuplicatedKey' | 'NoKeys' | 'NoAccount';
  }

  /** @name PalletDemocracyReferendumInfo (520) */
  interface PalletDemocracyReferendumInfo extends Enum {
    readonly isOngoing: boolean;
    readonly asOngoing: PalletDemocracyReferendumStatus;
    readonly isFinished: boolean;
    readonly asFinished: {
      readonly approved: bool;
      readonly end: u32;
    } & Struct;
    readonly type: 'Ongoing' | 'Finished';
  }

  /** @name PalletDemocracyReferendumStatus (521) */
  interface PalletDemocracyReferendumStatus extends Struct {
    readonly end: u32;
    readonly proposal: FrameSupportPreimagesBounded;
    readonly threshold: PalletDemocracyVoteThreshold;
    readonly delay: u32;
    readonly tally: PalletDemocracyTally;
  }

  /** @name PalletDemocracyTally (522) */
  interface PalletDemocracyTally extends Struct {
    readonly ayes: u128;
    readonly nays: u128;
    readonly turnout: u128;
  }

  /** @name PalletDemocracyVoteVoting (523) */
  interface PalletDemocracyVoteVoting extends Enum {
    readonly isDirect: boolean;
    readonly asDirect: {
      readonly votes: Vec<ITuple<[u32, PalletDemocracyVoteAccountVote]>>;
      readonly delegations: PalletDemocracyDelegations;
      readonly prior: PalletDemocracyVotePriorLock;
    } & Struct;
    readonly isDelegating: boolean;
    readonly asDelegating: {
      readonly balance: u128;
      readonly target: AccountId32;
      readonly conviction: PalletDemocracyConviction;
      readonly delegations: PalletDemocracyDelegations;
      readonly prior: PalletDemocracyVotePriorLock;
    } & Struct;
    readonly type: 'Direct' | 'Delegating';
  }

  /** @name PalletDemocracyDelegations (527) */
  interface PalletDemocracyDelegations extends Struct {
    readonly votes: u128;
    readonly capital: u128;
  }

  /** @name PalletDemocracyVotePriorLock (528) */
  interface PalletDemocracyVotePriorLock extends ITuple<[u32, u128]> {}

  /** @name PalletDemocracyError (531) */
  interface PalletDemocracyError extends Enum {
    readonly isValueLow: boolean;
    readonly isProposalMissing: boolean;
    readonly isAlreadyCanceled: boolean;
    readonly isDuplicateProposal: boolean;
    readonly isProposalBlacklisted: boolean;
    readonly isNotSimpleMajority: boolean;
    readonly isInvalidHash: boolean;
    readonly isNoProposal: boolean;
    readonly isAlreadyVetoed: boolean;
    readonly isReferendumInvalid: boolean;
    readonly isNoneWaiting: boolean;
    readonly isNotVoter: boolean;
    readonly isNoPermission: boolean;
    readonly isAlreadyDelegating: boolean;
    readonly isInsufficientFunds: boolean;
    readonly isNotDelegating: boolean;
    readonly isVotesExist: boolean;
    readonly isInstantNotAllowed: boolean;
    readonly isNonsense: boolean;
    readonly isWrongUpperBound: boolean;
    readonly isMaxVotesReached: boolean;
    readonly isTooMany: boolean;
    readonly isVotingPeriodLow: boolean;
    readonly isPreimageNotExist: boolean;
    readonly type: 'ValueLow' | 'ProposalMissing' | 'AlreadyCanceled' | 'DuplicateProposal' | 'ProposalBlacklisted' | 'NotSimpleMajority' | 'InvalidHash' | 'NoProposal' | 'AlreadyVetoed' | 'ReferendumInvalid' | 'NoneWaiting' | 'NotVoter' | 'NoPermission' | 'AlreadyDelegating' | 'InsufficientFunds' | 'NotDelegating' | 'VotesExist' | 'InstantNotAllowed' | 'Nonsense' | 'WrongUpperBound' | 'MaxVotesReached' | 'TooMany' | 'VotingPeriodLow' | 'PreimageNotExist';
  }

  /** @name PalletCollectiveVotes (533) */
  interface PalletCollectiveVotes extends Struct {
    readonly index: u32;
    readonly threshold: u32;
    readonly ayes: Vec<AccountId32>;
    readonly nays: Vec<AccountId32>;
    readonly end: u32;
  }

  /** @name PalletCollectiveError (534) */
  interface PalletCollectiveError extends Enum {
    readonly isNotMember: boolean;
    readonly isDuplicateProposal: boolean;
    readonly isProposalMissing: boolean;
    readonly isWrongIndex: boolean;
    readonly isDuplicateVote: boolean;
    readonly isAlreadyInitialized: boolean;
    readonly isTooEarly: boolean;
    readonly isTooManyProposals: boolean;
    readonly isWrongProposalWeight: boolean;
    readonly isWrongProposalLength: boolean;
    readonly isPrimeAccountNotMember: boolean;
    readonly type: 'NotMember' | 'DuplicateProposal' | 'ProposalMissing' | 'WrongIndex' | 'DuplicateVote' | 'AlreadyInitialized' | 'TooEarly' | 'TooManyProposals' | 'WrongProposalWeight' | 'WrongProposalLength' | 'PrimeAccountNotMember';
  }

  /** @name PalletElectionsPhragmenSeatHolder (538) */
  interface PalletElectionsPhragmenSeatHolder extends Struct {
    readonly who: AccountId32;
    readonly stake: u128;
    readonly deposit: u128;
  }

  /** @name PalletElectionsPhragmenVoter (539) */
  interface PalletElectionsPhragmenVoter extends Struct {
    readonly votes: Vec<AccountId32>;
    readonly stake: u128;
    readonly deposit: u128;
  }

  /** @name PalletElectionsPhragmenError (540) */
  interface PalletElectionsPhragmenError extends Enum {
    readonly isUnableToVote: boolean;
    readonly isNoVotes: boolean;
    readonly isTooManyVotes: boolean;
    readonly isMaximumVotesExceeded: boolean;
    readonly isLowBalance: boolean;
    readonly isUnableToPayBond: boolean;
    readonly isMustBeVoter: boolean;
    readonly isDuplicatedCandidate: boolean;
    readonly isTooManyCandidates: boolean;
    readonly isMemberSubmit: boolean;
    readonly isRunnerUpSubmit: boolean;
    readonly isInsufficientCandidateFunds: boolean;
    readonly isNotMember: boolean;
    readonly isInvalidWitnessData: boolean;
    readonly isInvalidVoteCount: boolean;
    readonly isInvalidRenouncing: boolean;
    readonly isInvalidReplacement: boolean;
    readonly type: 'UnableToVote' | 'NoVotes' | 'TooManyVotes' | 'MaximumVotesExceeded' | 'LowBalance' | 'UnableToPayBond' | 'MustBeVoter' | 'DuplicatedCandidate' | 'TooManyCandidates' | 'MemberSubmit' | 'RunnerUpSubmit' | 'InsufficientCandidateFunds' | 'NotMember' | 'InvalidWitnessData' | 'InvalidVoteCount' | 'InvalidRenouncing' | 'InvalidReplacement';
  }

  /** @name PalletMembershipError (542) */
  interface PalletMembershipError extends Enum {
    readonly isAlreadyMember: boolean;
    readonly isNotMember: boolean;
    readonly isTooManyMembers: boolean;
    readonly type: 'AlreadyMember' | 'NotMember' | 'TooManyMembers';
  }

  /** @name PalletGrandpaStoredState (543) */
  interface PalletGrandpaStoredState extends Enum {
    readonly isLive: boolean;
    readonly isPendingPause: boolean;
    readonly asPendingPause: {
      readonly scheduledAt: u32;
      readonly delay: u32;
    } & Struct;
    readonly isPaused: boolean;
    readonly isPendingResume: boolean;
    readonly asPendingResume: {
      readonly scheduledAt: u32;
      readonly delay: u32;
    } & Struct;
    readonly type: 'Live' | 'PendingPause' | 'Paused' | 'PendingResume';
  }

  /** @name PalletGrandpaStoredPendingChange (544) */
  interface PalletGrandpaStoredPendingChange extends Struct {
    readonly scheduledAt: u32;
    readonly delay: u32;
    readonly nextAuthorities: Vec<ITuple<[SpConsensusGrandpaAppPublic, u64]>>;
    readonly forced: Option<u32>;
  }

  /** @name PalletGrandpaError (546) */
  interface PalletGrandpaError extends Enum {
    readonly isPauseFailed: boolean;
    readonly isResumeFailed: boolean;
    readonly isChangePending: boolean;
    readonly isTooSoon: boolean;
    readonly isInvalidKeyOwnershipProof: boolean;
    readonly isInvalidEquivocationProof: boolean;
    readonly isDuplicateOffenceReport: boolean;
    readonly type: 'PauseFailed' | 'ResumeFailed' | 'ChangePending' | 'TooSoon' | 'InvalidKeyOwnershipProof' | 'InvalidEquivocationProof' | 'DuplicateOffenceReport';
  }

  /** @name PalletTreasuryProposal (547) */
  interface PalletTreasuryProposal extends Struct {
    readonly proposer: AccountId32;
    readonly value: u128;
    readonly beneficiary: AccountId32;
    readonly bond: u128;
  }

  /** @name PalletTreasuryError (549) */
  interface PalletTreasuryError extends Enum {
    readonly isInsufficientProposersBalance: boolean;
    readonly isInvalidIndex: boolean;
    readonly isTooManyApprovals: boolean;
    readonly isInsufficientPermission: boolean;
    readonly isProposalNotApproved: boolean;
    readonly type: 'InsufficientProposersBalance' | 'InvalidIndex' | 'TooManyApprovals' | 'InsufficientPermission' | 'ProposalNotApproved';
  }

  /** @name PalletSudoError (550) */
  interface PalletSudoError extends Enum {
    readonly isRequireSudo: boolean;
    readonly type: 'RequireSudo';
  }

  /** @name PalletImOnlineError (553) */
  interface PalletImOnlineError extends Enum {
    readonly isInvalidKey: boolean;
    readonly isDuplicatedHeartbeat: boolean;
    readonly type: 'InvalidKey' | 'DuplicatedHeartbeat';
  }

  /** @name SpStakingOffenceOffenceDetails (556) */
  interface SpStakingOffenceOffenceDetails extends Struct {
    readonly offender: ITuple<[AccountId32, PalletStakingExposure]>;
    readonly reporters: Vec<AccountId32>;
  }

  /** @name PalletIdentityRegistration (560) */
  interface PalletIdentityRegistration extends Struct {
    readonly judgements: Vec<ITuple<[u32, PalletIdentityJudgement]>>;
    readonly deposit: u128;
    readonly info: PalletIdentityIdentityInfo;
  }

  /** @name PalletIdentityRegistrarInfo (568) */
  interface PalletIdentityRegistrarInfo extends Struct {
    readonly account: AccountId32;
    readonly fee: u128;
    readonly fields: PalletIdentityBitFlags;
  }

  /** @name PalletIdentityError (570) */
  interface PalletIdentityError extends Enum {
    readonly isTooManySubAccounts: boolean;
    readonly isNotFound: boolean;
    readonly isNotNamed: boolean;
    readonly isEmptyIndex: boolean;
    readonly isFeeChanged: boolean;
    readonly isNoIdentity: boolean;
    readonly isStickyJudgement: boolean;
    readonly isJudgementGiven: boolean;
    readonly isInvalidJudgement: boolean;
    readonly isInvalidIndex: boolean;
    readonly isInvalidTarget: boolean;
    readonly isTooManyFields: boolean;
    readonly isTooManyRegistrars: boolean;
    readonly isAlreadyClaimed: boolean;
    readonly isNotSub: boolean;
    readonly isNotOwned: boolean;
    readonly isJudgementForDifferentIdentity: boolean;
    readonly isJudgementPaymentFailed: boolean;
    readonly type: 'TooManySubAccounts' | 'NotFound' | 'NotNamed' | 'EmptyIndex' | 'FeeChanged' | 'NoIdentity' | 'StickyJudgement' | 'JudgementGiven' | 'InvalidJudgement' | 'InvalidIndex' | 'InvalidTarget' | 'TooManyFields' | 'TooManyRegistrars' | 'AlreadyClaimed' | 'NotSub' | 'NotOwned' | 'JudgementForDifferentIdentity' | 'JudgementPaymentFailed';
  }

  /** @name PalletSocietyMemberRecord (571) */
  interface PalletSocietyMemberRecord extends Struct {
    readonly rank: u32;
    readonly strikes: u32;
    readonly vouching: Option<PalletSocietyVouchingStatus>;
    readonly index: u32;
  }

  /** @name PalletSocietyVouchingStatus (573) */
  interface PalletSocietyVouchingStatus extends Enum {
    readonly isVouching: boolean;
    readonly isBanned: boolean;
    readonly type: 'Vouching' | 'Banned';
  }

  /** @name PalletSocietyPayoutRecord (574) */
  interface PalletSocietyPayoutRecord extends Struct {
    readonly paid: u128;
    readonly payouts: Vec<ITuple<[u32, u128]>>;
  }

  /** @name PalletSocietyBid (577) */
  interface PalletSocietyBid extends Struct {
    readonly who: AccountId32;
    readonly kind: PalletSocietyBidKind;
    readonly value: u128;
  }

  /** @name PalletSocietyBidKind (578) */
  interface PalletSocietyBidKind extends Enum {
    readonly isDeposit: boolean;
    readonly asDeposit: u128;
    readonly isVouch: boolean;
    readonly asVouch: ITuple<[AccountId32, u128]>;
    readonly type: 'Deposit' | 'Vouch';
  }

  /** @name PalletSocietyCandidacy (580) */
  interface PalletSocietyCandidacy extends Struct {
    readonly round: u32;
    readonly kind: PalletSocietyBidKind;
    readonly bid: u128;
    readonly tally: PalletSocietyTally;
    readonly skepticStruck: bool;
  }

  /** @name PalletSocietyTally (581) */
  interface PalletSocietyTally extends Struct {
    readonly approvals: u32;
    readonly rejections: u32;
  }

  /** @name PalletSocietyVote (583) */
  interface PalletSocietyVote extends Struct {
    readonly approve: bool;
    readonly weight: u32;
  }

  /** @name PalletSocietyIntakeRecord (585) */
  interface PalletSocietyIntakeRecord extends Struct {
    readonly who: AccountId32;
    readonly bid: u128;
    readonly round: u32;
  }

  /** @name PalletSocietyError (587) */
  interface PalletSocietyError extends Enum {
    readonly isNotMember: boolean;
    readonly isAlreadyMember: boolean;
    readonly isSuspended: boolean;
    readonly isNotSuspended: boolean;
    readonly isNoPayout: boolean;
    readonly isAlreadyFounded: boolean;
    readonly isInsufficientPot: boolean;
    readonly isAlreadyVouching: boolean;
    readonly isNotVouchingOnBidder: boolean;
    readonly isHead: boolean;
    readonly isFounder: boolean;
    readonly isAlreadyBid: boolean;
    readonly isAlreadyCandidate: boolean;
    readonly isNotCandidate: boolean;
    readonly isMaxMembers: boolean;
    readonly isNotFounder: boolean;
    readonly isNotHead: boolean;
    readonly isNotApproved: boolean;
    readonly isNotRejected: boolean;
    readonly isApproved: boolean;
    readonly isRejected: boolean;
    readonly isInProgress: boolean;
    readonly isTooEarly: boolean;
    readonly isVoted: boolean;
    readonly isExpired: boolean;
    readonly isNotBidder: boolean;
    readonly isNoDefender: boolean;
    readonly isNotGroup: boolean;
    readonly isAlreadyElevated: boolean;
    readonly isAlreadyPunished: boolean;
    readonly isInsufficientFunds: boolean;
    readonly isNoVotes: boolean;
    readonly type: 'NotMember' | 'AlreadyMember' | 'Suspended' | 'NotSuspended' | 'NoPayout' | 'AlreadyFounded' | 'InsufficientPot' | 'AlreadyVouching' | 'NotVouchingOnBidder' | 'Head' | 'Founder' | 'AlreadyBid' | 'AlreadyCandidate' | 'NotCandidate' | 'MaxMembers' | 'NotFounder' | 'NotHead' | 'NotApproved' | 'NotRejected' | 'Approved' | 'Rejected' | 'InProgress' | 'TooEarly' | 'Voted' | 'Expired' | 'NotBidder' | 'NoDefender' | 'NotGroup' | 'AlreadyElevated' | 'AlreadyPunished' | 'InsufficientFunds' | 'NoVotes';
  }

  /** @name PalletRecoveryRecoveryConfig (588) */
  interface PalletRecoveryRecoveryConfig extends Struct {
    readonly delayPeriod: u32;
    readonly deposit: u128;
    readonly friends: Vec<AccountId32>;
    readonly threshold: u16;
  }

  /** @name PalletRecoveryActiveRecovery (590) */
  interface PalletRecoveryActiveRecovery extends Struct {
    readonly created: u32;
    readonly deposit: u128;
    readonly friends: Vec<AccountId32>;
  }

  /** @name PalletRecoveryError (591) */
  interface PalletRecoveryError extends Enum {
    readonly isNotAllowed: boolean;
    readonly isZeroThreshold: boolean;
    readonly isNotEnoughFriends: boolean;
    readonly isMaxFriends: boolean;
    readonly isNotSorted: boolean;
    readonly isNotRecoverable: boolean;
    readonly isAlreadyRecoverable: boolean;
    readonly isAlreadyStarted: boolean;
    readonly isNotStarted: boolean;
    readonly isNotFriend: boolean;
    readonly isDelayPeriod: boolean;
    readonly isAlreadyVouched: boolean;
    readonly isThreshold: boolean;
    readonly isStillActive: boolean;
    readonly isAlreadyProxy: boolean;
    readonly isBadState: boolean;
    readonly type: 'NotAllowed' | 'ZeroThreshold' | 'NotEnoughFriends' | 'MaxFriends' | 'NotSorted' | 'NotRecoverable' | 'AlreadyRecoverable' | 'AlreadyStarted' | 'NotStarted' | 'NotFriend' | 'DelayPeriod' | 'AlreadyVouched' | 'Threshold' | 'StillActive' | 'AlreadyProxy' | 'BadState';
  }

  /** @name PalletVestingReleases (594) */
  interface PalletVestingReleases extends Enum {
    readonly isV0: boolean;
    readonly isV1: boolean;
    readonly type: 'V0' | 'V1';
  }

  /** @name PalletVestingError (595) */
  interface PalletVestingError extends Enum {
    readonly isNotVesting: boolean;
    readonly isAtMaxVestingSchedules: boolean;
    readonly isAmountLow: boolean;
    readonly isScheduleIndexOutOfBounds: boolean;
    readonly isInvalidScheduleParams: boolean;
    readonly type: 'NotVesting' | 'AtMaxVestingSchedules' | 'AmountLow' | 'ScheduleIndexOutOfBounds' | 'InvalidScheduleParams';
  }

  /** @name PalletSchedulerScheduled (598) */
  interface PalletSchedulerScheduled extends Struct {
    readonly maybeId: Option<U8aFixed>;
    readonly priority: u8;
    readonly call: FrameSupportPreimagesBounded;
    readonly maybePeriodic: Option<ITuple<[u32, u32]>>;
    readonly origin: PhalaNodeRuntimeOriginCaller;
  }

  /** @name PalletSchedulerError (600) */
  interface PalletSchedulerError extends Enum {
    readonly isFailedToSchedule: boolean;
    readonly isNotFound: boolean;
    readonly isTargetBlockNumberInPast: boolean;
    readonly isRescheduleNoChange: boolean;
    readonly isNamed: boolean;
    readonly type: 'FailedToSchedule' | 'NotFound' | 'TargetBlockNumberInPast' | 'RescheduleNoChange' | 'Named';
  }

  /** @name PalletPreimageOldRequestStatus (601) */
  interface PalletPreimageOldRequestStatus extends Enum {
    readonly isUnrequested: boolean;
    readonly asUnrequested: {
      readonly deposit: ITuple<[AccountId32, u128]>;
      readonly len: u32;
    } & Struct;
    readonly isRequested: boolean;
    readonly asRequested: {
      readonly deposit: Option<ITuple<[AccountId32, u128]>>;
      readonly count: u32;
      readonly len: Option<u32>;
    } & Struct;
    readonly type: 'Unrequested' | 'Requested';
  }

  /** @name PalletPreimageRequestStatus (603) */
  interface PalletPreimageRequestStatus extends Enum {
    readonly isUnrequested: boolean;
    readonly asUnrequested: {
      readonly ticket: ITuple<[AccountId32, u128]>;
      readonly len: u32;
    } & Struct;
    readonly isRequested: boolean;
    readonly asRequested: {
      readonly maybeTicket: Option<ITuple<[AccountId32, u128]>>;
      readonly count: u32;
      readonly maybeLen: Option<u32>;
    } & Struct;
    readonly type: 'Unrequested' | 'Requested';
  }

  /** @name PalletPreimageError (608) */
  interface PalletPreimageError extends Enum {
    readonly isTooBig: boolean;
    readonly isAlreadyNoted: boolean;
    readonly isNotAuthorized: boolean;
    readonly isNotNoted: boolean;
    readonly isRequested: boolean;
    readonly isNotRequested: boolean;
    readonly isTooMany: boolean;
    readonly isTooFew: boolean;
    readonly type: 'TooBig' | 'AlreadyNoted' | 'NotAuthorized' | 'NotNoted' | 'Requested' | 'NotRequested' | 'TooMany' | 'TooFew';
  }

  /** @name PalletProxyProxyDefinition (611) */
  interface PalletProxyProxyDefinition extends Struct {
    readonly delegate: AccountId32;
    readonly proxyType: PhalaNodeRuntimeProxyType;
    readonly delay: u32;
  }

  /** @name PalletProxyAnnouncement (615) */
  interface PalletProxyAnnouncement extends Struct {
    readonly real: AccountId32;
    readonly callHash: H256;
    readonly height: u32;
  }

  /** @name PalletProxyError (617) */
  interface PalletProxyError extends Enum {
    readonly isTooMany: boolean;
    readonly isNotFound: boolean;
    readonly isNotProxy: boolean;
    readonly isUnproxyable: boolean;
    readonly isDuplicate: boolean;
    readonly isNoPermission: boolean;
    readonly isUnannounced: boolean;
    readonly isNoSelfProxy: boolean;
    readonly type: 'TooMany' | 'NotFound' | 'NotProxy' | 'Unproxyable' | 'Duplicate' | 'NoPermission' | 'Unannounced' | 'NoSelfProxy';
  }

  /** @name PalletMultisigMultisig (619) */
  interface PalletMultisigMultisig extends Struct {
    readonly when: PalletMultisigTimepoint;
    readonly deposit: u128;
    readonly depositor: AccountId32;
    readonly approvals: Vec<AccountId32>;
  }

  /** @name PalletMultisigError (621) */
  interface PalletMultisigError extends Enum {
    readonly isMinimumThreshold: boolean;
    readonly isAlreadyApproved: boolean;
    readonly isNoApprovalsNeeded: boolean;
    readonly isTooFewSignatories: boolean;
    readonly isTooManySignatories: boolean;
    readonly isSignatoriesOutOfOrder: boolean;
    readonly isSenderInSignatories: boolean;
    readonly isNotFound: boolean;
    readonly isNotOwner: boolean;
    readonly isNoTimepoint: boolean;
    readonly isWrongTimepoint: boolean;
    readonly isUnexpectedTimepoint: boolean;
    readonly isMaxWeightTooLow: boolean;
    readonly isAlreadyStored: boolean;
    readonly type: 'MinimumThreshold' | 'AlreadyApproved' | 'NoApprovalsNeeded' | 'TooFewSignatories' | 'TooManySignatories' | 'SignatoriesOutOfOrder' | 'SenderInSignatories' | 'NotFound' | 'NotOwner' | 'NoTimepoint' | 'WrongTimepoint' | 'UnexpectedTimepoint' | 'MaxWeightTooLow' | 'AlreadyStored';
  }

  /** @name PalletBountiesBounty (622) */
  interface PalletBountiesBounty extends Struct {
    readonly proposer: AccountId32;
    readonly value: u128;
    readonly fee: u128;
    readonly curatorDeposit: u128;
    readonly bond: u128;
    readonly status: PalletBountiesBountyStatus;
  }

  /** @name PalletBountiesBountyStatus (623) */
  interface PalletBountiesBountyStatus extends Enum {
    readonly isProposed: boolean;
    readonly isApproved: boolean;
    readonly isFunded: boolean;
    readonly isCuratorProposed: boolean;
    readonly asCuratorProposed: {
      readonly curator: AccountId32;
    } & Struct;
    readonly isActive: boolean;
    readonly asActive: {
      readonly curator: AccountId32;
      readonly updateDue: u32;
    } & Struct;
    readonly isPendingPayout: boolean;
    readonly asPendingPayout: {
      readonly curator: AccountId32;
      readonly beneficiary: AccountId32;
      readonly unlockAt: u32;
    } & Struct;
    readonly type: 'Proposed' | 'Approved' | 'Funded' | 'CuratorProposed' | 'Active' | 'PendingPayout';
  }

  /** @name PalletBountiesError (625) */
  interface PalletBountiesError extends Enum {
    readonly isInsufficientProposersBalance: boolean;
    readonly isInvalidIndex: boolean;
    readonly isReasonTooBig: boolean;
    readonly isUnexpectedStatus: boolean;
    readonly isRequireCurator: boolean;
    readonly isInvalidValue: boolean;
    readonly isInvalidFee: boolean;
    readonly isPendingPayout: boolean;
    readonly isPremature: boolean;
    readonly isHasActiveChildBounty: boolean;
    readonly isTooManyQueued: boolean;
    readonly type: 'InsufficientProposersBalance' | 'InvalidIndex' | 'ReasonTooBig' | 'UnexpectedStatus' | 'RequireCurator' | 'InvalidValue' | 'InvalidFee' | 'PendingPayout' | 'Premature' | 'HasActiveChildBounty' | 'TooManyQueued';
  }

  /** @name PalletTipsOpenTip (626) */
  interface PalletTipsOpenTip extends Struct {
    readonly reason: H256;
    readonly who: AccountId32;
    readonly finder: AccountId32;
    readonly deposit: u128;
    readonly closes: Option<u32>;
    readonly tips: Vec<ITuple<[AccountId32, u128]>>;
    readonly findersFee: bool;
  }

  /** @name PalletTipsError (627) */
  interface PalletTipsError extends Enum {
    readonly isReasonTooBig: boolean;
    readonly isAlreadyKnown: boolean;
    readonly isUnknownTip: boolean;
    readonly isNotFinder: boolean;
    readonly isStillOpen: boolean;
    readonly isPremature: boolean;
    readonly type: 'ReasonTooBig' | 'AlreadyKnown' | 'UnknownTip' | 'NotFinder' | 'StillOpen' | 'Premature';
  }

  /** @name PalletLotteryLotteryConfig (628) */
  interface PalletLotteryLotteryConfig extends Struct {
    readonly price: u128;
    readonly start: u32;
    readonly length: u32;
    readonly delay: u32;
    readonly repeat: bool;
  }

  /** @name PalletLotteryError (632) */
  interface PalletLotteryError extends Enum {
    readonly isNotConfigured: boolean;
    readonly isInProgress: boolean;
    readonly isAlreadyEnded: boolean;
    readonly isInvalidCall: boolean;
    readonly isAlreadyParticipating: boolean;
    readonly isTooManyCalls: boolean;
    readonly isEncodingFailed: boolean;
    readonly type: 'NotConfigured' | 'InProgress' | 'AlreadyEnded' | 'InvalidCall' | 'AlreadyParticipating' | 'TooManyCalls' | 'EncodingFailed';
  }

  /** @name PalletChildBountiesChildBounty (633) */
  interface PalletChildBountiesChildBounty extends Struct {
    readonly parentBounty: u32;
    readonly value: u128;
    readonly fee: u128;
    readonly curatorDeposit: u128;
    readonly status: PalletChildBountiesChildBountyStatus;
  }

  /** @name PalletChildBountiesChildBountyStatus (634) */
  interface PalletChildBountiesChildBountyStatus extends Enum {
    readonly isAdded: boolean;
    readonly isCuratorProposed: boolean;
    readonly asCuratorProposed: {
      readonly curator: AccountId32;
    } & Struct;
    readonly isActive: boolean;
    readonly asActive: {
      readonly curator: AccountId32;
    } & Struct;
    readonly isPendingPayout: boolean;
    readonly asPendingPayout: {
      readonly curator: AccountId32;
      readonly beneficiary: AccountId32;
      readonly unlockAt: u32;
    } & Struct;
    readonly type: 'Added' | 'CuratorProposed' | 'Active' | 'PendingPayout';
  }

  /** @name PalletChildBountiesError (635) */
  interface PalletChildBountiesError extends Enum {
    readonly isParentBountyNotActive: boolean;
    readonly isInsufficientBountyBalance: boolean;
    readonly isTooManyChildBounties: boolean;
    readonly type: 'ParentBountyNotActive' | 'InsufficientBountyBalance' | 'TooManyChildBounties';
  }

  /** @name PhalaPalletsMqPalletError (637) */
  interface PhalaPalletsMqPalletError extends Enum {
    readonly isBadSender: boolean;
    readonly isBadSequence: boolean;
    readonly isBadDestination: boolean;
    readonly type: 'BadSender' | 'BadSequence' | 'BadDestination';
  }

  /** @name PhalaPalletsRegistryPalletWorkerInfoV2 (639) */
  interface PhalaPalletsRegistryPalletWorkerInfoV2 extends Struct {
    readonly pubkey: SpCoreSr25519Public;
    readonly ecdhPubkey: SpCoreSr25519Public;
    readonly runtimeVersion: u32;
    readonly lastUpdated: u64;
    readonly operator: Option<AccountId32>;
    readonly attestationProvider: Option<PhalaTypesAttestationProvider>;
    readonly confidenceLevel: u8;
    readonly initialScore: Option<u32>;
    readonly features: Vec<u32>;
  }

  /** @name PhalaPalletsRegistryPalletKnownConsensusVersion (642) */
  interface PhalaPalletsRegistryPalletKnownConsensusVersion extends Struct {
    readonly version: u32;
    readonly count: u32;
  }

  /** @name PhalaPalletsRegistryPalletError (643) */
  interface PhalaPalletsRegistryPalletError extends Enum {
    readonly isCannotHandleUnknownMessage: boolean;
    readonly isInvalidSender: boolean;
    readonly isInvalidPubKey: boolean;
    readonly isMalformedSignature: boolean;
    readonly isInvalidSignatureLength: boolean;
    readonly isInvalidSignature: boolean;
    readonly isUnknownContract: boolean;
    readonly isInvalidIASSigningCert: boolean;
    readonly isInvalidReport: boolean;
    readonly isInvalidQuoteStatus: boolean;
    readonly isBadIASReport: boolean;
    readonly isOutdatedIASReport: boolean;
    readonly isUnknownQuoteBodyFormat: boolean;
    readonly isInvalidRuntimeInfoHash: boolean;
    readonly isInvalidRuntimeInfo: boolean;
    readonly isInvalidInput: boolean;
    readonly isInvalidBenchReport: boolean;
    readonly isWorkerNotFound: boolean;
    readonly isNoneAttestationDisabled: boolean;
    readonly isInvalidGatekeeper: boolean;
    readonly isInvalidMasterPubkey: boolean;
    readonly isMasterKeyMismatch: boolean;
    readonly isMasterKeyUninitialized: boolean;
    readonly isGenesisBlockHashRejected: boolean;
    readonly isGenesisBlockHashAlreadyExists: boolean;
    readonly isGenesisBlockHashNotFound: boolean;
    readonly isPRuntimeRejected: boolean;
    readonly isPRuntimeAlreadyExists: boolean;
    readonly isPRuntimeNotFound: boolean;
    readonly isUnknownCluster: boolean;
    readonly isNotImplemented: boolean;
    readonly isCannotRemoveLastGatekeeper: boolean;
    readonly isMasterKeyInRotation: boolean;
    readonly isInvalidRotatedMasterPubkey: boolean;
    readonly isInvalidEndpointSigningTime: boolean;
    readonly isNotMigrationRoot: boolean;
    readonly isParachainIdMismatch: boolean;
    readonly isInvalidConsensusVersion: boolean;
    readonly type: 'CannotHandleUnknownMessage' | 'InvalidSender' | 'InvalidPubKey' | 'MalformedSignature' | 'InvalidSignatureLength' | 'InvalidSignature' | 'UnknownContract' | 'InvalidIASSigningCert' | 'InvalidReport' | 'InvalidQuoteStatus' | 'BadIASReport' | 'OutdatedIASReport' | 'UnknownQuoteBodyFormat' | 'InvalidRuntimeInfoHash' | 'InvalidRuntimeInfo' | 'InvalidInput' | 'InvalidBenchReport' | 'WorkerNotFound' | 'NoneAttestationDisabled' | 'InvalidGatekeeper' | 'InvalidMasterPubkey' | 'MasterKeyMismatch' | 'MasterKeyUninitialized' | 'GenesisBlockHashRejected' | 'GenesisBlockHashAlreadyExists' | 'GenesisBlockHashNotFound' | 'PRuntimeRejected' | 'PRuntimeAlreadyExists' | 'PRuntimeNotFound' | 'UnknownCluster' | 'NotImplemented' | 'CannotRemoveLastGatekeeper' | 'MasterKeyInRotation' | 'InvalidRotatedMasterPubkey' | 'InvalidEndpointSigningTime' | 'NotMigrationRoot' | 'ParachainIdMismatch' | 'InvalidConsensusVersion';
  }

  /** @name PhalaPalletsComputeComputationPalletSessionInfo (644) */
  interface PhalaPalletsComputeComputationPalletSessionInfo extends Struct {
    readonly state: PhalaPalletsComputeComputationPalletWorkerState;
    readonly ve: u128;
    readonly v: u128;
    readonly vUpdatedAt: u64;
    readonly benchmark: PhalaPalletsComputeComputationPalletBenchmark;
    readonly coolDownStart: u64;
    readonly stats: PhalaPalletsComputeComputationPalletSessionStats;
  }

  /** @name PhalaPalletsComputeComputationPalletWorkerState (645) */
  interface PhalaPalletsComputeComputationPalletWorkerState extends Enum {
    readonly isReady: boolean;
    readonly isWorkerIdle: boolean;
    readonly isUnused: boolean;
    readonly isWorkerUnresponsive: boolean;
    readonly isWorkerCoolingDown: boolean;
    readonly type: 'Ready' | 'WorkerIdle' | 'Unused' | 'WorkerUnresponsive' | 'WorkerCoolingDown';
  }

  /** @name PhalaPalletsComputeComputationPalletBenchmark (646) */
  interface PhalaPalletsComputeComputationPalletBenchmark extends Struct {
    readonly pInit: u32;
    readonly pInstant: u32;
    readonly iterations: u64;
    readonly workingStartTime: u64;
    readonly challengeTimeLast: u64;
  }

  /** @name PhalaPalletsComputeComputationPalletSessionStats (647) */
  interface PhalaPalletsComputeComputationPalletSessionStats extends Struct {
    readonly totalReward: u128;
  }

  /** @name PhalaPalletsComputeComputationPalletError (648) */
  interface PhalaPalletsComputeComputationPalletError extends Enum {
    readonly isBadSender: boolean;
    readonly isInvalidMessage: boolean;
    readonly isWorkerNotRegistered: boolean;
    readonly isGatekeeperNotRegistered: boolean;
    readonly isDuplicateBoundSession: boolean;
    readonly isBenchmarkMissing: boolean;
    readonly isSessionNotFound: boolean;
    readonly isSessionNotBound: boolean;
    readonly isWorkerNotReady: boolean;
    readonly isWorkerNotComputing: boolean;
    readonly isWorkerNotBound: boolean;
    readonly isCoolDownNotReady: boolean;
    readonly isInsufficientStake: boolean;
    readonly isTooMuchStake: boolean;
    readonly isInternalErrorBadTokenomicParameters: boolean;
    readonly isDuplicateBoundWorker: boolean;
    readonly isBenchmarkTooLow: boolean;
    readonly isInternalErrorCannotStartWithExistingStake: boolean;
    readonly isNotMigrationRoot: boolean;
    readonly isNonceIndexInvalid: boolean;
    readonly isBudgetUpdateBlockInvalid: boolean;
    readonly isBudgetExceedMaxLimit: boolean;
    readonly isWorkerReregisterNeeded: boolean;
    readonly type: 'BadSender' | 'InvalidMessage' | 'WorkerNotRegistered' | 'GatekeeperNotRegistered' | 'DuplicateBoundSession' | 'BenchmarkMissing' | 'SessionNotFound' | 'SessionNotBound' | 'WorkerNotReady' | 'WorkerNotComputing' | 'WorkerNotBound' | 'CoolDownNotReady' | 'InsufficientStake' | 'TooMuchStake' | 'InternalErrorBadTokenomicParameters' | 'DuplicateBoundWorker' | 'BenchmarkTooLow' | 'InternalErrorCannotStartWithExistingStake' | 'NotMigrationRoot' | 'NonceIndexInvalid' | 'BudgetUpdateBlockInvalid' | 'BudgetExceedMaxLimit' | 'WorkerReregisterNeeded';
  }

  /** @name PhalaPalletsComputeStakePoolV2PalletError (651) */
  interface PhalaPalletsComputeStakePoolV2PalletError extends Enum {
    readonly isWorkerNotRegistered: boolean;
    readonly isBenchmarkMissing: boolean;
    readonly isWorkerExists: boolean;
    readonly isWorkerAlreadyStopped: boolean;
    readonly isWorkerDoesNotExist: boolean;
    readonly isWorkerInAnotherPool: boolean;
    readonly isUnauthorizedOperator: boolean;
    readonly isUnauthorizedPoolOwner: boolean;
    readonly isInadequateCapacity: boolean;
    readonly isStakeExceedsCapacity: boolean;
    readonly isPoolDoesNotExist: boolean;
    readonly isPoolIsBusy: boolean;
    readonly isInsufficientContribution: boolean;
    readonly isNoNftToWithdraw: boolean;
    readonly isInsufficientBalance: boolean;
    readonly isPoolStakeNotFound: boolean;
    readonly isInsufficientFreeStake: boolean;
    readonly isInvalidWithdrawalAmount: boolean;
    readonly isFailedToBindSessionAndWorker: boolean;
    readonly isInternalSubsidyPoolCannotWithdraw: boolean;
    readonly isPoolBankrupt: boolean;
    readonly isNoRewardToClaim: boolean;
    readonly isFeatureNotEnabled: boolean;
    readonly isWorkersExceedLimit: boolean;
    readonly isCannotRestartWithLessStake: boolean;
    readonly isInvalidForceRewardAmount: boolean;
    readonly isWithdrawQueueNotEmpty: boolean;
    readonly isMissingCollectionId: boolean;
    readonly isVaultIsLocked: boolean;
    readonly isSessionDoesNotExist: boolean;
    readonly isWorkerIsNotReady: boolean;
    readonly isLockAccountStakeError: boolean;
    readonly isNoLegacyRewardToClaim: boolean;
    readonly type: 'WorkerNotRegistered' | 'BenchmarkMissing' | 'WorkerExists' | 'WorkerAlreadyStopped' | 'WorkerDoesNotExist' | 'WorkerInAnotherPool' | 'UnauthorizedOperator' | 'UnauthorizedPoolOwner' | 'InadequateCapacity' | 'StakeExceedsCapacity' | 'PoolDoesNotExist' | 'PoolIsBusy' | 'InsufficientContribution' | 'NoNftToWithdraw' | 'InsufficientBalance' | 'PoolStakeNotFound' | 'InsufficientFreeStake' | 'InvalidWithdrawalAmount' | 'FailedToBindSessionAndWorker' | 'InternalSubsidyPoolCannotWithdraw' | 'PoolBankrupt' | 'NoRewardToClaim' | 'FeatureNotEnabled' | 'WorkersExceedLimit' | 'CannotRestartWithLessStake' | 'InvalidForceRewardAmount' | 'WithdrawQueueNotEmpty' | 'MissingCollectionId' | 'VaultIsLocked' | 'SessionDoesNotExist' | 'WorkerIsNotReady' | 'LockAccountStakeError' | 'NoLegacyRewardToClaim';
  }

  /** @name PhalaPalletsStakePoolPalletPoolInfo (652) */
  interface PhalaPalletsStakePoolPalletPoolInfo extends Struct {
    readonly pid: u64;
    readonly owner: AccountId32;
    readonly payoutCommission: Option<Permill>;
    readonly ownerReward: u128;
    readonly cap: Option<u128>;
    readonly rewardAcc: u128;
    readonly totalShares: u128;
    readonly totalStake: u128;
    readonly freeStake: u128;
    readonly releasingStake: u128;
    readonly workers: Vec<SpCoreSr25519Public>;
    readonly withdrawQueue: Vec<PhalaPalletsStakePoolPalletWithdrawInfo>;
  }

  /** @name PhalaPalletsStakePoolPalletWithdrawInfo (655) */
  interface PhalaPalletsStakePoolPalletWithdrawInfo extends Struct {
    readonly user: AccountId32;
    readonly shares: u128;
    readonly startTime: u64;
  }

  /** @name PhalaPalletsStakePoolPalletUserStakeInfo (657) */
  interface PhalaPalletsStakePoolPalletUserStakeInfo extends Struct {
    readonly user: AccountId32;
    readonly locked: u128;
    readonly shares: u128;
    readonly availableRewards: u128;
    readonly rewardDebt: u128;
  }

  /** @name PhalaPalletsStakePoolPalletError (658) */
  type PhalaPalletsStakePoolPalletError = Null;

  /** @name PhalaPalletsComputeVaultPalletError (659) */
  interface PhalaPalletsComputeVaultPalletError extends Enum {
    readonly isUnauthorizedPoolOwner: boolean;
    readonly isNoEnoughShareToClaim: boolean;
    readonly isNoRewardToClaim: boolean;
    readonly isAssetAccountNotExist: boolean;
    readonly isInsufficientBalance: boolean;
    readonly isInsufficientContribution: boolean;
    readonly isVaultBankrupt: boolean;
    readonly isNoNftToWithdraw: boolean;
    readonly isCommissionNotChanged: boolean;
    readonly type: 'UnauthorizedPoolOwner' | 'NoEnoughShareToClaim' | 'NoRewardToClaim' | 'AssetAccountNotExist' | 'InsufficientBalance' | 'InsufficientContribution' | 'VaultBankrupt' | 'NoNftToWithdraw' | 'CommissionNotChanged';
  }

  /** @name PhalaPalletsComputeWrappedBalancesPalletFinanceAccount (661) */
  interface PhalaPalletsComputeWrappedBalancesPalletFinanceAccount extends Struct {
    readonly investPools: Vec<ITuple<[u64, u32]>>;
    readonly locked: u128;
  }

  /** @name PhalaPalletsComputeWrappedBalancesPalletError (662) */
  interface PhalaPalletsComputeWrappedBalancesPalletError extends Enum {
    readonly isStakerAccountNotFound: boolean;
    readonly isUnwrapAmountExceedsAvaliableStake: boolean;
    readonly isVoteAmountLargerThanTotalStakes: boolean;
    readonly isReferendumInvalid: boolean;
    readonly isReferendumOngoing: boolean;
    readonly isIterationsIsNotVaild: boolean;
    readonly type: 'StakerAccountNotFound' | 'UnwrapAmountExceedsAvaliableStake' | 'VoteAmountLargerThanTotalStakes' | 'ReferendumInvalid' | 'ReferendumOngoing' | 'IterationsIsNotVaild';
  }

  /** @name PhalaPalletsComputePoolProxy (663) */
  interface PhalaPalletsComputePoolProxy extends Enum {
    readonly isStakePool: boolean;
    readonly asStakePool: PhalaPalletsComputePoolProxyStakePool;
    readonly isVault: boolean;
    readonly asVault: PhalaPalletsComputePoolProxyVault;
    readonly type: 'StakePool' | 'Vault';
  }

  /** @name PhalaPalletsComputePoolProxyStakePool (664) */
  interface PhalaPalletsComputePoolProxyStakePool extends Struct {
    readonly basepool: PhalaPalletsComputeBasePoolPalletBasePool;
    readonly payoutCommission: Option<Permill>;
    readonly cap: Option<u128>;
    readonly workers: Vec<SpCoreSr25519Public>;
    readonly cdWorkers: Vec<SpCoreSr25519Public>;
    readonly lockAccount: AccountId32;
    readonly ownerRewardAccount: AccountId32;
  }

  /** @name PhalaPalletsComputeBasePoolPalletBasePool (665) */
  interface PhalaPalletsComputeBasePoolPalletBasePool extends Struct {
    readonly pid: u64;
    readonly owner: AccountId32;
    readonly totalShares: u128;
    readonly totalValue: u128;
    readonly withdrawQueue: Vec<PhalaPalletsComputeBasePoolPalletWithdrawInfo>;
    readonly valueSubscribers: Vec<u64>;
    readonly cid: u32;
    readonly poolAccountId: AccountId32;
  }

  /** @name PhalaPalletsComputeBasePoolPalletWithdrawInfo (667) */
  interface PhalaPalletsComputeBasePoolPalletWithdrawInfo extends Struct {
    readonly user: AccountId32;
    readonly startTime: u64;
    readonly nftId: u32;
  }

  /** @name PhalaPalletsComputePoolProxyVault (668) */
  interface PhalaPalletsComputePoolProxyVault extends Struct {
    readonly basepool: PhalaPalletsComputeBasePoolPalletBasePool;
    readonly lastSharePriceCheckpoint: u128;
    readonly commission: Option<Permill>;
    readonly ownerShares: u128;
    readonly investPools: Vec<u64>;
  }

  /** @name PhalaPalletsComputeBasePoolPalletError (669) */
  interface PhalaPalletsComputeBasePoolPalletError extends Enum {
    readonly isMissCollectionId: boolean;
    readonly isPoolBankrupt: boolean;
    readonly isInvalidShareToWithdraw: boolean;
    readonly isInvalidWithdrawalAmount: boolean;
    readonly isRmrkError: boolean;
    readonly isPoolDoesNotExist: boolean;
    readonly isPoolTypeNotMatch: boolean;
    readonly isNftIdNotFound: boolean;
    readonly isInvalidSharePrice: boolean;
    readonly isAttrLocked: boolean;
    readonly isUnauthorizedPoolOwner: boolean;
    readonly isAlreadyInContributeWhitelist: boolean;
    readonly isNotInContributeWhitelist: boolean;
    readonly isExceedWhitelistMaxLen: boolean;
    readonly isNoWhitelistCreated: boolean;
    readonly isExceedMaxDescriptionLen: boolean;
    readonly isNotMigrationRoot: boolean;
    readonly isBurnNftFailed: boolean;
    readonly isTransferSharesAmountInvalid: boolean;
    readonly type: 'MissCollectionId' | 'PoolBankrupt' | 'InvalidShareToWithdraw' | 'InvalidWithdrawalAmount' | 'RmrkError' | 'PoolDoesNotExist' | 'PoolTypeNotMatch' | 'NftIdNotFound' | 'InvalidSharePrice' | 'AttrLocked' | 'UnauthorizedPoolOwner' | 'AlreadyInContributeWhitelist' | 'NotInContributeWhitelist' | 'ExceedWhitelistMaxLen' | 'NoWhitelistCreated' | 'ExceedMaxDescriptionLen' | 'NotMigrationRoot' | 'BurnNftFailed' | 'TransferSharesAmountInvalid';
  }

  /** @name PhalaPalletsPhatPalletBasicContractInfo (670) */
  interface PhalaPalletsPhatPalletBasicContractInfo extends Struct {
    readonly deployer: AccountId32;
    readonly cluster: H256;
  }

  /** @name PhalaTypesContractClusterInfo (671) */
  interface PhalaTypesContractClusterInfo extends Struct {
    readonly owner: AccountId32;
    readonly permission: PhalaTypesContractClusterPermission;
    readonly systemContract: H256;
    readonly gasPrice: u128;
    readonly depositPerItem: u128;
    readonly depositPerByte: u128;
  }

  /** @name PhalaPalletsPhatPalletError (673) */
  interface PhalaPalletsPhatPalletError extends Enum {
    readonly isCodeNotFound: boolean;
    readonly isClusterNotFound: boolean;
    readonly isClusterNotDeployed: boolean;
    readonly isClusterPermissionDenied: boolean;
    readonly isDuplicatedContract: boolean;
    readonly isDuplicatedDeployment: boolean;
    readonly isNoWorkerSpecified: boolean;
    readonly isInvalidSender: boolean;
    readonly isWorkerNotFound: boolean;
    readonly isPayloadTooLarge: boolean;
    readonly isNoPinkSystemCode: boolean;
    readonly isContractNotFound: boolean;
    readonly isWorkerIsBusy: boolean;
    readonly type: 'CodeNotFound' | 'ClusterNotFound' | 'ClusterNotDeployed' | 'ClusterPermissionDenied' | 'DuplicatedContract' | 'DuplicatedDeployment' | 'NoWorkerSpecified' | 'InvalidSender' | 'WorkerNotFound' | 'PayloadTooLarge' | 'NoPinkSystemCode' | 'ContractNotFound' | 'WorkerIsBusy';
  }

  /** @name PhalaPalletsPhatTokenomicPalletError (675) */
  interface PhalaPalletsPhatTokenomicPalletError extends Enum {
    readonly isInvalidAmountOfStake: boolean;
    readonly type: 'InvalidAmountOfStake';
  }

  /** @name PhatOffchainRollupAnchorPalletError (677) */
  interface PhatOffchainRollupAnchorPalletError extends Enum {
    readonly isNameAlreadyClaimed: boolean;
    readonly isNameNotExist: boolean;
    readonly isNotOwner: boolean;
    readonly isCondNotMet: boolean;
    readonly isFailedToDecodeAction: boolean;
    readonly isQueueIsFull: boolean;
    readonly isInvalidQueueHead: boolean;
    readonly type: 'NameAlreadyClaimed' | 'NameNotExist' | 'NotOwner' | 'CondNotMet' | 'FailedToDecodeAction' | 'QueueIsFull' | 'InvalidQueueHead';
  }

  /** @name PhatOffchainRollupOraclePalletPriceQuote (679) */
  interface PhatOffchainRollupOraclePalletPriceQuote extends Struct {
    readonly contractId: H256;
    readonly price: u128;
    readonly timestampMs: u64;
  }

  /** @name PhatOffchainRollupOraclePalletError (680) */
  interface PhatOffchainRollupOraclePalletError extends Enum {
    readonly isFailedToAuthenticateResponse: boolean;
    readonly isFailedToDecodeResponse: boolean;
    readonly type: 'FailedToAuthenticateResponse' | 'FailedToDecodeResponse';
  }

  /** @name PhalaPalletsPuppetsParachainSystemPalletPersistedValidationData (682) */
  interface PhalaPalletsPuppetsParachainSystemPalletPersistedValidationData extends Struct {
    readonly relayParentNumber: u32;
  }

  /** @name PalletUniquesCollectionDetails (683) */
  interface PalletUniquesCollectionDetails extends Struct {
    readonly owner: AccountId32;
    readonly issuer: AccountId32;
    readonly admin: AccountId32;
    readonly freezer: AccountId32;
    readonly totalDeposit: u128;
    readonly freeHolding: bool;
    readonly items: u32;
    readonly itemMetadatas: u32;
    readonly attributes: u32;
    readonly isFrozen: bool;
  }

  /** @name PalletUniquesItemDetails (685) */
  interface PalletUniquesItemDetails extends Struct {
    readonly owner: AccountId32;
    readonly approved: Option<AccountId32>;
    readonly isFrozen: bool;
    readonly deposit: u128;
  }

  /** @name PalletUniquesCollectionMetadata (686) */
  interface PalletUniquesCollectionMetadata extends Struct {
    readonly deposit: u128;
    readonly data: Bytes;
    readonly isFrozen: bool;
  }

  /** @name PalletUniquesItemMetadata (687) */
  interface PalletUniquesItemMetadata extends Struct {
    readonly deposit: u128;
    readonly data: Bytes;
    readonly isFrozen: bool;
  }

  /** @name PalletUniquesError (691) */
  interface PalletUniquesError extends Enum {
    readonly isNoPermission: boolean;
    readonly isUnknownCollection: boolean;
    readonly isAlreadyExists: boolean;
    readonly isWrongOwner: boolean;
    readonly isBadWitness: boolean;
    readonly isInUse: boolean;
    readonly isFrozen: boolean;
    readonly isWrongDelegate: boolean;
    readonly isNoDelegate: boolean;
    readonly isUnapproved: boolean;
    readonly isUnaccepted: boolean;
    readonly isLocked: boolean;
    readonly isMaxSupplyReached: boolean;
    readonly isMaxSupplyAlreadySet: boolean;
    readonly isMaxSupplyTooSmall: boolean;
    readonly isUnknownItem: boolean;
    readonly isNotForSale: boolean;
    readonly isBidTooLow: boolean;
    readonly type: 'NoPermission' | 'UnknownCollection' | 'AlreadyExists' | 'WrongOwner' | 'BadWitness' | 'InUse' | 'Frozen' | 'WrongDelegate' | 'NoDelegate' | 'Unapproved' | 'Unaccepted' | 'Locked' | 'MaxSupplyReached' | 'MaxSupplyAlreadySet' | 'MaxSupplyTooSmall' | 'UnknownItem' | 'NotForSale' | 'BidTooLow';
  }

  /** @name PalletRmrkCoreError (692) */
  interface PalletRmrkCoreError extends Enum {
    readonly isNoneValue: boolean;
    readonly isStorageOverflow: boolean;
    readonly isTooLong: boolean;
    readonly isNoAvailableCollectionId: boolean;
    readonly isNoAvailableResourceId: boolean;
    readonly isMetadataNotSet: boolean;
    readonly isRecipientNotSet: boolean;
    readonly isNoAvailableNftId: boolean;
    readonly isNotInRange: boolean;
    readonly isRoyaltyNotSet: boolean;
    readonly isCollectionUnknown: boolean;
    readonly isNoPermission: boolean;
    readonly isNoWitness: boolean;
    readonly isCollectionNotEmpty: boolean;
    readonly isCollectionFullOrLocked: boolean;
    readonly isCannotSendToDescendentOrSelf: boolean;
    readonly isResourceAlreadyExists: boolean;
    readonly isNftAlreadyExists: boolean;
    readonly isEmptyResource: boolean;
    readonly isTooManyRecursions: boolean;
    readonly isNftIsLocked: boolean;
    readonly isCannotAcceptNonOwnedNft: boolean;
    readonly isCannotRejectNonOwnedNft: boolean;
    readonly isCannotRejectNonPendingNft: boolean;
    readonly isResourceDoesntExist: boolean;
    readonly isResourceNotPending: boolean;
    readonly isNonTransferable: boolean;
    readonly isCannotSendEquippedItem: boolean;
    readonly isCannotAcceptToNewOwner: boolean;
    readonly isFailedTransferHooksPreCheck: boolean;
    readonly isFailedTransferHooksPostTransfer: boolean;
    readonly type: 'NoneValue' | 'StorageOverflow' | 'TooLong' | 'NoAvailableCollectionId' | 'NoAvailableResourceId' | 'MetadataNotSet' | 'RecipientNotSet' | 'NoAvailableNftId' | 'NotInRange' | 'RoyaltyNotSet' | 'CollectionUnknown' | 'NoPermission' | 'NoWitness' | 'CollectionNotEmpty' | 'CollectionFullOrLocked' | 'CannotSendToDescendentOrSelf' | 'ResourceAlreadyExists' | 'NftAlreadyExists' | 'EmptyResource' | 'TooManyRecursions' | 'NftIsLocked' | 'CannotAcceptNonOwnedNft' | 'CannotRejectNonOwnedNft' | 'CannotRejectNonPendingNft' | 'ResourceDoesntExist' | 'ResourceNotPending' | 'NonTransferable' | 'CannotSendEquippedItem' | 'CannotAcceptToNewOwner' | 'FailedTransferHooksPreCheck' | 'FailedTransferHooksPostTransfer';
  }

  /** @name PalletEvmAccountMappingError (696) */
  interface PalletEvmAccountMappingError extends Enum {
    readonly isUnexpected: boolean;
    readonly isNonceError: boolean;
    readonly isPaymentError: boolean;
    readonly type: 'Unexpected' | 'NonceError' | 'PaymentError';
  }

  /** @name SpRuntimeMultiSignature (698) */
  interface SpRuntimeMultiSignature extends Enum {
    readonly isEd25519: boolean;
    readonly asEd25519: SpCoreEd25519Signature;
    readonly isSr25519: boolean;
    readonly asSr25519: SpCoreSr25519Signature;
    readonly isEcdsa: boolean;
    readonly asEcdsa: SpCoreEcdsaSignature;
    readonly type: 'Ed25519' | 'Sr25519' | 'Ecdsa';
  }

  /** @name SpCoreEcdsaSignature (699) */
  interface SpCoreEcdsaSignature extends U8aFixed {}

  /** @name FrameSystemExtensionsCheckNonZeroSender (701) */
  type FrameSystemExtensionsCheckNonZeroSender = Null;

  /** @name FrameSystemExtensionsCheckSpecVersion (702) */
  type FrameSystemExtensionsCheckSpecVersion = Null;

  /** @name FrameSystemExtensionsCheckTxVersion (703) */
  type FrameSystemExtensionsCheckTxVersion = Null;

  /** @name FrameSystemExtensionsCheckGenesis (704) */
  type FrameSystemExtensionsCheckGenesis = Null;

  /** @name FrameSystemExtensionsCheckNonce (707) */
  interface FrameSystemExtensionsCheckNonce extends Compact<u32> {}

  /** @name FrameSystemExtensionsCheckWeight (708) */
  type FrameSystemExtensionsCheckWeight = Null;

  /** @name PhalaPalletsMqCheckSeqCheckMqSequence (709) */
  type PhalaPalletsMqCheckSeqCheckMqSequence = Null;

  /** @name PalletTransactionPaymentChargeTransactionPayment (710) */
  interface PalletTransactionPaymentChargeTransactionPayment extends Compact<u128> {}

  /** @name PhalaNodeRuntimeRuntime (711) */
  type PhalaNodeRuntimeRuntime = Null;

} // declare module
