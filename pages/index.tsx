import type { NextPage } from "next";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Image,
  Text,
} from "@chakra-ui/react";
import { ChainCard } from "../components/ChainCard";
import { useGetChainData } from "../hooks/useGetChainData";
import Fuse from "fuse.js";
import { useEffect, useMemo, useState } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import { ChainInfo } from "../common/types";
import { useAccount, useConnect } from "wagmi";
import { filter } from "lodash";

const Home: NextPage = () => {
  const { data: chainData, isLoading } = useGetChainData();
  const options = {
    threshold: 0.2,
    keys: ["name", "networkId"],
  };
  const [
    {
      data: { connected, connector, connectors },
      error,
      loading,
    },
    connect,
  ] = useConnect();
  const [_, disconnect] = useAccount();

  const [searchText, setSearchText] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState(searchText);
  const [filteredData, setFilteredData] = useState<ChainInfo[]>(chainData);
  const searchData = useMemo(
    () => chainData && new Fuse(chainData, options),
    [chainData]
  );

  useEffect(() => {
    if (searchText !== "") {
      setFilteredData(searchData.search(searchText).map((i) => i.item));
    } else {
      setFilteredData(chainData);
    }
  }, [searchText, chainData]);
  useEffect(() => {
    const timer = setTimeout(() => setSearchText(debouncedTerm), 200);
    return () => clearTimeout(timer);
  }, [debouncedTerm]);

  const cards = useMemo(() => {
    return (
      <>
        {filteredData && (
          <Box
            flexWrap="wrap"
            display="flex"
            gap="20px"
            justifyContent="center"
          >
            {filteredData.map((chain) => {
              return (
                <ChainCard
                  key={chain.shortName}
                  chainInfo={chain as ChainInfo}
                />
              );
            })}
          </Box>
        )}
      </>
    );
  }, [filteredData]);

  return (
    <>
      {error && <div>{error?.message ?? "Failed to connect"}</div>}
      {isLoading && !searchData && <Text>Loading...</Text>}
      {!isLoading && (
        <Box mb="30px">
          <Container maxW="container.lg">
            <Box
              color="white"
              display="flex"
              position={"relative"}
              justifyContent="center"
              alignItems="center"
              flexWrap={["wrap", null, "nowrap"]}
              mb="20px"
              mx="30px"
            >
              <Box display="flex" justifyContent="center">
                <Heading fontSize="6xl">Chain Adder</Heading>
                v1
              </Box>
              <Button
                position={["relative", null, "absolute"]}
                right={["auto", null, 0]}
                colorScheme="purple"
                onClick={() => disconnect()}
                _hover={{ cursor: "auto" }}
              >
                Logout
              </Button>
              {!connected && (
                <Menu placement="bottom-end">
                  <MenuButton
                    as={Button}
                    position={["relative", null, "absolute"]}
                    right={["auto", null, 0]}
                    colorScheme="purple"
                  >
                    Connect Wallet
                  </MenuButton>
                  <MenuList color="black" bg={"purple.200"} fontSize="2xl">
                    {connectors.map((x) => (
                      <MenuItem
                        disabled={!x.ready}
                        key={x.name}
                        onClick={() => connect(x)}
                      >
                        {x.name === "MetaMask" && (
                          <Image width="25px" mr="10px" src="./metamask.svg" />
                        )}
                        {x.name === "WalletConnect" && (
                          <Image
                            width="25px"
                            mr="10px"
                            src="./walletconnect.svg"
                          />
                        )}
                        {x.name}
                        {!x.ready && " (unsupported)"}
                        {loading && x.name === connector?.name && "…"}
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
              )}
            </Box>
            <Box mx="30px" mb="30px">
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<SearchIcon color="gray.300" />}
                />
                <Input
                  color="white"
                  fontWeight="400"
                  value={debouncedTerm}
                  onChange={(e) => setDebouncedTerm(e.target.value)}
                  placeholder="Search chain name or chain id..."
                />
              </InputGroup>
            </Box>
            {cards}
          </Container>
        </Box>
      )}
    </>
  );
};

export default Home;
