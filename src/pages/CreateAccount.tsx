import { useForm } from "react-hook-form";

import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import useFriendTechSDK from "../hooks/useFriendTechSDK";
// import { PinataSDK } from "pinata";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
type Inputs = {
  name: string;
  symbol: string;
  uri: string;
  basePrice: number;
  slope: number;
  fee: number;
  // image: File;
};

// const pinata = new PinataSDK({
//   pinataJwt: "",
//   pinataGateway: import.meta.env.VITE_GATEWAY_URL,
// });

const CreateAccount = () => {
  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      name: "",
      symbol: "",
      uri: "",
      basePrice: 0,
      slope: 0,
      fee: 0,
    },
  });
  const [loading, setLoading] = useState<boolean>();
  // https://devnet.irys.xyz/DEqFSibPDM55CdQiuLABAUHyrqgJAJYwtLW7pLq98QKN

  const sdk = useFriendTechSDK();

  const onSubmit = async (data: Inputs) => {
    // if (!data.image) return;
    // const urlResponse = await fetch(
    //   `${import.meta.env.VITE_SERVER_URL}/presigned_url`,
    //   {
    //     method: "GET",
    //     headers: {
    //       // Handle your own server authorization here
    //     },
    //   }
    // );
    // const data2 = await urlResponse.json();
    // const upload = await pinata.upload.public.file(data.image).url(data2.url);
    // if (upload.cid) {
    //   const ipfsLink = await pinata.gateways.public.convert(upload.cid);

    //   console.log(ipfsLink);
    // }
    if (sdk) {
      setLoading(true);

      const res = await sdk.createCreatorAccount({
        name: data.name,
        symbol: data.symbol,
        uri: data.uri,
        basePrice: data.basePrice * LAMPORTS_PER_SOL,
        fee: data.fee,
        slope: data.slope,
      });

      if (res.success || loading) {
        setLoading(false);
        let res = confirm("Your account is created");
        if (res) {
          window.location.reload();
        }
      }
    }
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Create account</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create account</DialogTitle>
            <DialogDescription>
              Make your own influencer account and earn from your influence
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input
                {...register("name", { required: true })}
                id="name"
                type="text"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="symbol">Symbol</Label>
              <Input
                {...register("symbol", { required: true })}
                id="symbol"
                type="text"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="uri">URI</Label>
              <Input
                {...register("uri", {
                  required: true,
                })}
                id="uri"
                type="text"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="fee">Fee</Label>
              <Input
                {...register("fee", { required: true, valueAsNumber: true })}
                id="fee"
                type="number"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="slope">Slope</Label>
              <Input
                {...register("slope", { required: true, valueAsNumber: true })}
                id="slope"
                type="number"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="basePrice">Base price</Label>
              <Input
                {...register("basePrice", {
                  required: true,
                  valueAsNumber: true,
                })}
                id="basePrice"
                type="number"
              />
            </div>
            {/* <div className="grid gap-3">
              <Label htmlFor="image">Add image</Label>
              <Input
                {...register("image", {
                  required: true,
                })}
                id="image"
                name="name"
                type="file"
                accept="image/*"
              />
            </div> */}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={handleSubmit(onSubmit)}>
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
    // <main className="py-5">
    //   <form
    //     className="flex flex-col bg-gray-900 text-white p-6 rounded-lg shadow-lg space-y-4 max-w-lg mx-auto"
    //     onSubmit={handleSubmit(onSubmit)}
    //   >
    //     <h2 className="text-xl font-bold mb-4">Create New Account</h2>
    //     <input
    //       {...register("name", { required: true })}
    //       type="text"
    //       placeholder="Name"
    //       className="p-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    //     />
    //     <input
    //       {...register("symbol", { required: true })}
    //       type="text"
    //       placeholder="Symbol"
    //       className="p-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    //     />
    //     <input
    //       {...register("uri", { required: true })}
    //       type="text"
    //       placeholder="Uri"
    //       className="p-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    //     />
    //     <input
    //       {...register("basePrice", { required: true, valueAsNumber: true })}
    //       type="number"
    //       placeholder="Base price"
    //       className="p-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    //     />
    //     <input
    //       {...register("slope", { required: true, valueAsNumber: true })}
    //       type="number"
    //       placeholder="Slope"
    //       className="p-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    //     />
    //     <input
    //       {...register("fee", { required: true, valueAsNumber: true })}
    //       type="number"
    //       placeholder="Fee"
    //       className="p-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    //     />
    //     <button
    //       type="submit"
    //       className="p-3 rounded-md bg-blue-600 hover:bg-blue-700 font-semibold transition-colors duration-200"
    //     >
    //       Submit
    //     </button>
    //   </form>
    // </main>
  );
};

export default CreateAccount;
