import { ModeToggle } from "@/components/mode-toggle";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

const Navbar = () => {
  return (
    <nav>
      <div className="navbar">
        <h2>Friendtech</h2>
        <div className="flex gap-2 items-center">
          <WalletMultiButton />
          <WalletDisconnectButton />
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
