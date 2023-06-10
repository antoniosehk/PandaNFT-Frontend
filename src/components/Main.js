import { Box, Center, Text, Heading, Image } from "@chakra-ui/react";
import MintButton from "./MintButton";
import { RandomMintButton } from "./RandomMintButton";
import { ClaimButton } from "./ClaimButton";

const Main = ({ address, isConnected }) => {
  return (
    <Center h="100vh" flexDirection="column">
      <Heading size="4xl" mt={10} mb={10}>
        Mint Panda NFT!
      </Heading>

      <Box boxSize="sm">
        <Image src="https://ipfs.io/ipfs/Qmb4jL3nGSTfeFExhoT799oAsWrBzDabjkYqkxPG8LFzHr" />
      </Box>

      {isConnected ? (
        <>
          <MintButton />
          <RandomMintButton />
          <ClaimButton address={address} />
        </>
      ) : (
        <Text mt={10} mb={10}>
          Connect your wallet first.
        </Text>
      )}
    </Center>
  );
};

export default Main;
