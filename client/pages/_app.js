import "@/styles/globals.css";
import "@/styles/Desc.css";
import "@/styles/Header.css";
import "@/styles/Footer.css";
import "@/styles/Support.css";
import "@/styles/scan.css";
import "@/styles/auth.css";
import "@/styles/ProductForm.css";
import "@/styles/Home.css";
import "@/styles/mintform.css";
import "@/styles/Dashboard.css";
import "@/styles/Collection.css";
import "@/styles/productId.css";
import "@/styles/NftCard.css";
import "@rainbow-me/rainbowkit/styles.css";
import { wrapper } from "../redux/store";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
// import { connectorsForWallets } from "@rainbow-me/rainbowkit"
// import { metaMaskWallet } from "@rainbow-me/rainbowkit/wallets"
// import { ArcanaConnector } from "@arcana/auth-wagmi"
// import {
//   LivepeerConfig,
//   createReactClient,
//   studioProvider
// } from "@livepeer/react"

// const client = createReactClient({
//   provider: studioProvider({ apiKey: "a386df0c-53bc-4920-99ca-f1093f31072f" })
// })

// export const ArcanaRainbowConnector = ({ chains }) => {
//   return {
//     id: "arcana-auth",
//     name: "Arcana Wallet",
//     iconUrl: "",
//     iconBackground: "#101010",
//     createConnector: () => {
//       const connector = new ArcanaConnector({
//         chains,
//         options: {
//           // appId parameter refers to App Address value in the Dashboard
//           appId: "873377e394acec5beb48c2c2569105ac9394877f",
//         },
//       });
//       return {
//         connector
//       }
//     }
//   }
// }

const { chains, provider } = configureChains(
  [polygonMumbai],
  [
    alchemyProvider({ apiKey: "M6wTJ_1DsrJkSUE0qusDZO96oASJC8xS" }),
    publicProvider(),
  ]
);
const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

// const connectors = (chains) =>
//   connectorsForWallets([
//     {
//       groupName: "Recommended",
//       wallets: [ArcanaRainbowConnector({ chains }), metaMaskWallet({ chains })]
//     }
//   ])

// const { chains, provider } = configureChains(
//   [polygonMumbai],
//   [publicProvider()]
// )

const wagmiClient = createClient({
  autoConnect: true,
  connectors: connectors(chains),
  provider,
});

function App({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        {/* <LivepeerConfig client={client}> */}
        <Component {...pageProps} />
        {/* </LivepeerConfig> */}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default wrapper.withRedux(App);
