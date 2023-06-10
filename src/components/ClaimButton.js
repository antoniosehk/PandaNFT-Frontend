import { Button, Text, Link } from "@chakra-ui/react";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
  useNetwork,
} from "wagmi";

import { abi, contractAddress } from "../abi/Mint";

const ClaimButton = ({ address }) => {
  const { chain } = useNetwork();

  const { data: eligible } = useContractRead({
    address: contractAddress[chain.network],
    abi: abi,
    functionName: "checkIfRandomMintEligible",
    args: [address],
    watch: true,
  });

  const { config } = usePrepareContractWrite({
    address: contractAddress[chain.network],
    abi: abi,
    functionName: "claim",
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
      {contractWrite.isLoading && (
        <Text mt={2} mb={2}>
          Check your wallet...
        </Text>
      )}
      {waitForTransaction.isLoading && (
        <Text mt={2} mb={2}>
          Claiming...
        </Text>
      )}
      {waitForTransaction.isSuccess && (
        <Text mt={2} mb={2}>
          <Link
            href={`${chain?.blockExplorers?.default.url}/tx/${contractWrite.data?.hash}`}
            isExternal
          >
            Congrats! You got 10 Panda NFTs! Click me to check the transaction!
          </Link>
        </Text>
      )}
      <Button
        w={200}
        mt={2}
        mb={2}
        isDisabled={
          waitForTransaction.isLoading || !contractWrite.writeAsync || !eligible
        }
        colorScheme="teal"
        size="lg"
        onClick={handleSendTransaction}
      >
        Claim
      </Button>
    </>
  );
};

export { ClaimButton };
