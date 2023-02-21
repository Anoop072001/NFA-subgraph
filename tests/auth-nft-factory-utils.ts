import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import {
  NewAuthNFT,
  OwnershipTransferred
} from "../generated/AuthNFTFactory/AuthNFTFactory"

export function createNewAuthNFTEvent(
  _owner: Address,
  _nft: Address
): NewAuthNFT {
  let newAuthNftEvent = changetype<NewAuthNFT>(newMockEvent())

  newAuthNftEvent.parameters = new Array()

  newAuthNftEvent.parameters.push(
    new ethereum.EventParam("_owner", ethereum.Value.fromAddress(_owner))
  )
  newAuthNftEvent.parameters.push(
    new ethereum.EventParam("_nft", ethereum.Value.fromAddress(_nft))
  )

  return newAuthNftEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}
