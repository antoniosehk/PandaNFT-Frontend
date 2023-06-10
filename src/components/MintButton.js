import { Button, Text, Link } from "@chakra-ui/react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
  useNetwork,
} from "wagmi";
import { parseEther, formatEther } from "viem";
import { abi, contractAddress } from "../abi/Mint";

const MintButton = () => {
  const [mintValue, setMintValue] = useState(1);
  const [nftValue, setNFTValue] = useState("");

  const { chain } = useNetwork();
  const { data: nftPriceOnChain } = useContractRead({
    address: contractAddress[chain.network],
    abi: abi,
    functionName: "MINT_FEE",
    watch: true,
  });

  useEffect(() => {
    try {
      setNFTValue(formatEther(nftPriceOnChain));
    } catch (error) {
      console.log(error);
    }
  }, [nftPriceOnChain]);

  const { config } = usePrepareContractWrite({
    address: contractAddress[chain.network],
    abi: abi,
    functionName: "mint",
    args: [mintValue],
    value: parseEther(String(nftValue * mintValue)),
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
      <Text mt={10} mb={2}>
        {`Hey! You can either mint 1 - 3 Panda NFT here. Each Panda NFT costs ${nftValue} ETH.`}
      </Text>
      {contractWrite.isLoading && (
        <Text mt={2} mb={2}>
          Check your wallet...
        </Text>
      )}
      {waitForTransaction.isLoading && (
        <Text mt={2} mb={2}>
          Minting NFT...
        </Text>
      )}
      {waitForTransaction.isSuccess && (
        <Text mt={2} mb={2}>
          <Link
            href={`${chain?.blockExplorers?.default.url}/tx/${contractWrite.data?.hash}`}
            isExternal
          >
            Your mint is successful! Click me to check your transaction
          </Link>
        </Text>
      )}
      {(contractWrite.isError || waitForTransaction.isError) && (
        <Text mt={2} mb={2}>
          Something wrong during minting...please try again
        </Text>
      )}

      <NumberInput
        defaultValue={1}
        min={1}
        max={3}
        mt={2}
        mb={2}
        value={mintValue}
        onChange={(mintValueString) => setMintValue(mintValueString)}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>

      <Button
        mt={2}
        mb={2}
        isDisabled={waitForTransaction.isLoading || !contractWrite.writeAsync}
        colorScheme="teal"
        size="lg"
        onClick={handleSendTransaction}
      >
        Mint
      </Button>

      <Text fontSize="lg" fontWeight="bold"></Text>
    </>
  );
};

export default MintButton;
