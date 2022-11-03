import { Address, BigInt, Bytes, json, log, store } from '@graphprotocol/graph-ts'
import {
  Cryptonotes,
  Merge,
  Mint,
  Split,
  TopUp,
  Withdraw
} from '../generated/Cryptonotes/Cryptonotes'
import { Note } from '../generated/schema'

export function handleMint(event: Mint): void {
  const noteId = event.params.tokenId.toString()
  saveNote(noteId, event.params.owner, event.params.tokenId, event.address)
}

export function handleMerge(event: Merge): void {
  const fromId = event.params.tokenId.toString()
  let entity = Note.load(fromId)
  if (entity) {
    store.remove('Note', fromId)
    log.info('Merge - removing the note {}', [fromId])
  }

  const targetTokenId = event.params.targetTokenId.toString()
  entity = Note.load(targetTokenId)
  if (entity) {
    entity.value = event.params.mergeUnits.plus(entity.value)
    entity.owns = entity.owns.minus(BigInt.fromI32(1))
    entity.save()
  }
}

export function handleSplit(event: Split): void {
  const fromId = event.params.tokenId.toString()
  let entity = Note.load(fromId)
  if (entity) {
    entity.value = entity.value.minus(event.params.splitUnits)

    let contract = Cryptonotes.bind(event.address)
    const ownsInfo = contract.try_balanceOf(event.params.owner)
    entity.owns = ownsInfo.reverted ? BigInt.fromI32(0) : ownsInfo.value

    entity.save()
  }

  const newTokenId = event.params.newTokenId.toString()
  entity = Note.load(newTokenId)
  if (!entity) {
    entity = new Note(newTokenId)
    saveNote(newTokenId, event.params.owner, event.params.newTokenId, event.address)
  } else {
    entity.value = event.params.splitUnits.plus(entity.value)
  
    let contract = Cryptonotes.bind(event.address)
    const ownsInfo = contract.try_balanceOf(event.params.owner)
    entity.owns = ownsInfo.reverted ? BigInt.fromI32(0) : ownsInfo.value
  }

  entity.save()
}

export function handleTopUp(event: TopUp): void {
  const noteId = event.params.tokenId.toString()
  let entity = Note.load(noteId)
  if (entity) {
    entity.value = event.params.units.plus(entity.value)
    entity.save()
  }
}

export function handleWithdraw(event: Withdraw): void {
  const noteId = event.params.tokenId.toString()
  let entity = Note.load(noteId)
  if (entity) {
    store.remove('Note', noteId)
    log.info('Withdraw - removing the note {}', [noteId])
  }
}

function saveNote(_noteId: string, _owner: Address, _tokenId: BigInt, _address: Address): void {
  let entity = Note.load(_noteId)
  if (!entity) {
    entity = new Note(_noteId)
  }

  entity.owner = _owner

  const tokenId = _tokenId
  entity.tokenId = tokenId

  let contract = Cryptonotes.bind(_address)
  
  const symbolInfo = contract.try_symbol()
  entity.symbol = symbolInfo.reverted ? '' : symbolInfo.value

  const valueInfo = contract.try_balanceOf1(tokenId)
  if (valueInfo.reverted) {
    log.info('get value info reverted', [])
  } else {
    entity.value = valueInfo.value
  }

  const slot = contract.slotOf(tokenId)
  entity.slot = slot

  const slotDetail = contract.try_getSlotDetail(slot)
  if (!slotDetail.reverted) {
    entity.name = slotDetail.value.name
    entity.description = slotDetail.value.description
    entity.underlyingAsset = slotDetail.value.underlying
  }

  // get image from the token URI
  const tokenInfo = contract.try_tokenURI(tokenId)
  if (tokenInfo.reverted) {
    log.info('get tokenURI reverted: {}', [tokenId.toString()])
  } else {
    const base64URI = normalize(tokenInfo.value)
    entity.tokenURI = base64URI
  }

  const ownsInfo = contract.try_balanceOf(_owner)
  entity.owns = ownsInfo.reverted ? BigInt.fromI32(0) : ownsInfo.value

  entity.save()
}

function setCharAt(str: string, index: i32, char: string): string {
  if(index > str.length-1) return str;
  return str.substr(0,index) + char + str.substr(index+1);
}

function normalize(strValue: string): string {
  if (strValue.length === 1 && strValue.charCodeAt(0) === 0) {
    return '';    
  } else {
    for (let i = 0; i < strValue.length; i++) {
      if (strValue.charCodeAt(i) === 0) {
        strValue = setCharAt(strValue, i, '\ufffd'); // graph-node db does not support string with '\u0000'
      }
    }
    return strValue;
  }
}
