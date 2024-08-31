import { useState } from 'react';
import { useBurnToken, useGetTokens } from '@nice-xrpl/react-xrpl';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';

// export function BurnNFT({id}) {
//     const burnToken = useBurnToken();
//     const getTokens = useGetTokens();
//     const [id, setId] = useState('');
//     const [sending, setSending] = useState(false);

//     return (
//         <div>
//             Burn an NFT by ID:{' '}
//             <input value={id} onChange={(e) => setId(e.currentTarget.value)} />{' '}
//             -{' '}
//             {sending ? (
//                 'Waiting for response...'
//             ) : (
//                 <button
//                     onClick={async () => {
//                         setSending(true);
//                         const result = await burnToken(id);
//                         console.log('UI: ', result);
//                         const tokens = await getTokens();
//                         console.log('UI: ', tokens);
//                         setSending(false);
//                         setId('');
//                     }}
//                 >
//                     Send
//                 </button>
//             )}
//         </div>
//     );
// }

export function BurnNFT({ id }) {
  const burnToken = useBurnToken();
  const getTokens = useGetTokens();
  const [sending, setSending] = useState(false);

  async function handleOnClick(e) {
    setSending(true);
    const result = await burnToken(id);
    setSending(false);
  }

  return (
    <>
      {!sending ? (
        <IconButton onClick={handleOnClick}>
          <DeleteIcon />
        </IconButton>
      ) : (
        <CircularProgress />
      )}
    </>
  );
}
