// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

// import type lookup before we augment - in some environments
// this is required to allow for ambient/previous definitions
import '@polkadot/api-base/types/errors';

import type { ApiTypes, AugmentedError } from '@polkadot/api-base/types';

export type __AugmentedError<ApiType extends ApiTypes> = AugmentedError<ApiType>;

declare module '@polkadot/api-base/types/errors' {
  interface AugmentedErrors<ApiType extends ApiTypes> {
    assets: {
      /**
       * The asset-account already exists.
       **/
      AlreadyExists: AugmentedError<ApiType>;
      /**
       * Invalid metadata given.
       **/
      BadMetadata: AugmentedError<ApiType>;
      /**
       * Invalid witness data given.
       **/
      BadWitness: AugmentedError<ApiType>;
      /**
       * Account balance must be greater than or equal to the transfer amount.
       **/
      BalanceLow: AugmentedError<ApiType>;
      /**
       * The origin account is frozen.
       **/
      Frozen: AugmentedError<ApiType>;
      /**
       * The asset ID is already taken.
       **/
      InUse: AugmentedError<ApiType>;
      /**
       * Minimum balance should be non-zero.
       **/
      MinBalanceZero: AugmentedError<ApiType>;
      /**
       * The account to alter does not exist.
       **/
      NoAccount: AugmentedError<ApiType>;
      /**
       * The asset-account doesn't have an associated deposit.
       **/
      NoDeposit: AugmentedError<ApiType>;
      /**
       * The signing account has no permission to do the operation.
       **/
      NoPermission: AugmentedError<ApiType>;
      /**
       * Unable to increment the consumer reference counters on the account. Either no provider
       * reference exists to allow a non-zero balance of a non-self-sufficient asset, or the
       * maximum number of consumers has been reached.
       **/
      NoProvider: AugmentedError<ApiType>;
      /**
       * No approval exists that would allow the transfer.
       **/
      Unapproved: AugmentedError<ApiType>;
      /**
       * The given asset ID is unknown.
       **/
      Unknown: AugmentedError<ApiType>;
      /**
       * The operation would result in funds being burned.
       **/
      WouldBurn: AugmentedError<ApiType>;
      /**
       * The source account would not survive the transfer and it needs to stay alive.
       **/
      WouldDie: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    assetsRegistry: {
      AssetAlreadyExist: AugmentedError<ApiType>;
      AssetNotRegistered: AugmentedError<ApiType>;
      BridgeAlreadyDisabled: AugmentedError<ApiType>;
      BridgeAlreadyEnabled: AugmentedError<ApiType>;
      DuplictedLocation: AugmentedError<ApiType>;
      FailedToTransactAsset: AugmentedError<ApiType>;
      LocationTooLong: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    authorship: {
      /**
       * The uncle is genesis.
       **/
      GenesisUncle: AugmentedError<ApiType>;
      /**
       * The uncle parent not in the chain.
       **/
      InvalidUncleParent: AugmentedError<ApiType>;
      /**
       * The uncle isn't recent enough to be included.
       **/
      OldUncle: AugmentedError<ApiType>;
      /**
       * The uncle is too high in chain.
       **/
      TooHighUncle: AugmentedError<ApiType>;
      /**
       * Too many uncles.
       **/
      TooManyUncles: AugmentedError<ApiType>;
      /**
       * The uncle is already included.
       **/
      UncleAlreadyIncluded: AugmentedError<ApiType>;
      /**
       * Uncles already set in the block.
       **/
      UnclesAlreadySet: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    balances: {
      /**
       * Beneficiary account must pre-exist
       **/
      DeadAccount: AugmentedError<ApiType>;
      /**
       * Value too low to create account due to existential deposit
       **/
      ExistentialDeposit: AugmentedError<ApiType>;
      /**
       * A vesting schedule already exists for this account
       **/
      ExistingVestingSchedule: AugmentedError<ApiType>;
      /**
       * Balance too low to send value.
       **/
      InsufficientBalance: AugmentedError<ApiType>;
      /**
       * Transfer/payment would kill account
       **/
      KeepAlive: AugmentedError<ApiType>;
      /**
       * Account liquidity restrictions prevent withdrawal
       **/
      LiquidityRestrictions: AugmentedError<ApiType>;
      /**
       * Number of named reserves exceed MaxReserves
       **/
      TooManyReserves: AugmentedError<ApiType>;
      /**
       * Vesting balance too high to send value
       **/
      VestingBalance: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    bounties: {
      /**
       * The bounty cannot be closed because it has active child bounties.
       **/
      HasActiveChildBounty: AugmentedError<ApiType>;
      /**
       * Proposer's balance is too low.
       **/
      InsufficientProposersBalance: AugmentedError<ApiType>;
      /**
       * Invalid bounty fee.
       **/
      InvalidFee: AugmentedError<ApiType>;
      /**
       * No proposal or bounty at that index.
       **/
      InvalidIndex: AugmentedError<ApiType>;
      /**
       * Invalid bounty value.
       **/
      InvalidValue: AugmentedError<ApiType>;
      /**
       * A bounty payout is pending.
       * To cancel the bounty, you must unassign and slash the curator.
       **/
      PendingPayout: AugmentedError<ApiType>;
      /**
       * The bounties cannot be claimed/closed because it's still in the countdown period.
       **/
      Premature: AugmentedError<ApiType>;
      /**
       * The reason given is just too big.
       **/
      ReasonTooBig: AugmentedError<ApiType>;
      /**
       * Require bounty curator.
       **/
      RequireCurator: AugmentedError<ApiType>;
      /**
       * Too many approvals are already queued.
       **/
      TooManyQueued: AugmentedError<ApiType>;
      /**
       * The bounty status is unexpected.
       **/
      UnexpectedStatus: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    chainBridge: {
      /**
       * Resource ID provided isn't mapped to anything
       **/
      _ResourceDoesNotExist: AugmentedError<ApiType>;
      /**
       * Relayer threshold not set
       **/
      _ThresholdNotSet: AugmentedError<ApiType>;
      /**
       * Convertion failed from resource id
       **/
      AssetConversionFailed: AugmentedError<ApiType>;
      /**
       * Assets not registered through pallet-assets or pallet-uniques
       **/
      AssetNotRegistered: AugmentedError<ApiType>;
      /**
       * Trying to push bridge event count more than `BridgeEventLimit`
       **/
      BridgeEventOverflow: AugmentedError<ApiType>;
      /**
       * Can not transfer assets to dest due to some reasons
       **/
      CannotDepositAsset: AugmentedError<ApiType>;
      /**
       * Can not extract asset reserve location
       **/
      CannotDetermineReservedLocation: AugmentedError<ApiType>;
      /**
       * Asset can not pay as fee
       **/
      CannotPayAsFee: AugmentedError<ApiType>;
      /**
       * Chain has already been enabled
       **/
      ChainAlreadyWhitelisted: AugmentedError<ApiType>;
      /**
       * Interactions with this chain is not permitted
       **/
      ChainNotWhitelisted: AugmentedError<ApiType>;
      /**
       * Can not extract dest location
       **/
      DestUnrecognized: AugmentedError<ApiType>;
      /**
       * Unkonwn asset
       **/
      ExtractAssetFailed: AugmentedError<ApiType>;
      /**
       * Unknown destnation
       **/
      ExtractDestFailed: AugmentedError<ApiType>;
      /**
       * Too expensive fee for withdrawn asset
       **/
      FeeTooExpensive: AugmentedError<ApiType>;
      /**
       * Infusficient balance to withdraw
       **/
      InsufficientBalance: AugmentedError<ApiType>;
      /**
       * Provided chain Id is not valid
       **/
      InvalidChainId: AugmentedError<ApiType>;
      /**
       * Got wrong paremeter when update fee
       **/
      InvalidFeeOption: AugmentedError<ApiType>;
      /**
       * Relayer threshold cannot be 0
       **/
      InvalidThreshold: AugmentedError<ApiType>;
      /**
       * Protected operation, must be performed by relayer
       **/
      MustBeRelayer: AugmentedError<ApiType>;
      /**
       * Proposal has either failed or succeeded
       **/
      ProposalAlreadyComplete: AugmentedError<ApiType>;
      /**
       * A proposal with these parameters has already been submitted
       **/
      ProposalAlreadyExists: AugmentedError<ApiType>;
      /**
       * No proposal with the ID was found
       **/
      ProposalDoesNotExist: AugmentedError<ApiType>;
      /**
       * Lifetime of proposal has been exceeded
       **/
      ProposalExpired: AugmentedError<ApiType>;
      /**
       * Cannot complete proposal, needs more votes
       **/
      ProposalNotComplete: AugmentedError<ApiType>;
      /**
       * Relayer already in set
       **/
      RelayerAlreadyExists: AugmentedError<ApiType>;
      /**
       * Relayer has already submitted some vote for this proposal
       **/
      RelayerAlreadyVoted: AugmentedError<ApiType>;
      /**
       * Provided accountId is not a relayer
       **/
      RelayerInvalid: AugmentedError<ApiType>;
      /**
       * Transfer failed
       **/
      TransactFailed: AugmentedError<ApiType>;
      /**
       * Function unimplemented
       **/
      Unimplemented: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    childBounties: {
      /**
       * The bounty balance is not enough to add new child-bounty.
       **/
      InsufficientBountyBalance: AugmentedError<ApiType>;
      /**
       * The parent bounty is not in active state.
       **/
      ParentBountyNotActive: AugmentedError<ApiType>;
      /**
       * Number of child bounties exceeds limit `MaxActiveChildBountyCount`.
       **/
      TooManyChildBounties: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    collatorSelection: {
      /**
       * User is already a candidate
       **/
      AlreadyCandidate: AugmentedError<ApiType>;
      /**
       * User is already an Invulnerable
       **/
      AlreadyInvulnerable: AugmentedError<ApiType>;
      /**
       * Account has no associated validator ID
       **/
      NoAssociatedValidatorId: AugmentedError<ApiType>;
      /**
       * User is not a candidate
       **/
      NotCandidate: AugmentedError<ApiType>;
      /**
       * Permission issue
       **/
      Permission: AugmentedError<ApiType>;
      /**
       * Too few candidates
       **/
      TooFewCandidates: AugmentedError<ApiType>;
      /**
       * Too many candidates
       **/
      TooManyCandidates: AugmentedError<ApiType>;
      /**
       * Too many invulnerables
       **/
      TooManyInvulnerables: AugmentedError<ApiType>;
      /**
       * Unknown error
       **/
      Unknown: AugmentedError<ApiType>;
      /**
       * Validator ID is not yet registered
       **/
      ValidatorNotRegistered: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    council: {
      /**
       * Members are already initialized!
       **/
      AlreadyInitialized: AugmentedError<ApiType>;
      /**
       * Duplicate proposals not allowed
       **/
      DuplicateProposal: AugmentedError<ApiType>;
      /**
       * Duplicate vote ignored
       **/
      DuplicateVote: AugmentedError<ApiType>;
      /**
       * Account is not a member
       **/
      NotMember: AugmentedError<ApiType>;
      /**
       * Proposal must exist
       **/
      ProposalMissing: AugmentedError<ApiType>;
      /**
       * The close call was made too early, before the end of the voting.
       **/
      TooEarly: AugmentedError<ApiType>;
      /**
       * There can only be a maximum of `MaxProposals` active proposals.
       **/
      TooManyProposals: AugmentedError<ApiType>;
      /**
       * Mismatched index
       **/
      WrongIndex: AugmentedError<ApiType>;
      /**
       * The given length bound for the proposal was too low.
       **/
      WrongProposalLength: AugmentedError<ApiType>;
      /**
       * The given weight bound for the proposal was too low.
       **/
      WrongProposalWeight: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    cumulusXcm: {
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    democracy: {
      /**
       * Cannot cancel the same proposal twice
       **/
      AlreadyCanceled: AugmentedError<ApiType>;
      /**
       * The account is already delegating.
       **/
      AlreadyDelegating: AugmentedError<ApiType>;
      /**
       * Identity may not veto a proposal twice
       **/
      AlreadyVetoed: AugmentedError<ApiType>;
      /**
       * Proposal already made
       **/
      DuplicateProposal: AugmentedError<ApiType>;
      /**
       * The instant referendum origin is currently disallowed.
       **/
      InstantNotAllowed: AugmentedError<ApiType>;
      /**
       * Too high a balance was provided that the account cannot afford.
       **/
      InsufficientFunds: AugmentedError<ApiType>;
      /**
       * Invalid hash
       **/
      InvalidHash: AugmentedError<ApiType>;
      /**
       * Maximum number of votes reached.
       **/
      MaxVotesReached: AugmentedError<ApiType>;
      /**
       * No proposals waiting
       **/
      NoneWaiting: AugmentedError<ApiType>;
      /**
       * Delegation to oneself makes no sense.
       **/
      Nonsense: AugmentedError<ApiType>;
      /**
       * The actor has no permission to conduct the action.
       **/
      NoPermission: AugmentedError<ApiType>;
      /**
       * No external proposal
       **/
      NoProposal: AugmentedError<ApiType>;
      /**
       * The account is not currently delegating.
       **/
      NotDelegating: AugmentedError<ApiType>;
      /**
       * Next external proposal not simple majority
       **/
      NotSimpleMajority: AugmentedError<ApiType>;
      /**
       * The given account did not vote on the referendum.
       **/
      NotVoter: AugmentedError<ApiType>;
      /**
       * Proposal still blacklisted
       **/
      ProposalBlacklisted: AugmentedError<ApiType>;
      /**
       * Proposal does not exist
       **/
      ProposalMissing: AugmentedError<ApiType>;
      /**
       * Vote given for invalid referendum
       **/
      ReferendumInvalid: AugmentedError<ApiType>;
      /**
       * Maximum number of items reached.
       **/
      TooMany: AugmentedError<ApiType>;
      /**
       * Value too low
       **/
      ValueLow: AugmentedError<ApiType>;
      /**
       * The account currently has votes attached to it and the operation cannot succeed until
       * these are removed, either through `unvote` or `reap_vote`.
       **/
      VotesExist: AugmentedError<ApiType>;
      /**
       * Voting period too low
       **/
      VotingPeriodLow: AugmentedError<ApiType>;
      /**
       * Invalid upper bound.
       **/
      WrongUpperBound: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    dmpQueue: {
      /**
       * The amount of weight given is possibly not enough for executing the message.
       **/
      OverLimit: AugmentedError<ApiType>;
      /**
       * The message index given is unknown.
       **/
      Unknown: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    identity: {
      /**
       * Account ID is already named.
       **/
      AlreadyClaimed: AugmentedError<ApiType>;
      /**
       * Empty index.
       **/
      EmptyIndex: AugmentedError<ApiType>;
      /**
       * Fee is changed.
       **/
      FeeChanged: AugmentedError<ApiType>;
      /**
       * The index is invalid.
       **/
      InvalidIndex: AugmentedError<ApiType>;
      /**
       * Invalid judgement.
       **/
      InvalidJudgement: AugmentedError<ApiType>;
      /**
       * The target is invalid.
       **/
      InvalidTarget: AugmentedError<ApiType>;
      /**
       * The provided judgement was for a different identity.
       **/
      JudgementForDifferentIdentity: AugmentedError<ApiType>;
      /**
       * Judgement given.
       **/
      JudgementGiven: AugmentedError<ApiType>;
      /**
       * Error that occurs when there is an issue paying for judgement.
       **/
      JudgementPaymentFailed: AugmentedError<ApiType>;
      /**
       * No identity found.
       **/
      NoIdentity: AugmentedError<ApiType>;
      /**
       * Account isn't found.
       **/
      NotFound: AugmentedError<ApiType>;
      /**
       * Account isn't named.
       **/
      NotNamed: AugmentedError<ApiType>;
      /**
       * Sub-account isn't owned by sender.
       **/
      NotOwned: AugmentedError<ApiType>;
      /**
       * Sender is not a sub-account.
       **/
      NotSub: AugmentedError<ApiType>;
      /**
       * Sticky judgement.
       **/
      StickyJudgement: AugmentedError<ApiType>;
      /**
       * Too many additional fields.
       **/
      TooManyFields: AugmentedError<ApiType>;
      /**
       * Maximum amount of registrars reached. Cannot add any more.
       **/
      TooManyRegistrars: AugmentedError<ApiType>;
      /**
       * Too many subs-accounts.
       **/
      TooManySubAccounts: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    lottery: {
      /**
       * A lottery has already ended.
       **/
      AlreadyEnded: AugmentedError<ApiType>;
      /**
       * You are already participating in the lottery with this call.
       **/
      AlreadyParticipating: AugmentedError<ApiType>;
      /**
       * Failed to encode calls
       **/
      EncodingFailed: AugmentedError<ApiType>;
      /**
       * A lottery is already in progress.
       **/
      InProgress: AugmentedError<ApiType>;
      /**
       * The call is not valid for an open lottery.
       **/
      InvalidCall: AugmentedError<ApiType>;
      /**
       * A lottery has not been configured.
       **/
      NotConfigured: AugmentedError<ApiType>;
      /**
       * Too many calls for a single lottery.
       **/
      TooManyCalls: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    multisig: {
      /**
       * Call is already approved by this signatory.
       **/
      AlreadyApproved: AugmentedError<ApiType>;
      /**
       * The data to be stored is already stored.
       **/
      AlreadyStored: AugmentedError<ApiType>;
      /**
       * The maximum weight information provided was too low.
       **/
      MaxWeightTooLow: AugmentedError<ApiType>;
      /**
       * Threshold must be 2 or greater.
       **/
      MinimumThreshold: AugmentedError<ApiType>;
      /**
       * Call doesn't need any (more) approvals.
       **/
      NoApprovalsNeeded: AugmentedError<ApiType>;
      /**
       * Multisig operation not found when attempting to cancel.
       **/
      NotFound: AugmentedError<ApiType>;
      /**
       * No timepoint was given, yet the multisig operation is already underway.
       **/
      NoTimepoint: AugmentedError<ApiType>;
      /**
       * Only the account that originally created the multisig is able to cancel it.
       **/
      NotOwner: AugmentedError<ApiType>;
      /**
       * The sender was contained in the other signatories; it shouldn't be.
       **/
      SenderInSignatories: AugmentedError<ApiType>;
      /**
       * The signatories were provided out of order; they should be ordered.
       **/
      SignatoriesOutOfOrder: AugmentedError<ApiType>;
      /**
       * There are too few signatories in the list.
       **/
      TooFewSignatories: AugmentedError<ApiType>;
      /**
       * There are too many signatories in the list.
       **/
      TooManySignatories: AugmentedError<ApiType>;
      /**
       * A timepoint was given, yet no multisig operation is underway.
       **/
      UnexpectedTimepoint: AugmentedError<ApiType>;
      /**
       * A different timepoint was given to the multisig operation that is underway.
       **/
      WrongTimepoint: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    parachainSystem: {
      /**
       * The inherent which supplies the host configuration did not run this block
       **/
      HostConfigurationNotAvailable: AugmentedError<ApiType>;
      /**
       * No code upgrade has been authorized.
       **/
      NothingAuthorized: AugmentedError<ApiType>;
      /**
       * No validation function upgrade is currently scheduled.
       **/
      NotScheduled: AugmentedError<ApiType>;
      /**
       * Attempt to upgrade validation function while existing upgrade pending
       **/
      OverlappingUpgrades: AugmentedError<ApiType>;
      /**
       * Polkadot currently prohibits this parachain from upgrading its validation function
       **/
      ProhibitedByPolkadot: AugmentedError<ApiType>;
      /**
       * The supplied validation function has compiled into a blob larger than Polkadot is
       * willing to run
       **/
      TooBig: AugmentedError<ApiType>;
      /**
       * The given code upgrade has not been authorized.
       **/
      Unauthorized: AugmentedError<ApiType>;
      /**
       * The inherent which supplies the validation data did not run this block
       **/
      ValidationDataNotAvailable: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    phalaBasePool: {
      /**
       * Can not add the staker to whitelist because the staker is already in whitelist.
       **/
      AlreadyInContributeWhitelist: AugmentedError<ApiType>;
      /**
       * Tried to get a `NftGuard` when the nft is locked. It indicates an internal error occured.
       **/
      AttrLocked: AugmentedError<ApiType>;
      /**
       * Burn nft failed
       **/
      BurnNftFailed: AugmentedError<ApiType>;
      /**
       * Too long for pool description length
       **/
      ExceedMaxDescriptionLen: AugmentedError<ApiType>;
      /**
       * Too many stakers in contribution whitelist that exceed the limit
       **/
      ExceedWhitelistMaxLen: AugmentedError<ApiType>;
      /**
       * Occurs when pool's shares is zero
       **/
      InvalidSharePrice: AugmentedError<ApiType>;
      /**
       * CheckSub less than zero, indicate share amount is invalid
       **/
      InvalidShareToWithdraw: AugmentedError<ApiType>;
      /**
       * The withdrawal amount is too small (considered as dust)
       **/
      InvalidWithdrawalAmount: AugmentedError<ApiType>;
      /**
       * basepool's collection_id isn't founded
       **/
      MissCollectionId: AugmentedError<ApiType>;
      /**
       * NftId does not match any nft
       **/
      NftIdNotFound: AugmentedError<ApiType>;
      /**
       * Invalid staker to contribute because origin isn't in Pool's contribution whitelist.
       **/
      NotInContributeWhitelist: AugmentedError<ApiType>;
      /**
       * Migration root not authorized
       **/
      NotMigrationRoot: AugmentedError<ApiType>;
      /**
       * The pool hasn't have a whitelist created
       **/
      NoWhitelistCreated: AugmentedError<ApiType>;
      /**
       * The pool has already got all the stake completely slashed.
       * 
       * In this case, no more funds can be contributed to the pool until all the pending slash
       * has been resolved.
       **/
      PoolBankrupt: AugmentedError<ApiType>;
      /**
       * The Specified pid does not match to any pool
       **/
      PoolDoesNotExist: AugmentedError<ApiType>;
      /**
       * Tried to access a pool type that doesn't match the actual pool type in the storage.
       * 
       * E.g. Try to access a vault but it's actually a  stake pool.
       **/
      PoolTypeNotMatch: AugmentedError<ApiType>;
      /**
       * RMRK errors
       **/
      RmrkError: AugmentedError<ApiType>;
      /**
       * The caller is not the owner of the pool
       **/
      UnauthorizedPoolOwner: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    phalaComputation: {
      /**
       * Deprecated
       **/
      _GatekeeperNotRegistered: AugmentedError<ApiType>;
      /**
       * Deprecated.
       **/
      _InvalidMessage: AugmentedError<ApiType>;
      /**
       * The transaction is sent by an unauthorized sender
       **/
      BadSender: AugmentedError<ApiType>;
      /**
       * There's no benchmark result on the blockchain.
       **/
      BenchmarkMissing: AugmentedError<ApiType>;
      /**
       * Indicating the initial benchmark score is too low to start computing.
       **/
      BenchmarkTooLow: AugmentedError<ApiType>;
      /**
       * Cannot reclaim the worker because it's still in cooldown period.
       **/
      CoolDownNotReady: AugmentedError<ApiType>;
      /**
       * Not permitted because the session is already bound with another worker.
       **/
      DuplicateBoundSession: AugmentedError<ApiType>;
      /**
       * Not permitted because the worker is already bound with another session account.
       **/
      DuplicateBoundWorker: AugmentedError<ApiType>;
      /**
       * Cannot start computing because there's too little stake.
       **/
      InsufficientStake: AugmentedError<ApiType>;
      /**
       * Internal error. The tokenomic parameter is not set.
       **/
      InternalErrorBadTokenomicParameters: AugmentedError<ApiType>;
      /**
       * Internal error. A worker should never start with existing stake in the storage.
       **/
      InternalErrorCannotStartWithExistingStake: AugmentedError<ApiType>;
      /**
       * Migration root not authorized
       **/
      NotMigrationRoot: AugmentedError<ApiType>;
      /**
       * Not permitted because the session is not bound with a worker.
       **/
      SessionNotBound: AugmentedError<ApiType>;
      /**
       * session not found.
       **/
      SessionNotFound: AugmentedError<ApiType>;
      /**
       * Cannot start computing because there's too much stake (exceeds Vmax).
       **/
      TooMuchStake: AugmentedError<ApiType>;
      /**
       * Not permitted because the worker is not bound with a worker account.
       **/
      WorkerNotBound: AugmentedError<ApiType>;
      /**
       * Worker is not in `Computation` state to stop computing.
       **/
      WorkerNotComputing: AugmentedError<ApiType>;
      /**
       * Worker is not in `Ready` state to proceed.
       **/
      WorkerNotReady: AugmentedError<ApiType>;
      /**
       * The worker is not registered in the registry.
       **/
      WorkerNotRegistered: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    phalaMq: {
      BadDestination: AugmentedError<ApiType>;
      BadSender: AugmentedError<ApiType>;
      BadSequence: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    phalaRegistry: {
      BadIASReport: AugmentedError<ApiType>;
      CannotHandleUnknownMessage: AugmentedError<ApiType>;
      CannotRemoveLastGatekeeper: AugmentedError<ApiType>;
      GenesisBlockHashAlreadyExists: AugmentedError<ApiType>;
      GenesisBlockHashNotFound: AugmentedError<ApiType>;
      GenesisBlockHashRejected: AugmentedError<ApiType>;
      InvalidBenchReport: AugmentedError<ApiType>;
      InvalidConsensusVersion: AugmentedError<ApiType>;
      InvalidEndpointSigningTime: AugmentedError<ApiType>;
      InvalidGatekeeper: AugmentedError<ApiType>;
      InvalidIASSigningCert: AugmentedError<ApiType>;
      InvalidInput: AugmentedError<ApiType>;
      InvalidMasterPubkey: AugmentedError<ApiType>;
      InvalidPubKey: AugmentedError<ApiType>;
      InvalidQuoteStatus: AugmentedError<ApiType>;
      InvalidReport: AugmentedError<ApiType>;
      InvalidRotatedMasterPubkey: AugmentedError<ApiType>;
      InvalidRuntimeInfo: AugmentedError<ApiType>;
      InvalidRuntimeInfoHash: AugmentedError<ApiType>;
      InvalidSender: AugmentedError<ApiType>;
      InvalidSignature: AugmentedError<ApiType>;
      InvalidSignatureLength: AugmentedError<ApiType>;
      MalformedSignature: AugmentedError<ApiType>;
      MasterKeyInRotation: AugmentedError<ApiType>;
      MasterKeyMismatch: AugmentedError<ApiType>;
      MasterKeyUninitialized: AugmentedError<ApiType>;
      NoneAttestationDisabled: AugmentedError<ApiType>;
      NotImplemented: AugmentedError<ApiType>;
      /**
       * Migration root not authorized
       **/
      NotMigrationRoot: AugmentedError<ApiType>;
      OutdatedIASReport: AugmentedError<ApiType>;
      ParachainIdMismatch: AugmentedError<ApiType>;
      PRuntimeAlreadyExists: AugmentedError<ApiType>;
      PRuntimeNotFound: AugmentedError<ApiType>;
      PRuntimeRejected: AugmentedError<ApiType>;
      UnknownCluster: AugmentedError<ApiType>;
      UnknownContract: AugmentedError<ApiType>;
      UnknownQuoteBodyFormat: AugmentedError<ApiType>;
      WorkerNotFound: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    phalaStakePool: {
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    phalaStakePoolv2: {
      _PoolIsBusy: AugmentedError<ApiType>;
      /**
       * The worker doesn't have a valid benchmark when adding to the pool
       **/
      BenchmarkMissing: AugmentedError<ApiType>;
      /**
       * Restarted with a less stake is not allowed in the tokenomic.
       **/
      CannotRestartWithLessStake: AugmentedError<ApiType>;
      /**
       * Couldn't bind worker and the pool computing subaccount
       **/
      FailedToBindSessionAndWorker: AugmentedError<ApiType>;
      /**
       * The StakePool is not enabled yet.
       **/
      FeatureNotEnabled: AugmentedError<ApiType>;
      /**
       * The stake capacity is set too low to cover the existing stake
       **/
      InadequateCapacity: AugmentedError<ApiType>;
      /**
       * Trying to contribute more than the available balance
       **/
      InsufficientBalance: AugmentedError<ApiType>;
      /**
       * The contributed stake is smaller than the minimum threshold
       **/
      InsufficientContribution: AugmentedError<ApiType>;
      /**
       * Cannot start computing because there's no enough free stake
       **/
      InsufficientFreeStake: AugmentedError<ApiType>;
      /**
       * Internal error: Cannot withdraw from the subsidy pool. This should never happen.
       **/
      InternalSubsidyPoolCannotWithdraw: AugmentedError<ApiType>;
      /**
       * Invalid amount of balance input when force reward.
       **/
      InvalidForceRewardAmount: AugmentedError<ApiType>;
      /**
       * The withdrawal amount is too small (considered as dust)
       **/
      InvalidWithdrawalAmount: AugmentedError<ApiType>;
      /**
       * Stakepool's collection_id isn't founded
       **/
      MissingCollectionId: AugmentedError<ApiType>;
      /**
       * There's no pending reward to claim
       **/
      NoRewardToClaim: AugmentedError<ApiType>;
      /**
       * The pool has already got all the stake completely slashed.
       * 
       * In this case, no more funds can be contributed to the pool until all the pending slash
       * has been resolved.
       **/
      PoolBankrupt: AugmentedError<ApiType>;
      /**
       * The specified pool doesn't exist
       **/
      PoolDoesNotExist: AugmentedError<ApiType>;
      /**
       * The user doesn't have stake in a pool
       **/
      PoolStakeNotFound: AugmentedError<ApiType>;
      /**
       * The target miner is not in the 	`miner` storage
       **/
      SessionDoesNotExist: AugmentedError<ApiType>;
      /**
       * The stake added to a pool exceeds its capacity
       **/
      StakeExceedsCapacity: AugmentedError<ApiType>;
      /**
       * The owner of the pool doesn't have the access to the worker
       * 
       * The access to a worker is granted by it's `operator` parameter set by `register_worker`
       **/
      UnauthorizedOperator: AugmentedError<ApiType>;
      /**
       * The caller is not the owner of the pool
       **/
      UnauthorizedPoolOwner: AugmentedError<ApiType>;
      /**
       * Vault is forced locked for it has some expired withdrawal
       **/
      VaultIsLocked: AugmentedError<ApiType>;
      /**
       * Withdraw queue is not empty so that we can't restart computing
       **/
      WithdrawQueueNotEmpty: AugmentedError<ApiType>;
      /**
       * The worker is already in cd_workers
       **/
      WorkerAlreadyStopped: AugmentedError<ApiType>;
      /**
       * The target worker is not in the pool
       **/
      WorkerDoesNotExist: AugmentedError<ApiType>;
      /**
       * The worker is already added to the pool
       **/
      WorkerExists: AugmentedError<ApiType>;
      /**
       * The worker is already added to another pool
       **/
      WorkerInAnotherPool: AugmentedError<ApiType>;
      /**
       * The target worker is not reclaimed and can not be removed from a pool.
       **/
      WorkerIsNotReady: AugmentedError<ApiType>;
      /**
       * The worker is not registered in the registry when adding to the pool
       **/
      WorkerNotRegistered: AugmentedError<ApiType>;
      /**
       * Failed to add a worker because the number of the workers exceeds the upper limit.
       **/
      WorkersExceedLimit: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    phalaVault: {
      /**
       * The asset account hasn't been created. It indicates an internal error.
       **/
      AssetAccountNotExist: AugmentedError<ApiType>;
      /**
       * Trying to contribute more than the available balance
       **/
      InsufficientBalance: AugmentedError<ApiType>;
      /**
       * The contributed stake is smaller than the minimum threshold
       **/
      InsufficientContribution: AugmentedError<ApiType>;
      /**
       * The withdrawal amount is too small or too large
       **/
      NoEnoughShareToClaim: AugmentedError<ApiType>;
      /**
       * The vault have no owner shares to claim
       **/
      NoRewardToClaim: AugmentedError<ApiType>;
      /**
       * The caller is not the owner of the pool
       **/
      UnauthorizedPoolOwner: AugmentedError<ApiType>;
      /**
       * The Vault was bankrupt; cannot interact with it unless all the shares are withdrawn.
       **/
      VaultBankrupt: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    phalaWrappedBalances: {
      /**
       * The Iteration exceed the max limitaion
       **/
      IterationsIsNotVaild: AugmentedError<ApiType>;
      /**
       * The vote is not currently on going
       **/
      ReferendumInvalid: AugmentedError<ApiType>;
      /**
       * The vote is now on going and the W-PHA used in voting can not be unlocked
       **/
      ReferendumOngoing: AugmentedError<ApiType>;
      /**
       * user's `FinanceAccount` does not exist in storage: `StakerAccounts`
       **/
      StakerAccountNotFound: AugmentedError<ApiType>;
      /**
       * Trying to unwrap more than the available balance
       **/
      UnwrapAmountExceedsAvaliableStake: AugmentedError<ApiType>;
      /**
       * Trying to vote more than the available balance
       **/
      VoteAmountLargerThanTotalStakes: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    phragmenElection: {
      /**
       * Duplicated candidate submission.
       **/
      DuplicatedCandidate: AugmentedError<ApiType>;
      /**
       * Candidate does not have enough funds.
       **/
      InsufficientCandidateFunds: AugmentedError<ApiType>;
      /**
       * The renouncing origin presented a wrong `Renouncing` parameter.
       **/
      InvalidRenouncing: AugmentedError<ApiType>;
      /**
       * Prediction regarding replacement after member removal is wrong.
       **/
      InvalidReplacement: AugmentedError<ApiType>;
      /**
       * The provided count of number of votes is incorrect.
       **/
      InvalidVoteCount: AugmentedError<ApiType>;
      /**
       * The provided count of number of candidates is incorrect.
       **/
      InvalidWitnessData: AugmentedError<ApiType>;
      /**
       * Cannot vote with stake less than minimum balance.
       **/
      LowBalance: AugmentedError<ApiType>;
      /**
       * Cannot vote more than maximum allowed.
       **/
      MaximumVotesExceeded: AugmentedError<ApiType>;
      /**
       * Member cannot re-submit candidacy.
       **/
      MemberSubmit: AugmentedError<ApiType>;
      /**
       * Must be a voter.
       **/
      MustBeVoter: AugmentedError<ApiType>;
      /**
       * Not a member.
       **/
      NotMember: AugmentedError<ApiType>;
      /**
       * Must vote for at least one candidate.
       **/
      NoVotes: AugmentedError<ApiType>;
      /**
       * Runner cannot re-submit candidacy.
       **/
      RunnerUpSubmit: AugmentedError<ApiType>;
      /**
       * Too many candidates have been created.
       **/
      TooManyCandidates: AugmentedError<ApiType>;
      /**
       * Cannot vote more than candidates.
       **/
      TooManyVotes: AugmentedError<ApiType>;
      /**
       * Voter can not pay voting bond.
       **/
      UnableToPayBond: AugmentedError<ApiType>;
      /**
       * Cannot vote when no candidates or members exist.
       **/
      UnableToVote: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    polkadotXcm: {
      /**
       * The location is invalid since it already has a subscription from us.
       **/
      AlreadySubscribed: AugmentedError<ApiType>;
      /**
       * The given location could not be used (e.g. because it cannot be expressed in the
       * desired version of XCM).
       **/
      BadLocation: AugmentedError<ApiType>;
      /**
       * The version of the `Versioned` value used is not able to be interpreted.
       **/
      BadVersion: AugmentedError<ApiType>;
      /**
       * Could not re-anchor the assets to declare the fees for the destination chain.
       **/
      CannotReanchor: AugmentedError<ApiType>;
      /**
       * The destination `MultiLocation` provided cannot be inverted.
       **/
      DestinationNotInvertible: AugmentedError<ApiType>;
      /**
       * The assets to be sent are empty.
       **/
      Empty: AugmentedError<ApiType>;
      /**
       * The message execution fails the filter.
       **/
      Filtered: AugmentedError<ApiType>;
      /**
       * Origin is invalid for sending.
       **/
      InvalidOrigin: AugmentedError<ApiType>;
      /**
       * The referenced subscription could not be found.
       **/
      NoSubscription: AugmentedError<ApiType>;
      /**
       * There was some other issue (i.e. not to do with routing) in sending the message. Perhaps
       * a lack of space for buffering the message.
       **/
      SendFailure: AugmentedError<ApiType>;
      /**
       * Too many assets have been attempted for transfer.
       **/
      TooManyAssets: AugmentedError<ApiType>;
      /**
       * The desired destination was unreachable, generally because there is a no way of routing
       * to it.
       **/
      Unreachable: AugmentedError<ApiType>;
      /**
       * The message's weight could not be determined.
       **/
      UnweighableMessage: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    preimage: {
      /**
       * Preimage has already been noted on-chain.
       **/
      AlreadyNoted: AugmentedError<ApiType>;
      /**
       * The user is not authorized to perform this action.
       **/
      NotAuthorized: AugmentedError<ApiType>;
      /**
       * The preimage cannot be removed since it has not yet been noted.
       **/
      NotNoted: AugmentedError<ApiType>;
      /**
       * The preimage request cannot be removed since no outstanding requests exist.
       **/
      NotRequested: AugmentedError<ApiType>;
      /**
       * A preimage may not be removed when there are outstanding requests.
       **/
      Requested: AugmentedError<ApiType>;
      /**
       * Preimage is too large to store on-chain.
       **/
      TooBig: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    proxy: {
      /**
       * Account is already a proxy.
       **/
      Duplicate: AugmentedError<ApiType>;
      /**
       * Call may not be made by proxy because it may escalate its privileges.
       **/
      NoPermission: AugmentedError<ApiType>;
      /**
       * Cannot add self as proxy.
       **/
      NoSelfProxy: AugmentedError<ApiType>;
      /**
       * Proxy registration not found.
       **/
      NotFound: AugmentedError<ApiType>;
      /**
       * Sender is not a proxy of the account to be proxied.
       **/
      NotProxy: AugmentedError<ApiType>;
      /**
       * There are too many proxies registered or too many announcements pending.
       **/
      TooMany: AugmentedError<ApiType>;
      /**
       * Announcement, if made at all, was made too recently.
       **/
      Unannounced: AugmentedError<ApiType>;
      /**
       * A call which is incompatible with the proxy type's filter was attempted.
       **/
      Unproxyable: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    pwIncubation: {
      _Deprecated_MaxFoodFedLimitReached: AugmentedError<ApiType>;
      _Deprecated_NoFoodAvailable: AugmentedError<ApiType>;
      _Deprecated_NoHatchTimeDetected: AugmentedError<ApiType>;
      AlreadySentFoodTwice: AugmentedError<ApiType>;
      CannotHatchOriginOfShell: AugmentedError<ApiType>;
      CannotSendFoodToOriginOfShell: AugmentedError<ApiType>;
      CannotSetOriginOfShellChosenParts: AugmentedError<ApiType>;
      CareerNotDetected: AugmentedError<ApiType>;
      ChosenPartsNotDetected: AugmentedError<ApiType>;
      FoodInfoUpdateError: AugmentedError<ApiType>;
      GenerationNotDetected: AugmentedError<ApiType>;
      HatchingInProgress: AugmentedError<ApiType>;
      MissingShellPartMetadata: AugmentedError<ApiType>;
      NoFoodLeftToFeedOriginOfShell: AugmentedError<ApiType>;
      NoPermission: AugmentedError<ApiType>;
      NotOwner: AugmentedError<ApiType>;
      RaceNotDetected: AugmentedError<ApiType>;
      RarityTypeNotDetected: AugmentedError<ApiType>;
      ShellCollectionIdAlreadySet: AugmentedError<ApiType>;
      ShellCollectionIdNotSet: AugmentedError<ApiType>;
      ShellPartsCollectionIdAlreadySet: AugmentedError<ApiType>;
      ShellPartsCollectionIdNotSet: AugmentedError<ApiType>;
      StartIncubationNotAvailable: AugmentedError<ApiType>;
      WrongCollectionId: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    pwNftSale: {
      BelowMinimumBalanceThreshold: AugmentedError<ApiType>;
      InvalidMetadata: AugmentedError<ApiType>;
      InvalidPurchase: AugmentedError<ApiType>;
      InvalidSpiritClaim: AugmentedError<ApiType>;
      InvalidStatusType: AugmentedError<ApiType>;
      KeyTooLong: AugmentedError<ApiType>;
      MustOwnSpiritToPurchase: AugmentedError<ApiType>;
      NoAvailableCollectionId: AugmentedError<ApiType>;
      NoAvailableNftId: AugmentedError<ApiType>;
      NoAvailablePreorderId: AugmentedError<ApiType>;
      NoAvailableRaceGivewayLeft: AugmentedError<ApiType>;
      NoAvailableRaceReservedLeft: AugmentedError<ApiType>;
      NoAvailableResourceId: AugmentedError<ApiType>;
      NotPreorderOwner: AugmentedError<ApiType>;
      OriginOfShellAlreadyPurchased: AugmentedError<ApiType>;
      OriginOfShellCollectionIdAlreadySet: AugmentedError<ApiType>;
      OriginOfShellCollectionNotSet: AugmentedError<ApiType>;
      OriginOfShellInventoryAlreadySet: AugmentedError<ApiType>;
      OriginOfShellInventoryCorrupted: AugmentedError<ApiType>;
      OriginOfShellsMetadataNotSet: AugmentedError<ApiType>;
      OverlordNotSet: AugmentedError<ApiType>;
      PayeeNotSet: AugmentedError<ApiType>;
      PreorderClaimNotAvailable: AugmentedError<ApiType>;
      PreorderClaimNotDetected: AugmentedError<ApiType>;
      PreorderIsPending: AugmentedError<ApiType>;
      PreorderOriginOfShellNotAvailable: AugmentedError<ApiType>;
      PreordersCorrupted: AugmentedError<ApiType>;
      PrimeOriginOfShellPurchaseNotAvailable: AugmentedError<ApiType>;
      RaceMintMaxReached: AugmentedError<ApiType>;
      RareOriginOfShellPurchaseNotAvailable: AugmentedError<ApiType>;
      RefundClaimNotDetected: AugmentedError<ApiType>;
      RequireOverlordAccount: AugmentedError<ApiType>;
      SignerNotSet: AugmentedError<ApiType>;
      SpiritAlreadyClaimed: AugmentedError<ApiType>;
      SpiritClaimNotAvailable: AugmentedError<ApiType>;
      SpiritCollectionIdAlreadySet: AugmentedError<ApiType>;
      SpiritCollectionNotSet: AugmentedError<ApiType>;
      SpiritsMetadataNotSet: AugmentedError<ApiType>;
      ValueNotDetected: AugmentedError<ApiType>;
      WhitelistVerificationFailed: AugmentedError<ApiType>;
      WorldClockAlreadySet: AugmentedError<ApiType>;
      WrongNftSaleType: AugmentedError<ApiType>;
      WrongRarityType: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    rmrkCore: {
      CannotAcceptNonOwnedNft: AugmentedError<ApiType>;
      CannotAcceptToNewOwner: AugmentedError<ApiType>;
      CannotRejectNonOwnedNft: AugmentedError<ApiType>;
      CannotRejectNonPendingNft: AugmentedError<ApiType>;
      CannotSendEquippedItem: AugmentedError<ApiType>;
      CannotSendToDescendentOrSelf: AugmentedError<ApiType>;
      CollectionFullOrLocked: AugmentedError<ApiType>;
      CollectionNotEmpty: AugmentedError<ApiType>;
      CollectionUnknown: AugmentedError<ApiType>;
      EmptyResource: AugmentedError<ApiType>;
      FailedTransferHooksPostTransfer: AugmentedError<ApiType>;
      FailedTransferHooksPreCheck: AugmentedError<ApiType>;
      MetadataNotSet: AugmentedError<ApiType>;
      NftAlreadyExists: AugmentedError<ApiType>;
      NftIsLocked: AugmentedError<ApiType>;
      NoAvailableCollectionId: AugmentedError<ApiType>;
      NoAvailableNftId: AugmentedError<ApiType>;
      NoAvailableResourceId: AugmentedError<ApiType>;
      /**
       * Error names should be descriptive.
       **/
      NoneValue: AugmentedError<ApiType>;
      NonTransferable: AugmentedError<ApiType>;
      NoPermission: AugmentedError<ApiType>;
      NotInRange: AugmentedError<ApiType>;
      NoWitness: AugmentedError<ApiType>;
      RecipientNotSet: AugmentedError<ApiType>;
      ResourceAlreadyExists: AugmentedError<ApiType>;
      ResourceDoesntExist: AugmentedError<ApiType>;
      /**
       * Accepting a resource that is not pending should fail
       **/
      ResourceNotPending: AugmentedError<ApiType>;
      RoyaltyNotSet: AugmentedError<ApiType>;
      /**
       * Errors should have helpful documentation associated with them.
       **/
      StorageOverflow: AugmentedError<ApiType>;
      TooLong: AugmentedError<ApiType>;
      /**
       * The recursion limit has been reached.
       **/
      TooManyRecursions: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    rmrkEquip: {
      BaseDoesntExist: AugmentedError<ApiType>;
      CantEquipFixedPart: AugmentedError<ApiType>;
      CollectionNotEquippable: AugmentedError<ApiType>;
      EquipperDoesntExist: AugmentedError<ApiType>;
      ExceedsMaxPartsPerBase: AugmentedError<ApiType>;
      ItemAlreadyEquipped: AugmentedError<ApiType>;
      ItemDoesntExist: AugmentedError<ApiType>;
      ItemHasNoResourceToEquipThere: AugmentedError<ApiType>;
      ItemNotEquipped: AugmentedError<ApiType>;
      MustBeDirectParent: AugmentedError<ApiType>;
      NeedsDefaultThemeFirst: AugmentedError<ApiType>;
      NoAvailableBaseId: AugmentedError<ApiType>;
      NoAvailablePartId: AugmentedError<ApiType>;
      NoEquippableOnFixedPart: AugmentedError<ApiType>;
      NoResourceForThisBaseFoundOnNft: AugmentedError<ApiType>;
      PartDoesntExist: AugmentedError<ApiType>;
      PermissionError: AugmentedError<ApiType>;
      SlotAlreadyEquipped: AugmentedError<ApiType>;
      SlotNotEquipped: AugmentedError<ApiType>;
      TooManyEquippables: AugmentedError<ApiType>;
      TooManyProperties: AugmentedError<ApiType>;
      UnequipperMustOwnEitherItemOrEquipper: AugmentedError<ApiType>;
      UnexpectedTryFromIntError: AugmentedError<ApiType>;
      UnexpectedVecConversionError: AugmentedError<ApiType>;
      UnknownError: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    rmrkMarket: {
      /**
       * Account cannot offer on a NFT again with an active offer
       **/
      AlreadyOffered: AugmentedError<ApiType>;
      /**
       * Cannot buy NFT that is already owned
       **/
      CannotBuyOwnToken: AugmentedError<ApiType>;
      /**
       * Cannot list NFT owned by a NFT
       **/
      CannotListNftOwnedByNft: AugmentedError<ApiType>;
      /**
       * Cannot make offer on NFT on own NFT
       **/
      CannotOfferOnOwnToken: AugmentedError<ApiType>;
      /**
       * Cannot unlist NFT as it has already been unlisted or sold
       **/
      CannotUnlistToken: AugmentedError<ApiType>;
      /**
       * Offer already accepted and cannot withdraw
       **/
      CannotWithdrawOffer: AugmentedError<ApiType>;
      /**
       * Listing has expired and cannot be bought
       **/
      ListingHasExpired: AugmentedError<ApiType>;
      /**
       * Not possible to list non-transferable NFT
       **/
      NonTransferable: AugmentedError<ApiType>;
      /**
       * No permissions for account to interact with NFT
       **/
      NoPermission: AugmentedError<ApiType>;
      /**
       * Accepted offer has expired and cannot be accepted
       **/
      OfferHasExpired: AugmentedError<ApiType>;
      /**
       * Offer is below the OfferMinimumAmount threshold
       **/
      OfferTooLow: AugmentedError<ApiType>;
      /**
       * Price differs from when `buy` was executed
       **/
      PriceDiffersFromExpected: AugmentedError<ApiType>;
      /**
       * Cannot list a non-existing NFT
       **/
      TokenDoesNotExist: AugmentedError<ApiType>;
      /**
       * Token cannot be bought
       **/
      TokenNotForSale: AugmentedError<ApiType>;
      /**
       * Offer is unknown
       **/
      UnknownOffer: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    scheduler: {
      /**
       * Failed to schedule a call
       **/
      FailedToSchedule: AugmentedError<ApiType>;
      /**
       * Attempt to use a non-named function on a named task.
       **/
      Named: AugmentedError<ApiType>;
      /**
       * Cannot find the scheduled call.
       **/
      NotFound: AugmentedError<ApiType>;
      /**
       * Reschedule failed because it does not change scheduled time.
       **/
      RescheduleNoChange: AugmentedError<ApiType>;
      /**
       * Given target block number is in the past.
       **/
      TargetBlockNumberInPast: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    session: {
      /**
       * Registered duplicate key.
       **/
      DuplicatedKey: AugmentedError<ApiType>;
      /**
       * Invalid ownership proof.
       **/
      InvalidProof: AugmentedError<ApiType>;
      /**
       * Key setting account is not live, so it's impossible to associate keys.
       **/
      NoAccount: AugmentedError<ApiType>;
      /**
       * No associated validator ID for account.
       **/
      NoAssociatedValidatorId: AugmentedError<ApiType>;
      /**
       * No keys are associated with this account.
       **/
      NoKeys: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    system: {
      /**
       * The origin filter prevent the call to be dispatched.
       **/
      CallFiltered: AugmentedError<ApiType>;
      /**
       * Failed to extract the runtime version from the new runtime.
       * 
       * Either calling `Core_version` or decoding `RuntimeVersion` failed.
       **/
      FailedToExtractRuntimeVersion: AugmentedError<ApiType>;
      /**
       * The name of specification does not match between the current runtime
       * and the new runtime.
       **/
      InvalidSpecName: AugmentedError<ApiType>;
      /**
       * Suicide called when the account has non-default composite data.
       **/
      NonDefaultComposite: AugmentedError<ApiType>;
      /**
       * There is a non-zero reference count preventing the account from being purged.
       **/
      NonZeroRefCount: AugmentedError<ApiType>;
      /**
       * The specification version is not allowed to decrease between the current runtime
       * and the new runtime.
       **/
      SpecVersionNeedsToIncrease: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    technicalCommittee: {
      /**
       * Members are already initialized!
       **/
      AlreadyInitialized: AugmentedError<ApiType>;
      /**
       * Duplicate proposals not allowed
       **/
      DuplicateProposal: AugmentedError<ApiType>;
      /**
       * Duplicate vote ignored
       **/
      DuplicateVote: AugmentedError<ApiType>;
      /**
       * Account is not a member
       **/
      NotMember: AugmentedError<ApiType>;
      /**
       * Proposal must exist
       **/
      ProposalMissing: AugmentedError<ApiType>;
      /**
       * The close call was made too early, before the end of the voting.
       **/
      TooEarly: AugmentedError<ApiType>;
      /**
       * There can only be a maximum of `MaxProposals` active proposals.
       **/
      TooManyProposals: AugmentedError<ApiType>;
      /**
       * Mismatched index
       **/
      WrongIndex: AugmentedError<ApiType>;
      /**
       * The given length bound for the proposal was too low.
       **/
      WrongProposalLength: AugmentedError<ApiType>;
      /**
       * The given weight bound for the proposal was too low.
       **/
      WrongProposalWeight: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    technicalMembership: {
      /**
       * Already a member.
       **/
      AlreadyMember: AugmentedError<ApiType>;
      /**
       * Not a member.
       **/
      NotMember: AugmentedError<ApiType>;
      /**
       * Too many members.
       **/
      TooManyMembers: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    tips: {
      /**
       * The tip was already found/started.
       **/
      AlreadyKnown: AugmentedError<ApiType>;
      /**
       * The account attempting to retract the tip is not the finder of the tip.
       **/
      NotFinder: AugmentedError<ApiType>;
      /**
       * The tip cannot be claimed/closed because it's still in the countdown period.
       **/
      Premature: AugmentedError<ApiType>;
      /**
       * The reason given is just too big.
       **/
      ReasonTooBig: AugmentedError<ApiType>;
      /**
       * The tip cannot be claimed/closed because there are not enough tippers yet.
       **/
      StillOpen: AugmentedError<ApiType>;
      /**
       * The tip hash is unknown.
       **/
      UnknownTip: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    treasury: {
      /**
       * The spend origin is valid but the amount it is allowed to spend is lower than the
       * amount to be spent.
       **/
      InsufficientPermission: AugmentedError<ApiType>;
      /**
       * Proposer's balance is too low.
       **/
      InsufficientProposersBalance: AugmentedError<ApiType>;
      /**
       * No proposal or bounty at that index.
       **/
      InvalidIndex: AugmentedError<ApiType>;
      /**
       * Proposal has not been approved.
       **/
      ProposalNotApproved: AugmentedError<ApiType>;
      /**
       * Too many approvals in the queue.
       **/
      TooManyApprovals: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    uniques: {
      /**
       * The item ID has already been used for an item.
       **/
      AlreadyExists: AugmentedError<ApiType>;
      /**
       * Invalid witness data given.
       **/
      BadWitness: AugmentedError<ApiType>;
      /**
       * The provided bid is too low.
       **/
      BidTooLow: AugmentedError<ApiType>;
      /**
       * The item or collection is frozen.
       **/
      Frozen: AugmentedError<ApiType>;
      /**
       * The item ID is already taken.
       **/
      InUse: AugmentedError<ApiType>;
      /**
       * The item is locked.
       **/
      Locked: AugmentedError<ApiType>;
      /**
       * The max supply has already been set.
       **/
      MaxSupplyAlreadySet: AugmentedError<ApiType>;
      /**
       * All items have been minted.
       **/
      MaxSupplyReached: AugmentedError<ApiType>;
      /**
       * The provided max supply is less to the amount of items a collection already has.
       **/
      MaxSupplyTooSmall: AugmentedError<ApiType>;
      /**
       * There is no delegate approved.
       **/
      NoDelegate: AugmentedError<ApiType>;
      /**
       * The signing account has no permission to do the operation.
       **/
      NoPermission: AugmentedError<ApiType>;
      /**
       * Item is not for sale.
       **/
      NotForSale: AugmentedError<ApiType>;
      /**
       * The named owner has not signed ownership of the collection is acceptable.
       **/
      Unaccepted: AugmentedError<ApiType>;
      /**
       * No approval exists that would allow the transfer.
       **/
      Unapproved: AugmentedError<ApiType>;
      /**
       * The given item ID is unknown.
       **/
      UnknownCollection: AugmentedError<ApiType>;
      /**
       * The given item ID is unknown.
       **/
      UnknownItem: AugmentedError<ApiType>;
      /**
       * The delegate turned out to be different to what was expected.
       **/
      WrongDelegate: AugmentedError<ApiType>;
      /**
       * The owner turned out to be different to what was expected.
       **/
      WrongOwner: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    utility: {
      /**
       * Too many calls batched.
       **/
      TooManyCalls: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    vesting: {
      /**
       * Amount being transferred is too low to create a vesting schedule.
       **/
      AmountLow: AugmentedError<ApiType>;
      /**
       * The account already has `MaxVestingSchedules` count of schedules and thus
       * cannot add another one. Consider merging existing schedules in order to add another.
       **/
      AtMaxVestingSchedules: AugmentedError<ApiType>;
      /**
       * Failed to create a new schedule because some parameter was invalid.
       **/
      InvalidScheduleParams: AugmentedError<ApiType>;
      /**
       * The account given is not vesting.
       **/
      NotVesting: AugmentedError<ApiType>;
      /**
       * An index was out of bounds of the vesting schedules.
       **/
      ScheduleIndexOutOfBounds: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    xcmBridge: {
      _FeePaymentEmpty: AugmentedError<ApiType>;
      _LocationInvertFailed: AugmentedError<ApiType>;
      _UnknownError: AugmentedError<ApiType>;
      _UnknownTransfer: AugmentedError<ApiType>;
      /**
       * Asset not been registered or not been supported
       **/
      AssetNotFound: AugmentedError<ApiType>;
      /**
       * Can not transfer asset to dest
       **/
      CannotDepositAsset: AugmentedError<ApiType>;
      /**
       * Can not reanchor asset location according dest
       **/
      CannotReanchor: AugmentedError<ApiType>;
      /**
       * XCM message executeion failed due to some reasons
       **/
      ExecutionFailed: AugmentedError<ApiType>;
      /**
       * Extract dest location failed
       **/
      IllegalDestination: AugmentedError<ApiType>;
      /**
       * Unimplemented function
       **/
      Unimplemented: AugmentedError<ApiType>;
      /**
       * Transfer type not valid
       **/
      UnknownTransferType: AugmentedError<ApiType>;
      /**
       * Failed to measure weight of a XCM message
       **/
      UnweighableMessage: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    xcmpQueue: {
      /**
       * Bad overweight index.
       **/
      BadOverweightIndex: AugmentedError<ApiType>;
      /**
       * Bad XCM data.
       **/
      BadXcm: AugmentedError<ApiType>;
      /**
       * Bad XCM origin.
       **/
      BadXcmOrigin: AugmentedError<ApiType>;
      /**
       * Failed to send XCM message.
       **/
      FailedToSend: AugmentedError<ApiType>;
      /**
       * Provided weight is possibly not enough to execute the message.
       **/
      WeightOverLimit: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    xTransfer: {
      _TransactFailed: AugmentedError<ApiType>;
      UnhandledTransfer: AugmentedError<ApiType>;
      UnknownAsset: AugmentedError<ApiType>;
      UnsupportedDest: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
  } // AugmentedErrors
} // declare module
