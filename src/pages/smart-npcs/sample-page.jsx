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

function CardItem({ info, onDelete, onChange }) {
  const [edit, setEdit] = useState(false);
  const [props, setProps] = useState([...info.properties]);

  function handleEdit(e) {
    e.preventDefault();
    setEdit(true);
  }

  function handleDelete() {
    onDelete(info.id);
  }

  function handleAdd() {
    setProps((prev) => {
      prev.push('');
      return [...prev];
    });
  }

  function handleDeleteProperties() {
    setProps((prev) => {
      prev.pop();
      return [...prev];
    });
  }

  function handleChangeProperties(e, idx) {
    setProps((prev) => {
      prev[idx] = e.target.value;
      return [...prev];
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    const _data = new FormData(e.target);
    const _objData = convertFormdata2Obj(_data);
    if (typeof _objData['properties'] === 'string') {
      _objData['properties'] = [_objData['properties']];
    }
    onChange(info.id, _objData);
    setEdit(false);
  }

  return (
    <StyledCard onSubmit={handleSubmit} component="form">
      <div className="header">
        {edit ? <TextField name="name" defaultValue={info.name} /> : <Typography>{info.name}</Typography>}
        {edit ? <Button type="submit">Save</Button> : <Button onClick={handleEdit}>Edit</Button>}
      </div>
      <div className="history">
        <Typography>History</Typography>
        <textarea name="history" defaultValue={info.history} disabled={!edit} />
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
        {props.map((v, idx) => (
          <Select
            name="properties"
            key={idx}
            className="select-item"
            // data-idx={idx}
            onChange={(e) => handleChangeProperties(e, idx)}
            value={v}
            disabled={!edit}
          >
            {properties.map((p, idx) => {
              return (
                <MenuItem key={idx} value={p} disabled={!!props.find((v) => v === p)}>
                  {p}
                </MenuItem>
              );
            })}
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
      prev.splice(_idx, 1);
      return [...prev];
    });
  }

  // function handleAddProperties(id) {
  //   setNpcs((prev) => {
  //     prev.map((v) => v.id === id && v.properties.push(''));

  //     return [...prev];
  //   });
  // }

  // function handleDeleteProperties(id) {
  //   setNpcs((prev) => {
  //     prev.map((v) => v.id === id && v.properties.pop());

  //     return [...prev];
  //   });
  // }

  function handleChangeValue(id, data) {
    setNpcs((prev) => {
      return [
        ...prev.map((v) => {
          if (v.id === id) {
            return { id: v.id, ...data };
          }
          return v;
        })
      ];
    });
  }

  useEffect(() => {
    setNpcs((prev) => {
      prev.push({ history: 'test', properties: [''], name: 'SmartNpc', id: nanoid() });
      return [...prev];
    });
  }, []);

  return (
    <>
      {npcs.map((v, idx) => (
        <CardItem info={v} key={idx} onDelete={handleDelete} onChange={handleChangeValue} />
      ))}
      <StyledActions>
        <Button onClick={handleCreate}>Create</Button>
        <Button>Upload</Button>
      </StyledActions>
    </>
  );
}
