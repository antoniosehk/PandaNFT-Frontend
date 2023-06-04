import { BsSun, BsMoonStarsFill } from "react-icons/bs";
import {
  Flex,
  Spacer,
  Box,
  Heading,
  ButtonGroup,
  useColorMode,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      w="100%"
      alignItems="center"
      bg={useColorModeValue("gray.100", "gray.900")}
    >
      <Box ml="2">
        <Heading size="md">NFTMint</Heading>
      </Box>
      <Spacer />
      <ButtonGroup m="2">
        <ConnectButton />
        <Button onClick={toggleColorMode}>
          {colorMode === "light" ? <BsMoonStarsFill /> : <BsSun />}
        </Button>
      </ButtonGroup>
    </Flex>
  );
};

export default NavBar;
