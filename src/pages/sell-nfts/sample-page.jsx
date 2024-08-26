// material-ui
import Typography from '@mui/material/Typography';
import { useIsConnected } from '@nice-xrpl/react-xrpl';

// project import
import MainCard from 'components/MainCard';
import { WalletBalance } from 'components/wallet-ui/wallet-balance';
import { WalletInfo } from 'components/wallet-ui/wallet-info';
import { WalletUI } from 'components/wallet-ui/wallet-ui-sell-nfts';
import { useEffect } from 'react';

// ==============================|| SAMPLE PAGE ||============================== //

export default function SamplePage() {
  const isConnected = useIsConnected();
  // const seed = "sEdVkZaEQ6VBYMAeD4eeX2Vk4tgjujJ";
  console.log('isConnected', isConnected);

  useEffect(() => {
    console.log('isConnected', isConnected);
  }, [isConnected]);

  return (
    <>
      {/* <WalletInfo /> */}
      {/* <WalletBalance /> */}
      <WalletUI />
      <MainCard title="Sample Card">
        <Typography variant="body2">
          Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion tempos incident ut laborers et doolie magna alissa. Ut enif ad
          minim venice, quin nostrum exercitation illampu laborings nisi ut liquid ex ea commons construal. Duos aube grue dolor in
          reprehended in voltage veil esse colum doolie eu fujian bulla parian. Exceptive sin ocean cuspidate non president, sunk in culpa
          qui officiate descent molls anim id est labours.
        </Typography>
      </MainCard>
    </>
  );
}
