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
import "@rainbow-me/rainbowkit/styles.css";
import { wrapper } from "../redux/store";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

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
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function App({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default wrapper.withRedux(App);
