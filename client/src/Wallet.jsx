import server from "./server";
import { getPublicAddress, recoverKey } from "./utils/utils";

function Wallet({
  address,
  setAddress,
  signature,
  setSignature,
  balance,
  setBalance,
}) {
  async function onChange(evt) {
    const signature = evt.target.value;
    setSignature(signature);
    setAddress("");

    const recoverPublicKey = recoverKey(signature);

    if (recoverPublicKey) {
      const address = getPublicAddress(recoverPublicKey);
      setAddress(address);

      if (address) {
        const {
          data: { balance },
        } = await server.get(`balance/${address}`);
        setBalance(balance);
      } else {
        setBalance(0);
      }
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Message Signature -{">"} Sign the message 'Alchemy Rocks' with the
        private key.
        <input
          placeholder="Enter the signature to validate the address ownership"
          value={signature}
          onChange={onChange}
        ></input>
      </label>
      <div>Address: {address}</div>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
