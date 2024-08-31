import { Typography } from "@mui/material";
import { useWalletAddress } from "@nice-xrpl/react-xrpl";

export function WalletInfo({ className }) {
  // The useWalletAddress hook gives you the address
  // of the wallet used up in the tree.
  const address = useWalletAddress();

  // return <div className="WalletRow">Address: {address}</div>;
  return (
    <div className={className}>
      <Typography className="bold" variant="subtitle2">
        Address:
      </Typography>
      <Typography variant="subtitle2">
        {address}
      </Typography>
    </div>
  );
}
