import { Typography } from '@mui/material';
import { Offer } from '@nice-xrpl/react-xrpl';

type OffersProps = {
  buyOffers?: Offer[];
  sellOffers?: Offer[];
};

export default function Offers(
  { buyOffers, sellOffers }: OffersProps = {
    buyOffers: [],
    sellOffers: []
  }
) {
  return (
    <div className="offers">
      {/* <div>Buy Offers</div>
            {buyOffers?.length ? (
                <>
                    {buyOffers.map((offer) => {
                        return (
                            <div key={offer.index}>
                                Offer Index <code>{offer.index}</code> for offer
                                amount {offer.amount}
                            </div>
                        );
                    })}
                </>
            ) : (
                <div>No buy offers</div>
            )} */}
      <div>Sell Offers</div>
      {sellOffers?.length ? (
        <>
          {sellOffers.map((offer) => {
            return (
              <div key={offer.index}>
                Offer Index <Typography style={{ overflow: 'hidden', width: '100%', textOverflow: 'ellipsis' }}>{offer.index}</Typography>{' '}
                for offer amount {offer.amount}
              </div>
            );
          })}
        </>
      ) : (
        <div>No sell offers</div>
      )}
    </div>
  );
}
