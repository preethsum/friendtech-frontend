import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import useFriendTechSDK from "../hooks/useFriendTechSDK";
import { useEffect, useState } from "react";
import type { CreatorAccount } from "../client/friendTechClient";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateAccount from "@/pages/CreateAccount";
import MiddleTruncatedText from "@/components/MiddleTruncatedText";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

const Hero = () => {
  const wallet = useWallet();
  const sdk = useFriendTechSDK();
  const [creatorAccount, setCreatorAccount] = useState<CreatorAccount | null>();

  // const handleChange = (e) => {
  //   if (e.target.files && e.target.files.length > 0) {
  //     setFile(URL.createObjectURL(e.target.files));
  //   }
  // };
  useEffect(() => {
    const getCreatorAccount = async () => {
      if (wallet.publicKey && sdk) {
        let account = await sdk.getCreatorAccount(wallet.publicKey);
        setCreatorAccount(account);
      }
    };
    getCreatorAccount();
  }, [wallet.publicKey]);

  const handleWithdrawFee = async () => {
    if (wallet.publicKey && sdk) {
      await sdk.withdrawFee();
    }
  };

  return (
    <section className="hero">
      <h1>Earn from your influence</h1>
      {!wallet.publicKey ? (
        <WalletMultiButton />
      ) : !creatorAccount ? (
        <CreateAccount />
      ) : (
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger>Your account</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <DialogTitle>{creatorAccount.name}</DialogTitle>
                  </div>
                  <div>
                    <p className="font-bold">Influencer public key :</p>
                    <a
                      className="ml-2 hover:text-gray-400"
                      href={`https://explorer.solana.com/address/${creatorAccount.creator}?cluster=devnet`}
                    >
                      <MiddleTruncatedText text={`${creatorAccount.creator}`} />
                    </a>
                  </div>
                  <div>
                    <p className="font-bold">Key mint :</p>
                    <a
                      className="ml-2 hover:text-gray-400 "
                      href={`https://explorer.solana.com/address/${creatorAccount.key}?cluster=devnet`}
                    >
                      <MiddleTruncatedText text={`${creatorAccount.key}`} />
                    </a>
                  </div>
                  <div>
                    <span className="font-bold">Initial price :</span>
                    <span className="ml-2">
                      {Number(creatorAccount.basePrice) / LAMPORTS_PER_SOL} sol
                    </span>
                  </div>
                  <div>
                    <span className="font-bold">Fee : </span>
                    <span className="ml-2">{creatorAccount.fee} %</span>
                  </div>

                  <Button onClick={handleWithdrawFee}>Withdraw fee</Button>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </section>
  );
};

export default Hero;
