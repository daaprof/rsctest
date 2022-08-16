import { useState, useEffect } from "react";
import { useModal } from "../../../utils/ModalContext";
import { FiX } from "react-icons/fi";
import Button from "../../button";
import MintModalStyleWrapper from "./MintNow.style";
import mintImg from "../../../assets/images/icon/mint-img.png";
import hoverShape from "../../../assets/images/icon/hov_shape_L.svg";
import mintinfo from "../../../assets/data/mintmodalV1.json"

import {useAccount, useConnect, useNetwork , useFeeData, useBalance, useContractRead, useContractWrite, useWaitForTransaction, usePrepareContractWrite } from 'wagmi';
import {COLLECTION_ADDRESS, COLLECTION_ABI} from '../../../contracts/Collection';
import $ from 'jquery';
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';
import { ethers } from "ethers";
var _interval;
const MintNFTs = (props) => {
  
  const numMint = props.amount
  const address = props.address
  console.log("Minteo de "+numMint+" NFTs con la address "+address)

  const addRecentTransaction = useAddRecentTransaction();

  let _value = $('#amountToMint').html() * 1e18
  console.log(_value)
  //_value = ethers.utils.parseUnits(_value.toString(), "ether")

  const { config } = usePrepareContractWrite({
    addressOrName: COLLECTION_ADDRESS,
    contractInterface: COLLECTION_ABI,
    functionName: 'mint',
    args: [numMint, {value: _value}],
    onSuccess(data) {
      console.log('Mint Success', data)
      
    },
  })
  const { data, isLoading, isSuccess, write } = useContractWrite(config)

  const waitForTransaction  = useWaitForTransaction({
    hash: data?.hash,
  })

  
  console.log("LOADING = "+waitForTransaction.isLoading)
  console.log("SUCCESS = "+waitForTransaction.isSuccess)
  
  if(waitForTransaction.isLoading){
    addRecentTransaction({
      hash: data['hash'],
      description: "Mint NFT",
    })
    _interval = setInterval(function(){
      $('.modal_mint_btn > button').html("Minting")
      setTimeout(function(){$('.modal_mint_btn > button').html(". Minting .")}, 333)
      setTimeout(function(){$('.modal_mint_btn > button').html(". . Minting . .")}, 666)
      setTimeout(function(){$('.modal_mint_btn > button').html(". . . Minting . . .")}, 1000)
      setTimeout(function(){$('.modal_mint_btn > button').html(". . . . Minting . . . .")}, 1333)
      setTimeout(function(){$('.modal_mint_btn > button').html(". . . . . Minting . . . . .")}, 1666)
    }, 2000)
    return <Button lg variant="mint" >
            Confirming...
          </Button>
  }else{
    clearInterval(_interval)
  }
  
  
  if(waitForTransaction.isSuccess){
    clearInterval(_interval)
    _interval = setInterval(function(){
      $('.modal_mint_btn > button').html("Confirmed!")
      setTimeout(function(){$('.modal_mint_btn > button').html("")}, 750)
    },1000)

    return <Button lg variant="mint" onClick={() => window.open('https://etherscan.io/tx/'+data?.hash)} target="blank">
            Confirmed!
          </Button>
  }
  
  clearInterval(_interval)
  
  return (
            <Button lg variant="mint" disabled={!write} onClick={() => write?.()}>
              Mint Now
            </Button>
          );
  }


const MintNowModal = () => {
  const [count, setCount] = useState(1);
  const { mintModalHandle } = useModal();
  const { address} = useAccount();

  const totalSupply  = useContractRead({
    addressOrName: COLLECTION_ADDRESS,
    contractInterface: COLLECTION_ABI,
    functionName: 'totalSupply',
    args: [],
    onSuccess(data) {
      //console.log('MintNowModal Success', data)
    },
  })
  const remaining = 3000 - parseInt(totalSupply.data); 

  const currentPrice  = useContractRead({
    addressOrName: COLLECTION_ADDRESS,
    contractInterface: COLLECTION_ABI,
    functionName: 'currentPrice',
    args: [],
  })
  let price =  parseInt(currentPrice.data).toString()
  price = price > 0 ? ethers.utils.formatEther(price) : "0.00"

  return (
    <>
      <MintModalStyleWrapper className="modal_overlay">
        <div className="mint_modal_box">
          <div className="mint_modal_content">
            <div className="modal_header">
              <h2>Collect your NFT before they are all minted!</h2>
              <button onClick={() => mintModalHandle()}>
                <FiX />
              </button>
            </div>
            <div className="modal_body text-center">
              <div className="mint_img">
                <img src={mintImg} alt="rsc nft mint" />
              </div>
              <div className="mint_count_list">
                <ul>
                  <li>
                    <h5>Remaining</h5>
                    <h5>
                    <span id="remainingNFTs">{remaining}</span>/<span>{mintinfo.totalNfts}</span>
                    </h5>
                  </li>
                  <li>
                    <h5>Price</h5>
                    <h5 id="currentSalePrice">{price} ETH</h5>
                  </li>
                  <li>
                    <h5>Quantity</h5>
                    <div className="mint_quantity_sect">
                      <button
                        onClick={() =>
                          count > 1 ? setCount(count - 1) : count
                        }
                      >
                        -
                      </button>
                      <input
                        type="text"
                        id="quantity"
                        value={count}
                        onChange={(e) => setCount(e.target.value)}
                      />
                      <button onClick={() => count < 2 ? setCount(count + 1) : count}>+</button>
                    </div>
                    <h5>
                      <span id="amountToMint">{count * price}</span> ETH
                    </h5>
                  </li>
                </ul>
              </div>
              <div className="modal_mint_btn">
                <MintNFTs amount={count} address={address}/>
              </div>
            </div>

            <div className="modal_bottom_shape_wrap">
              <span className="modal_bottom_shape shape_left">
                <img src={hoverShape} alt="rsc nft hover shape" />
              </span>
              <span className="modal_bottom_shape shape_right">
                <img src={hoverShape} alt="rsc nft hover shape" />
              </span>
            </div>
          </div>
        </div>
      </MintModalStyleWrapper>
    </>
  );
};

export default MintNowModal;
