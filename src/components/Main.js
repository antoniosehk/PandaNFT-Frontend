import { Center, Text, Heading, Container } from "@chakra-ui/react";
import MintButton from "./MintButton";

const Main = ({ isConnected }) => {
  return (
    <Center h="100vh">
      <Container maxW="xl">
        <Heading size="4xl" mb={10}>
          Mint your NFT
        </Heading>

        {isConnected ? (
          <MintButton />
        ) : (
          <Center>
            <Text mb={10}>Connect your wallet first.</Text>
          </Center>
        )}
      </Container>
    </Center>
  );
};

export default Main;
