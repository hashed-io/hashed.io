---
title: "Digitalness: Part 2 of 3"
date: 2021-11-22T10:36:33-06:00
draft: false
authors: Max Gravitt and Sam Newbold
description: "An experienced New York attorney and a blockchain developer analyze Wyoming's DAO LLC Act, including how the requirements are implemented on-chain"
featured_image: "TK_1024.png"
img: "articles/buffalo.png"
---
## Digitalness Primer

Authors: [Max Gravitt](https://github.com/3yekn) and [Sam Newbold](https://www.csglaw.com/index_y.cfm?t=3&A=19042&format=xml&p=16431&stylesheet=AttorneyBio_New)
```
digitalness [ dij-i-tl-nis ]

Noun. The recognition that a series of electrical or magnetic signals may have the same rights as the natural entities or objects they represent.
```

The legal industry has recognized forms of manifested intent in a variety of ways. Think of corporate proxies, surrogacies, trusts and wills. Digitalness is just another way, another mechanism to capture the intent of a person. Like a shareholder proxy casting a vote on a shareholder’s behalf, or a will that outlines how property is to be disposed of, digitalness functions the same way.

## Identity
The first building block of digitalness is Identity. In their [Digital Identity Act](https://www.wyoleg.gov/2021/Introduced/SF0039.pdf), the state of Wyoming defines digital identity in both a personal and organizational context. In both, the identity is the **“intangible digital representation of, by and for [the entity], over which [the entity] intentionally communicates or acts.”** The types of parties included with this scope are natural persons and legal or commercial entities.

The act simply states that **“acts taken through a digital identity are attributable to the [entity] if they were taken by the entity.”** This is an easy concept to understand in the non-digital, or traditional legal world we all commonly use.
## Authenticity
Perhaps the more challenging concept to grasp with digitalness is authenticity, i.e. how do users of digitalness ensure that software programs used to promulgate real human intent do so accurately? This is achieved with blockchain. The Wyoming Digital Identity Act does not impose an explicit requirement for a blockchain, wallet, or cryptography. There is a mention of **“showing the efficacy of a security procedure”**, but the breadth of allowed mechanisms seems to be purposeful to transcend various forms of key custody and ensure the Act is future proof.

Digital Identity, as simple as it sounds, connects the dots between private keys, blockchain accounts, and the actions (state changes) that they perform on the shared data set. 

## Assets
With the Digital Asset Act, Wyoming was the first state to define that digital asset **“means a representation of economic, proprietary or access rights that is stored in a computer readable format and is either a digital consumer asset, digital security or virtual currency.”**

This act mostly clarifies custodial regulations and practices for banks, respecting the reality that tokens or coins are in fact assets is a key component of digitalness.

To summarize so far, on-chain actions taken by specific keys or accounts are the actual actions of the actors, and the on-chain state (e.g. token balances) and state changes (e.g. transfers) may involve actual assets. Pretty simple.

## Decentralized Autonomous Organizations (DAO) Bill
Wyoming was the first State in the United States to introduce the Limited Liability Company (LLC) by [passing legislation in 1977](https://www.wyomingllcs.com/history-of-the-llc/). An LLC is a business structure that limits any owners' personal responsibility for the company’s debts or liabilities. The LLC has been wildly popular for decades as an alternative to corporations, partnerships, and sole proprietorships because of the protective shield and favorable tax treatment by state and federal government.

The [DAO Bill](https://www.wyoleg.gov/2021/Introduced/SF0038.pdf) is a supplement to the original Wyoming Limited Liability Company Act. It states that all of the provisions of LLCs apply to DAOs, and specifies the information required to establish a DAO in the state. Think of it as akin to non-profits or s-corps that are formed as corporations under the corporate laws of states but are treated differently based on certain operational and  governance elections made at the time of formation and special tax filings made by the owner.

### Requirements
LLCs are suggested to have two documents: 
1. Articles of Organization
2. Operating Agreement

A DAO's Articles of Organization (founding document) must have a statement that the company is a decentralized autonomous organization. This is similar to how corporations who wish to be treated as non-profit corporations must have a statement in the charter that the entity will operate as a non-profit.

The LLC’s Articles of Organization for DAOs must have the following text:

```
NOTICE OF RESTRICTIONS ON DUTIES AND TRANSFERS
 
The rights of members in a decentralized autonomous organization may differ materially from the rights of members in other limited liability companies. The Wyoming Decentralized Autonomous Organization Supplement, underlying smart contracts, articles of organization and operating agreement, if applicable, of a decentralized autonomous organization may define, reduce or eliminate fiduciary duties and may restrict transfer of ownership interests, withdrawal or resignation from the decentralized autonomous organization, return of capital contributions and dissolution of the decentralized autonomous organization.
 ```

The registered name of the LLC must contain “DAO”, “LAO”, or “DAO LLC”.

The articles of organization shall include a publicly available identifier of any smart contract directly used to manage, facilitate or operate the decentralized autonomous organization.

## Smart Contract Requirements
The above items all pertain to content or information that must be in the registration. The Act also defines what decisions and duties the smart contract must govern. In the below sections, the numbered `requirements` are quoted from the legislation, and the `implementation` that follows is a description of how we have addressed it. 
***
`Req 1` Relations among the members and between the members and the decentralized autonomous organization

`Impl 1` The word “relations” seems a bit strange here, but there are no relations among the members besides what is defined in the smart contract. The contract’s action signatures (e.g. for creating proposals) are public and clear.
***
`Req 2` Rights and duties under this chapter of a person in their capacity as a member

`Impl 2` Members have a right to make proposals and vote on proposals. They also have the right to transfer their membership interests at any time, unless otherwise proposed and managed via an upgrade to the base contract (for activities such as staking).
*** 
`Req 3` Activities of the decentralized autonomous organization and the conduct of those activities

`Impl 3` The DAO may elect, via a vote or proposal, to hire third parties or agents to conduct off-chain activities, such as paying taxes or fees. These parties or agents may or may not be members of the DAO.
***
`Req 4` Means and conditions for amending the operating agreement

`Impl 4` The operating agreement is maintained wholly on-chain. It can only be updated via a vote from members.
*** 
`Req 5` Rights and voting rights of members

`Impl 5` Membership interests are measured and maintained via a standard token contract, where the DAO itself is the issuer. 

This token is a unit of account.

Voting power is equivalent to membership interest. Both are calculated as the number of tokens owned by the voter divided by the total supply of that token.
***
`Req 6` Transferability of membership interests

`Impl 6` Transferability is instant and final based on transfer of the DAO’s token.
*** 
`Req 7` Withdrawal of membership

`Impl 7` A member may withdraw by transferring their membership interests to the DAO’s smart contract.
***
`Req 8` Distributions to members prior to dissolution

`Impl 8` Members are entitled to a share of all assets owned by the DAO, proportional to their membership interests in the DAO. 
*** 
`Req 9` Amendment of the articles of organization

`Impl 9` The operating agreement is maintained wholly on-chain. It can only be updated from a vote from members.

***
`Req 10` Procedures for amending, updating, editing or changing applicable smart contracts

`Impl 10` The operating agreement is maintained wholly on-chain. It can only be updated from a vote from members.
***
`Req 11` All other aspects of the decentralized autonomous organization

`Impl 11` From time to time, there may be off-chain activities required by the DAO, such as placing an offer on a property or paying property taxes.
***
These are handled via an elected agent of the DAO, who may or may not be a member.

### Code is Law
One of the Act’s most **_consequential and empowering_** aspect is found in the **Miscellaneous** section:

> *Where the underlying articles of organization and operating agreement are in conflict, the articles of organization shall preempt any conflicting provisions.  Where the underlying articles of organization and smart contract are in conflict, the smart contract shall preempt any conflicting provisions of the articles of organization.*

This establishes a hierarchy of power or precedence among the core documents of a DAO LLC. The Articles of Organization trump the Operating Agreement, and the Smart Contract trumps the Articles of Organization.

`Smart Contract    >   Articles of Organization    >   Operating Agreement`

----*The smart contract is the most powerful of all*------   **CODE IS LAW**

This clause clarifies that the on-chain smart contract is the highest, most trusted source of information. 

This clarification empowers the machine code above all else, which is a critical factor in allowing digitalness to thrive. 

This makes sense in a classic legal manner because the smart contract is the best proxy, or best clue for understanding the intent of the parties. It is an explicit understanding that forcing smart contract machine code to comply with paper documents or written words unravels its value proposition. If it were even cryptographically possible, the ability for a government judicial body to overrule the machine code would create an existential vulnerability for any DAO.

In other words, the on-chain records represent **instant and final settlement of state-protected property rights.**

## Future of Digitalness
Wyoming’s legislation on Digital Identity, Assets, and Organizations are a substantial enabler of innovation in our space. It establishes the start of a framework for how people, businesses, and property may be handled on blockchain networks. 

Our mission is to continue to push the boundaries of open innovation by developing products that accelerate adoption of digitalness around the world.
***
Read [Digitalness: Part 1 of 3 - An Underrated Speech](/articles/digitalness-part-1)

Read [Digitalness: Part 3 of 3 - Step by Step DAO Proof of Concept](/articles/digitalness-part-3)
