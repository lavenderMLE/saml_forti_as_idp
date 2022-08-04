import Web3 from "web3";
import { ethers } from 'ethers';

import ERC20_ABI from '../contract/abis/erc20.json' ;
import CALADEX_CONTRACT_ABI from '../contract/abis/caladex.json';

const web3 = new Web3(new Web3.providers.HttpProvider( process.env.WEB3_PROVIDER));

export const contractApprove = async (symbol, amount, address, res) => {

  const pk = process.env.CALADEX_WALLET_PRIVATE_KEY;
  let result = true;

  if(symbol !== "ETH") {
    const etherReceiver = new web3.eth.Contract(ERC20_ABI, address);
    const tx = {
        to : address,
        gasLimit: 3141592,
        gasUsed: 21662,
        data : etherReceiver.methods.approve(process.env.CALADEX_CONTRACT_ADDR, ethers.utils.parseUnits(amount).toString()).encodeABI()
    }

    await web3.eth.accounts.signTransaction(tx, pk).then( async (signed) => {
    await web3.eth.sendSignedTransaction(signed.rawTransaction)
        .then(() => {
          console.log("success");
          result = true;
        })
        .catch((error) => {
          console.log("error :" + error);
          result = false ;
        });
    });
  } else {
    const etherReceiver = new web3.eth.Contract(CALADEX_CONTRACT_ABI, process.env.CALADEX_CONTRACT_ADDR);

    const tx = {
        to : process.env.CALADEX_CONTRACT_ADDR,
        gasLimit: 3141592,
        gasUsed: 21662,
        data : etherReceiver.methods.sendViaTransfer().encodeABI(),
        value: ethers.utils.parseEther(amount).toString()
    }

    await web3.eth.accounts.signTransaction(tx, pk).then(signed => {
    web3.eth.sendSignedTransaction(signed.rawTransaction)
        .then(() => {
          
    console.log("aaaaaaaaaa");
          result = true ;
        })
        .catch((error) => {
          console.log("aaaaaaaaaa");
          result = false ;
        });
    });
  }

  return result ;
}

export const contractTokenBalance = async(token, account) => {
  
  const etherReceiver = new web3.eth.Contract(CALADEX_CONTRACT_ABI, process.env.CALADEX_CONTRACT_ADDR);

  let balance = false;

  await etherReceiver.methods.getBalance(account,ethers.utils.formatBytes32String((token.symbol == "ETH" ? "ETH": token._id.toString()))).call( function(error, result) {
    if(error) {

    }else {
        console.log('Balance: '+ Web3.utils.fromWei(result.toString()) );
        balance = Web3.utils.fromWei(result.toString());
    }
  });

  return balance ;
}
