import useSWR from "swr";
import { ChainInfo } from "../common/types";

export const useGetChainData = () => {
  const { data, error } = useSWR(`https://chainid.network/chains_mini.json`, {
    revalidateOnFocus: false,
    revalidateOnMount: true,
    revalidateOnReconnect: false,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
    refreshInterval: 0,
  });

  return {
    data: data?.data as ChainInfo[],
    isLoading: !error && !data,
    isError: error,
  };
};
