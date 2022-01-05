import { Box, Text, Button, Link, Input, useToast } from "@chakra-ui/react";
import { m } from "framer-motion";
import React, { FC, useEffect, useState } from "react";
import { useAccount, useNetwork, useProvider } from "wagmi";
import { ChainInfo } from "../../common/types";
import { Polygon } from "../Logos";

interface IChainCard {
  chainInfo: ChainInfo;
}

const InfoContainer: FC = ({ children }) => {
  return (
    <Box
      fontSize="xl"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      width="100%"
    >
      {children}
    </Box>
  );
};

export const ChainCard: FC<IChainCard> = ({ chainInfo }) => {
  const [RPC, setRPC] = useState("");
  const toast = useToast();

  useEffect(() => {
    if (chainInfo?.rpc) {
      setRPC(chainInfo.rpc[0]);
    }
  }, [chainInfo.rpc]);
  const [{ data, error, loading }, switchNetwork] = useNetwork();

  if (!chainInfo) {
    return null;
  } else {
    return (
      <Box
        width="300px"
        border="0.5em"
        borderStyle="double"
        bg={"#06d6a0"}
        rounded={"lg"}
        display="flex"
        flexDir="column"
        justifyContent="space-between"
        alignItems="center"
        px="20px"
      >
        {chainInfo && (
          <>
            <Link href={chainInfo.infoURL} isExternal>
              <Text textAlign="center" fontSize="2xl" mb="20px">
                {chainInfo.name}
              </Text>
            </Link>
            <InfoContainer>
              <Text>ChainId:</Text>
              <Text fontWeight="600">{chainInfo.chainId}</Text>
            </InfoContainer>
            <InfoContainer>
              <Text>Currency:</Text>
              <Text>{chainInfo.shortName?.toUpperCase()}</Text>
            </InfoContainer>
            <InfoContainer>
              <Text mr="20px">RPC: </Text>
              <Input
                display="inline-flex"
                whiteSpace="nowrap"
                defaultValue={RPC}
                onChange={(e) => {
                  setRPC(e.target.value);
                }}
              />
            </InfoContainer>
            <Box width="100%">
              <Button
                w="100%"
                my="30px"
                onClick={async () => {
                  try {
                    await window.ethereum?.request({
                      method: "wallet_addEthereumChain",
                      params: [
                        {
                          chainId: "0x" + chainInfo.chainId.toString(16),
                          chainName: chainInfo.name,
                          nativeCurrency: {
                            name: chainInfo.nativeCurrency.name,
                            symbol: chainInfo.nativeCurrency.symbol,
                            decimals: chainInfo.nativeCurrency.decimals,
                          },
                          rpcUrls: [chainInfo.rpc[0]],
                        },
                      ],
                    });
                  } catch (e: any) {
                    toast({
                      title: "Error: " + e.message,
                      status: "error",
                    });
                    console.log(e);
                  }
                }}
              >
                <Text fontSize="2xl">Add Chain</Text>
              </Button>
            </Box>
          </>
        )}
      </Box>
    );
  }
};
