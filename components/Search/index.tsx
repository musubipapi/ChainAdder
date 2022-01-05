import { SearchIcon } from "@chakra-ui/icons";
import { Box, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React from "react";

interface Props {}

export const Search = (props: Props) => {
  return (
    <Box mx="30px" mb="30px">
      {/* <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.300" />}
        />
        <Input
          color="white"
          fontWeight="400"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search eth, ropsten, mumbai..."
        />
      </InputGroup> */}
    </Box>
  );
};
