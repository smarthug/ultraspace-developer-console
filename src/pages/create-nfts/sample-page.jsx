// material-ui
import { styled } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useIsConnected } from '@nice-xrpl/react-xrpl';

// project import
import MainCard from 'components/MainCard';
import { WalletBalance } from 'components/wallet-ui/wallet-balance';
import { WalletInfo } from 'components/wallet-ui/wallet-info';
import { WalletUI, CreateForm } from 'components/wallet-ui/wallet-ui-create-nfts';
import { useEffect, useState } from 'react';

// ==============================|| SAMPLE PAGE ||============================== //

const StyledDiv = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  [`& > div`]: {
    flex: 1,
    padding: theme.spacing(4),
    border: `1px solid skyblue`,
    textAlign: "center",
    [`&.one`]: {
      marginRight: theme.spacing(2)
    },
    [`&:hover`]: {
      cursor: "pointer"
    }
  }
}))

function SamplePage() {
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
      {/* <WalletUI /> */}
      <CreateForm />
      {/* <MainCard title="Sample Card">
        <Typography variant="body2">
          Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion tempos incident ut laborers et doolie magna alissa. Ut enif ad
          minim venice, quin nostrum exercitation illampu laborings nisi ut liquid ex ea commons construal. Duos aube grue dolor in
          reprehended in voltage veil esse colum doolie eu fujian bulla parian. Exceptive sin ocean cuspidate non president, sunk in culpa
          qui officiate descent molls anim id est labours.
        </Typography>
      </MainCard> */}
    </>
  );
}

export default function Main() {
  const [mode, setMode] = useState(null);

  return (
    <>
      {
        !mode ? <StyledDiv>
          <div className='one' onClick={() => setMode("one")}>
            <Typography>One by One</Typography>
          </div>
          <div className='batch'>
            <Typography>Batch(Coming soon...)</Typography>
          </div>
        </StyledDiv> : <SamplePage />
      }
    </>
  )
}
