import { useState } from 'react';
import { useBuyOffers, useGetBuyOffers, useGetSellOffers, useSellOffers } from '@nice-xrpl/react-xrpl';
import Offers from './offers';
import { Button } from '@mui/material';

function ShowOffers({ id }: { id: string }) {
  const buyOffers = useBuyOffers(id);
  const sellOffers = useSellOffers(id);

  console.log(buyOffers, sellOffers);

  if (buyOffers?.length || sellOffers?.length) {
    return <Offers buyOffers={buyOffers} sellOffers={sellOffers} />;
  }

  return null;
}

export default function OffersById({ id }) {
  const [buyLoading, setBuyLoading] = useState(false);
  const [sellLoading, setSellLoading] = useState(false);
  // const [inputNftId, setInputNftId] = useState('');
  const [nftId, setNftId] = useState(null);

  const getBuyOffers = useGetBuyOffers();
  const getSellOffers = useGetSellOffers();

  return (
    <>
      {/* Offers for NFT ID:{' '}
            <input
                type="text"
                value={inputNftId}
                onChange={(e) => setInputNftId(e.target.value)}
            />{' '} */}
      <Button
        variant="contained"
        size="small"
        onClick={async () => {
          if (buyLoading || sellLoading) {
            return;
          }
          if (!!nftId) {
            setNftId(null)
            return
          }

          setBuyLoading(true);
          setSellLoading(true);

          try {
            await getBuyOffers(id);
          } catch (e) {
            console.log(e);
          } finally {
            setBuyLoading(false);
          }

          try {
            await getSellOffers(id);
          } catch (e) {
            console.log(e);
          } finally {
            setSellLoading(false);
          }

          setNftId(id);
        }}
      >
        {buyLoading || sellLoading ? 'loading' : !nftId ? 'View Offers' : "hide"}
      </Button>
      {nftId ? <ShowOffers id={nftId} /> : null}
    </>
  );
}
