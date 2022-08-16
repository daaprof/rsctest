import Counter from "../../../common/counter";
import bgShape1 from "../../../assets/images/icon/square_shape_1.png";
import bgShape2 from "../../../assets/images/icon/square_shape_2.png";

import CoinInfoCounterWrapper from "./Counter.style";
import coinInfoCounterData from "../../../assets/data/coinInfoCounter.json";

import {useAccount, useConnect, useNetwork , useFeeData, useBalance, useContractRead, useContractWrite, useWaitForTransaction, usePrepareContractWrite } from 'wagmi';
import {COLLECTION_ADDRESS, COLLECTION_ABI} from '../../../contracts/Collection';
import {ethers} from 'ethers';

const CoinInfoCounter = () => {
  const { info } = coinInfoCounterData;

  const totalSupply  = useContractRead({
    addressOrName: COLLECTION_ADDRESS,
    contractInterface: COLLECTION_ABI,
    functionName: 'totalSupply',
    args: [],
  })
  let totalBuyers  = useContractRead({
    addressOrName: COLLECTION_ADDRESS,
    contractInterface: COLLECTION_ABI,
    functionName: 'totalBuyers',
    args: [],
  })
  let currentPrice  = useContractRead({
    addressOrName: COLLECTION_ADDRESS,
    contractInterface: COLLECTION_ABI,
    functionName: 'currentPrice',
    args: [],
  })
  const totalRaised  = useContractRead({
    addressOrName: COLLECTION_ADDRESS,
    contractInterface: COLLECTION_ABI,
    functionName: 'totalRaisedETH',
    args: [],
  })

  let supply = totalSupply.isSuccess? parseInt(totalSupply.data) : 0
  let buyers = totalBuyers.isSuccess? parseInt(totalBuyers.data) : 0
  currentPrice = currentPrice.isSuccess? parseInt(currentPrice.data).toString() : 0
  currentPrice = currentPrice.isSuccess? ethers.utils.formatEther(currentPrice) : 0
  let raised = totalRaised.isSuccess? parseInt(totalRaised.data).toString() : 0
  raised = totalRaised.isSuccess? ethers.utils.formatEther(raised) : 0

  const _arr = [supply, buyers, currentPrice, raised]
  console.log("INFO BANNER")
  console.log(_arr)
  const sufix = [ " NFT", "", " ETH", " ETH"]
  const units = [ " Total Supply", "Total Buyers", "Current Price", "Total Raised"]
  return (
    <CoinInfoCounterWrapper>
      <div className="container">
        <ul>
          {_arr?.map((item, i) => (
            <li key={i}>
              <h3 id={"counter"+i}>
                <Counter
                  end={_arr[i]}
                  decimal="."
                  decimals={i > 1 ? "2" : "0"}
                  suffix={sufix[i]}
                />
              </h3>
              <h4>{units[i]}</h4>
            </li>
          ))}
        </ul>
      </div>
      <img
        src={bgShape2}
        className="bg-shape shape-left shape-top"
        alt="rsc bg shape"
      />
      <img
        src={bgShape1}
        className="bg-shape shape-left shape-bottom"
        alt="rsc bg shape"
      />
      <img
        src={bgShape2}
        className="bg-shape shape-right shape-top"
        alt="rsc bg shape"
      />
      <img
        src={bgShape1}
        className="bg-shape shape-right shape-bottom"
        alt="rsc bg shape"
      />
    </CoinInfoCounterWrapper>
  );
};

export default CoinInfoCounter;
