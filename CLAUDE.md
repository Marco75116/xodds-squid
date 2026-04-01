# CLAUDE.md

## Conventions

- **Entity IDs must include the chain ID** — this is a multichain indexer, so all entity IDs should be composed with the chain ID to avoid collisions across chains.
- **Entities must have a `chainId` field** — every entity should include a `chainId: Int!` field to identify which chain the data belongs to.
