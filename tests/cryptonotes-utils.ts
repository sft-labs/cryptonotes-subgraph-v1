import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  Approval,
  ApprovalForAll,
  ApprovalValue,
  Initialized,
  Merge,
  Mint,
  OwnershipTransferred,
  SetMetadataDescriptor,
  SlotChanged,
  Split,
  TopUp,
  Transfer,
  TransferValue
} from "../generated/Cryptonotes/Cryptonotes"

export function createApprovalEvent(
  owner: Address,
  approved: Address,
  tokenId: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromAddress(approved))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return approvalEvent
}

export function createApprovalForAllEvent(
  owner: Address,
  operator: Address,
  approved: boolean
): ApprovalForAll {
  let approvalForAllEvent = changetype<ApprovalForAll>(newMockEvent())

  approvalForAllEvent.parameters = new Array()

  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromBoolean(approved))
  )

  return approvalForAllEvent
}

export function createApprovalValueEvent(
  _tokenId: BigInt,
  _operator: Address,
  _value: BigInt
): ApprovalValue {
  let approvalValueEvent = changetype<ApprovalValue>(newMockEvent())

  approvalValueEvent.parameters = new Array()

  approvalValueEvent.parameters.push(
    new ethereum.EventParam(
      "_tokenId",
      ethereum.Value.fromUnsignedBigInt(_tokenId)
    )
  )
  approvalValueEvent.parameters.push(
    new ethereum.EventParam("_operator", ethereum.Value.fromAddress(_operator))
  )
  approvalValueEvent.parameters.push(
    new ethereum.EventParam("_value", ethereum.Value.fromUnsignedBigInt(_value))
  )

  return approvalValueEvent
}

export function createInitializedEvent(version: i32): Initialized {
  let initializedEvent = changetype<Initialized>(newMockEvent())

  initializedEvent.parameters = new Array()

  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(version))
    )
  )

  return initializedEvent
}

export function createMergeEvent(
  owner: Address,
  tokenId: BigInt,
  targetTokenId: BigInt,
  mergeUnits: BigInt
): Merge {
  let mergeEvent = changetype<Merge>(newMockEvent())

  mergeEvent.parameters = new Array()

  mergeEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  mergeEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  mergeEvent.parameters.push(
    new ethereum.EventParam(
      "targetTokenId",
      ethereum.Value.fromUnsignedBigInt(targetTokenId)
    )
  )
  mergeEvent.parameters.push(
    new ethereum.EventParam(
      "mergeUnits",
      ethereum.Value.fromUnsignedBigInt(mergeUnits)
    )
  )

  return mergeEvent
}

export function createMintEvent(
  owner: Address,
  tokenId: BigInt,
  units: BigInt
): Mint {
  let mintEvent = changetype<Mint>(newMockEvent())

  mintEvent.parameters = new Array()

  mintEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  mintEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  mintEvent.parameters.push(
    new ethereum.EventParam("units", ethereum.Value.fromUnsignedBigInt(units))
  )

  return mintEvent
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

export function createSetMetadataDescriptorEvent(
  metadataDescriptor: Address
): SetMetadataDescriptor {
  let setMetadataDescriptorEvent = changetype<SetMetadataDescriptor>(
    newMockEvent()
  )

  setMetadataDescriptorEvent.parameters = new Array()

  setMetadataDescriptorEvent.parameters.push(
    new ethereum.EventParam(
      "metadataDescriptor",
      ethereum.Value.fromAddress(metadataDescriptor)
    )
  )

  return setMetadataDescriptorEvent
}

export function createSlotChangedEvent(
  _tokenId: BigInt,
  _oldSlot: BigInt,
  _newSlot: BigInt
): SlotChanged {
  let slotChangedEvent = changetype<SlotChanged>(newMockEvent())

  slotChangedEvent.parameters = new Array()

  slotChangedEvent.parameters.push(
    new ethereum.EventParam(
      "_tokenId",
      ethereum.Value.fromUnsignedBigInt(_tokenId)
    )
  )
  slotChangedEvent.parameters.push(
    new ethereum.EventParam(
      "_oldSlot",
      ethereum.Value.fromUnsignedBigInt(_oldSlot)
    )
  )
  slotChangedEvent.parameters.push(
    new ethereum.EventParam(
      "_newSlot",
      ethereum.Value.fromUnsignedBigInt(_newSlot)
    )
  )

  return slotChangedEvent
}

export function createSplitEvent(
  owner: Address,
  tokenId: BigInt,
  newTokenId: BigInt,
  splitUnits: BigInt
): Split {
  let splitEvent = changetype<Split>(newMockEvent())

  splitEvent.parameters = new Array()

  splitEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  splitEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  splitEvent.parameters.push(
    new ethereum.EventParam(
      "newTokenId",
      ethereum.Value.fromUnsignedBigInt(newTokenId)
    )
  )
  splitEvent.parameters.push(
    new ethereum.EventParam(
      "splitUnits",
      ethereum.Value.fromUnsignedBigInt(splitUnits)
    )
  )

  return splitEvent
}

export function createTopUpEvent(
  onBehalfOf: Address,
  tokenId: BigInt,
  units: BigInt
): TopUp {
  let topUpEvent = changetype<TopUp>(newMockEvent())

  topUpEvent.parameters = new Array()

  topUpEvent.parameters.push(
    new ethereum.EventParam(
      "onBehalfOf",
      ethereum.Value.fromAddress(onBehalfOf)
    )
  )
  topUpEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  topUpEvent.parameters.push(
    new ethereum.EventParam("units", ethereum.Value.fromUnsignedBigInt(units))
  )

  return topUpEvent
}

export function createTransferEvent(
  from: Address,
  to: Address,
  tokenId: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return transferEvent
}

export function createTransferValueEvent(
  _fromTokenId: BigInt,
  _toTokenId: BigInt,
  _value: BigInt
): TransferValue {
  let transferValueEvent = changetype<TransferValue>(newMockEvent())

  transferValueEvent.parameters = new Array()

  transferValueEvent.parameters.push(
    new ethereum.EventParam(
      "_fromTokenId",
      ethereum.Value.fromUnsignedBigInt(_fromTokenId)
    )
  )
  transferValueEvent.parameters.push(
    new ethereum.EventParam(
      "_toTokenId",
      ethereum.Value.fromUnsignedBigInt(_toTokenId)
    )
  )
  transferValueEvent.parameters.push(
    new ethereum.EventParam("_value", ethereum.Value.fromUnsignedBigInt(_value))
  )

  return transferValueEvent
}
