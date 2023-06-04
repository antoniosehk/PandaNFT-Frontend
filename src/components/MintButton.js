import { Button, Center, Text, Link } from "@chakra-ui/react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
  useNetwork,
} from "wagmi";
import { parseEther } from "viem";
import { abi, contractAddress } from "../abi/Mint";

const MintButton = () => {
  const [mintValue, setMintValue] = useState(1);
  const { chain } = useNetwork();

  const { config } = usePrepareContractWrite({
    address: contractAddress[chain.network],
    abi: abi,
    functionName: "mint",
    args: [mintValue],
    value: parseEther(String(0.001 * mintValue)),
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
      <Text mb={10}>
        Hey! You can either mint 1 - 3 NFT here. Each NFT costs 0.001 ETH.
      </Text>
      {waitForTransaction.isLoading && <Text mb={10}>Minting NFT...</Text>}
      {waitForTransaction.isSuccess && (
        <Text mb={10}>
          <Link
            href={`${chain?.blockExplorers?.default.url}/tx/${contractWrite.data?.hash}`}
            isExternal
          >
            Your mint is successful! Click me to check your transaction
          </Link>
        </Text>
      )}
      {(contractWrite.isError || waitForTransaction.isError) && (
        <Text mb={10}>Something wrong during minting...please try again</Text>
      )}

      <NumberInput
        defaultValue={1}
        min={1}
        max={3}
        mb={5}
        value={mintValue}
        onChange={(mintValueString) => setMintValue(mintValueString)}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>

      <Center>
        <Button
          isDisabled={waitForTransaction.isLoading}
          colorScheme="teal"
          size="lg"
          onClick={handleSendTransaction}
        >
          Mint
        </Button>
      </Center>

      <Text fontSize="lg" fontWeight="bold"></Text>
    </>
  );
};

export default MintButton;
