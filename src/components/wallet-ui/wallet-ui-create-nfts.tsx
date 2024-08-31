import React, { useState } from 'react';
import { Button, CircularProgress, styled, TextField, Typography, typographyClasses } from '@mui/material';
import { useGetTokens, useMintToken } from '@nice-xrpl/react-xrpl';
import { useNavigate } from 'react-router';

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
  
  // create nft
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
