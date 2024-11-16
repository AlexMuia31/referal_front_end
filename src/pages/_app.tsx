import Navbar from "@/Components/Layout/Navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { LiskSepoliaTestnet } from "@thirdweb-dev/chains";
import Dashlayout from "@/Components/Layout/Dashlayout";
import { Provider } from "react-redux";
import { store } from "@/Components/APICalls/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThirdwebProvider
        activeChain={LiskSepoliaTestnet}
        clientId="c6008fb4af485d854cde97b46a5da8bc"
      >
        <Provider store={store}>
          <Dashlayout>
            <Component {...pageProps} />
          </Dashlayout>
        </Provider>
      </ThirdwebProvider>
    </>
  );
}
