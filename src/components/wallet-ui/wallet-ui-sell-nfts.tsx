import { Suspense } from 'react';
import { AcceptBrokerOffer } from './accept-brokered-offer';
import { AcceptBuyOffer } from './accept-buy-nft';
import { AcceptSellOffer } from './accept-sell-nft';
import { BurnNFT } from './burn-nft';
import { BuyNFT } from './buy-nft';
import { CreateTrustline } from './create-trustline';
import { CurrencyBalance } from './currency-balance';
import { MintNFT } from './mint-nft';
import OffersById from './offers-by-id';
import { SellNFT } from './sell-nft';
import { SendCurrency } from './send-currency';
import { SendXRP } from './send-xrp';
import { ShowNFT } from './show-nft';
import { TransactionLog } from './transaction-log';
import { WalletBalance } from './wallet-balance';
import { WalletInfo } from './wallet-info';
import { styled } from '@mui/material';

const StyledDiv = styled("div")(({ theme }) => ({
    border: '1px solid skyblue',
    margin: '10px',
    padding: '5px',
    [`& > div`]: {
        marginBottom: theme.spacing(1)
    }
}))

export function WalletUI() {
    return (
        <StyledDiv>
            <WalletInfo />
            <Suspense fallback={<div>Loading Wallet UI</div>}>
                <WalletBalance />
                <CurrencyBalance />
                
                
                {/* <SendCurrency /> */}
            
                <ShowNFT />
                {/* <BuyNFT /> */}
                <SellNFT />
                <OffersById />
                {/* <AcceptBuyOffer /> */}
                {/* <AcceptSellOffer /> */}
                {/* <AcceptBrokerOffer /> */}
                <TransactionLog />
            </Suspense>
        </StyledDiv>
    );
}
