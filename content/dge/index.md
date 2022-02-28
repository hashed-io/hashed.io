---
title: Document Graph
date : 2021-Dec-17
author : ypp34
---

# Introduction

Document Graph is a flexible persistence and modeling framework for blockchain applications.

# Use Cases

Document Graph is currently used for a number of use cases. Here are some real-world examples that we are using it for. Interestingly, all of the below use cases can be handled within the same graph where nodes can be linked to each other across contexts.

## DAOs
DAOs have have descriptive attributes. They also have members, proposals, assignments, quests, bounties, badges, and many other data types that are maintained to support a fully functional platform. 

Here's an actual example of how Document Graph is used to manage a few components within a DAO's information space. 

![Example Graph](graph-example.png)

## Supply Chain
We use Document Graph for a supply chain traceability application. An ```Item``` and its various ```Checkpoints``` are saved as ```documents```. When a new QR code ```scan``` event occurs, it extends the graph for that item to contain a new ```Checkpoint```.  

Since a ```Checkpoint``` is a document, it can store any arbitrary data that describes that event, such as weight, longitude, latitude, cost, and even photos or other files such as packing lists. Files are stored in IPFS and anchored into the on-chain document. 

Users have the option to save data directly onto the chain (for access within smart contracts) or to save the data to IPFS. Users also have the option to encrypt the data with a password of their choice.

{{< plantuml id="eg" >}}
@startuml
digraph G {
    rankdir=LR;
    Item -> Checkpoint_1 [label="scan"];
    Item -> Checkpoint_2 [label="scan"];
    Item -> Checkpoint_3 [label="scan"];
}
@enduml{{< /plantuml >}}

## Accounting
We also use the Document Graph to store data required to operate a double-entry accounting system. This system allows users to generate classical accounting reports such as Balance Sheet and Income Statement from blockchain transactions.

Accountants must be able to tag transactions with additional data, references, files, etc., and they must also be able to assign a general ledger account to appropriately calculate debits and credits.

# Features 

## End-user Accessibility
The Document Graph Explorer allows for any user with a blockchain account to create and edit content that they own within the graph, and they may create between any two nodes in the graph.

This level of accessibility to non-technical users is unprecedented. It allows them to collaboratively create and connect content with all of the benefits of blockchain. This level of capability was previously only accessible to highly technical engineers.

## File and IPFS Integration
Document Graph has integrated support for storing data or files within IPFS and saving that files’ CID (hash) within the document. 

## Encryption Support
Document Graph Explorer supports encryption of a specific content item’s value. In DGE, the user is prompted to enter a password that is used for symmetric AES encryption. This secret simply encrypts the value and the ciphertext is persisted in the document. 

