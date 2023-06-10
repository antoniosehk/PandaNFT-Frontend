import { Button, Text, Link } from "@chakra-ui/react";

import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
  useNetwork,
} from "wagmi";

import { parseEther } from "viem";
import { abi, contractAddress } from "../abi/Mint";

const RandomMintButton = () => {
  const { chain } = useNetwork();
  const { config } = usePrepareContractWrite({
    address: contractAddress[chain.network],
    abi: abi,
    functionName: "randomMint",
    value: parseEther("0.01"),
  });
  const contractWrite = useContractWrite(config);
  const waitForTransaction = useWaitForTransaction({
    hash: contractWrite.data?.hash,
  });

  const handleSendTransaction = async () => {
    try {
      await contractWrite.writeAsync();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Text mt={6} mb={2}>
        Or you can spend 0.01 ETH to enroll into a lucky draw of 10 Panda NFTs!
      </Text>

      {contractWrite.isLoading && (
        <Text mt={2} mb={2}>
          Check your wallet...
        </Text>
      )}
      {waitForTransaction.isLoading && (
        <Text mt={2} mb={2}>
          Enrolling...
        </Text>
      )}
      {waitForTransaction.isSuccess && (
        <Text mt={2} mb={2}>
          <Link
            href={`${chain?.blockExplorers?.default.url}/tx/${contractWrite.data?.hash}`}
            isExternal
          >
            Your are enrolled! Click me to check the transaction! Claim button
            will be enabled in few mins if you are eligible.
          </Link>
        </Text>
      )}

      <Button
        w={200}
        mt={2}
        mb={2}
        isDisabled={waitForTransaction.isLoading || !contractWrite.writeAsync}
        colorScheme="teal"
        size="lg"
        onClick={handleSendTransaction}
      >
        Enroll
      </Button>
    </>
  );
};

export { RandomMintButton };
