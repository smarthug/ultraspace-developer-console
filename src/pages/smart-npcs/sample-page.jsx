// material-ui
import { Button, Card, MenuItem, Select, styled, TextField } from '@mui/material';
import Typography, { typographyClasses } from '@mui/material/Typography';
import { nanoid } from 'nanoid';

// project import
// import MainCard from 'components/MainCard';
import { useEffect, useState } from 'react';

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: theme.spacing(2),
  padding: theme.spacing(3),
  [`& > div`]: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(2),
    [`& > .${typographyClasses.root}`]: {
      marginBottom: theme.spacing(1)
    }
  },
  [`& > .header`]: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  [`& > .history`]: {
    // flexDirection: 'column',
    [`& > textarea`]: {
      resize: 'vertical'
    }
  },
  [`& > .properties`]: {
    // flexDirection: 'column'
    [`& > .header`]: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      [`& > .dummy`]: {
        flex: 1
      },
      // justifyContent: 'space-between',
      marginBottom: theme.spacing(1)
    },
    [`& > .select-item`]: {
      marginBottom: theme.spacing(1)
    }
  },
  [`& > .actions`]: {
    width: '100%',
    justifyContent: 'flex-end',
    marginBottom: 'unset'
    // [`& > .${buttonBaseClasses.root}`]: {
    //   width: 'fit-content',
    // }
  }
}));

const StyledActions = styled('div')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(2)
}));

// ==============================|| SAMPLE PAGE ||============================== //

const properties = ['normal', 'smart', 'lazy', 'weak', 'goodLooking', 'goodSleeper'];

function CardItem({ info, onDelete, onAddProperties, onDeleteProperties }) {
  const [edit, setEdit] = useState(false);

  function handleEdit() {
    setEdit((prev) => !prev);
  }

  function handleDelete() {
    onDelete(info.id);
  }

  function handleAdd() {
    onAddProperties(info.name);
  }

  function handleDeleteProperties() {
    onDeleteProperties(info.name);
  }

  return (
    <StyledCard>
      <div className="header">
        {edit ? <TextField defaultValue={info.name} /> : <Typography>{info.name}</Typography>}
        <Button onClick={handleEdit}>{edit ? 'Save' : 'Edit'}</Button>
      </div>
      <div className="history">
        <Typography>History</Typography>
        <textarea defaultValue={info.history} disabled={!edit} />
      </div>
      <div className="properties">
        <div className="header">
          <Typography>Properties</Typography>
          <div className="dummy" />
          <Button disabled={!edit} onClick={handleAdd}>
            Add
          </Button>
          <Button disabled={!edit} onClick={handleDeleteProperties}>
            Delete
          </Button>
        </div>
        {info.properties.map((v, idx) => (
          <Select key={idx} className="select-item" defaultValue={v} disabled={!edit}>
            {properties.map((v, idx) => (
              <MenuItem key={idx} value={v}>
                {v}
              </MenuItem>
            ))}
          </Select>
        ))}
      </div>
      <div className="actions">
        <Button onClick={handleDelete}>Delete</Button>
      </div>
    </StyledCard>
  );
}

export default function SamplePage() {
  const [npcs, setNpcs] = useState([]);

  function handleCreate() {
    setNpcs((prev) => {
      prev.push({ history: '', properties: ['normal'], name: `SmartNpc`, id: nanoid() });
      return [...prev];
    });
  }

  function handleDelete(id) {
    setNpcs((prev) => {
      const _idx = prev.findIndex((v) => v.id === id);
      console.log(_idx);
      prev.splice(_idx, 1);
      return [...prev];
    });
  }

  function handleAddProperties(name) {
    setNpcs((prev) => {
      prev.map((v) => v.name === name && v.properties.push('normal'));

      return [...prev];
    });
  }

  function handleDeleteProperties(name) {
    setNpcs((prev) => {
      prev.map((v) => v.name === name && v.properties.pop());

      return [...prev];
    });
  }

  useEffect(() => {
    setNpcs((prev) => {
      prev.push({ history: 'test', properties: ['normal'], name: 'SmartNpc', id: nanoid() });
      return [...prev];
    });
  }, []);

  return (
    <>
      {npcs.map((v, idx) => (
        <CardItem
          info={v}
          key={idx}
          onDelete={handleDelete}
          onAddProperties={handleAddProperties}
          onDeleteProperties={handleDeleteProperties}
        />
      ))}
      <StyledActions>
        <Button onClick={handleCreate}>Create</Button>
      </StyledActions>
    </>
  );
}
