import { useModal } from "../../../../utils/ModalContext";
import Counter from "../../../../common/counter";
import Button from "../../../../common/button";
import BannerV1Wrapper from "./Banner.style";
import characterThumb from "../../../../assets/images/nft/Character1.png";
import homeImageBG from "../../../../assets/images/nft/home_img_bg.png";
import homeInfo from "../../../../assets/data/bannerV1.json";

import {COLLECTION_ADDRESS, COLLECTION_ABI} from '../../../../contracts/Collection';
import {useAccount, useConnect, useNetwork , useFeeData, useBalance, useContractRead, useContractWrite, useWaitForTransaction, usePrepareContractWrite } from 'wagmi';

const Banner = () => {
  const { mintModalHandle } = useModal();

  const totalSupply  = useContractRead({
    addressOrName: COLLECTION_ADDRESS,
    contractInterface: COLLECTION_ABI,
    functionName: 'totalSupply',
    args: [],
    onSuccess(data) {
      //console.log('MintNowModal Success', data)
    },
  })
  let supply = parseInt(totalSupply.data)
  console.log(supply)
  return (<>
    <BannerV1Wrapper id="home">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="rsc_v1_baner_left">
              <h2>{homeInfo.title}</h2>
              <h3>
                <span className="count">
                  <Counter end={supply} duration={10} />
                </span>{" "}
                / 3000 Minted
              </h3>
              <div className="banner_buttons">
                <Button lg variant="mint" onClick={() => mintModalHandle()}>
                  {" "}
                  Mint now
                </Button>
                <Button lg variant="outline" onClick={() => {}}>
                  Whitelist now
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
    </>);
};

export default Banner;
