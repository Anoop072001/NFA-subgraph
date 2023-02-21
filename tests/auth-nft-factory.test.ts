import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address } from "@graphprotocol/graph-ts"
import { NewAuthNFT } from "../generated/schema"
import { NewAuthNFT as NewAuthNFTEvent } from "../generated/AuthNFTFactory/AuthNFTFactory"
import { handleNewAuthNFT } from "../src/auth-nft-factory"
import { createNewAuthNFTEvent } from "./auth-nft-factory-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let _owner = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let _nft = Address.fromString("0x0000000000000000000000000000000000000001")
    let newNewAuthNFTEvent = createNewAuthNFTEvent(_owner, _nft)
    handleNewAuthNFT(newNewAuthNFTEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("NewAuthNFT created and stored", () => {
    assert.entityCount("NewAuthNFT", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "NewAuthNFT",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_owner",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "NewAuthNFT",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_nft",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
