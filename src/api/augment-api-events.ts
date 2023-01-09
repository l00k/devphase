// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

// import type lookup before we augment - in some environments
// this is required to allow for ambient/previous definitions
import '@polkadot/api-base/types/events';

import type { ApiTypes, AugmentedEvent } from '@polkadot/api-base/types';
import type { Bytes, Null, Option, Result, U256, U8aFixed, Vec, bool, u128, u16, u32, u64, u8 } from '@polkadot/types-codec';
import type { ITuple } from '@polkadot/types-codec/types';
import type { AccountId32, H256 } from '@polkadot/types/interfaces/runtime';
import type { FrameSupportDispatchDispatchInfo, FrameSupportTokensMiscBalanceStatus, KhalaParachainRuntimeProxyType, PalletDemocracyVoteAccountVote, PalletDemocracyVoteThreshold, PalletMultisigTimepoint, PalletPhalaWorldCareerType, PalletPhalaWorldNftSaleType, PalletPhalaWorldRaceType, PalletPhalaWorldRarityType, PalletPhalaWorldShellParts, PhalaTypesAttestationProvider, RmrkTraitsNftAccountIdOrCollectionNftTuple, SpCoreSr25519Public, SpRuntimeDispatchError, SpWeightsWeightV2Weight, XcmV1MultiAsset, XcmV1MultiLocation, XcmV2Response, XcmV2TraitsError, XcmV2TraitsOutcome, XcmV2Xcm, XcmVersionedMultiAssets, XcmVersionedMultiLocation } from '@polkadot/types/lookup';

export type __AugmentedEvent<ApiType extends ApiTypes> = AugmentedEvent<ApiType>;

