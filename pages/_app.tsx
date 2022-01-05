import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../common/theme";
import "@fontsource/vt323";
import axios, { AxiosRequestConfig } from "axios";
import { SWRConfig } from "swr";
import {
  InjectedConnector,
  Provider,
  WalletConnectConnector,
  defaultChains,
  defaultL2Chains,
  developmentChains,
} from "wagmi";

function MyApp({ Component, pageProps }: AppProps) {
  const chains = [...defaultChains, ...defaultL2Chains, ...developmentChains];

  const connectors = ({}) => {
    return [new InjectedConnector({ chains })];
  };
  return (
    <Provider connectors={connectors}>
      <ChakraProvider theme={theme}>
        <SWRConfig
          value={{
            refreshInterval: 3000,
            fetcher: (
              resource: string,
              init: AxiosRequestConfig<any> | undefined
            ) => axios.get(resource, init),
          }}
        >
          <Component {...pageProps} />
        </SWRConfig>
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
