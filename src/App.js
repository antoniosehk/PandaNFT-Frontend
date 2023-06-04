import NavBar from "./components/NavBar";
import Main from "./components/Main";
import { useAccount } from "wagmi";

const App = () => {
  const { isConnected } = useAccount();

  return (
    <>
      <NavBar />
      <Main isConnected={isConnected} />
    </>
  );
};

export default App;
