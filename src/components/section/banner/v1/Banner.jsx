import { useModal } from "../../../../utils/ModalContext";
import Counter from "../../../../common/counter";
import Button from "../../../../common/button";
import BannerV1Wrapper from "./Banner.style";

import characterThumb from "../../../../assets/images/nft/Character1.png";
import mintLiveDownArrow from "../../../../assets/images/nft/mint_live_down_arrow.svg";
import mintLiveText from "../../../../assets/images/nft/mint_live_text.png";
import homeImageBG from "../../../../assets/images/nft/home_img_bg.png";
import homeInfo from "../../../../assets/data/bannerV1.json";

const Banner = () => {
  const { mintModalHandle } = useModal();
  return (
    <BannerV1Wrapper id="home">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="rsc_v1_baner_left">
              <h2>{homeInfo.title}</h2>
              <h3>
                <span className="count">
                  <Counter end={3000} duration={3000} />
                </span>{" "}
                / 3001 Minted
              </h3>
              <div className="banner_buttons">
                <Button lg variant="mint" onClick={() => mintModalHandle()}>
                  {" "}
                  Mint now
                </Button>
                <Button lg variant="outline" onClick={() => window.open('https://discord.gg/BC3SdW3cfG', 'blank')}>
                  Wishlist now
                </Button>
              </div>
              <div className="coin-info">
                <span>{homeInfo.info[0].desc}</span>
                <span>{homeInfo.info[1].desc}</span>
                <span>{homeInfo.info[2].desc}</span>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="rsc_v1_baner_right">
              <div className="rsc_v1_baner_right_img_sect">
                <div className="mint_live_circle_sect">
                  <div className="mint_live_circle">
                    <span>
                      <img src={mintLiveDownArrow} alt="" />
                    </span>
                    <span className="mint_live_text rotated-style">
                      <img src={mintLiveText} alt="" />
                    </span>
                  </div>
                </div>
                <div className="rsc_v1_baner_right_img_bg">
                  <img src={homeImageBG} alt="" />
                </div>
                <div className="rsc_v1_baner_right_img">
                  <img src={characterThumb} alt="avater" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BannerV1Wrapper>
  );
};

export default Banner;
