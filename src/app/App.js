import { Routes, Route } from "react-router-dom";
import HomeV1 from "../pages/homeV1";
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
  useAccount,
  useBalance  
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { connectorsForWallets, wallet, darkTheme, lightTheme, midnightTheme } from '@rainbow-me/rainbowkit';



var { chains, provider } = configureChains(
  [ chain.mainnet],
  [ 
    publicProvider()
  ]
);

const connectors = connectorsForWallets([
  {
    groupName: 'Most Used',
    wallets: [ 
      wallet.metaMask({ chains }),
      
    ],
  },
  {
    groupName: 'Trusted Wallets',
    wallets: [
      wallet.walletConnect({ chains }),
      wallet.trust({chains }),
      wallet.coinbase({ chains, appName: 'My RainbowKit App' }),
      wallet.ledger({chains, infurId: "url"}),
    ],
  },
]); 
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})
 
function App() {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} coolMode showRecentTransactions={true} theme={darkTheme({
          accentColor: 'transparent',
          accentColorForeground: 'white',
          borderRadius: 'none',
          fontStack: 'system',
          overlayBlur: 'none',
      })}>
      <Routes>
        <Route path="/" element={<HomeV1 />} exact />
      </Routes>
    </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default App
