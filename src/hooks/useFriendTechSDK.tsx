import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useMemo } from "react";
import { FriendTechSDK } from "../client/friendTechClient";
import { PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

const FRIENDTECH_PROGRAM_ID = new PublicKey(
  "HfBinAjQVmUSKCmsCQ4BDYvBwCmgjcN8Pv2E9yY6yLsd"
);
const useFriendTechSDK = () => {
  const { connection } = useConnection();
  const wallet = useWallet();

  const sdk = useMemo(() => {
    if (!wallet || !connection) return null;
    return new FriendTechSDK({
      connection,
      programId: FRIENDTECH_PROGRAM_ID,
      wallet,
      tokenProgram: TOKEN_PROGRAM_ID,
    });
  }, [connection, wallet]);
  return sdk;
};

export default useFriendTechSDK;
