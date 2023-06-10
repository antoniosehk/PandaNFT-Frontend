import NavBar from "./components/NavBar";
import Main from "./components/Main";
import { useAccount } from "wagmi";

const App = () => {
  const { address, isConnected } = useAccount();

  return (
    <>
      <NavBar />
      <Main address={address} isConnected={isConnected} />
    </>
  );
};

export default App;
