import { Suspense, useEffect, useRef, useState } from 'react';
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
import { Button, CircularProgress, iconButtonClasses, styled, TextField, Typography, typographyClasses } from '@mui/material';
import { useTokens, useGetTokens, useMintToken } from '@nice-xrpl/react-xrpl';
import { useNavigate } from 'react-router';

const StyledDiv = styled('div')(({ theme }) => ({
  border: '1px solid skyblue',
  [`& > .header`]: {
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'row',
    height: theme.spacing(5),
    backgroundColor: theme.palette.grey[300],
    [`& > .WalletRow`]: {
      marginRight: theme.spacing(1)
    },
    [`& > .wallet-info`]: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: theme.spacing(1),
      [`& > .${typographyClasses.subtitle2}`]: {
        [`&.bold`]: {
          fontWeight: 'bold',
          marginRight: theme.spacing(1)
        }
      }
    },
    [`& > .mint`]: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      [`& > .loading`]: {
        display: 'flex'
      }
    },
    [`& > .dummy`]: {
      flex: 1
    }
  },
  [`& > .content`]: {
    padding: theme.spacing(1),
    [`& > .card-token`]: {
      display: 'flex',
      flexDirection: 'row',
      border: `1px solid black`,
      marginBottom: theme.spacing(1),
      padding: theme.spacing(1),
      [`& > .info`]: {
        flex: 1
      },
      [`& > .${iconButtonClasses.root}`]: {}
    }
  }
}));

const StyledForm = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  [`& > .item`]: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: theme.spacing(1),
    alignItems: 'center',
    [`& > .${typographyClasses.root}`]: {
      width: theme.spacing(6),
      marginRight: theme.spacing(2)
    }
  }
}));

function NFTTokenCard({ id, uri }) {
  useEffect(() => {
    fetch(uri).then((res) => {
      console.log(res.json());
    });
  }, []);

  return (
    <div className="card-token">
      <div className="img" />
      <div className="info">
        <Typography>{`id: ${id}`}</Typography>
        <Typography>{`url: ${uri}`}</Typography>
      </div>
      <BurnNFT id={id} />
    </div>
  );
}

export function WalletUI() {
  const tokens = useTokens();
  return (
    <StyledDiv>
      <Suspense fallback={<div>Loading Wallet UI</div>}>
        <div className="header">
          <WalletInfo className="wallet-info" />
          <WalletBalance className="wallet-info" />
          <div className="dummy" />
          <MintNFT className="mint" />
        </div>
        <div className="content">
          {tokens.map((token) => (
            <NFTTokenCard id={token.id} uri={token.uri} />
          ))}
          <TransactionLog className="log" />
        </div>
      </Suspense>
    </StyledDiv>
  );
}

function convertFormdata2Obj(formData) {
  const object = {};
  formData.forEach((value, key) => {
    // Reflect.has in favor of: object.hasOwnProperty(key)
    if (!Reflect.has(object, key)) {
      object[key] = value;
      return;
    }
    if (!Array.isArray(object[key])) {
      object[key] = [object[key]];
    }
    object[key].push(value);
  });
  return object;
}

export function CreateForm() {
  const mintToken = useMintToken();
  const getTokens = useGetTokens();
  let navigate = useNavigate();
  const [sending, setSending] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    const _data = new FormData(e.target);
    const _objData = convertFormdata2Obj(_data);
    console.log(_objData);

    setSending(true);
    if (_objData.name === 'cybertruck') {
      const result = await mintToken(
        'https://sapphire-preferred-bison-599.mypinata.cloud/ipfs/QmQFjC8fBGepRiEbV5GFQrH38o58UPaRUHYTFgzVrHrUC4',
        1
      );
    } else {
      const result = await mintToken(
        'https://sapphire-preferred-bison-599.mypinata.cloud/ipfs/QmdDTddLPoX13zZQ6N2WuygGL3tyxC1iDkkj4BZJkPrpBs',
        1
      );
    }
    // console.log('UI: ', result);
    const tokens = await getTokens();
    console.log('UI: ', tokens);
    setSending(false);

    navigate('/sell-nfts');
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <div className="item">
        <Typography>Name</Typography>
        <TextField name="name" />
      </div>
      {/* <div className="item">
        <Typography>Price</Typography>
        <TextField />
      </div> */}
      <div className="item">
        <Typography>Assets</Typography>
        <Button>Upload</Button>
      </div>
      {sending ? (
        <div className="loading">
          <CircularProgress size={16} />
        </div>
      ) : (
        <Button type="submit">Create</Button>
      )}
    </StyledForm>
  );
}
