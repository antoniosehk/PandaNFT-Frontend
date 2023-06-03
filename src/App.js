import { Button } from "@chakra-ui/react";
import {
  Flex,
  Spacer,
  Center,
  Box,
  Text,
  Heading,
  ButtonGroup,
  Container,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { BsSun, BsMoonStarsFill } from "react-icons/bs";

const App = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
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
          <Button colorScheme="teal">Connect</Button>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <BsMoonStarsFill /> : <BsSun />}
          </Button>
        </ButtonGroup>
      </Flex>

      <Center h="100vh">
        <Container maxW="xl">
          <Heading size="4xl" mb={10}>
            Mine your NFT
          </Heading>

          <Text mb={10}>
            Hey! You can mine your NFT here! You can either mint 1-3 NFTs.
            Currently only Sepolia network is supported.
          </Text>

          <NumberInput defaultValue={1} min={1} max={3} mb={5}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>

          <Center>
            <Button colorScheme="teal" size="lg">
              Mint
            </Button>
          </Center>
        </Container>
      </Center>
    </>
  );
};

export default App;
