import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import Button from "../../button";
import MintModalStyleWrapper from "../mintNowModal/MintNow.style";
import mintImg from "../../../assets/images/icon/mint-img.png";
import hoverShape from "../../../assets/images/icon/hov_shape_L.svg";
import mintinfo from "../../../assets/data/mintmodalV1.json"

import {useAccount, useConnect, useNetwork , useFeeData, useBalance, useContractRead, useContractWrite, useWaitForTransaction, usePrepareContractWrite } from 'wagmi';
import {COLLECTION_ADDRESS, COLLECTION_ABI} from '../../../contracts/Collection';
import $ from 'jquery';
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';
import { ethers } from "ethers";
import toast from "react-hot-toast";

import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { eventWrapper } from "@testing-library/user-event/dist/utils";

function closeWhitelistModal(){
  $('#whitelistModal').css('visibility','hidden')
}


const WhitelistModal = () => {
  const [address, setAddress] = useState('');
  const [addressShow, setAddressShow] = useState('');
  const [twitter, setTwitter] = useState('');
  const [discord, setDiscord] = useState('');
  const history = useNavigate();

  const saveProduct = async (e) => {
      e.preventDefault();
      console.log("sending axios request")
      console.log(address)
      console.log(twitter)
      console.log(discord)
      let _req = await axios.post(
          'https://ec91-87-216-85-143.eu.ngrok.io',
          {
              address: address,
              twitter: twitter,
              discord: discord
          },
          {
              headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Credentials': 'true'
              }
          }
      );
      console.log(_req)
      if(_req.status == 200){
        toast.success("Request sent succesfully!")
      }else{
        toast.error("Request failed!")
      }
      
      console.log("sent axios request")
      //history.push("/");

      history(`/`);
}

const transformAddress = async (address) => {
  setAddress(address)
  setAddressShow(address)
}


  return (
    <>
      <MintModalStyleWrapper className="modal_overlay" id="whitelistModal" >
        <div className="mint_modal_box" >
          <div className="mint_modal_content">
            <div className="modal_header">
              <h2>Collect your NFT before they are all minted!</h2>
              <button onClick={() => closeWhitelistModal()}>
                <FiX />
              </button>
            </div>
            <div className="modal_body text-center">
              <div className="mint_img">
                <img src={mintImg} alt="rsc nft mint" />
              </div>
            <form onSubmit={ saveProduct }> 
              <div className="mint_count_list">
                <ul>
                  <li>
                    <h5>Address:</h5>
                    <h5>
                    <span>
                      <input style={{fontFamily: "Inter"}}
                        className="input"
                        type="text"
                        placeholder="0x000000000000000000000000000000000000dEaD"
                        value={ addressShow }
                        onChange={ (e) => transformAddress(e.target.value)}
                        required
                      />
                    </span>
                    </h5>
                  </li>
                  <li>
                    <h5>Twitter:</h5>
                    <h5>
                    <span>
                      <input style={{fontFamily: "Inter"}} 
                        className="input"
                        type="text"
                        placeholder="@user1234"
                        value={ twitter }
                        onChange={ (e) => setTwitter(e.target.value) }
                        required
                      />
                    </span>
                    </h5>
                  </li>
                  <li>
                    <h5>Discord:</h5>
                    <h5>
                    <span>
                      <input style={{fontFamily: "Inter"}}
                        className="input"
                        type="text"
                        placeholder="user#1234"
                        value={ discord }
                        onChange={ (e) => setDiscord(e.target.value) }
                        required
                      />
                    </span>
                    </h5>
                  </li>
                </ul>
              </div>
              <div className="modal_mint_btn">
                <button>Send</button>
              </div>
              </form>
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

export default WhitelistModal;
