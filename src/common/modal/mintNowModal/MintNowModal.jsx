import { useState } from "react";
import { useModal } from "../../../utils/ModalContext";
import { FiX } from "react-icons/fi";
import Button from "../../button";
import MintModalStyleWrapper from "./MintNow.style";
import mintImg from "../../../assets/images/icon/mint-img.png";
import hoverShape from "../../../assets/images/icon/hov_shape_L.svg";
import mintinfo from "../../../assets/data/mintmodalV1.json"

import {useAccount, useConnect, useNetwork , useFeeData, useBalance, useContractRead, useContractWrite, useWaitForTransaction  } from 'wagmi';
import {COLLECTION_ADDRESS, COLLECTION_ABI} from '../../../contracts/Collection';
import $ from 'jquery';
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';

const MintNFTs = () => {
  const { address, isConnected } = useAccount()
  const { chain, chains } = useNetwork()
  const numMint = $('#quantity').val()
  console.log("Minteo de "+numMint+" NFTs con la address "+address)

  const addRecentTransaction = useAddRecentTransaction();

  const tx  = useContractWrite({
    addressOrName: COLLECTION_ADDRESS,
    contractInterface: COLLECTION_ABI,
    functionName: 'mint',
    args: [numMint],
    value: '0.1',
    onSuccess(data) {
      console.log('Approve Success', data)
      addRecentTransaction({
        hash: data['hash'],
        description: "Approve Collection",
      });
    },
  })
  const waitForApprove  = useWaitForTransaction({
    hash: tx.data?.hash,
  })


  return (<>
            <Button lg variant="mint" onClick= {() => address ? tx.write() : alert("In order to mint, you must connect your wallet first.")}>
              Mint Now
            </Button>
          </>);
  }


const MintNowModal = () => {
  const [count, setCount] = useState(1);
  const { mintModalHandle } = useModal();
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
                    <span id="remainingNFTs">{mintinfo.nftsremaining}</span>/<span>{mintinfo.totalNfts}</span>
                    </h5>
                  </li>
                  <li>
                    <h5>Price</h5>
                    <h5 id="currentSalePrice">{mintinfo.floorPriceWhitelist} ETH</h5>
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
                      <span id="amountToMint">{count * mintinfo.floorPriceWhitelist}</span> ETH
                    </h5>
                  </li>
                </ul>
              </div>
              <div className="modal_mint_btn">
                <MintNFTs />
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
