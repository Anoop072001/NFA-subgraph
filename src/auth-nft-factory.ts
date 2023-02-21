import {
  NewAuthNFT as NewAuthNFTEvent,
  OwnershipTransferred as OwnershipTransferredEvent
} from "../generated/AuthNFTFactory/AuthNFTFactory"
import { NewAuthNFT, OwnershipTransferred } from "../generated/schema"

export function handleNewAuthNFT(event: NewAuthNFTEvent): void {
  let entity = new NewAuthNFT(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._owner = event.params._owner
  entity._nft = event.params._nft

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
