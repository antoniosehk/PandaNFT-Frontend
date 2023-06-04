import { Button, Center, Text, Heading, Container } from "@chakra-ui/react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

const Main = () => {
  return (
    <Center h="100vh">
      <Container maxW="xl">
        <Heading size="4xl" mb={10}>
          Mint your NFT
        </Heading>

        <Text mb={10}>
          Hey! You can mint your NFT here! You can either mint 1-3 NFTs.
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
  );
};

export default Main;
