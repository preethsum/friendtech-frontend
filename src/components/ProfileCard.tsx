import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import useFriendTechSDK from "../hooks/useFriendTechSDK";
import type { CreatorAccount } from "../client/friendTechClient";

const ProfileCard = () => {
  const [da, setDa] = useState<CreatorAccount | undefined | null>();
  const wallet = useWallet();
  const sdk = useFriendTechSDK();
  console.log(da);
  useEffect(() => {
    const fn = async () => {
      if (wallet.publicKey && sdk) {
        const data = await sdk.getCreatorAccount(wallet.publicKey);
        setDa(data);
      }
    };
    fn();
    console.log(da);
  }, [wallet.publicKey]);
  return (
    <div className="border p-4 rounded-md flex flex-col gap-1 ">
      <div className=" flex gap-2 items-center">
        <p> {da?.name}</p>
      </div>
      <p>
        Influencer public key:{"  "}
        <a
          href={`https://explorer.solana.com/address/${da?.creator?.toString()}?cluster=devnet`}
        >
          {da?.creator?.toString()}
        </a>
      </p>

      <p>Initial price: {Number(da?.basePrice)} sol</p>
      <p>Fee: {da?.fee} %</p>
      <p>
        Key mint: {"  "}
        <a
          href={`https://explorer.solana.com/address/${da?.key?.toString()}?cluster=devnet`}
        >
          {da?.key?.toString()}
        </a>
      </p>
      <p>Supply: {} </p>
    </div>
  );
};

export default ProfileCard;