In a future release, we may integrate with the [Khala/Phala](https://phala.network/en/) confidential blockchain. Also, we are evaluating integration with [PAD](https://www.pad.tech/) as a trustless way to share the secret in a manner that alerts the owner when the secret is accessed. This is useful for interesting use cases such as one-time decrypt use cases and “in case of emergency” use cases.

## GraphQL Caching
Document Graph supports easy integration with [DGraph](https://dgraph.io), an open source distributed graph engine. The document graph cache listens for new blocks, and upon finalization, updates the DGraph graph to reflect any updates to the on-chain graph. DGraph has excellent tooling and ergonomics for querying, custom types or schemas, data visualizer, full-text search, and much more. 

## Composable SDK Experience (CLI)
Document Graph is built to be highly composable and also support an ergonomic developer experience. In addition to the Document Graph Explorer web application, there is a CLI (written in Go) that supports all of the create, read, update, and delete operations directly against the blockchain. 

## Plugin Architecture for Custom Renderers and Editors
Developers can include special fields within their document to enable custom viewers or editors. For example, if the field “preferred_renderer” or “preferred_editor” is populated with an endpoint, this endpoint will be used to render or edit the document.


# Background of Semantic Triples
Databases typically store data in a tabular format, where a table has set of columns and rows, like a spreadsheet.

However, IRL, we tend to think in statements of ```Subject```, ```Predicate``` (```Verb```), and ```Object```. This is particularly true in the English language where word order is subject, verb, object (SVO). This information construct is known as ```triples```, or [semantic triples](https://en.wikipedia.org/wiki/Semantic_triple). The [W3C Resource Description Framework](https://www.w3.org/RDF/) is a leading specification for organizing these statements into semantic triples. 

As Lenhert describes [here](https://www.synaptica.com/triples-triads-and-semantics/): 

> "One of the fundamental benefits of these RDF-based controlled vocabulary structures are their dual nature as being both human intelligible as well as machine readable (and, therefore, portable). Like their basic constituent subject-verb-object basis, ontologies convey rich meaning in relatively simple and compact statements, making them extremely useful in modeling complex knowledge environments."

The following diagrams express semantic triples in various terms.
### Using the natural English [SOV](https://en.wikipedia.org/wiki/Subject%E2%80%93verb%E2%80%93object) terms

{{< plantuml id="dg1" >}}
@startuml
digraph G {
    rankdir=LR;
    Subject -> Object [label="Verb"];
}
@enduml{{< /plantuml >}}


### Using common [graph theory](https://en.wikipedia.org/wiki/Vertex_(graph_theory)) terms

{{< plantuml id="dg2" >}}
@startuml
digraph G {
    rankdir=LR;
    Vertex1 -> Vertex2 [label="Edge"];
}
@enduml{{< /plantuml >}}


### Using the Document Graph terms

{{< plantuml id="dg3" >}}
@startuml
digraph G {
    rankdir=LR;
    Document1 -> Document2 [label="Edge"];
}
@enduml{{< /plantuml >}}


Note that edges are both directional and labeled.


### Simple Example of a Semantic Triple

{{< plantuml id="dg4" >}}
@startuml
digraph G {
    rankdir=LR;
    Document1 -> Document2 [label="Edge"];
}
@enduml{{< /plantuml >}}


## Blockchain Change Management
At their core, blockchains are used to manage data and state changes on that data. The structure of this data is nearly always based on a custom-built struct within a pallet or smart contract. Applications that are built on blockchains are typically built for a specific smart contract’s data structure, and the application is highly coupled to that application.  When a data structure changes, it typically requires a complex migration of existing data and source code within the smart contract as well as perhaps changes to other backend or service layers and the application itself. 

For example, assume the overly simplified struct within a smart contract. Upon an approval, the amount would be sent to the account indicated.

```rust
pub struct Proposal {
    pub label: str,
    pub account: AccountId,
    pub amount: u32,
}
```

Then, let's say the DAO wants to add support for recurring payments. This would need to be supported within the data model by adding a time period to use as the recurring period and the total number of payments.

```rust
pub struct Proposal {
    pub title: str,
    pub account: AccountId,
    pub amount: u32,
    pub time_period_seconds: u32,
    pub payment_count: u32,
}
```

Depending on the blockchain, this change management event requires a series of gymnastics by developers to maintain a reasonable user experience. For example, on non-upgradable platforms, it may require clients to query from both structs, or if upgradable, may require erasing data from the original data store and recreating it (losing metadata in the process). Some may require maintaining both structures and adding a roll-up of sorts to maintain client backwards compatibility.

All of these complications create a significant change management burden on software developers.

### Document Graph Solves This
Document Graph alleviates the need for developers to change their persistence layer when making upgrades to their data model. 

This is achieved by supporting flexible variant pairs within a consistently structured ```document``` type and support for an ```edge``` type used to link the graph's documents in meaningful ways. 

# Specification
## Document Data Model

{{< plantuml id="dg5" >}}
@startuml
@startmindmap
* Document
** Header
*** Hash
*** Owner
*** Type
*** Created & Updated Dates
** Content Group 1
*** Content Item 1
**** Key (label)
**** Value
*** Content Item n
** Content Group n
@endmindmap
@enduml{{< /plantuml >}}


Each document is comprised of the following:

- Header 
    - [required] creator (account)
    - [required] graph contract (where the document is saved)
    - [optional] created date (timepoint)
    - [optional] updated date (timepoint)
    - [optional] hash of content (not including certificates or header)
- Content
    - Value (variant) = ```std::variant <asset, string, time_point, name, int64> ```
    - Content = an optionally labeled FlexValue
    - Content Group = vector<Content>
    - Content Groups = vector<ContentGroup>
    - Each document contains a single instance of ContentGroups.
    - This provides enough flexibility to support: 
        - data of all supported types,
        - short clauses of annotated text,
        - longer form sequenced data, e.g. chapters. 
- Certificates [optional]
    - Each document has ```O..n``` certificates.
    - Certificate 
        - certifier: the 'signer' 
        - notes: string data provided by signer
        - certification_date: time_point    