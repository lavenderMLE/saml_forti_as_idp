
import { getTokensBalance } from '@mycrypto/eth-scan';
import Web3 from 'web3';
const web3 = new Web3('https://ropsten.infura.io/v3/f957dcc0cb6c430f9d32c2c085762bdf') ;

export const getTokensBalance = async (account,tokenAddresses) => {
    try {
        let res = await getTokensBalance(web3, account, tokenAddresses);
        return res;
    } 
    catch(err) {
        console.log(err) ;
        return false ;
    }
}