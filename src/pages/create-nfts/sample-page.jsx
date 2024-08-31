// material-ui
import { styled } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useIsConnected } from '@nice-xrpl/react-xrpl';

import { CreateForm } from 'components/wallet-ui/wallet-ui-create-nfts';
import React, { useEffect, useState } from 'react';

// ==============================|| SAMPLE PAGE ||============================== //

const StyledDiv = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  [`& > div`]: {
    flex: 1,
    padding: theme.spacing(4),
    border: `1px solid skyblue`,
    textAlign: 'center',
    [`&.one`]: {
      marginRight: theme.spacing(2)
    },
    [`&:hover`]: {
      cursor: 'pointer'
    }
  }
}));

function SamplePage() {
  const isConnected = useIsConnected();
  // const seed = "sEdVkZaEQ6VBYMAeD4eeX2Vk4tgjujJ";
  console.log('isConnected', isConnected);

  useEffect(() => {
    console.log('isConnected', isConnected);
  }, [isConnected]);

  return (
    <>
      <CreateForm />
    </>
  );
}

export default function Main() {
  const [mode, setMode] = useState(null);

  return (
    <>
      {!mode ? (
        <StyledDiv>
          <div className="one" onClick={() => setMode('one')}>
            <Typography>One by One</Typography>
          </div>
          <div className="batch">
            <Typography>Batch(Coming soon...)</Typography>
          </div>
        </StyledDiv>
      ) : (
        <SamplePage />
      )}
    </>
  );
}
