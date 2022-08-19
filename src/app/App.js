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

import { Toaster } from 'react-hot-toast';
var toastStlye = {
  border: '1px solid #0058AA',
  padding: '16px',
  color: '#02205D'
}

var toastIconTheme = {
  primary: '#009CE9',
  secondary: '#FFFAEE'
}

var { chains, provider } = configureChains(
  [ chain.rinkeby],
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
      wallet.coinbase({ chains, appName: 'Recon Soldier Club' }),
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
      <RainbowKitProvider chains={chains} coolMode showRecentTransactions={true} 
        theme={darkTheme()} 
      appInfo={{
        appName: 'Recon Soldier Club',
        learnMoreUrl: 'https://metamask.io/',
      }} >
      <Toaster position="top-center" reverseOrder={false}
                  containerStyle={{ }}
                  toastOptions={{
                    style: toastStlye,
                    toastIconTheme: toastIconTheme,
                    success: { duration: 4000 },
                    error: { duration: 6000 }
                  }}
      />
      <Routes>
        <Route path="/" element={<HomeV1 />} exact />
      </Routes>
    </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default App
