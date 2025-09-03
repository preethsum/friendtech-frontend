import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import useFriendTechSDK from "@/hooks/useFriendTechSDK";
import MiddleTruncatedText from "./MiddleTruncatedText";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { useState } from "react";

type InfluencerCardTpye = {
  name: string;
  initialPrice: number;
  influencerPubkey: string;
  fee: number;
  keyPubkey: string;
};

const InfluencerCard = ({
  name,
  initialPrice,
  influencerPubkey,
  fee,
}: InfluencerCardTpye) => {
  return (
    <>
      <Card className="w-72 ">
        <CardHeader className="flex items-center gap-3">
          <CardTitle>{name}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div>
            <p className="font-bold">Influencer public key :</p>
            <a
              className="ml-2 hover:text-gray-400"
              href={`https://explorer.solana.com/address/${influencerPubkey}?cluster=devnet`}
            >
              <MiddleTruncatedText text={`${influencerPubkey}`} />
            </a>
          </div>

          <div>
            <span className="font-bold">Initial price :</span>
            <span className="ml-2">
              {Number(initialPrice) / LAMPORTS_PER_SOL} sol
            </span>
          </div>

          <div>
            <span className="font-bold">Fee : </span>
            <span className="ml-2">{fee} %</span>
          </div>

          <BuyKeys influencerPubkey={`${influencerPubkey}`} />
          <SellKeys influencerPubkey={`${influencerPubkey}`} />
        </CardContent>
      </Card>
    </>
  );
};

export default InfluencerCard;

const BuyKeys = ({ influencerPubkey }: { influencerPubkey: string }) => {
  const sdk = useFriendTechSDK();
  const [amount, setAmount] = useState<number>();
  const onBuy = async () => {
    if (amount && sdk) {
      await sdk.buyKey({
        amount,
        creatorPublicKey: new PublicKey(influencerPubkey),
      });
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Buy</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 ">
          <div className="grid gap-3">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              name="name"
              type="number"
              onChange={(e) => {
                setAmount(Number(e.target.value));
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" onClick={onBuy}>
            Buy
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const SellKeys = ({ influencerPubkey }: { influencerPubkey: string }) => {
  const sdk = useFriendTechSDK();
  const [amount, setAmount] = useState<number>();
  const onSell = async () => {
    if (amount && sdk) {
      await sdk.sellKeys({
        amount,
        creatorPublicKey: new PublicKey(influencerPubkey),
      });
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Sell</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription>Sell keys</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 ">
          <div className="grid gap-3">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              name="name"
              type="number"
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" onClick={onSell}>
            Sell
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
