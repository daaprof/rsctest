import { useState } from "react";
import { useModal } from "../../../../utils/ModalContext";
import { FaDiscord, FaTwitter, FaWallet } from "react-icons/fa";
import { BsXLg } from "react-icons/bs";
import Button from "../../../../common/button";
import logo from "../../../../assets/images/logo.png";
import openseaIcon from "../../../../assets/images/icon/opensea.svg";

import MobileMenuStyleWrapper from "./MobileMenu.style";


import { ConnectButton } from '@rainbow-me/rainbowkit';
import $ from 'jquery';
import { useTranslation } from 'react-i18next';


const MobileMenu = ({ mobileMenuhandle }) => {
  const { walletModalHandle } = useModal();
  const [isSubmenu, setSubmenu] = useState(false);

  const handleSubmenu = () => {
    setSubmenu(!isSubmenu);
  };

  const { t, i18n } = useTranslation();

  return (
    <MobileMenuStyleWrapper className="rsc_mobile_menu">
      <div className="rsc_mobile_menu_content">
        <div className="mobile_menu_logo">
          <img className="rsc_logo" src={logo} alt="rsc logo" />
          <button
            className="mobile_menu_close_btn"
            onClick={() => mobileMenuhandle()}
          >
            {" "}
            <BsXLg />{" "}
          </button>
        </div>
        <div className="rsc_mobile_menu_list">
          <ul>
            <li className="mobile_menu_hide">
              <a href="#about">About</a>
            </li>
            <li className="mobile_menu_hide">
              <a href="#roadmap">Roadmap</a>
            </li>
            <li className="mobile_menu_hide">
              <a href="#team">Team</a>
            </li>
            <li className="mobile_menu_hide">
              <a href="#faq">FAQ</a>
            </li>
            
          </ul>
        </div>
        <div className="mobile_menu_social_links">
          <a href="# ">
            <img src={openseaIcon} alt="rsc social icon" />
          </a>
          <a href="# ">
            <FaTwitter />
          </a>
          <a href="https://discord.gg/BC3SdW3cfG" target="blank">
            <FaDiscord />
          </a>
        </div>

        <div style={{margin: "10px", display: "flex", justifyContent: "center"}}>
          <ConnectButton accountStatus="address" showBalance="true"/>
        </div>
        

        {/* <!-- 
        <Button
          sm
          variant="hovered"
          className="connect_btn"
          onClick={() => walletModalHandle()}
        >
          <FaWallet /> Connect
        </Button>
  --> */}

      </div>
    </MobileMenuStyleWrapper>
  );
};

export default MobileMenu;
