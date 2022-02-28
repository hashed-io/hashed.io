---
title: Hashed Chain - Chaos
date : 2021-Dec-17
author : ypp34

---

## Introduction
[Hashed Chain](https://github.com/hashed-io/hashed-substrate/) supports many of the popular prebuilt pallets, listed below, and also a custom pallet for `Fruniques` (`FR`actional `UNIQUES`) and a custom pallet for a gated marketplace, supporting optional pre-approval of each asset and each participant a configured set of Origin.

One immediate use case is with one of our partners, a tax credit marketplace. Tax credits are non-fungible tokens that may be subdivided in a manner where all data is inherited except for the amount, which is subtracted from the parent (similar to a [UTXO chain](https://academy.glassnode.com/concepts/utxo)). This process may repeat indefinitely.

|Frunique Specifications|
-------------------------------|
|A `Frunique` is a type of NFT.|
|Like a vault, any set of fungible tokens or `NFTs` may be locked into a `Frunique`. The locked assets may only be unlocked when the `Frunique` is burned.|
|`Fruniques` can be composed of other `Fruniques`. 
|`Fruniques` support minting a new **fungible** token that is backed by a `Frunique`.
|`Fruniques` support [Uniques](https://github.com/paritytech/substrate/tree/master/frame/uniques) and [Assets](https://github.com/paritytech/substrate/tree/master/frame/assets) specifications for interoperability

This `gated marketplace` includes a role for `enroller` that is reponsible for confirming that new participants in the marketplace are eligible to participate. The accounts that hold `enrollers` status are decided by the marketplace creator, and may be dynamic based on any Origin. 

An `asset enroller` role may be responsible for confirming that new assets in the marketplace are eligible to participate. In the case of tax credits, a licensed CPA attests to the authenticity based on the information provided.

The marketplace may also include a role for `asset burner` or redeemer, which may be responsible for working with participants to offboard their assets. This may involve having a licensed CPA or attorney send information or a form with various parties, or perhaps have a deed notarized. The specific asset will govern which asset burners are eligible.

### [Open Hashed Chain on polkadot.js.org](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fn1.hashed.systems#/explorer)

## Architecture

{{< plantuml id="hc1" >}}
@startuml
node "Other Polkadot Ecosystem" as OPE {
  [Other Marketplaces]
}

package "Protocol Layer/Hashed Chain" {
  [Fruniques Pallet]
  [Marketplace Pallet] --> [Other Marketplaces]
  [Advanced Frunique UI/UX]
  [Services and Caching]
}

node "Statemint Chain" as SC {
  [Uniques Pallet]
  [Fruniques Pallet] --> [Uniques Pallet]
  [Fruniques Pallet] --> [Assets Pallet]
  [Assets Pallet]
  [Assets Pallet] --> [Other Marketplaces]
}

package "End User Experiences" {
  [Afloat/Tax Credits] --> [Fruniques Pallet]
  [Afloat/Tax Credits] --> [Services and Caching]
  [DAO LLC Registrations] --> [Fruniques Pallet]
  [DAO LLC Registrations] --> [Services and Caching]
  ['Get Gifted' NFTs] --> [Fruniques Pallet]
  [Marketplace UI/UX] --> [Fruniques Pallet]
  [Marketplace UI/UX] --> [Marketplace Pallet]
  ['Get Gifted' NFTs] --> [Marketplace UI/UX]
}
@enduml{{< /plantuml >}}

## Composability

{{< plantuml id="hc2" >}}
@startuml
title "Fruniques Composability"
node "Statemine NFT A" as statemine_nft_a
node "Statemine NFT B" as statemine_nft_b

node "Frunique NFT 1" as frq_1
node "Frunique NFT 2" as frq_2
node "Frunique NFT n" as frq_n

node "Fungible Token" as fung_1
node "Frunique NFT 2.1" as frq_2_1
node "Frunique NFT 2.2" as frq_2_2
node "Frunique NFT 2.3" as frq_2_3

note left of frq_2
 Source NFT locked and 1..n new Fruniques 
 can be minted.
end note

note bottom of frq_2_1
 Metadata values are inherited by
 default unless overridden.
end note

note bottom of fung_1
 Parent Frunique owner decides 
 the token supply, symbol, and 
 metadata and is minted the tokens
end note

statemine_nft_a --> frq_1        
statemine_nft_b --> frq_2   
statemine_nft_b --> frq_n

frq_1 --> fung_1

frq_2 --> frq_2_1
frq_2 --> frq_2_2
frq_2 --> frq_2_3
@enduml{{< /plantuml >}}


For more information about Fruniques, see the [pallet documentation](https://github.com/hashed-io/hashed-substrate/tree/main/pallets/fruniques)
### Other Pallets on Hashed Chain
#### [Identity](https://wiki.polkadot.network/docs/learn-identity)
Hashed Chain provides a naming system that allows participants to add information, such as social media accounts, web domains, email addresses, etc. to their on-chain account and subsequently ask for verification of this information by registrars.

#### [Indices](https://wiki.polkadot.network/docs/learn-accounts#indices)
An index is a short and easy-to-remember version of an address. Claiming an index requires a deposit that is released when the index is cleared.

#### [Social Recovery]()
The Recovery pallet is an M-of-N social recovery tool for users to gain access to their accounts if the private key or other authentication mechanism is lost. Through this pallet, a user is able to make calls on-behalf-of another account which they have recovered. The recovery process is protected by trusted "friends" whom the original account owner chooses. A threshold (M) out of N friends are needed to give another account access to the recoverable account.

#### [Uniques (NFTs)](https://github.com/paritytech/substrate/tree/master/frame/uniques)
A simple, secure module for dealing with non-fungible assets.

#### [Treasury](https://wiki.polkadot.network/docs/learn-treasury)
The Treasury pallet provides a "pot" of funds that can be managed by stakeholders in the system and a structure for making spending proposals from this pot.

Roadmap: Integrate support for native multisig BTC in the treasury via PSBT and output descriptors

#### [Society](https://wiki.polkadot.network/docs/maintain-guides-society-kusama)
The Society module is an economic game which incentivizes users to participate and maintain a membership society.

#### [Bounties](https://wiki.polkadot.network/docs/learn-treasury#bounties-spending) 