declare module '@polkadot/api-base/types/events' {
  interface AugmentedEvents<ApiType extends ApiTypes> {
    assets: {
      /**
       * An approval for account `delegate` was cancelled by `owner`.
       **/
      ApprovalCancelled: AugmentedEvent<ApiType, [assetId: u32, owner: AccountId32, delegate: AccountId32], { assetId: u32, owner: AccountId32, delegate: AccountId32 }>;
      /**
       * (Additional) funds have been approved for transfer to a destination account.
       **/
      ApprovedTransfer: AugmentedEvent<ApiType, [assetId: u32, source: AccountId32, delegate: AccountId32, amount: u128], { assetId: u32, source: AccountId32, delegate: AccountId32, amount: u128 }>;
      /**
       * Some asset `asset_id` was frozen.
       **/
      AssetFrozen: AugmentedEvent<ApiType, [assetId: u32], { assetId: u32 }>;
      /**
       * An asset has had its attributes changed by the `Force` origin.
       **/
      AssetStatusChanged: AugmentedEvent<ApiType, [assetId: u32], { assetId: u32 }>;
      /**
       * Some asset `asset_id` was thawed.
       **/
      AssetThawed: AugmentedEvent<ApiType, [assetId: u32], { assetId: u32 }>;
      /**
       * Some assets were destroyed.
       **/
      Burned: AugmentedEvent<ApiType, [assetId: u32, owner: AccountId32, balance: u128], { assetId: u32, owner: AccountId32, balance: u128 }>;
      /**
       * Some asset class was created.
       **/
      Created: AugmentedEvent<ApiType, [assetId: u32, creator: AccountId32, owner: AccountId32], { assetId: u32, creator: AccountId32, owner: AccountId32 }>;
      /**
       * An asset class was destroyed.
       **/
      Destroyed: AugmentedEvent<ApiType, [assetId: u32], { assetId: u32 }>;
      /**
       * Some asset class was force-created.
       **/
      ForceCreated: AugmentedEvent<ApiType, [assetId: u32, owner: AccountId32], { assetId: u32, owner: AccountId32 }>;
      /**
       * Some account `who` was frozen.
       **/
      Frozen: AugmentedEvent<ApiType, [assetId: u32, who: AccountId32], { assetId: u32, who: AccountId32 }>;
      /**
       * Some assets were issued.
       **/
      Issued: AugmentedEvent<ApiType, [assetId: u32, owner: AccountId32, totalSupply: u128], { assetId: u32, owner: AccountId32, totalSupply: u128 }>;
      /**
       * Metadata has been cleared for an asset.
       **/
      MetadataCleared: AugmentedEvent<ApiType, [assetId: u32], { assetId: u32 }>;
      /**
       * New metadata has been set for an asset.
       **/
      MetadataSet: AugmentedEvent<ApiType, [assetId: u32, name: Bytes, symbol_: Bytes, decimals: u8, isFrozen: bool], { assetId: u32, name: Bytes, symbol: Bytes, decimals: u8, isFrozen: bool }>;
      /**
       * The owner changed.
       **/
      OwnerChanged: AugmentedEvent<ApiType, [assetId: u32, owner: AccountId32], { assetId: u32, owner: AccountId32 }>;
      /**
       * The management team changed.
       **/
      TeamChanged: AugmentedEvent<ApiType, [assetId: u32, issuer: AccountId32, admin: AccountId32, freezer: AccountId32], { assetId: u32, issuer: AccountId32, admin: AccountId32, freezer: AccountId32 }>;
      /**
       * Some account `who` was thawed.
       **/
      Thawed: AugmentedEvent<ApiType, [assetId: u32, who: AccountId32], { assetId: u32, who: AccountId32 }>;
      /**
       * Some assets were transferred.
       **/
      Transferred: AugmentedEvent<ApiType, [assetId: u32, from: AccountId32, to: AccountId32, amount: u128], { assetId: u32, from: AccountId32, to: AccountId32, amount: u128 }>;
      /**
       * An `amount` was transferred in its entirety from `owner` to `destination` by
       * the approved `delegate`.
       **/
      TransferredApproved: AugmentedEvent<ApiType, [assetId: u32, owner: AccountId32, delegate: AccountId32, destination: AccountId32, amount: u128], { assetId: u32, owner: AccountId32, delegate: AccountId32, destination: AccountId32, amount: u128 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    assetsRegistry: {
      /**
       * Asset is registerd.
       **/
      AssetRegistered: AugmentedEvent<ApiType, [assetId: u32, location: XcmV1MultiLocation], { assetId: u32, location: XcmV1MultiLocation }>;
      /**
       * Asset is unregisterd.
       **/
      AssetUnregistered: AugmentedEvent<ApiType, [assetId: u32, location: XcmV1MultiLocation], { assetId: u32, location: XcmV1MultiLocation }>;
      /**
       * Asset disabled chainbridge.
       **/
      ChainbridgeDisabled: AugmentedEvent<ApiType, [assetId: u32, chainId: u8, resourceId: U8aFixed], { assetId: u32, chainId: u8, resourceId: U8aFixed }>;
      /**
       * Asset enabled chainbridge.
       **/
      ChainbridgeEnabled: AugmentedEvent<ApiType, [assetId: u32, chainId: u8, resourceId: U8aFixed], { assetId: u32, chainId: u8, resourceId: U8aFixed }>;
      /**
       * Force burn asset from an certain account.
       **/
      ForceBurnt: AugmentedEvent<ApiType, [assetId: u32, who: AccountId32, amount: u128], { assetId: u32, who: AccountId32, amount: u128 }>;
      /**
       * Force mint asset to an certain account.
       **/
      ForceMinted: AugmentedEvent<ApiType, [assetId: u32, beneficiary: AccountId32, amount: u128], { assetId: u32, beneficiary: AccountId32, amount: u128 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    balances: {
      /**
       * A balance was set by root.
       **/
      BalanceSet: AugmentedEvent<ApiType, [who: AccountId32, free: u128, reserved: u128], { who: AccountId32, free: u128, reserved: u128 }>;
      /**
       * Some amount was deposited (e.g. for transaction fees).
       **/
      Deposit: AugmentedEvent<ApiType, [who: AccountId32, amount: u128], { who: AccountId32, amount: u128 }>;
      /**
       * An account was removed whose balance was non-zero but below ExistentialDeposit,
       * resulting in an outright loss.
       **/
      DustLost: AugmentedEvent<ApiType, [account: AccountId32, amount: u128], { account: AccountId32, amount: u128 }>;
      /**
       * An account was created with some free balance.
       **/
      Endowed: AugmentedEvent<ApiType, [account: AccountId32, freeBalance: u128], { account: AccountId32, freeBalance: u128 }>;
      /**
       * Some balance was reserved (moved from free to reserved).
       **/
      Reserved: AugmentedEvent<ApiType, [who: AccountId32, amount: u128], { who: AccountId32, amount: u128 }>;
      /**
       * Some balance was moved from the reserve of the first account to the second account.
       * Final argument indicates the destination balance type.
       **/
      ReserveRepatriated: AugmentedEvent<ApiType, [from: AccountId32, to: AccountId32, amount: u128, destinationStatus: FrameSupportTokensMiscBalanceStatus], { from: AccountId32, to: AccountId32, amount: u128, destinationStatus: FrameSupportTokensMiscBalanceStatus }>;
      /**
       * Some amount was removed from the account (e.g. for misbehavior).
       **/
      Slashed: AugmentedEvent<ApiType, [who: AccountId32, amount: u128], { who: AccountId32, amount: u128 }>;
      /**
       * Transfer succeeded.
       **/
      Transfer: AugmentedEvent<ApiType, [from: AccountId32, to: AccountId32, amount: u128], { from: AccountId32, to: AccountId32, amount: u128 }>;
      /**
       * Some balance was unreserved (moved from reserved to free).
       **/
      Unreserved: AugmentedEvent<ApiType, [who: AccountId32, amount: u128], { who: AccountId32, amount: u128 }>;
      /**
       * Some amount was withdrawn from the account (e.g. for transaction fees).
       **/
      Withdraw: AugmentedEvent<ApiType, [who: AccountId32, amount: u128], { who: AccountId32, amount: u128 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    bounties: {
      /**
       * A bounty is awarded to a beneficiary.
       **/
      BountyAwarded: AugmentedEvent<ApiType, [index: u32, beneficiary: AccountId32], { index: u32, beneficiary: AccountId32 }>;
      /**
       * A bounty proposal is funded and became active.
       **/
      BountyBecameActive: AugmentedEvent<ApiType, [index: u32], { index: u32 }>;
      /**
       * A bounty is cancelled.
       **/
      BountyCanceled: AugmentedEvent<ApiType, [index: u32], { index: u32 }>;
      /**
       * A bounty is claimed by beneficiary.
       **/
      BountyClaimed: AugmentedEvent<ApiType, [index: u32, payout: u128, beneficiary: AccountId32], { index: u32, payout: u128, beneficiary: AccountId32 }>;
      /**
       * A bounty expiry is extended.
       **/
      BountyExtended: AugmentedEvent<ApiType, [index: u32], { index: u32 }>;
      /**
       * New bounty proposal.
       **/
      BountyProposed: AugmentedEvent<ApiType, [index: u32], { index: u32 }>;
      /**
       * A bounty proposal was rejected; funds were slashed.
       **/
      BountyRejected: AugmentedEvent<ApiType, [index: u32, bond: u128], { index: u32, bond: u128 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    chainBridge: {
      /**
       * Chain now available for transfers (chain_id)
       **/
      ChainWhitelisted: AugmentedEvent<ApiType, [u8]>;
      FeeUpdated: AugmentedEvent<ApiType, [destId: u8, fee: u128], { destId: u8, fee: u128 }>;
      /**
       * FungibleTransfer is for relaying fungibles (dest_id, nonce, resource_id, amount, recipient)
       **/
      FungibleTransfer: AugmentedEvent<ApiType, [u8, u64, U8aFixed, U256, Bytes]>;
      /**
       * GenericTransfer is for a generic data payload (dest_id, nonce, resource_id, metadata)
       **/
      GenericTransfer: AugmentedEvent<ApiType, [u8, u64, U8aFixed, Bytes]>;
      /**
       * NonFungibleTransfer is for relaying NFTs (dest_id, nonce, resource_id, token_id, recipient, metadata)
       **/
      NonFungibleTransfer: AugmentedEvent<ApiType, [u8, u64, U8aFixed, Bytes, Bytes, Bytes]>;
      /**
       * Voting successful for a proposal
       **/
      ProposalApproved: AugmentedEvent<ApiType, [u8, u64]>;
      /**
       * Execution of call failed
       **/
      ProposalFailed: AugmentedEvent<ApiType, [u8, u64]>;
      /**
       * Voting rejected a proposal
       **/
      ProposalRejected: AugmentedEvent<ApiType, [u8, u64]>;
      /**
       * Execution of call succeeded
       **/
      ProposalSucceeded: AugmentedEvent<ApiType, [u8, u64]>;
      /**
       * Relayer added to set
       **/
      RelayerAdded: AugmentedEvent<ApiType, [AccountId32]>;
      /**
       * Relayer removed from set
       **/
      RelayerRemoved: AugmentedEvent<ApiType, [AccountId32]>;
      /**
       * Vote threshold has changed (new_threshold)
       **/
      RelayerThresholdChanged: AugmentedEvent<ApiType, [u32]>;
      /**
       * Vot submitted against proposal
       **/
      VoteAgainst: AugmentedEvent<ApiType, [u8, u64, AccountId32]>;
      /**
       * Vote submitted in favour of proposal
       **/
      VoteFor: AugmentedEvent<ApiType, [u8, u64, AccountId32]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    childBounties: {
      /**
       * A child-bounty is added.
       **/
      Added: AugmentedEvent<ApiType, [index: u32, childIndex: u32], { index: u32, childIndex: u32 }>;
      /**
       * A child-bounty is awarded to a beneficiary.
       **/
      Awarded: AugmentedEvent<ApiType, [index: u32, childIndex: u32, beneficiary: AccountId32], { index: u32, childIndex: u32, beneficiary: AccountId32 }>;
      /**
       * A child-bounty is cancelled.
       **/
      Canceled: AugmentedEvent<ApiType, [index: u32, childIndex: u32], { index: u32, childIndex: u32 }>;
      /**
       * A child-bounty is claimed by beneficiary.
       **/
      Claimed: AugmentedEvent<ApiType, [index: u32, childIndex: u32, payout: u128, beneficiary: AccountId32], { index: u32, childIndex: u32, payout: u128, beneficiary: AccountId32 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    collatorSelection: {
      CandidateAdded: AugmentedEvent<ApiType, [accountId: AccountId32, deposit: u128], { accountId: AccountId32, deposit: u128 }>;
      CandidateRemoved: AugmentedEvent<ApiType, [accountId: AccountId32], { accountId: AccountId32 }>;
      NewCandidacyBond: AugmentedEvent<ApiType, [bondAmount: u128], { bondAmount: u128 }>;
      NewDesiredCandidates: AugmentedEvent<ApiType, [desiredCandidates: u32], { desiredCandidates: u32 }>;
      NewInvulnerables: AugmentedEvent<ApiType, [invulnerables: Vec<AccountId32>], { invulnerables: Vec<AccountId32> }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    council: {
      /**
       * A motion was approved by the required threshold.
       **/
      Approved: AugmentedEvent<ApiType, [proposalHash: H256], { proposalHash: H256 }>;
      /**
       * A proposal was closed because its threshold was reached or after its duration was up.
       **/
      Closed: AugmentedEvent<ApiType, [proposalHash: H256, yes: u32, no: u32], { proposalHash: H256, yes: u32, no: u32 }>;
      /**
       * A motion was not approved by the required threshold.
       **/
      Disapproved: AugmentedEvent<ApiType, [proposalHash: H256], { proposalHash: H256 }>;
      /**
       * A motion was executed; result will be `Ok` if it returned without error.
       **/
      Executed: AugmentedEvent<ApiType, [proposalHash: H256, result: Result<Null, SpRuntimeDispatchError>], { proposalHash: H256, result: Result<Null, SpRuntimeDispatchError> }>;
      /**
       * A single member did some action; result will be `Ok` if it returned without error.
       **/
      MemberExecuted: AugmentedEvent<ApiType, [proposalHash: H256, result: Result<Null, SpRuntimeDispatchError>], { proposalHash: H256, result: Result<Null, SpRuntimeDispatchError> }>;
      /**
       * A motion (given hash) has been proposed (by given account) with a threshold (given
       * `MemberCount`).
       **/
      Proposed: AugmentedEvent<ApiType, [account: AccountId32, proposalIndex: u32, proposalHash: H256, threshold: u32], { account: AccountId32, proposalIndex: u32, proposalHash: H256, threshold: u32 }>;
      /**
       * A motion (given hash) has been voted on by given account, leaving
       * a tally (yes votes and no votes given respectively as `MemberCount`).
       **/
      Voted: AugmentedEvent<ApiType, [account: AccountId32, proposalHash: H256, voted: bool, yes: u32, no: u32], { account: AccountId32, proposalHash: H256, voted: bool, yes: u32, no: u32 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    cumulusXcm: {
      /**
       * Downward message executed with the given outcome.
       * \[ id, outcome \]
       **/
      ExecutedDownward: AugmentedEvent<ApiType, [U8aFixed, XcmV2TraitsOutcome]>;
      /**
       * Downward message is invalid XCM.
       * \[ id \]
       **/
      InvalidFormat: AugmentedEvent<ApiType, [U8aFixed]>;
      /**
       * Downward message is unsupported version of XCM.
       * \[ id \]
       **/
      UnsupportedVersion: AugmentedEvent<ApiType, [U8aFixed]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    democracy: {
      /**
       * A proposal_hash has been blacklisted permanently.
       **/
      Blacklisted: AugmentedEvent<ApiType, [proposalHash: H256], { proposalHash: H256 }>;
      /**
       * A referendum has been cancelled.
       **/
      Cancelled: AugmentedEvent<ApiType, [refIndex: u32], { refIndex: u32 }>;
      /**
       * An account has delegated their vote to another account.
       **/
      Delegated: AugmentedEvent<ApiType, [who: AccountId32, target: AccountId32], { who: AccountId32, target: AccountId32 }>;
      /**
       * An external proposal has been tabled.
       **/
      ExternalTabled: AugmentedEvent<ApiType, []>;
      /**
       * A proposal has been rejected by referendum.
       **/
      NotPassed: AugmentedEvent<ApiType, [refIndex: u32], { refIndex: u32 }>;
      /**
       * A proposal has been approved by referendum.
       **/
      Passed: AugmentedEvent<ApiType, [refIndex: u32], { refIndex: u32 }>;
      /**
       * A proposal got canceled.
       **/
      ProposalCanceled: AugmentedEvent<ApiType, [propIndex: u32], { propIndex: u32 }>;
      /**
       * A motion has been proposed by a public account.
       **/
      Proposed: AugmentedEvent<ApiType, [proposalIndex: u32, deposit: u128], { proposalIndex: u32, deposit: u128 }>;
      /**
       * An account has secconded a proposal
       **/
      Seconded: AugmentedEvent<ApiType, [seconder: AccountId32, propIndex: u32], { seconder: AccountId32, propIndex: u32 }>;
      /**
       * A referendum has begun.
       **/
      Started: AugmentedEvent<ApiType, [refIndex: u32, threshold: PalletDemocracyVoteThreshold], { refIndex: u32, threshold: PalletDemocracyVoteThreshold }>;
      /**
       * A public proposal has been tabled for referendum vote.
       **/
      Tabled: AugmentedEvent<ApiType, [proposalIndex: u32, deposit: u128], { proposalIndex: u32, deposit: u128 }>;
      /**
       * An account has cancelled a previous delegation operation.
       **/
      Undelegated: AugmentedEvent<ApiType, [account: AccountId32], { account: AccountId32 }>;
      /**
       * An external proposal has been vetoed.
       **/
      Vetoed: AugmentedEvent<ApiType, [who: AccountId32, proposalHash: H256, until: u32], { who: AccountId32, proposalHash: H256, until: u32 }>;
      /**
       * An account has voted in a referendum
       **/
      Voted: AugmentedEvent<ApiType, [voter: AccountId32, refIndex: u32, vote: PalletDemocracyVoteAccountVote], { voter: AccountId32, refIndex: u32, vote: PalletDemocracyVoteAccountVote }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    dmpQueue: {
      /**
       * Downward message executed with the given outcome.
       **/
      ExecutedDownward: AugmentedEvent<ApiType, [messageId: U8aFixed, outcome: XcmV2TraitsOutcome], { messageId: U8aFixed, outcome: XcmV2TraitsOutcome }>;
      /**
       * Downward message is invalid XCM.
       **/
      InvalidFormat: AugmentedEvent<ApiType, [messageId: U8aFixed], { messageId: U8aFixed }>;
      /**
       * Downward message is overweight and was placed in the overweight queue.
       **/
      OverweightEnqueued: AugmentedEvent<ApiType, [messageId: U8aFixed, overweightIndex: u64, requiredWeight: SpWeightsWeightV2Weight], { messageId: U8aFixed, overweightIndex: u64, requiredWeight: SpWeightsWeightV2Weight }>;
      /**
       * Downward message from the overweight queue was executed.
       **/
      OverweightServiced: AugmentedEvent<ApiType, [overweightIndex: u64, weightUsed: SpWeightsWeightV2Weight], { overweightIndex: u64, weightUsed: SpWeightsWeightV2Weight }>;
      /**
       * Downward message is unsupported version of XCM.
       **/
      UnsupportedVersion: AugmentedEvent<ApiType, [messageId: U8aFixed], { messageId: U8aFixed }>;
      /**
       * The weight limit for handling downward messages was reached.
       **/
      WeightExhausted: AugmentedEvent<ApiType, [messageId: U8aFixed, remainingWeight: SpWeightsWeightV2Weight, requiredWeight: SpWeightsWeightV2Weight], { messageId: U8aFixed, remainingWeight: SpWeightsWeightV2Weight, requiredWeight: SpWeightsWeightV2Weight }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    identity: {
      /**
       * A name was cleared, and the given balance returned.
       **/
      IdentityCleared: AugmentedEvent<ApiType, [who: AccountId32, deposit: u128], { who: AccountId32, deposit: u128 }>;
      /**
       * A name was removed and the given balance slashed.
       **/
      IdentityKilled: AugmentedEvent<ApiType, [who: AccountId32, deposit: u128], { who: AccountId32, deposit: u128 }>;
      /**
       * A name was set or reset (which will remove all judgements).
       **/
      IdentitySet: AugmentedEvent<ApiType, [who: AccountId32], { who: AccountId32 }>;
      /**
       * A judgement was given by a registrar.
       **/
      JudgementGiven: AugmentedEvent<ApiType, [target: AccountId32, registrarIndex: u32], { target: AccountId32, registrarIndex: u32 }>;
      /**
       * A judgement was asked from a registrar.
       **/
      JudgementRequested: AugmentedEvent<ApiType, [who: AccountId32, registrarIndex: u32], { who: AccountId32, registrarIndex: u32 }>;
      /**
       * A judgement request was retracted.
       **/
      JudgementUnrequested: AugmentedEvent<ApiType, [who: AccountId32, registrarIndex: u32], { who: AccountId32, registrarIndex: u32 }>;
      /**
       * A registrar was added.
       **/
      RegistrarAdded: AugmentedEvent<ApiType, [registrarIndex: u32], { registrarIndex: u32 }>;
      /**
       * A sub-identity was added to an identity and the deposit paid.
       **/
      SubIdentityAdded: AugmentedEvent<ApiType, [sub: AccountId32, main: AccountId32, deposit: u128], { sub: AccountId32, main: AccountId32, deposit: u128 }>;
      /**
       * A sub-identity was removed from an identity and the deposit freed.
       **/
      SubIdentityRemoved: AugmentedEvent<ApiType, [sub: AccountId32, main: AccountId32, deposit: u128], { sub: AccountId32, main: AccountId32, deposit: u128 }>;
      /**
       * A sub-identity was cleared, and the given deposit repatriated from the
       * main identity account to the sub-identity account.
       **/
      SubIdentityRevoked: AugmentedEvent<ApiType, [sub: AccountId32, main: AccountId32, deposit: u128], { sub: AccountId32, main: AccountId32, deposit: u128 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    lottery: {
      /**
       * A new set of calls have been set!
       **/
      CallsUpdated: AugmentedEvent<ApiType, []>;
      /**
       * A lottery has been started!
       **/
      LotteryStarted: AugmentedEvent<ApiType, []>;
      /**
       * A ticket has been bought!
       **/
      TicketBought: AugmentedEvent<ApiType, [who: AccountId32, callIndex: ITuple<[u8, u8]>], { who: AccountId32, callIndex: ITuple<[u8, u8]> }>;
      /**
       * A winner has been chosen!
       **/
      Winner: AugmentedEvent<ApiType, [winner: AccountId32, lotteryBalance: u128], { winner: AccountId32, lotteryBalance: u128 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    multisig: {
      /**
       * A multisig operation has been approved by someone.
       **/
      MultisigApproval: AugmentedEvent<ApiType, [approving: AccountId32, timepoint: PalletMultisigTimepoint, multisig: AccountId32, callHash: U8aFixed], { approving: AccountId32, timepoint: PalletMultisigTimepoint, multisig: AccountId32, callHash: U8aFixed }>;
      /**
       * A multisig operation has been cancelled.
       **/
      MultisigCancelled: AugmentedEvent<ApiType, [cancelling: AccountId32, timepoint: PalletMultisigTimepoint, multisig: AccountId32, callHash: U8aFixed], { cancelling: AccountId32, timepoint: PalletMultisigTimepoint, multisig: AccountId32, callHash: U8aFixed }>;
      /**
       * A multisig operation has been executed.
       **/
      MultisigExecuted: AugmentedEvent<ApiType, [approving: AccountId32, timepoint: PalletMultisigTimepoint, multisig: AccountId32, callHash: U8aFixed, result: Result<Null, SpRuntimeDispatchError>], { approving: AccountId32, timepoint: PalletMultisigTimepoint, multisig: AccountId32, callHash: U8aFixed, result: Result<Null, SpRuntimeDispatchError> }>;
      /**
       * A new multisig operation has begun.
       **/
      NewMultisig: AugmentedEvent<ApiType, [approving: AccountId32, multisig: AccountId32, callHash: U8aFixed], { approving: AccountId32, multisig: AccountId32, callHash: U8aFixed }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    parachainSystem: {
      /**
       * Downward messages were processed using the given weight.
       **/
      DownwardMessagesProcessed: AugmentedEvent<ApiType, [weightUsed: SpWeightsWeightV2Weight, dmqHead: H256], { weightUsed: SpWeightsWeightV2Weight, dmqHead: H256 }>;
      /**
       * Some downward messages have been received and will be processed.
       **/
      DownwardMessagesReceived: AugmentedEvent<ApiType, [count: u32], { count: u32 }>;
      /**
       * An upgrade has been authorized.
       **/
      UpgradeAuthorized: AugmentedEvent<ApiType, [codeHash: H256], { codeHash: H256 }>;
      /**
       * The validation function was applied as of the contained relay chain block number.
       **/
      ValidationFunctionApplied: AugmentedEvent<ApiType, [relayChainBlockNum: u32], { relayChainBlockNum: u32 }>;
      /**
       * The relay-chain aborted the upgrade process.
       **/
      ValidationFunctionDiscarded: AugmentedEvent<ApiType, []>;
      /**
       * The validation function has been scheduled to apply.
       **/
      ValidationFunctionStored: AugmentedEvent<ApiType, []>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    phalaBasePool: {
      /**
       * A Nft is created to contain pool shares
       **/
      NftCreated: AugmentedEvent<ApiType, [pid: u64, cid: u32, nftId: u32, owner: AccountId32, shares: u128], { pid: u64, cid: u32, nftId: u32, owner: AccountId32, shares: u128 }>;
      /**
       * A pool contribution whitelist is added
       * 
       * - lazy operated when the first staker is added to the whitelist
       **/
      PoolWhitelistCreated: AugmentedEvent<ApiType, [pid: u64], { pid: u64 }>;
      /**
       * The pool contribution whitelist is deleted
       * 
       * - lazy operated when the last staker is removed from the whitelist
       **/
      PoolWhitelistDeleted: AugmentedEvent<ApiType, [pid: u64], { pid: u64 }>;
      /**
       * A staker is added to the pool contribution whitelist
       **/
      PoolWhitelistStakerAdded: AugmentedEvent<ApiType, [pid: u64, staker: AccountId32], { pid: u64, staker: AccountId32 }>;
      /**
       * A staker is removed from the pool contribution whitelist
       **/
      PoolWhitelistStakerRemoved: AugmentedEvent<ApiType, [pid: u64, staker: AccountId32], { pid: u64, staker: AccountId32 }>;
      /**
       * Some stake was withdrawn from a pool
       * 
       * The lock in [`Balances`](pallet_balances::pallet::Pallet) is updated to release the
       * locked stake.
       * 
       * Affected states:
       * - the stake related fields in [`Pools`]
       * - the user staking asset account
       **/
      Withdrawal: AugmentedEvent<ApiType, [pid: u64, user: AccountId32, amount: u128, shares: u128], { pid: u64, user: AccountId32, amount: u128, shares: u128 }>;
      /**
       * A withdrawal request is inserted to a queue
       * 
       * Affected states:
       * - a new item is inserted to or an old item is being replaced by the new item in the
       * withdraw queue in [`Pools`]
       **/
      WithdrawalQueued: AugmentedEvent<ApiType, [pid: u64, user: AccountId32, shares: u128, nftId: u32, asVault: Option<u64>], { pid: u64, user: AccountId32, shares: u128, nftId: u32, asVault: Option<u64> }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    phalaComputation: {
      /**
       * Benchmark Updated
       **/
      BenchmarkUpdated: AugmentedEvent<ApiType, [session: AccountId32, pInstant: u32], { session: AccountId32, pInstant: u32 }>;
      /**
       * Cool down expiration changed (in sec).
       * 
       * Indicates a change in [`CoolDownPeriod`].
       **/
      CoolDownExpirationChanged: AugmentedEvent<ApiType, [period: u64], { period: u64 }>;
      /**
       * Some internal error happened when settling a worker's ledger.
       **/
      InternalErrorWorkerSettleFailed: AugmentedEvent<ApiType, [worker: SpCoreSr25519Public], { worker: SpCoreSr25519Public }>;
      /**
       * Some internal error happened when trying to halve the subsidy
       **/
      InternalErrorWrongHalvingConfigured: AugmentedEvent<ApiType, []>;
      /**
       * Worker & session are bounded.
       * 
       * Affected states:
       * - [`SessionBindings`] for the session account is pointed to the worker
       * - [`WorkerBindings`] for the worker is pointed to the session account
       * - the worker info at [`Sessions`] is updated with `Ready` state
       **/
      SessionBound: AugmentedEvent<ApiType, [session: AccountId32, worker: SpCoreSr25519Public], { session: AccountId32, worker: SpCoreSr25519Public }>;
      /**
       * Worker settled successfully.
       * 
       * It results in the v in [`Sessions`] being updated. It also indicates the downstream
       * stake pool has received the computing reward (payout), and the treasury has received the
       * tax.
       **/
      SessionSettled: AugmentedEvent<ApiType, [session: AccountId32, vBits: u128, payoutBits: u128], { session: AccountId32, vBits: u128, payoutBits: u128 }>;
      /**
       * A session settlement was dropped because the on-chain version is more up-to-date.
       * 
       * This is a temporary walk-around of the computing staking design. Will be fixed by
       * StakePool v2.
       **/
      SessionSettlementDropped: AugmentedEvent<ApiType, [session: AccountId32, v: u128, payout: u128], { session: AccountId32, v: u128, payout: u128 }>;
      /**
       * Worker & worker are unbound.
       * 
       * Affected states:
       * - [`SessionBindings`] for the session account is removed
       * - [`WorkerBindings`] for the worker is removed
       **/
      SessionUnbound: AugmentedEvent<ApiType, [session: AccountId32, worker: SpCoreSr25519Public], { session: AccountId32, worker: SpCoreSr25519Public }>;
      /**
       * Block subsidy halved by 25%.
       * 
       * This event will be followed by a [`TokenomicParametersChanged`](#variant.TokenomicParametersChanged)
       * event indicating the change of the block subsidy budget in the parameter.
       **/
      SubsidyBudgetHalved: AugmentedEvent<ApiType, []>;
      /**
       * Tokenomic parameter changed.
       * 
       * Affected states:
       * - [`TokenomicParameters`] is updated.
       **/
      TokenomicParametersChanged: AugmentedEvent<ApiType, []>;
      /**
       * Worker enters unresponsive state.
       * 
       * Affected states:
       * - the worker info at [`Sessions`] is updated from `WorkerIdle` to `WorkerUnresponsive`
       **/
      WorkerEnterUnresponsive: AugmentedEvent<ApiType, [session: AccountId32], { session: AccountId32 }>;
      /**
       * Worker returns to responsive state.
       * 
       * Affected states:
       * - the worker info at [`Sessions`] is updated from `WorkerUnresponsive` to `WorkerIdle`
       **/
      WorkerExitUnresponsive: AugmentedEvent<ApiType, [session: AccountId32], { session: AccountId32 }>;
      /**
       * Worker is reclaimed, with its slash settled.
       **/
      WorkerReclaimed: AugmentedEvent<ApiType, [session: AccountId32, originalStake: u128, slashed: u128], { session: AccountId32, originalStake: u128, slashed: u128 }>;
      /**
       * A worker starts computing.
       * 
       * Affected states:
       * - the worker info at [`Sessions`] is updated with `WorkerIdle` state
       * - [`NextSessionId`] for the session is incremented
       * - [`Stakes`] for the session is updated
       * - [`OnlineWorkers`] is incremented
       **/
      WorkerStarted: AugmentedEvent<ApiType, [session: AccountId32, initV: u128, initP: u32], { session: AccountId32, initV: u128, initP: u32 }>;
      /**
       * Worker stops computing.
       * 
       * Affected states:
       * - the worker info at [`Sessions`] is updated with `WorkerCoolingDown` state
       * - [`OnlineWorkers`] is decremented
       **/
      WorkerStopped: AugmentedEvent<ApiType, [session: AccountId32], { session: AccountId32 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    phalaRegistry: {
      /**
       * A new Gatekeeper is enabled on the blockchain
       **/
      GatekeeperAdded: AugmentedEvent<ApiType, [pubkey: SpCoreSr25519Public], { pubkey: SpCoreSr25519Public }>;
      GatekeeperRemoved: AugmentedEvent<ApiType, [pubkey: SpCoreSr25519Public], { pubkey: SpCoreSr25519Public }>;
      InitialScoreSet: AugmentedEvent<ApiType, [pubkey: SpCoreSr25519Public, initScore: u32], { pubkey: SpCoreSr25519Public, initScore: u32 }>;
      MasterKeyRotated: AugmentedEvent<ApiType, [rotationId: u64, masterPubkey: SpCoreSr25519Public], { rotationId: u64, masterPubkey: SpCoreSr25519Public }>;
      MasterKeyRotationFailed: AugmentedEvent<ApiType, [rotationLock: Option<u64>, gatekeeperRotationId: u64], { rotationLock: Option<u64>, gatekeeperRotationId: u64 }>;
      MinimumPRuntimeVersionChangedTo: AugmentedEvent<ApiType, [u32, u32, u32]>;
      PRuntimeConsensusVersionChangedTo: AugmentedEvent<ApiType, [u32]>;
      WorkerAdded: AugmentedEvent<ApiType, [pubkey: SpCoreSr25519Public, attestationProvider: Option<PhalaTypesAttestationProvider>, confidenceLevel: u8], { pubkey: SpCoreSr25519Public, attestationProvider: Option<PhalaTypesAttestationProvider>, confidenceLevel: u8 }>;
      WorkerUpdated: AugmentedEvent<ApiType, [pubkey: SpCoreSr25519Public, attestationProvider: Option<PhalaTypesAttestationProvider>, confidenceLevel: u8], { pubkey: SpCoreSr25519Public, attestationProvider: Option<PhalaTypesAttestationProvider>, confidenceLevel: u8 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    phalaStakePool: {
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    phalaStakePoolv2: {
      /**
       * Someone contributed to a pool
       * 
       * Affected states:
       * - the stake related fields in [`Pools`]
       * - the user W-PHA balance reduced
       * - the user recive ad share NFT once contribution succeeded
       * - when there was any request in the withdraw queue, the action may trigger withdrawals
       * ([`Withdrawal`](#variant.Withdrawal) event)
       **/
      Contribution: AugmentedEvent<ApiType, [pid: u64, user: AccountId32, amount: u128, shares: u128, asVault: Option<u64>], { pid: u64, user: AccountId32, amount: u128, shares: u128, asVault: Option<u64> }>;
      /**
       * Owner rewards were withdrawn by pool owner
       * 
       * Affected states:
       * - the stake related fields in [`Pools`]
       * - the owner asset account
       **/
      OwnerRewardsWithdrawn: AugmentedEvent<ApiType, [pid: u64, user: AccountId32, amount: u128], { pid: u64, user: AccountId32, amount: u128 }>;
      /**
       * The stake capacity of the pool is updated
       * 
       * Affected states:
       * - the `cap` field in [`Pools`] is updated
       **/
      PoolCapacitySet: AugmentedEvent<ApiType, [pid: u64, cap: u128], { pid: u64, cap: u128 }>;
      /**
       * The commission of a pool is updated
       * 
       * The commission ratio is represented by an integer. The real value is
       * `commission / 1_000_000u32`.
       * 
       * Affected states:
       * - the `payout_commission` field in [`Pools`] is updated
       **/
      PoolCommissionSet: AugmentedEvent<ApiType, [pid: u64, commission: u32], { pid: u64, commission: u32 }>;
      /**
       * A stake pool is created by `owner`
       * 
       * Affected states:
       * - a new entry in [`Pools`] with the pid
       **/
      PoolCreated: AugmentedEvent<ApiType, [owner: AccountId32, pid: u64, cid: u32, poolAccountId: AccountId32], { owner: AccountId32, pid: u64, cid: u32, poolAccountId: AccountId32 }>;
      /**
       * The pool received a slash event from one of its workers (currently disabled)
       * 
       * The slash is accured to the pending slash accumulator.
       **/
      PoolSlashed: AugmentedEvent<ApiType, [pid: u64, amount: u128], { pid: u64, amount: u128 }>;
      /**
       * A worker is added to the pool
       * 
       * Affected states:
       * - the `worker` is added to the vector `workers` in [`Pools`]
       * - the worker in the [`WorkerAssignments`] is pointed to `pid`
       * - the worker-session binding is updated in `computation` pallet ([`WorkerBindings`](computation::pallet::WorkerBindings),
       * [`SessionBindings`](computation::pallet::SessionBindings))
       **/
      PoolWorkerAdded: AugmentedEvent<ApiType, [pid: u64, worker: SpCoreSr25519Public, session: AccountId32], { pid: u64, worker: SpCoreSr25519Public, session: AccountId32 }>;
      /**
       * A worker is removed from a pool.
       * 
       * Affected states:
       * - the worker item in [`WorkerAssignments`] is removed
       * - the worker is removed from the [`Pools`] item
       **/
      PoolWorkerRemoved: AugmentedEvent<ApiType, [pid: u64, worker: SpCoreSr25519Public], { pid: u64, worker: SpCoreSr25519Public }>;
      /**
       * Some reward is dismissed because the amount is too tiny (dust)
       * 
       * There's no affected state.
       **/
      RewardDismissedDust: AugmentedEvent<ApiType, [pid: u64, amount: u128], { pid: u64, amount: u128 }>;
      /**
       * Some reward is dismissed because the pool doesn't have any share
       * 
       * There's no affected state.
       **/
      RewardDismissedNoShare: AugmentedEvent<ApiType, [pid: u64, amount: u128], { pid: u64, amount: u128 }>;
      /**
       * Some reward is dismissed because the worker is no longer bound to a pool
       * 
       * There's no affected state.
       **/
      RewardDismissedNotInPool: AugmentedEvent<ApiType, [worker: SpCoreSr25519Public, amount: u128], { worker: SpCoreSr25519Public, amount: u128 }>;
      /**
       * The amount of reward that distributed to owner and stakers
       **/
      RewardReceived: AugmentedEvent<ApiType, [pid: u64, toOwner: u128, toStakers: u128], { pid: u64, toOwner: u128, toStakers: u128 }>;
      /**
       * Some slash is actually settled to a contributor (currently disabled)
       **/
      SlashSettled: AugmentedEvent<ApiType, [pid: u64, user: AccountId32, amount: u128], { pid: u64, user: AccountId32, amount: u128 }>;
      /**
       * A worker is reclaimed from the pool
       **/
      WorkerReclaimed: AugmentedEvent<ApiType, [pid: u64, worker: SpCoreSr25519Public], { pid: u64, worker: SpCoreSr25519Public }>;
      /**
       * The amount of stakes for a worker to start computing
       **/
      WorkingStarted: AugmentedEvent<ApiType, [pid: u64, worker: SpCoreSr25519Public, amount: u128], { pid: u64, worker: SpCoreSr25519Public, amount: u128 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    phalaVault: {
      /**
       * Someone contributed to a vault
       * 
       * Affected states:
       * - the stake related fields in [`Pools`]
       * - the user W-PHA balance reduced
       * - the user recive ad share NFT once contribution succeeded
       * - when there was any request in the withdraw queue, the action may trigger withdrawals
       * ([`Withdrawal`](#variant.Withdrawal) event)
       **/
      Contribution: AugmentedEvent<ApiType, [pid: u64, user: AccountId32, amount: u128, shares: u128], { pid: u64, user: AccountId32, amount: u128, shares: u128 }>;
      /**
       * Owner shares is claimed by pool owner
       * Affected states:
       * - the shares related fields in [`Pools`]
       * - the nft related storages in rmrk and pallet unique
       **/
      OwnerSharesClaimed: AugmentedEvent<ApiType, [pid: u64, user: AccountId32, shares: u128], { pid: u64, user: AccountId32, shares: u128 }>;
      /**
       * Additional owner shares are mint into the pool
       * 
       * Affected states:
       * - the shares related fields in [`Pools`]
       * - last_share_price_checkpoint in [`Pools`]
       **/
      OwnerSharesGained: AugmentedEvent<ApiType, [pid: u64, shares: u128, checkoutPrice: u128], { pid: u64, shares: u128, checkoutPrice: u128 }>;
      /**
       * A vault is created by `owner`
       * 
       * Affected states:
       * - a new entry in [`Pools`] with the pid
       **/
      PoolCreated: AugmentedEvent<ApiType, [owner: AccountId32, pid: u64, cid: u32, poolAccountId: AccountId32], { owner: AccountId32, pid: u64, cid: u32, poolAccountId: AccountId32 }>;
      /**
       * The commission of a vault is updated
       * 
       * The commission ratio is represented by an integer. The real value is
       * `commission / 1_000_000u32`.
       * 
       * Affected states:
       * - the `commission` field in [`Pools`] is updated
       **/
      VaultCommissionSet: AugmentedEvent<ApiType, [pid: u64, commission: u32], { pid: u64, commission: u32 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    phalaWrappedBalances: {
      /**
       * Some dust stake is removed
       * 
       * Triggered when the remaining stake of a user is too small after withdrawal or slash.
       * 
       * Affected states:
       * - the balance of the locking ledger of the contributor at [`StakeLedger`] is set to 0
       * - the user's dust stake is moved to treasury
       **/
      DustRemoved: AugmentedEvent<ApiType, [user: AccountId32, amount: u128], { user: AccountId32, amount: u128 }>;
      Unwrapped: AugmentedEvent<ApiType, [user: AccountId32, amount: u128], { user: AccountId32, amount: u128 }>;
      Voted: AugmentedEvent<ApiType, [user: AccountId32, voteId: u32, ayeAmount: u128, nayAmount: u128], { user: AccountId32, voteId: u32, ayeAmount: u128, nayAmount: u128 }>;
      Wrapped: AugmentedEvent<ApiType, [user: AccountId32, amount: u128], { user: AccountId32, amount: u128 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    phragmenElection: {
      /**
       * A candidate was slashed by amount due to failing to obtain a seat as member or
       * runner-up.
       * 
       * Note that old members and runners-up are also candidates.
       **/
      CandidateSlashed: AugmentedEvent<ApiType, [candidate: AccountId32, amount: u128], { candidate: AccountId32, amount: u128 }>;
      /**
       * Internal error happened while trying to perform election.
       **/
      ElectionError: AugmentedEvent<ApiType, []>;
      /**
       * No (or not enough) candidates existed for this round. This is different from
       * `NewTerm(\[\])`. See the description of `NewTerm`.
       **/
      EmptyTerm: AugmentedEvent<ApiType, []>;
      /**
       * A member has been removed. This should always be followed by either `NewTerm` or
       * `EmptyTerm`.
       **/
      MemberKicked: AugmentedEvent<ApiType, [member: AccountId32], { member: AccountId32 }>;
      /**
       * A new term with new_members. This indicates that enough candidates existed to run
       * the election, not that enough have has been elected. The inner value must be examined
       * for this purpose. A `NewTerm(\[\])` indicates that some candidates got their bond
       * slashed and none were elected, whilst `EmptyTerm` means that no candidates existed to
       * begin with.
       **/
      NewTerm: AugmentedEvent<ApiType, [newMembers: Vec<ITuple<[AccountId32, u128]>>], { newMembers: Vec<ITuple<[AccountId32, u128]>> }>;
      /**
       * Someone has renounced their candidacy.
       **/
      Renounced: AugmentedEvent<ApiType, [candidate: AccountId32], { candidate: AccountId32 }>;
      /**
       * A seat holder was slashed by amount by being forcefully removed from the set.
       **/
      SeatHolderSlashed: AugmentedEvent<ApiType, [seatHolder: AccountId32, amount: u128], { seatHolder: AccountId32, amount: u128 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    polkadotXcm: {
      /**
       * Some assets have been claimed from an asset trap
       * 
       * \[ hash, origin, assets \]
       **/
      AssetsClaimed: AugmentedEvent<ApiType, [H256, XcmV1MultiLocation, XcmVersionedMultiAssets]>;
      /**
       * Some assets have been placed in an asset trap.
       * 
       * \[ hash, origin, assets \]
       **/
      AssetsTrapped: AugmentedEvent<ApiType, [H256, XcmV1MultiLocation, XcmVersionedMultiAssets]>;
      /**
       * Execution of an XCM message was attempted.
       * 
       * \[ outcome \]
       **/
      Attempted: AugmentedEvent<ApiType, [XcmV2TraitsOutcome]>;
      /**
       * Expected query response has been received but the origin location of the response does
       * not match that expected. The query remains registered for a later, valid, response to
       * be received and acted upon.
       * 
       * \[ origin location, id, expected location \]
       **/
      InvalidResponder: AugmentedEvent<ApiType, [XcmV1MultiLocation, u64, Option<XcmV1MultiLocation>]>;
      /**
       * Expected query response has been received but the expected origin location placed in
       * storage by this runtime previously cannot be decoded. The query remains registered.
       * 
       * This is unexpected (since a location placed in storage in a previously executing
       * runtime should be readable prior to query timeout) and dangerous since the possibly
       * valid response will be dropped. Manual governance intervention is probably going to be
       * needed.
       * 
       * \[ origin location, id \]
       **/
      InvalidResponderVersion: AugmentedEvent<ApiType, [XcmV1MultiLocation, u64]>;
      /**
       * Query response has been received and query is removed. The registered notification has
       * been dispatched and executed successfully.
       * 
       * \[ id, pallet index, call index \]
       **/
      Notified: AugmentedEvent<ApiType, [u64, u8, u8]>;
      /**
       * Query response has been received and query is removed. The dispatch was unable to be
       * decoded into a `Call`; this might be due to dispatch function having a signature which
       * is not `(origin, QueryId, Response)`.
       * 
       * \[ id, pallet index, call index \]
       **/
      NotifyDecodeFailed: AugmentedEvent<ApiType, [u64, u8, u8]>;
      /**
       * Query response has been received and query is removed. There was a general error with
       * dispatching the notification call.
       * 
       * \[ id, pallet index, call index \]
       **/
      NotifyDispatchError: AugmentedEvent<ApiType, [u64, u8, u8]>;
      /**
       * Query response has been received and query is removed. The registered notification could
       * not be dispatched because the dispatch weight is greater than the maximum weight
       * originally budgeted by this runtime for the query result.
       * 
       * \[ id, pallet index, call index, actual weight, max budgeted weight \]
       **/
      NotifyOverweight: AugmentedEvent<ApiType, [u64, u8, u8, SpWeightsWeightV2Weight, SpWeightsWeightV2Weight]>;
      /**
       * A given location which had a version change subscription was dropped owing to an error
       * migrating the location to our new XCM format.
       * 
       * \[ location, query ID \]
       **/
      NotifyTargetMigrationFail: AugmentedEvent<ApiType, [XcmVersionedMultiLocation, u64]>;
      /**
       * A given location which had a version change subscription was dropped owing to an error
       * sending the notification to it.
       * 
       * \[ location, query ID, error \]
       **/
      NotifyTargetSendFail: AugmentedEvent<ApiType, [XcmV1MultiLocation, u64, XcmV2TraitsError]>;
      /**
       * Query response has been received and is ready for taking with `take_response`. There is
       * no registered notification call.
       * 
       * \[ id, response \]
       **/
      ResponseReady: AugmentedEvent<ApiType, [u64, XcmV2Response]>;
      /**
       * Received query response has been read and removed.
       * 
       * \[ id \]
       **/
      ResponseTaken: AugmentedEvent<ApiType, [u64]>;
      /**
       * A XCM message was sent.
       * 
       * \[ origin, destination, message \]
       **/
      Sent: AugmentedEvent<ApiType, [XcmV1MultiLocation, XcmV1MultiLocation, XcmV2Xcm]>;
      /**
       * The supported version of a location has been changed. This might be through an
       * automatic notification or a manual intervention.
       * 
       * \[ location, XCM version \]
       **/
      SupportedVersionChanged: AugmentedEvent<ApiType, [XcmV1MultiLocation, u32]>;
      /**
       * Query response received which does not match a registered query. This may be because a
       * matching query was never registered, it may be because it is a duplicate response, or
       * because the query timed out.
       * 
       * \[ origin location, id \]
       **/
      UnexpectedResponse: AugmentedEvent<ApiType, [XcmV1MultiLocation, u64]>;
      /**
       * An XCM version change notification message has been attempted to be sent.
       * 
       * \[ destination, result \]
       **/
      VersionChangeNotified: AugmentedEvent<ApiType, [XcmV1MultiLocation, u32]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    preimage: {
      /**
       * A preimage has ben cleared.
       **/
      Cleared: AugmentedEvent<ApiType, [hash_: H256], { hash_: H256 }>;
      /**
       * A preimage has been noted.
       **/
      Noted: AugmentedEvent<ApiType, [hash_: H256], { hash_: H256 }>;
      /**
       * A preimage has been requested.
       **/
      Requested: AugmentedEvent<ApiType, [hash_: H256], { hash_: H256 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    proxy: {
      /**
       * An announcement was placed to make a call in the future.
       **/
      Announced: AugmentedEvent<ApiType, [real: AccountId32, proxy: AccountId32, callHash: H256], { real: AccountId32, proxy: AccountId32, callHash: H256 }>;
      /**
       * A proxy was added.
       **/
      ProxyAdded: AugmentedEvent<ApiType, [delegator: AccountId32, delegatee: AccountId32, proxyType: KhalaParachainRuntimeProxyType, delay: u32], { delegator: AccountId32, delegatee: AccountId32, proxyType: KhalaParachainRuntimeProxyType, delay: u32 }>;
      /**
       * A proxy was executed correctly, with the given.
       **/
      ProxyExecuted: AugmentedEvent<ApiType, [result: Result<Null, SpRuntimeDispatchError>], { result: Result<Null, SpRuntimeDispatchError> }>;
      /**
       * A proxy was removed.
       **/
      ProxyRemoved: AugmentedEvent<ApiType, [delegator: AccountId32, delegatee: AccountId32, proxyType: KhalaParachainRuntimeProxyType, delay: u32], { delegator: AccountId32, delegatee: AccountId32, proxyType: KhalaParachainRuntimeProxyType, delay: u32 }>;
      /**
       * A pure account has been created by new proxy with given
       * disambiguation index and proxy type.
       **/
      PureCreated: AugmentedEvent<ApiType, [pure: AccountId32, who: AccountId32, proxyType: KhalaParachainRuntimeProxyType, disambiguationIndex: u16], { pure: AccountId32, who: AccountId32, proxyType: KhalaParachainRuntimeProxyType, disambiguationIndex: u16 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    pwIncubation: {
      /**
       * CanStartIncubation status changed and set official hatch time.
       **/
      CanStartIncubationStatusChanged: AugmentedEvent<ApiType, [status: bool, startTime: u64, officialHatchTime: u64], { status: bool, startTime: u64, officialHatchTime: u64 }>;
      /**
       * Origin of Shell updated chosen parts.
       **/
      OriginOfShellChosenPartsUpdated: AugmentedEvent<ApiType, [collectionId: u32, nftId: u32, oldChosenParts: Option<PalletPhalaWorldShellParts>, newChosenParts: PalletPhalaWorldShellParts], { collectionId: u32, nftId: u32, oldChosenParts: Option<PalletPhalaWorldShellParts>, newChosenParts: PalletPhalaWorldShellParts }>;
      /**
       * Origin of Shell received food from an account.
       **/
      OriginOfShellReceivedFood: AugmentedEvent<ApiType, [collectionId: u32, nftId: u32, sender: AccountId32, era: u64], { collectionId: u32, nftId: u32, sender: AccountId32, era: u64 }>;
      /**
       * Shell has been awakened from an origin_of_shell being hatched and burned.
       **/
      ShellAwakened: AugmentedEvent<ApiType, [shellCollectionId: u32, shellNftId: u32, rarity: PalletPhalaWorldRarityType, career: PalletPhalaWorldCareerType, race: PalletPhalaWorldRaceType, generationId: u32, originOfShellCollectionId: u32, originOfShellNftId: u32, owner: AccountId32], { shellCollectionId: u32, shellNftId: u32, rarity: PalletPhalaWorldRarityType, career: PalletPhalaWorldCareerType, race: PalletPhalaWorldRaceType, generationId: u32, originOfShellCollectionId: u32, originOfShellNftId: u32, owner: AccountId32 }>;
      /**
       * Shell Collection ID is set.
       **/
      ShellCollectionIdSet: AugmentedEvent<ApiType, [collectionId: u32], { collectionId: u32 }>;
      /**
       * Shell Part minted.
       **/
      ShellPartMinted: AugmentedEvent<ApiType, [shellPartsCollectionId: u32, shellPartNftId: u32, parentShellCollectionId: u32, parentShellNftId: u32, owner: AccountId32], { shellPartsCollectionId: u32, shellPartNftId: u32, parentShellCollectionId: u32, parentShellNftId: u32, owner: AccountId32 }>;
      /**
       * Shell Parts Collection ID is set.
       **/
      ShellPartsCollectionIdSet: AugmentedEvent<ApiType, [collectionId: u32], { collectionId: u32 }>;
      /**
       * Origin of Shell owner has initiated the incubation sequence.
       **/
      StartedIncubation: AugmentedEvent<ApiType, [collectionId: u32, nftId: u32, owner: AccountId32, startTime: u64, hatchTime: u64], { collectionId: u32, nftId: u32, owner: AccountId32, startTime: u64, hatchTime: u64 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    pwNftSale: {
      /**
       * Chosen preorder was minted to owner
       **/
      ChosenPreorderMinted: AugmentedEvent<ApiType, [preorderId: u32, owner: AccountId32, nftId: u32], { preorderId: u32, owner: AccountId32, nftId: u32 }>;
      /**
       * Spirit Claims status has changed
       **/
      ClaimSpiritStatusChanged: AugmentedEvent<ApiType, [status: bool], { status: bool }>;
      /**
       * Last Day of Sale status has changed
       **/
      LastDayOfSaleStatusChanged: AugmentedEvent<ApiType, [status: bool], { status: bool }>;
      /**
       * Start of a new era
       **/
      NewEra: AugmentedEvent<ApiType, [time: u64, era: u64], { time: u64, era: u64 }>;
      /**
       * Not chosen preorder was refunded to owner
       **/
      NotChosenPreorderRefunded: AugmentedEvent<ApiType, [preorderId: u32, owner: AccountId32], { preorderId: u32, owner: AccountId32 }>;
      /**
       * Origin of Shell collection id was set
       **/
      OriginOfShellCollectionIdSet: AugmentedEvent<ApiType, [collectionId: u32], { collectionId: u32 }>;
      /**
       * Gift a Origin of Shell for giveaway or reserved NFT to owner
       **/
      OriginOfShellGiftedToOwner: AugmentedEvent<ApiType, [owner: AccountId32, nftSaleType: PalletPhalaWorldNftSaleType], { owner: AccountId32, nftSaleType: PalletPhalaWorldNftSaleType }>;
      /**
       * Origin of Shell inventory updated
       **/
      OriginOfShellInventoryUpdated: AugmentedEvent<ApiType, [rarityType: PalletPhalaWorldRarityType], { rarityType: PalletPhalaWorldRarityType }>;
      /**
       * Origin of Shell minted from the preorder
       **/
      OriginOfShellMinted: AugmentedEvent<ApiType, [rarityType: PalletPhalaWorldRarityType, collectionId: u32, nftId: u32, owner: AccountId32, race: PalletPhalaWorldRaceType, career: PalletPhalaWorldCareerType, generationId: u32], { rarityType: PalletPhalaWorldRarityType, collectionId: u32, nftId: u32, owner: AccountId32, race: PalletPhalaWorldRaceType, career: PalletPhalaWorldCareerType, generationId: u32 }>;
      /**
       * A chance to get an Origin of Shell through preorder
       **/
      OriginOfShellPreordered: AugmentedEvent<ApiType, [owner: AccountId32, preorderId: u32, race: PalletPhalaWorldRaceType, career: PalletPhalaWorldCareerType], { owner: AccountId32, preorderId: u32, race: PalletPhalaWorldRaceType, career: PalletPhalaWorldCareerType }>;
      /**
       * Origin of Shells Inventory was set
       **/
      OriginOfShellsInventoryWasSet: AugmentedEvent<ApiType, [status: bool], { status: bool }>;
      /**
       * Origin of Shells Metadata was set
       **/
      OriginOfShellsMetadataSet: AugmentedEvent<ApiType, [originOfShellsMetadata: Vec<ITuple<[PalletPhalaWorldRaceType, Bytes]>>], { originOfShellsMetadata: Vec<ITuple<[PalletPhalaWorldRaceType, Bytes]>> }>;
      OverlordChanged: AugmentedEvent<ApiType, [oldOverlord: Option<AccountId32>, newOverlord: AccountId32], { oldOverlord: Option<AccountId32>, newOverlord: AccountId32 }>;
      /**
       * Payee changed to new account
       **/
      PayeeChanged: AugmentedEvent<ApiType, [oldPayee: Option<AccountId32>, newPayee: AccountId32], { oldPayee: Option<AccountId32>, newPayee: AccountId32 }>;
      /**
       * Preorder Origin of Shells status has changed
       **/
      PreorderOriginOfShellsStatusChanged: AugmentedEvent<ApiType, [status: bool], { status: bool }>;
      /**
       * Purchase Prime Origin of Shells status changed
       **/
      PurchasePrimeOriginOfShellsStatusChanged: AugmentedEvent<ApiType, [status: bool], { status: bool }>;
      /**
       * Purchase Rare Origin of Shells status has changed
       **/
      PurchaseRareOriginOfShellsStatusChanged: AugmentedEvent<ApiType, [status: bool], { status: bool }>;
      /**
       * Signer changed to new account
       **/
      SignerChanged: AugmentedEvent<ApiType, [oldSigner: Option<AccountId32>, newSigner: AccountId32], { oldSigner: Option<AccountId32>, newSigner: AccountId32 }>;
      /**
       * Spirit has been claimed
       **/
      SpiritClaimed: AugmentedEvent<ApiType, [owner: AccountId32, collectionId: u32, nftId: u32], { owner: AccountId32, collectionId: u32, nftId: u32 }>;
      /**
       * Spirit collection id was set
       **/
      SpiritCollectionIdSet: AugmentedEvent<ApiType, [collectionId: u32], { collectionId: u32 }>;
      /**
       * Spirits Metadata was set
       **/
      SpiritsMetadataSet: AugmentedEvent<ApiType, [spiritsMetadata: Bytes], { spiritsMetadata: Bytes }>;
      /**
       * Phala World clock zero day started
       **/
      WorldClockStarted: AugmentedEvent<ApiType, [startTime: u64], { startTime: u64 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    rmrkCore: {
      CollectionCreated: AugmentedEvent<ApiType, [issuer: AccountId32, collectionId: u32], { issuer: AccountId32, collectionId: u32 }>;
      CollectionDestroyed: AugmentedEvent<ApiType, [issuer: AccountId32, collectionId: u32], { issuer: AccountId32, collectionId: u32 }>;
      CollectionLocked: AugmentedEvent<ApiType, [issuer: AccountId32, collectionId: u32], { issuer: AccountId32, collectionId: u32 }>;
      IssuerChanged: AugmentedEvent<ApiType, [oldIssuer: AccountId32, newIssuer: AccountId32, collectionId: u32], { oldIssuer: AccountId32, newIssuer: AccountId32, collectionId: u32 }>;
      NFTAccepted: AugmentedEvent<ApiType, [sender: AccountId32, recipient: RmrkTraitsNftAccountIdOrCollectionNftTuple, collectionId: u32, nftId: u32], { sender: AccountId32, recipient: RmrkTraitsNftAccountIdOrCollectionNftTuple, collectionId: u32, nftId: u32 }>;
      NFTBurned: AugmentedEvent<ApiType, [owner: AccountId32, collectionId: u32, nftId: u32], { owner: AccountId32, collectionId: u32, nftId: u32 }>;
      NftMinted: AugmentedEvent<ApiType, [owner: RmrkTraitsNftAccountIdOrCollectionNftTuple, collectionId: u32, nftId: u32], { owner: RmrkTraitsNftAccountIdOrCollectionNftTuple, collectionId: u32, nftId: u32 }>;
      NFTRejected: AugmentedEvent<ApiType, [sender: AccountId32, collectionId: u32, nftId: u32], { sender: AccountId32, collectionId: u32, nftId: u32 }>;
      NFTSent: AugmentedEvent<ApiType, [sender: AccountId32, recipient: RmrkTraitsNftAccountIdOrCollectionNftTuple, collectionId: u32, nftId: u32, approvalRequired: bool], { sender: AccountId32, recipient: RmrkTraitsNftAccountIdOrCollectionNftTuple, collectionId: u32, nftId: u32, approvalRequired: bool }>;
      PrioritySet: AugmentedEvent<ApiType, [collectionId: u32, nftId: u32], { collectionId: u32, nftId: u32 }>;
      PropertyRemoved: AugmentedEvent<ApiType, [collectionId: u32, maybeNftId: Option<u32>, key: Bytes], { collectionId: u32, maybeNftId: Option<u32>, key: Bytes }>;
      PropertySet: AugmentedEvent<ApiType, [collectionId: u32, maybeNftId: Option<u32>, key: Bytes, value: Bytes], { collectionId: u32, maybeNftId: Option<u32>, key: Bytes, value: Bytes }>;
      ResourceAccepted: AugmentedEvent<ApiType, [nftId: u32, resourceId: u32, collectionId: u32], { nftId: u32, resourceId: u32, collectionId: u32 }>;
      ResourceAdded: AugmentedEvent<ApiType, [nftId: u32, resourceId: u32, collectionId: u32], { nftId: u32, resourceId: u32, collectionId: u32 }>;
      ResourceRemoval: AugmentedEvent<ApiType, [nftId: u32, resourceId: u32, collectionId: u32], { nftId: u32, resourceId: u32, collectionId: u32 }>;
      ResourceRemovalAccepted: AugmentedEvent<ApiType, [nftId: u32, resourceId: u32, collectionId: u32], { nftId: u32, resourceId: u32, collectionId: u32 }>;
      ResourceReplaced: AugmentedEvent<ApiType, [nftId: u32, resourceId: u32, collectionId: u32], { nftId: u32, resourceId: u32, collectionId: u32 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    rmrkEquip: {
      BaseCreated: AugmentedEvent<ApiType, [issuer: AccountId32, baseId: u32], { issuer: AccountId32, baseId: u32 }>;
      BaseIssuerChanged: AugmentedEvent<ApiType, [oldIssuer: AccountId32, newIssuer: AccountId32, baseId: u32], { oldIssuer: AccountId32, newIssuer: AccountId32, baseId: u32 }>;
      EquippablesUpdated: AugmentedEvent<ApiType, [baseId: u32, slotId: u32], { baseId: u32, slotId: u32 }>;
      SlotEquipped: AugmentedEvent<ApiType, [itemCollection: u32, itemNft: u32, baseId: u32, slotId: u32], { itemCollection: u32, itemNft: u32, baseId: u32, slotId: u32 }>;
      SlotUnequipped: AugmentedEvent<ApiType, [itemCollection: u32, itemNft: u32, baseId: u32, slotId: u32], { itemCollection: u32, itemNft: u32, baseId: u32, slotId: u32 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    rmrkMarket: {
      /**
       * Offer was accepted
       **/
      OfferAccepted: AugmentedEvent<ApiType, [owner: AccountId32, buyer: AccountId32, collectionId: u32, nftId: u32], { owner: AccountId32, buyer: AccountId32, collectionId: u32, nftId: u32 }>;
      /**
       * Offer was placed on a token
       **/
      OfferPlaced: AugmentedEvent<ApiType, [offerer: AccountId32, collectionId: u32, nftId: u32, price: u128], { offerer: AccountId32, collectionId: u32, nftId: u32, price: u128 }>;
      /**
       * Offer was withdrawn
       **/
      OfferWithdrawn: AugmentedEvent<ApiType, [sender: AccountId32, collectionId: u32, nftId: u32], { sender: AccountId32, collectionId: u32, nftId: u32 }>;
      /**
       * Token listed on Marketplace
       **/
      TokenListed: AugmentedEvent<ApiType, [owner: AccountId32, collectionId: u32, nftId: u32, price: u128], { owner: AccountId32, collectionId: u32, nftId: u32, price: u128 }>;
      /**
       * The price for a token was updated
       **/
      TokenPriceUpdated: AugmentedEvent<ApiType, [owner: AccountId32, collectionId: u32, nftId: u32, price: Option<u128>], { owner: AccountId32, collectionId: u32, nftId: u32, price: Option<u128> }>;
      /**
       * Token was sold to a new owner
       **/
      TokenSold: AugmentedEvent<ApiType, [owner: AccountId32, buyer: AccountId32, collectionId: u32, nftId: u32, price: u128], { owner: AccountId32, buyer: AccountId32, collectionId: u32, nftId: u32, price: u128 }>;
      /**
       * Token unlisted on Marketplace
       **/
      TokenUnlisted: AugmentedEvent<ApiType, [owner: AccountId32, collectionId: u32, nftId: u32], { owner: AccountId32, collectionId: u32, nftId: u32 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    scheduler: {
      /**
       * The call for the provided hash was not found so the task has been aborted.
       **/
      CallUnavailable: AugmentedEvent<ApiType, [task: ITuple<[u32, u32]>, id: Option<U8aFixed>], { task: ITuple<[u32, u32]>, id: Option<U8aFixed> }>;
      /**
       * Canceled some task.
       **/
      Canceled: AugmentedEvent<ApiType, [when: u32, index: u32], { when: u32, index: u32 }>;
      /**
       * Dispatched some task.
       **/
      Dispatched: AugmentedEvent<ApiType, [task: ITuple<[u32, u32]>, id: Option<U8aFixed>, result: Result<Null, SpRuntimeDispatchError>], { task: ITuple<[u32, u32]>, id: Option<U8aFixed>, result: Result<Null, SpRuntimeDispatchError> }>;
      /**
       * The given task was unable to be renewed since the agenda is full at that block.
       **/
      PeriodicFailed: AugmentedEvent<ApiType, [task: ITuple<[u32, u32]>, id: Option<U8aFixed>], { task: ITuple<[u32, u32]>, id: Option<U8aFixed> }>;
      /**
       * The given task can never be executed since it is overweight.
       **/
      PermanentlyOverweight: AugmentedEvent<ApiType, [task: ITuple<[u32, u32]>, id: Option<U8aFixed>], { task: ITuple<[u32, u32]>, id: Option<U8aFixed> }>;
      /**
       * Scheduled some task.
       **/
      Scheduled: AugmentedEvent<ApiType, [when: u32, index: u32], { when: u32, index: u32 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    session: {
      /**
       * New session has happened. Note that the argument is the session index, not the
       * block number as the type might suggest.
       **/
      NewSession: AugmentedEvent<ApiType, [sessionIndex: u32], { sessionIndex: u32 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    system: {
      /**
       * `:code` was updated.
       **/
      CodeUpdated: AugmentedEvent<ApiType, []>;
      /**
       * An extrinsic failed.
       **/
      ExtrinsicFailed: AugmentedEvent<ApiType, [dispatchError: SpRuntimeDispatchError, dispatchInfo: FrameSupportDispatchDispatchInfo], { dispatchError: SpRuntimeDispatchError, dispatchInfo: FrameSupportDispatchDispatchInfo }>;
      /**
       * An extrinsic completed successfully.
       **/
      ExtrinsicSuccess: AugmentedEvent<ApiType, [dispatchInfo: FrameSupportDispatchDispatchInfo], { dispatchInfo: FrameSupportDispatchDispatchInfo }>;
      /**
       * An account was reaped.
       **/
      KilledAccount: AugmentedEvent<ApiType, [account: AccountId32], { account: AccountId32 }>;
      /**
       * A new account was created.
       **/
      NewAccount: AugmentedEvent<ApiType, [account: AccountId32], { account: AccountId32 }>;
      /**
       * On on-chain remark happened.
       **/
      Remarked: AugmentedEvent<ApiType, [sender: AccountId32, hash_: H256], { sender: AccountId32, hash_: H256 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    technicalCommittee: {
      /**
       * A motion was approved by the required threshold.
       **/
      Approved: AugmentedEvent<ApiType, [proposalHash: H256], { proposalHash: H256 }>;
      /**
       * A proposal was closed because its threshold was reached or after its duration was up.
       **/
      Closed: AugmentedEvent<ApiType, [proposalHash: H256, yes: u32, no: u32], { proposalHash: H256, yes: u32, no: u32 }>;
      /**
       * A motion was not approved by the required threshold.
       **/
      Disapproved: AugmentedEvent<ApiType, [proposalHash: H256], { proposalHash: H256 }>;
      /**
       * A motion was executed; result will be `Ok` if it returned without error.
       **/
      Executed: AugmentedEvent<ApiType, [proposalHash: H256, result: Result<Null, SpRuntimeDispatchError>], { proposalHash: H256, result: Result<Null, SpRuntimeDispatchError> }>;
      /**
       * A single member did some action; result will be `Ok` if it returned without error.
       **/
      MemberExecuted: AugmentedEvent<ApiType, [proposalHash: H256, result: Result<Null, SpRuntimeDispatchError>], { proposalHash: H256, result: Result<Null, SpRuntimeDispatchError> }>;
      /**
       * A motion (given hash) has been proposed (by given account) with a threshold (given
       * `MemberCount`).
       **/
      Proposed: AugmentedEvent<ApiType, [account: AccountId32, proposalIndex: u32, proposalHash: H256, threshold: u32], { account: AccountId32, proposalIndex: u32, proposalHash: H256, threshold: u32 }>;
      /**
       * A motion (given hash) has been voted on by given account, leaving
       * a tally (yes votes and no votes given respectively as `MemberCount`).
       **/
      Voted: AugmentedEvent<ApiType, [account: AccountId32, proposalHash: H256, voted: bool, yes: u32, no: u32], { account: AccountId32, proposalHash: H256, voted: bool, yes: u32, no: u32 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    technicalMembership: {
      /**
       * Phantom member, never used.
       **/
      Dummy: AugmentedEvent<ApiType, []>;
      /**
       * One of the members' keys changed.
       **/
      KeyChanged: AugmentedEvent<ApiType, []>;
      /**
       * The given member was added; see the transaction for who.
       **/
      MemberAdded: AugmentedEvent<ApiType, []>;
      /**
       * The given member was removed; see the transaction for who.
       **/
      MemberRemoved: AugmentedEvent<ApiType, []>;
      /**
       * The membership was reset; see the transaction for who the new set is.
       **/
      MembersReset: AugmentedEvent<ApiType, []>;
      /**
       * Two members were swapped; see the transaction for who.
       **/
      MembersSwapped: AugmentedEvent<ApiType, []>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    tips: {
      /**
       * A new tip suggestion has been opened.
       **/
      NewTip: AugmentedEvent<ApiType, [tipHash: H256], { tipHash: H256 }>;
      /**
       * A tip suggestion has been closed.
       **/
      TipClosed: AugmentedEvent<ApiType, [tipHash: H256, who: AccountId32, payout: u128], { tipHash: H256, who: AccountId32, payout: u128 }>;
      /**
       * A tip suggestion has reached threshold and is closing.
       **/
      TipClosing: AugmentedEvent<ApiType, [tipHash: H256], { tipHash: H256 }>;
      /**
       * A tip suggestion has been retracted.
       **/
      TipRetracted: AugmentedEvent<ApiType, [tipHash: H256], { tipHash: H256 }>;
      /**
       * A tip suggestion has been slashed.
       **/
      TipSlashed: AugmentedEvent<ApiType, [tipHash: H256, finder: AccountId32, deposit: u128], { tipHash: H256, finder: AccountId32, deposit: u128 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    transactionPayment: {
      /**
       * A transaction fee `actual_fee`, of which `tip` was added to the minimum inclusion fee,
       * has been paid by `who`.
       **/
      TransactionFeePaid: AugmentedEvent<ApiType, [who: AccountId32, actualFee: u128, tip: u128], { who: AccountId32, actualFee: u128, tip: u128 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    treasury: {
      /**
       * Some funds have been allocated.
       **/
      Awarded: AugmentedEvent<ApiType, [proposalIndex: u32, award: u128, account: AccountId32], { proposalIndex: u32, award: u128, account: AccountId32 }>;
      /**
       * Some of our funds have been burnt.
       **/
      Burnt: AugmentedEvent<ApiType, [burntFunds: u128], { burntFunds: u128 }>;
      /**
       * Some funds have been deposited.
       **/
      Deposit: AugmentedEvent<ApiType, [value: u128], { value: u128 }>;
      /**
       * New proposal.
       **/
      Proposed: AugmentedEvent<ApiType, [proposalIndex: u32], { proposalIndex: u32 }>;
      /**
       * A proposal was rejected; funds were slashed.
       **/
      Rejected: AugmentedEvent<ApiType, [proposalIndex: u32, slashed: u128], { proposalIndex: u32, slashed: u128 }>;
      /**
       * Spending has finished; this is the amount that rolls over until next spend.
       **/
      Rollover: AugmentedEvent<ApiType, [rolloverBalance: u128], { rolloverBalance: u128 }>;
      /**
       * A new spend proposal has been approved.
       **/
      SpendApproved: AugmentedEvent<ApiType, [proposalIndex: u32, amount: u128, beneficiary: AccountId32], { proposalIndex: u32, amount: u128, beneficiary: AccountId32 }>;
      /**
       * We have ended a spend period and will now allocate funds.
       **/
      Spending: AugmentedEvent<ApiType, [budgetRemaining: u128], { budgetRemaining: u128 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    uniques: {
      /**
       * An approval for a `delegate` account to transfer the `item` of an item
       * `collection` was cancelled by its `owner`.
       **/
      ApprovalCancelled: AugmentedEvent<ApiType, [collection: u32, item: u32, owner: AccountId32, delegate: AccountId32], { collection: u32, item: u32, owner: AccountId32, delegate: AccountId32 }>;
      /**
       * An `item` of a `collection` has been approved by the `owner` for transfer by
       * a `delegate`.
       **/
      ApprovedTransfer: AugmentedEvent<ApiType, [collection: u32, item: u32, owner: AccountId32, delegate: AccountId32], { collection: u32, item: u32, owner: AccountId32, delegate: AccountId32 }>;
      /**
       * Attribute metadata has been cleared for a `collection` or `item`.
       **/
      AttributeCleared: AugmentedEvent<ApiType, [collection: u32, maybeItem: Option<u32>, key: Bytes], { collection: u32, maybeItem: Option<u32>, key: Bytes }>;
      /**
       * New attribute metadata has been set for a `collection` or `item`.
       **/
      AttributeSet: AugmentedEvent<ApiType, [collection: u32, maybeItem: Option<u32>, key: Bytes, value: Bytes], { collection: u32, maybeItem: Option<u32>, key: Bytes, value: Bytes }>;
      /**
       * An `item` was destroyed.
       **/
      Burned: AugmentedEvent<ApiType, [collection: u32, item: u32, owner: AccountId32], { collection: u32, item: u32, owner: AccountId32 }>;
      /**
       * Some `collection` was frozen.
       **/
      CollectionFrozen: AugmentedEvent<ApiType, [collection: u32], { collection: u32 }>;
      /**
       * Max supply has been set for a collection.
       **/
      CollectionMaxSupplySet: AugmentedEvent<ApiType, [collection: u32, maxSupply: u32], { collection: u32, maxSupply: u32 }>;
      /**
       * Metadata has been cleared for a `collection`.
       **/
      CollectionMetadataCleared: AugmentedEvent<ApiType, [collection: u32], { collection: u32 }>;
      /**
       * New metadata has been set for a `collection`.
       **/
      CollectionMetadataSet: AugmentedEvent<ApiType, [collection: u32, data: Bytes, isFrozen: bool], { collection: u32, data: Bytes, isFrozen: bool }>;
      /**
       * Some `collection` was thawed.
       **/
      CollectionThawed: AugmentedEvent<ApiType, [collection: u32], { collection: u32 }>;
      /**
       * A `collection` was created.
       **/
      Created: AugmentedEvent<ApiType, [collection: u32, creator: AccountId32, owner: AccountId32], { collection: u32, creator: AccountId32, owner: AccountId32 }>;
      /**
       * A `collection` was destroyed.
       **/
      Destroyed: AugmentedEvent<ApiType, [collection: u32], { collection: u32 }>;
      /**
       * A `collection` was force-created.
       **/
      ForceCreated: AugmentedEvent<ApiType, [collection: u32, owner: AccountId32], { collection: u32, owner: AccountId32 }>;
      /**
       * Some `item` was frozen.
       **/
      Frozen: AugmentedEvent<ApiType, [collection: u32, item: u32], { collection: u32, item: u32 }>;
      /**
       * An `item` was issued.
       **/
      Issued: AugmentedEvent<ApiType, [collection: u32, item: u32, owner: AccountId32], { collection: u32, item: u32, owner: AccountId32 }>;
      /**
       * An item was bought.
       **/
      ItemBought: AugmentedEvent<ApiType, [collection: u32, item: u32, price: u128, seller: AccountId32, buyer: AccountId32], { collection: u32, item: u32, price: u128, seller: AccountId32, buyer: AccountId32 }>;
      /**
       * The price for the instance was removed.
       **/
      ItemPriceRemoved: AugmentedEvent<ApiType, [collection: u32, item: u32], { collection: u32, item: u32 }>;
      /**
       * The price was set for the instance.
       **/
      ItemPriceSet: AugmentedEvent<ApiType, [collection: u32, item: u32, price: u128, whitelistedBuyer: Option<AccountId32>], { collection: u32, item: u32, price: u128, whitelistedBuyer: Option<AccountId32> }>;
      /**
       * A `collection` has had its attributes changed by the `Force` origin.
       **/
      ItemStatusChanged: AugmentedEvent<ApiType, [collection: u32], { collection: u32 }>;
      /**
       * Metadata has been cleared for an item.
       **/
      MetadataCleared: AugmentedEvent<ApiType, [collection: u32, item: u32], { collection: u32, item: u32 }>;
      /**
       * New metadata has been set for an item.
       **/
      MetadataSet: AugmentedEvent<ApiType, [collection: u32, item: u32, data: Bytes, isFrozen: bool], { collection: u32, item: u32, data: Bytes, isFrozen: bool }>;
      /**
       * The owner changed.
       **/
      OwnerChanged: AugmentedEvent<ApiType, [collection: u32, newOwner: AccountId32], { collection: u32, newOwner: AccountId32 }>;
      /**
       * Ownership acceptance has changed for an account.
       **/
      OwnershipAcceptanceChanged: AugmentedEvent<ApiType, [who: AccountId32, maybeCollection: Option<u32>], { who: AccountId32, maybeCollection: Option<u32> }>;
      /**
       * Metadata has been cleared for an item.
       **/
      Redeposited: AugmentedEvent<ApiType, [collection: u32, successfulItems: Vec<u32>], { collection: u32, successfulItems: Vec<u32> }>;
      /**
       * The management team changed.
       **/
      TeamChanged: AugmentedEvent<ApiType, [collection: u32, issuer: AccountId32, admin: AccountId32, freezer: AccountId32], { collection: u32, issuer: AccountId32, admin: AccountId32, freezer: AccountId32 }>;
      /**
       * Some `item` was thawed.
       **/
      Thawed: AugmentedEvent<ApiType, [collection: u32, item: u32], { collection: u32, item: u32 }>;
      /**
       * An `item` was transferred.
       **/
      Transferred: AugmentedEvent<ApiType, [collection: u32, item: u32, from: AccountId32, to: AccountId32], { collection: u32, item: u32, from: AccountId32, to: AccountId32 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    utility: {
      /**
       * Batch of dispatches completed fully with no error.
       **/
      BatchCompleted: AugmentedEvent<ApiType, []>;
      /**
       * Batch of dispatches completed but has errors.
       **/
      BatchCompletedWithErrors: AugmentedEvent<ApiType, []>;
      /**
       * Batch of dispatches did not complete fully. Index of first failing dispatch given, as
       * well as the error.
       **/
      BatchInterrupted: AugmentedEvent<ApiType, [index: u32, error: SpRuntimeDispatchError], { index: u32, error: SpRuntimeDispatchError }>;
      /**
       * A call was dispatched.
       **/
      DispatchedAs: AugmentedEvent<ApiType, [result: Result<Null, SpRuntimeDispatchError>], { result: Result<Null, SpRuntimeDispatchError> }>;
      /**
       * A single item within a Batch of dispatches has completed with no error.
       **/
      ItemCompleted: AugmentedEvent<ApiType, []>;
      /**
       * A single item within a Batch of dispatches has completed with error.
       **/
      ItemFailed: AugmentedEvent<ApiType, [error: SpRuntimeDispatchError], { error: SpRuntimeDispatchError }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    vesting: {
      /**
       * An \[account\] has become fully vested.
       **/
      VestingCompleted: AugmentedEvent<ApiType, [account: AccountId32], { account: AccountId32 }>;
      /**
       * The amount vested has been updated. This could indicate a change in funds available.
       * The balance given is the amount which is left unvested (and thus locked).
       **/
      VestingUpdated: AugmentedEvent<ApiType, [account: AccountId32, unvested: u128], { account: AccountId32, unvested: u128 }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    xcmBridge: {
      /**
       * Assets sent to parachain or relaychain.
       **/
      AssetTransfered: AugmentedEvent<ApiType, [asset: XcmV1MultiAsset, origin: XcmV1MultiLocation, dest: XcmV1MultiLocation], { asset: XcmV1MultiAsset, origin: XcmV1MultiLocation, dest: XcmV1MultiLocation }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    xcmpQueue: {
      /**
       * Bad XCM format used.
       **/
      BadFormat: AugmentedEvent<ApiType, [messageHash: Option<H256>], { messageHash: Option<H256> }>;
      /**
       * Bad XCM version used.
       **/
      BadVersion: AugmentedEvent<ApiType, [messageHash: Option<H256>], { messageHash: Option<H256> }>;
      /**
       * Some XCM failed.
       **/
      Fail: AugmentedEvent<ApiType, [messageHash: Option<H256>, error: XcmV2TraitsError, weight: SpWeightsWeightV2Weight], { messageHash: Option<H256>, error: XcmV2TraitsError, weight: SpWeightsWeightV2Weight }>;
      /**
       * An XCM exceeded the individual message weight budget.
       **/
      OverweightEnqueued: AugmentedEvent<ApiType, [sender: u32, sentAt: u32, index: u64, required: SpWeightsWeightV2Weight], { sender: u32, sentAt: u32, index: u64, required: SpWeightsWeightV2Weight }>;
      /**
       * An XCM from the overweight queue was executed with the given actual weight used.
       **/
      OverweightServiced: AugmentedEvent<ApiType, [index: u64, used: SpWeightsWeightV2Weight], { index: u64, used: SpWeightsWeightV2Weight }>;
      /**
       * Some XCM was executed ok.
       **/
      Success: AugmentedEvent<ApiType, [messageHash: Option<H256>, weight: SpWeightsWeightV2Weight], { messageHash: Option<H256>, weight: SpWeightsWeightV2Weight }>;
      /**
       * An upward message was sent to the relay chain.
       **/
      UpwardMessageSent: AugmentedEvent<ApiType, [messageHash: Option<H256>], { messageHash: Option<H256> }>;
      /**
       * An HRMP message was sent to a sibling parachain.
       **/
      XcmpMessageSent: AugmentedEvent<ApiType, [messageHash: Option<H256>], { messageHash: Option<H256> }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    xTransfer: {
      /**
       * Assets being deposited to somewhere.
       **/
      Deposited: AugmentedEvent<ApiType, [what: XcmV1MultiAsset, who: XcmV1MultiLocation, memo: Bytes], { what: XcmV1MultiAsset, who: XcmV1MultiLocation, memo: Bytes }>;
      /**
       * Assets being forwarded to somewhere.
       **/
      Forwarded: AugmentedEvent<ApiType, [what: XcmV1MultiAsset, who: XcmV1MultiLocation, memo: Bytes], { what: XcmV1MultiAsset, who: XcmV1MultiLocation, memo: Bytes }>;
      /**
       * Assets being withdrawn from somewhere.
       **/
      Withdrawn: AugmentedEvent<ApiType, [what: XcmV1MultiAsset, who: XcmV1MultiLocation, memo: Bytes], { what: XcmV1MultiAsset, who: XcmV1MultiLocation, memo: Bytes }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
  } // AugmentedEvents
} // declare module
