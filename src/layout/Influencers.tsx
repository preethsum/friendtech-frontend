import useFriendTechSDK from "@/hooks/useFriendTechSDK";
import InfluencerCard from "../components/InfluencerCard";
import { useEffect, useState } from "react";
import type { CreatorAccount } from "@/client/friendTechClient";
import type { PublicKey } from "@solana/web3.js";

const Influencers = () => {
  const [accounts, setAccounts] = useState<
    (CreatorAccount & {
      publicKey: PublicKey;
    })[]
  >();
  const sdk = useFriendTechSDK();

  useEffect(() => {
    if (sdk) {
      const getAllAccounts = async () => {
        const accounts = await sdk.getAllCreatorAccounts();
        setAccounts(accounts);
      };
      getAllAccounts();
    } else {
    }
  }, []);

  if (accounts?.length == 0) {
    return <>Be first to create account</>;
  }
  return (
    <section className="influencers">
      {accounts?.map((account) => {
        return (
          <InfluencerCard
            fee={account.fee}
            influencerPubkey={`${account.creator}`}
            initialPrice={account.basePrice}
            keyPubkey={`${account.key}`}
            name={`${account.name}`}
          />
        );
      })}
    </section>
  );
};

export default Influencers;
