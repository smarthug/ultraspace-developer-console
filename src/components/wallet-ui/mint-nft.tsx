import { useState } from 'react';
import { useGetTokens, useMintToken } from '@nice-xrpl/react-xrpl';
import { CircularProgress } from '@mui/material';

export function MintNFT({ className }) {
  const mintToken = useMintToken();
  const getTokens = useGetTokens();
  const [url, setUrl] = useState('');
  const [sending, setSending] = useState(false);

  return (
    <div className={className}>
      Mint an NFT with data: <input value={url} onChange={(e) => setUrl(e.currentTarget.value)} /> -{' '}
      {sending ? (
        <div className="loading">
          <CircularProgress size={16} />
        </div>
      ) : (
        <button
          onClick={async () => {
            setSending(true);
            const result = await mintToken(url, 1);
            console.log('UI: ', result);
            const tokens = await getTokens();
            console.log('UI: ', tokens);
            setSending(false);
            setUrl('');
          }}
        >
          Send
        </button>
      )}
    </div>
  );
}
