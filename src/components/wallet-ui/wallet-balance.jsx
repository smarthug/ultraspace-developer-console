import { Typography } from "@mui/material";
import { useBalance } from "@nice-xrpl/react-xrpl";


let tmp = 0

export function WalletBalance({className}) {
  // The useBalance hook gives you the balance of a wallet
  // This is a request hook, so it can be used with
  // a wallet or a wallet address.
  const balance = useBalance();
  console.log("balance", balance);

  if (balance > 0) {
    tmp = balance
  }

  return (
    <div className={className}>
      <Typography className="bold" variant="subtitle2">
        Balance:
      </Typography>
      <Typography variant="subtitle2">
        {`${tmp} xrp`}
      </Typography>
    </div>
  );
}
