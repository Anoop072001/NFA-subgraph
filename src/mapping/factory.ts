import { AuthNFT, Organization, User } from '../../generated/schema';
import { NewAuthNFT } from '../../generated/AuthNFTFactory/AuthNFTFactory'
import { AuthNFT as AuthNFTContract } from '../../generated/templates'


export function handleNewAuthNFT(event: NewAuthNFT): void {
    let authNFT = new AuthNFT(event.params._nft.toHexString());
    let organization = createOrLoadOrg(event.params._owner.toHexString())
    authNFT.owner = organization.id;
    AuthNFTContract.create(event.params._nft);
    organization.save();
    authNFT.save();
}

function createOrLoadOrg(address: string): Organization {
    let organization = Organization.load(address);
    if(!organization) {
        organization = new Organization(address);
        return organization;
    }
    return organization;
} 