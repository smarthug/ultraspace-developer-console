// material-ui
import { Button, Card, Checkbox, FormControlLabel, FormGroup, styled, TextField, Typography } from '@mui/material';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: theme.spacing(2),
  padding: theme.spacing(3),
  [`& > div`]: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(2)
  },
  [`& > .header`]: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    [`& > .dummy`]: {
      flex: 1
    }
  },
  [`& > .history`]: {
    [`& > textarea`]: {
      resize: 'vertical'
    }
  },
  [`& > .properties`]: {
    [`& > .header`]: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      [`& > .dummy`]: {
        flex: 1
      },
      marginBottom: theme.spacing(1)
    },
    [`& > .select-item`]: {
      marginBottom: theme.spacing(1)
    },
    [`& > .content`]: {
      display: 'flex',
      flexDirection: 'row',
      [`& > .props-checkbox`]: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
      }
    }
  },
  [`& > .actions`]: {
    width: '100%',
    justifyContent: 'flex-end',
    marginBottom: 'unset'
  }
}));

const StyledActions = styled('div')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(2)
}));

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

  function handleEdit(e) {
    e.preventDefault();
    setEdit(true);
  }

  function handleDelete() {
    onDelete(info.id);
  }

  function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    const _data = new FormData(e.target);
    const _objData = convertFormdata2Obj(_data);
    console.log(_objData);
    const _properties = [];
    for (const [key, value] of Object.entries(_objData)) {
      if (key === 'name' || key === 'history') {
        continue;
      }
      if (value === 'on') {
        _properties.push(key);
      }
    }

    if (typeof _objData['properties'] === 'string') {
      _objData['properties'] = [_objData['properties']];
    }
    let newobj = {
      name: _objData['name'],
      history: _objData['history'],
      properties: _properties
    };
    onChange(info.id, newobj);
    setEdit(false);
  }

  return (
    <StyledCard onSubmit={handleSubmit} component="form">
      <div className="header">
        {edit ? <TextField label="name" name="name" defaultValue={info.name} /> : <Typography>{`Name: ${info.name}`}</Typography>}
        <div className="dummy" />
        {!edit && <Button onClick={handleDelete}>Delete</Button>}
        {edit ? <Button type="submit">Done</Button> : <Button onClick={handleEdit}>Edit</Button>}
      </div>
      <div className="history">
        <Typography style={{ marginBottom: '8px' }}>History</Typography>
        <textarea name="history" defaultValue={info.history} disabled={!edit} />
      </div>
      <div className="properties">
        <div className="header">
          <Typography>Properties</Typography>
        </div>
        <div className="content">
          <FormGroup row name="properties">
            {properties.map((v, idx) => (
              <FormControlLabel
                key={idx}
                name={v}
                disabled={!edit}
                control={<Checkbox defaultChecked={!!info.properties.find((p) => p === v)} />}
                label={v}
              />
            ))}
          </FormGroup>
        </div>
      </div>
    </StyledCard>
  );
}

// config smartNpcs
export default function SamplePage() {
  const [npcs, setNpcs] = useState([]);
  // create smartNpc instance
  function handleCreate() {
    setNpcs((prev) => {
      prev.push({ history: '', properties: [''], name: `SmartNpc`, id: nanoid() });
      return [...prev];
    });
  }
  // delete smartNpc instance
  function handleDelete(id) {
    setNpcs((prev) => {
      const _idx = prev.findIndex((v) => v.id === id);
      prev.splice(_idx, 1);
      return [...prev];
    });
  }
  // edit smartNpc instance
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
      prev.push({ history: '', properties: [''], name: 'SmartNpc', id: nanoid() });
      return [...prev];
    });
  }, []);

  return (
    <>
      {npcs.map((v, idx) => (
        <CardItem info={v} key={idx} onDelete={handleDelete} onChange={handleChangeValue} />
      ))}
      <StyledActions>
        <Button variant="contained" style={{ marginRight: '8px' }} onClick={handleCreate}>
          Create New
        </Button>
        <Button variant="contained">Commit</Button>
      </StyledActions>
    </>
  );
}
