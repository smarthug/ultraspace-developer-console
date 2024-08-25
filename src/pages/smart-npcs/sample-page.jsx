// material-ui
import { Button, Card, MenuItem, Select, styled, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';

// project import
// import MainCard from 'components/MainCard';
import { useEffect, useState } from 'react';

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: theme.spacing(2),
  padding: theme.spacing(3),
  [`& > .header`]: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
  },
  [`& > textarea`]: {
    resize: 'vertical'
  }
}));

const StyledActions = styled('div')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(2)
}));

// ==============================|| SAMPLE PAGE ||============================== //

const properties = ['smart', 'lazy', 'weak', 'goodLooking', 'goodSleeper'];

function CardItem({ info, onDelete }) {
  const [edit, setEdit] = useState(false);
  // const [propsNum, setPropsNum] = useState(1);

  function handleEdit() {
    setEdit((prev) => !prev);
  }

  function handleDelete() {
    onDelete(info.id);
  }

  return (
    <StyledCard>
      <div className="header">
        {edit ? <TextField defaultValue={info.name} /> : <Typography>{info.name}</Typography>}
        <Button onClick={handleEdit}>{edit ? 'Save' : 'Edit'}</Button>
      </div>
      <Typography>History</Typography>
      <textarea defaultValue={info.history} disabled={!edit} />
      <Typography>Properties</Typography>
      <Select defaultValue={0}>
        {properties.map((v, idx) => (
          <MenuItem key={v} value={idx}>
            {v}
          </MenuItem>
        ))}
      </Select>
      <Button onClick={handleDelete}>Delete</Button>
    </StyledCard>
  );
}

export default function SamplePage() {
  console.log('atas');
  const [npcs, setNpcs] = useState([]);

  function handleCreate() {
    setNpcs((prev) => {
      prev.push({ history: '', properties: [], name: `SmartNpc${prev.length + 1}` });
      return [...prev];
    });
  }

  function handleDelete(id) {
    setNpcs((prev) => {
      const _idx = prev.findIndex((v) => v.id === id);
      prev.splice(0, _idx);
      return [...prev];
    });
  }

  useEffect(() => {
    setNpcs((prev) => {
      prev.push({ history: 'test', properties: ['greed', 'smart'], name: 'SmartNpc1' });
      return [...prev];
    });
  }, []);
  console.log(npcs);
  return (
    <>
      {npcs.map((v, idx) => (
        <CardItem info={v} key={idx} onDelete={handleDelete} />
      ))}
      <StyledActions>
        <Button onClick={handleCreate}>Create</Button>
      </StyledActions>
    </>
  );
}
