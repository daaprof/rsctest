import Counter from "../../../common/counter";
import bgShape1 from "../../../assets/images/icon/square_shape_1.png";
import bgShape2 from "../../../assets/images/icon/square_shape_2.png";

import CoinInfoCounterWrapper from "./Counter.style";
import coinInfoCounterData from "../../../assets/data/coinInfoCounter.json";

import {useAccount, useConnect, useNetwork , useFeeData, useBalance, useContractRead, useContractWrite, useWaitForTransaction, usePrepareContractWrite } from 'wagmi';
import {COLLECTION_ADDRESS, COLLECTION_ABI} from '../../../contracts/Collection';

const CoinInfoCounter = () => {
  const { info } = coinInfoCounterData;

  const totalSupply  = useContractRead({
    addressOrName: COLLECTION_ADDRESS,
    contractInterface: COLLECTION_ABI,
    functionName: 'totalSupply',
    args: [],
  })

  let supply = parseInt(totalSupply.data)

  return (
    <CoinInfoCounterWrapper>
      <div className="container">
        <ul>
          {info?.map((item, i) => (
            <li key={i}>
              <h3 id={"counter"+i}>
                <Counter
                  end={i==0 ? supply : item.number}
                  decimal="."
                  decimals={item.number % 1 !== 0 ? "2" : "0"}
                  suffix={item.unit}
                />
              </h3>
              <h4>{item.text}</h4>
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
