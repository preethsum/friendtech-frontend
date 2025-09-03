import { Connection, PublicKey, SystemProgram } from "@solana/web3.js";
import { Program, AnchorProvider, BN } from "@coral-xyz/anchor";
import { type FriendTech, idl } from "../idl/friendtech";
import {
  getAssociatedTokenAddressSync,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAccount,
  type Account,
} from "@solana/spl-token";
import { Metaplex } from "@metaplex-foundation/js";
import { SYSTEM_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/native/system";

export interface SDKConfig {
  connection: Connection;
  wallet: any;
  programId: PublicKey;
  tokenProgram: PublicKey;
}

export interface TransactionResult {
  signature: string;
  success: boolean;
  error?: string;
}

export interface CreatorAccount {
  creator: PublicKey;
  name: string;
  basePrice: BN;
  slope: BN;
  fee: number;
  key?: PublicKey;
  keyBump: number;
  vaultBump: number;
  supply?: number;
  bump: number;
}

export class FriendTechSDK {
  private connection: Connection;
  private wallet: any;
  private program: Program<FriendTech>;
  private provider: AnchorProvider;
  private tokenProgram: PublicKey;

  constructor(config: SDKConfig) {
    this.connection = config.connection;
    this.wallet = config.wallet;
    this.tokenProgram = config.tokenProgram;
    // Create provider
    this.provider = new AnchorProvider(
      this.connection,
      this.wallet,
      AnchorProvider.defaultOptions()
    );

    // Initialize program
    this.program = new Program(idl, this.provider);
  }

  getPDAs(creatorPublicKey: PublicKey) {
    const [creatorAccount] = PublicKey.findProgramAddressSync(
      [Buffer.from("creator_account"), creatorPublicKey.toBytes()],
      this.program.programId
    );

    const [vault] = PublicKey.findProgramAddressSync(
      [Buffer.from("vault"), creatorAccount.toBytes()],
      this.program.programId
    );

    const [key] = PublicKey.findProgramAddressSync(
      [Buffer.from("key"), creatorAccount.toBytes()],
      this.program.programId
    );

    return { creatorAccount, vault, key };
  }

  async createCreatorAccount(params: {
    name: string;
    symbol: string;
    uri: string;
    basePrice: number;
    slope: number;
    fee: number;
  }): Promise<TransactionResult> {
    try {
      if (!this.wallet.publicKey) {
        throw new Error("Wallet not connected");
      }

      const { creatorAccount, vault, key } = this.getPDAs(
        this.wallet.publicKey
      );

      const signature = await this.program.methods
        .initialize(
          params.name,
          params.symbol,
          params.uri,
          new BN(params.basePrice),
          new BN(params.slope),
          params.fee
        )
        .accountsPartial({
          creator: this.wallet.publicKey,
          creatorAccount,
          key,
          vault,
          tokenProgram: this.tokenProgram,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      return {
        signature,
        success: true,
      };
    } catch (error) {
      console.error("Create creator account error:", error);
      return {
        signature: "",
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  async buyKey(params: {
    creatorPublicKey: PublicKey;
    amount: number;
  }): Promise<TransactionResult> {
    try {
      if (!this.wallet.publicKey) {
        throw new Error("Wallet not connected");
      }

      const { creatorAccount, vault, key } = this.getPDAs(
        params.creatorPublicKey
      );

      const buyerAta = getAssociatedTokenAddressSync(
        key,
        this.wallet.publicKey,
        true,
        undefined,
        ASSOCIATED_TOKEN_PROGRAM_ID
      );

      const signature = await this.program.methods
        .buyKeys(new BN(params.amount))
        .accountsPartial({
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          buyer: this.wallet.publicKey,
          buyerKeyAta: buyerAta,
          creatorAccount: creatorAccount,
          key,
          systemProgram: SYSTEM_PROGRAM_ID,
          tokenProgram: this.tokenProgram,
          vault,
        })
        .rpc();

      return {
        signature,
        success: true,
      };
    } catch (error) {
      console.error("Buy key error:", error);
      return {
        signature: "",
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  async sellKeys(params: {
    creatorPublicKey: PublicKey;
    amount: number;
  }): Promise<TransactionResult> {
    try {
      if (!this.wallet.publicKey) {
        throw new Error("Wallet not connected");
      }

      const { creatorAccount, vault, key } = this.getPDAs(
        params.creatorPublicKey
      );

      const sellerAta = getAssociatedTokenAddressSync(
        key,
        this.wallet.publicKey,
        true,
        undefined,
        ASSOCIATED_TOKEN_PROGRAM_ID
      );

      const signature = await this.program.methods
        .sellKeys(new BN(params.amount))
        .accountsPartial({
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          seller: this.wallet.publicKey,
          sellerKeyAta: sellerAta,
          creatorAccount: creatorAccount,
          key,
          systemProgram: SYSTEM_PROGRAM_ID,
          tokenProgram: this.tokenProgram,
          vault,
        })
        .rpc();

      return {
        signature,
        success: true,
      };
    } catch (error) {
      console.error("Buy key error:", error);
      return {
        signature: "",
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
  async getMetadataAccount(mintKey: PublicKey) {
    // Calculate the metadata account PDA
    const metaplex = Metaplex.make(this.connection);
    const metadataAccount = metaplex.nfts().pdas().metadata({ mint: mintKey });
    const metadataAccountInfo = await this.connection.getAccountInfo(
      metadataAccount
    );
    if (metadataAccountInfo) {
      const token = await metaplex.nfts().findByMint({ mintAddress: mintKey });
      return token;
    }
  }

  async withdrawFee(): Promise<TransactionResult> {
    try {
      if (!this.wallet.publicKey) {
        throw new Error("Wallet not connected");
      }

      const { creatorAccount, vault, key } = this.getPDAs(
        this.wallet.publicKey
      );

      const signature = await this.program.methods
        .withdrawFee()
        .accountsPartial({
          creator: this.wallet.publicKey,
          creatorAccount: creatorAccount,
          key: key,
          vault: vault,
          tokenProgram: this.tokenProgram,
          systemProgram: SYSTEM_PROGRAM_ID,
        })
        .rpc();

      return {
        signature,
        success: true,
      };
    } catch (error) {
      console.error("Buy key error:", error);
      return {
        signature: "",
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  async getCreatorAccount(
    creatorPublicKey: PublicKey
  ): Promise<CreatorAccount | null> {
    try {
      const { creatorAccount, key } = this.getPDAs(creatorPublicKey);
      const account = await this.program.account.creatorAccount.fetch(
        creatorAccount
      );

      return {
        creator: account.creator,
        name: account.name,
        basePrice: account.basePrice,
        slope: account.slope,
        fee: account.fee,
        key,
        keyBump: account.keyBump,
        vaultBump: account.vaultBump,
        bump: account.bump,
      };
    } catch (error) {
      console.error("Get creator account error:", error);
      return null;
    }
  }

  async getAllCreatorAccounts(): Promise<
    (CreatorAccount & { publicKey: PublicKey })[]
  > {
    try {
      const accounts = await this.program.account.creatorAccount.all();

      return accounts.map((account) => {
        return {
          publicKey: account.publicKey,
          creator: account.account.creator,
          name: account.account.name,
          basePrice: account.account.basePrice,
          slope: account.account.slope,
          fee: account.account.fee,
          keyBump: account.account.keyBump,
          vaultBump: account.account.vaultBump,
          bump: account.account.bump,
        };
      });
    } catch (error) {
      console.error("Get all creator accounts error:", error);
      return [];
    }
  }

  async getKeyMint(key: PublicKey): Promise<Account | null> {
    try {
      const account = await getAccount(this.connection, key);
      return account;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async calculateKeyPrice(
    creatorPublicKey: PublicKey,
    amount: number,
    isBuying: boolean
  ): Promise<number> {
    try {
      const creatorAccount = await this.getCreatorAccount(creatorPublicKey);
      if (!creatorAccount) {
        throw new Error("Creator account not found");
      }

      const basePrice = creatorAccount.basePrice.toNumber();
      const slope = creatorAccount.slope.toNumber();

      const price = basePrice + slope * amount;

      return isBuying ? price : price * 0.9; // 10% fee for selling
    } catch (error) {
      console.error("Calculate key price error:", error);
      return 0;
    }
  }
}
