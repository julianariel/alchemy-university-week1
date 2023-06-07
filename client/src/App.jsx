import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [signature, setSignature] = useState("");

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        signature={signature}
        address={address}
        setAddress={setAddress}
        setSignature={setSignature}
      />
      <Transfer
        setBalance={setBalance}
        signature={signature}
        address={address}
      />
    </div>
  );
}

export default App;
