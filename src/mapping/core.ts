import { Token, User } from '../../generated/schema';
import { Transfer } from '../../generated/templates/AuthNFT/AuthNFT';


export function handleTransfer(event: Transfer): void {
    let to = createOrLoadUser(event.params.to.toHexString());
    let token = createOrLoadToken(event);

    token.tokenId = event.params.tokenId.toString();
    token.owner = to.id;
    to.save();
    token.save(); 
}

function createOrLoadUser(address: string): User {
    let user = User.load(address);
    if(!user) {
        user = new User(address);
        return user;
    }
    return user;
}

function createOrLoadToken(event: Transfer): Token {
    let token = Token.load(event.transaction.hash.toHexString());
    if(!token) {
        token = new Token(event.transaction.hash.toHexString());
        token.nft = event.address.toHexString();
        return token;
    }
    return token;
}