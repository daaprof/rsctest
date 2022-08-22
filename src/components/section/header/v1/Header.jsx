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
import {FaEthereum} from 'react-icons/fa';
import {BiCopyAlt} from 'react-icons/bi';
import {TiTickOutline} from 'react-icons/ti';
import {GiSailboat} from 'react-icons/gi';
import {COLLECTION_ADDRESS} from '../../../../contracts/Collection';
import { func } from "prop-types";
import { IconContext } from "react-icons";
import toast from "react-hot-toast";

import { useTranslation } from 'react-i18next';

import spanish from '../../../../assets/images/flags/spain.png';
import uk from '../../../../assets/images/flags/uk.png';
import france from '../../../../assets/images/flags/france.png';
import germany from '../../../../assets/images/flags/germany.png';
import china from '../../../../assets/images/flags/china.png';
import russia from '../../../../assets/images/flags/russia.png';

const lngs = {
  en: { nativeName: 'English', link: uk },
  es: { nativeName: 'Español', link: spanish },
  fr: { nativeName: 'Français', link: france },
  ch: { nativeName: 'Chinese', link: china },
  de: { nativeName: 'Deutch', link: germany },
  ru: { nativeName: 'Russian', link: russia }

};

function copy(){
  navigator.clipboard.writeText("0xa3054b5ae4585eB7Ae1556eFcE478BE6615503E4");
  setTimeout(function(){
    $('#tick').fadeOut(2900);
  }, 100)
  toast.success("Copied!")
}

const Header = () => {
  const { walletModalHandle } = useModal();
  const [isMobileMenu, setMobileMenu] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
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

  const { t, i18n } = useTranslation();

  return (
    <NavWrapper className="rsc_header" id="navbar">
      
      <div className="container">
        {/* Main Menu Start */}
        <div id="flags" style={{width:"30%", display:"flex", alignItems: "center", margin:"auto", justifyContent:"flex-end", position:"absolute", right:'0px'}}>
          {!isMobileMenu ? Object.keys(lngs).map((lng) => (
            <img src={lngs[lng].link} key={lng} style={{ opacity: i18n.resolvedLanguage === lng ? '1' : '0.5' , padding:"0.25em", width:'calc(1vw + 1.8vh)', margin: '5px'}} type="submit" onClick={() => i18n.changeLanguage(lng)} />
              
          )) : ""}
        </div>

        <div className="rsc_menu_sect">
          <div className="rsc_menu_left_sect">
            <div className="logo">
              <a href="#home">
                <img src={ logo} alt="rsc nft logo" />
              </a>
            </div>
          </div>
          <div className="rsc_menu_right_sect rsc_v1_menu_right_sect">
            <div className="rsc_menu_list">
              <ul>
                <li>
                  <a href="#about">{t('nav.about')}</a>
                </li>
                <li>
                  <a href="#roadmap">{t('nav.roadmap')}</a>
                </li>
                <li>
                  <a href="#whitepaper">Whitepaper</a>
                </li>
                <li>
                  <a href="#team">{t('nav.team')}</a>
                </li>
                <li>
                  <a href="#faq">{t('nav.faq')}</a>
                </li>
                
              </ul>
            </div>
            <div className="rsc_menu_btns">
              <button className="menu_btn" onClick={() => handleMobileMenu()}>
                <MdNotes />
              </button>
              <Button  style={{marginRight: "50px"}} sm variant="outline" className="join_btn" onClick={() => window.open('https://discord.gg/BC3SdW3cfG', 'blank')}>
                <FaDiscord /> {t('nav.join')}
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

      <div style={{background: 'rgba(13,27,38,0.7)', width:'100%', display:'flex', justifyContent: 'center', color:'white', fontFamily: "Bakbak One" , position:"absolute", top:"100%"}} >
        <div style={{margin:'auto', alignItems:'center', paddingBottom:'5px', paddingTop:'5px' }} >
          <span title="Copy" style={{margin:'0px', padding:'0px', marginRight: '20px', cursor:'pointer', verticalAlign:'middle'}} 
          onClick={function(){
            setIsCopied(true);
            copy();
            setTimeout(function(){
              setIsCopied(false)
            }, 1000)
            }
          }>
            {t('nav.contractAddress')}: {COLLECTION_ADDRESS}
          </span> 
          <IconContext.Provider value={{ className: "shared-class", size: 22 }}>
          <>
            { !isCopied ? 
            <BiCopyAlt style={{margin:'0px', padding:'0px', cursor:'pointer', verticalAlign:'middle'}} title="Copy" onClick={function(){
              setIsCopied(true);
              copy();
              setTimeout(function(){
                setIsCopied(false)
              }, 1000)
              }
            }/>
            :
            <TiTickOutline id="tick" title="Copied!" style={{margin:'0px', padding:'0px', cursor:'pointer'}}/>
            }
            <GiSailboat title="Opensea" style={{margin:'0px', padding:'0px', marginLeft: '5px', marginRight: '3px', cursor:'pointer', verticalAlign:'middle'}}
                                      onClick={() => window.open('https://opensea.io/assets/ethereum/ethereum/'+COLLECTION_ADDRESS)} target='blank'/>
            <FaEthereum title="EtherScan" style={{margin:'0px', padding:'0px', cursor:'pointer', verticalAlign:'middle'}}
                                      onClick={() => window.open('https://etherscan.io/address/'+COLLECTION_ADDRESS)} target='blank'/>
          </>
        </IconContext.Provider>
          
        </div>
      </div>
    </NavWrapper>
    
  );
};

export default Header;
