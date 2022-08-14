import { useModal } from "../../../../utils/ModalContext";
import { useEffect, useState } from "react";
import { FaDiscord, FaWallet } from "react-icons/fa";
import { MdNotes } from "react-icons/md";
import Button from "../../../../common/button";
import NavWrapper from "./Header.style";
import MobileMenu from "../mobileMenu/MobileMenu";
import logo from "../../../../assets/images/logo.png";

import { ConnectButton } from '@rainbow-me/rainbowkit';

import $ from 'jquery';

const Header = () => {
  const { walletModalHandle } = useModal();
  const [isMobileMenu, setMobileMenu] = useState(false);
  const handleMobileMenu = () => {
    setMobileMenu(!isMobileMenu);
  };
  useEffect(() => {
    const header = document.getElementById("navbar");
    const handleScroll = window.addEventListener("scroll", () => {
      if (window.pageYOffset > 50) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky"); 
      }
    });

    return () => { 
      window.removeEventListener("sticky", handleScroll);
    };
  }, []);

  useEffect(() => {
    if(isMobileMenu){
      $('.rsc_mobile_menu_content > div:last > div').css('border','2px solid rgba(255,255,255,0.2)')
    }else{
      $('.rsc_menu_btns > div > button').css('border','2px solid rgba(255,255,255,0.2)')
    }
    
  }, );

  return (
    <NavWrapper className="rsc_header" id="navbar">
      <div className="container">
        {/* Main Menu Start */}
        <div className="rsc_menu_sect">
          <div className="rsc_menu_left_sect">
            <div className="logo">
              <a href="/">
                <img src={logo} alt="rsc nft logo" />
              </a>
            </div>
          </div>
          <div className="rsc_menu_right_sect rsc_v1_menu_right_sect">
            <div className="rsc_menu_list">
              <ul>
                <li>
                  <a href="#home">Home</a>
                </li>
                <li>
                  <a href="#about">About</a>
                </li>
                <li>
                  <a href="#roadmap">Roadmap</a>
                </li>
                <li>
                  <a href="#team">Team</a>
                </li>
                <li>
                  <a href="#faq">FAQ</a>
                </li>
                
              </ul>
            </div>
            <div className="rsc_menu_btns">
              <button className="menu_btn" onClick={() => handleMobileMenu()}>
                <MdNotes />
              </button>
              <Button  style={{marginRight: "50px"}} sm variant="outline" className="join_btn" onClick={() => window.open('https://discord.gg/BC3SdW3cfG', 'blank')}>
                <FaDiscord /> Join
              </Button>


              <ConnectButton height={"50px"} accountStatus="address" showBalance="true" />

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
          </div>
        </div>
        {/* <!-- Main Menu END --> */}
        {isMobileMenu && <MobileMenu mobileMenuhandle={handleMobileMenu} />}
      </div>
    </NavWrapper>
  );
};

export default Header;
