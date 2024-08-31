import React, { Suspense, useEffect, useRef, useState } from 'react';
import { WalletBalance } from './wallet-balance';
import { WalletInfo } from './wallet-info';
import {
  Button,
  CircularProgress,
  IconButton,
  iconButtonClasses,
  InputBase,
  inputBaseClasses,
  MenuItem,
  Select,
  styled,
  TextField,
  Typography,
  typographyClasses
} from '@mui/material';
import { useBurnToken, useCreateSellOffer, useTokens } from '@nice-xrpl/react-xrpl';
import { Search as SearchIcon } from '@mui/icons-material';
import { useBuyOffers, useGetBuyOffers, useGetSellOffers, useSellOffers } from '@nice-xrpl/react-xrpl';
import Offers from './offers';

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
    },
    [`& > .search-input`]: {
      display: 'inline-flex',
      justifyContent: 'space-between',
      height: theme.spacing(3),
      maxWidth: theme.spacing(49),
      borderRadius: 1000,
      padding: theme.spacing(0, 2, 0, 2),
      border: `1px solid black`,
      marginLeft: theme.spacing(3),
      flex: 1,
      marginRight: theme.spacing(2),
      alignItems: 'center',
      [`& > .${iconButtonClasses.root}`]: {
        width: '16px',
        height: '16px'
      },
      [`& > .${inputBaseClasses.root}`]: {
        color: 'black',
        [`& > .${inputBaseClasses.input}`]: {
          fontWeight: '500',
          fontSize: '16px',
          lineHeight: '19px',
          letterSpacing: '-0.2px'
        }
      }
    }
  },
  [`& > .content`]: {
    display: 'flex',
    flexDirection: 'row',
    padding: theme.spacing(1),
    [`& > .card-token`]: {
      display: 'flex',
      flexDirection: 'column',
      border: `1px solid black`,
      marginBottom: theme.spacing(1),
      marginRight: theme.spacing(1),

      width: '200px',
      height: "270px",
      maxHeight: '300px',
      overflow: 'hidden auto',
      scrollbarWidth: "none",
      [`& > .img`]: {
        width: '100%',
        minHeight: '150px'
      },
      [`& > .info`]: {
        flex: 1,
        width: '100%',
        padding: theme.spacing(1),
        [`& > .${typographyClasses.root}`]: {
          width: '100%',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis'
        },
        [`& > .sell-wrapper`]: {
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          marginBottom: theme.spacing(1),
          [`& > .input`]: {
            width: '90px'
          }
        },
        [`& > .actions`]: {
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between'
        }
      },
      [`& .offers`]: {
        display: 'flex',
        flexDirection: 'column'
      },
      [`& > .${iconButtonClasses.root}`]: {}
    }
  }
}));

function ShowOffers({ id }: { id: string }) {
  const buyOffers = useBuyOffers(id);
  const sellOffers = useSellOffers(id);

  console.log(buyOffers, sellOffers);

  if (buyOffers?.length || sellOffers?.length) {
    return <Offers buyOffers={buyOffers} sellOffers={sellOffers} />;
  }

  return null;
}

function NFTTokenCard({ id, uri }) {
  const [info, setInfo] = useState(null);
  const createSellOffer = useCreateSellOffer();
  const burnToken = useBurnToken();
  const priceRef = useRef(null);
  const [buyLoading, setBuyLoading] = useState(false);
  const [sellLoading, setSellLoading] = useState(false);
  const [nftId, setNftId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [priceLoading, setPriceLoading] = useState(false);

  const getBuyOffers = useGetBuyOffers();
  const getSellOffers = useGetSellOffers();

  async function handleOnClickDelete(e) {
    setDeleteLoading(true);
    const result = await burnToken(id);
    setDeleteLoading(false);
    window.location.reload();
  }

  async function handleClickSell() {
    setPriceLoading(true);
    try {
      let options: { destination?: string } = {
        destination: undefined
      };
      console.log(id);
      const tokenId = id;
      const amount = priceRef.current.value;
      const result = await createSellOffer(tokenId, amount, options);

      console.log('UI: ', result);
    } catch (err) {
      console.log('ERROR: ', err);
    } finally {
      setPriceLoading(false);
    }
  }
  useEffect(() => {
    fetch(uri)
      .then((res) => res.json())
      .then((res) => {
        setInfo(res);
      });
  }, []);

  return (
    <div className="card-token">
      {!!info?.image && (
        <div className="img" style={{ background: `url(${info?.image})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} />
      )}
      <div className="info">
        <Typography style={{ marginBottom: '8px' }}>{`Name: ${info?.name}`}</Typography>

        <div className="sell-wrapper">
          <TextField inputRef={priceRef} placeholder="price" className="input" size="small" />
          <Button variant="contained" size="small" onClick={handleClickSell}>
            {priceLoading ? 'loading' : 'Sell'}
          </Button>
        </div>

        <div className="actions">
          <Button
            variant="contained"
            size="small"
            onClick={async () => {
              if (buyLoading || sellLoading) {
                return;
              }
              if (!!nftId) {
                setNftId(null);
                return;
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
            {buyLoading || sellLoading ? 'loading' : !nftId ? 'View Offers' : 'hide'}
          </Button>
          {deleteLoading ? (
            <CircularProgress color="error" />
          ) : (
            <Button onClick={handleOnClickDelete} style={{ marginLeft: '8px' }} size="small" color="error" variant="contained">
              Delete
            </Button>
          )}
        </div>
        {nftId ? <ShowOffers id={nftId} /> : null}
      </div>
    </div>
  );
}
const sortinOptions = ['name', 'price'];

export function WalletUI() {
  const tokens = useTokens();

  return (
    <StyledDiv>
      <Suspense fallback={<div>Loading Wallet UI</div>}>
        <div className="header">
          <WalletInfo className="wallet-info" />
          <WalletBalance className="wallet-info" />
          <div className="dummy" />
          <Select
            name="properties"
            size="small"
            className="select-item"
            // data-idx={idx}
            defaultValue={'name'}
            // disabled={!edit}
          >
            {sortinOptions.map((p, idx) => {
              return (
                <MenuItem key={idx} value={p}>
                  {p}
                </MenuItem>
              );
            })}
          </Select>
          <div className="search-input">
            <InputBase placeholder="검색" inputProps={{ 'aria-label': 'Find Job, ilhada' }} />
            <IconButton size="small" className="search" aria-label="search" type="submit">
              <SearchIcon />
            </IconButton>
          </div>
        </div>
        <div className="content">
          {tokens.map((token) => (
            <NFTTokenCard key={token.id} id={token.id} uri={token.uri} />
          ))}
        </div>
      </Suspense>
    </StyledDiv>
  );
}
