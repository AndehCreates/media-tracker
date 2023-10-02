// EditDialog.js

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Switch,
  FormControlLabel,
  FormGroup,
  Box,
} from '@mui/material';

const EditDialog = ({ openDialog, editShow, onSave, onClose }) => {
  const [editedItem, setEditedItem] = useState(editShow);
  const id = editShow.id;
  // console.log('triggered edit');
  // const [editedShow, setEditedShow] = useState(show);

  const handleChange = (field) => (event) => {
    setEditedItem({
      ...editedItem,
      [field]: event.target.value,
    });
    console.log(editedItem);
  };

  const handleSwitch = (field) => {
    setEditedItem({ ...editedItem, [field]: !editedItem[field] });
    console.log(editedItem);
  };

  const handleSave = () => {
    const record = {
      id: editedItem.id,
      CurrentSeason: parseInt(editedItem.CurrentSeason),
      CurrentEpisode: parseInt(editedItem.CurrentEpisode),
      AvailableSeason: parseInt(editedItem.AvailableSeason),
      AvailableEpisode: parseInt(editedItem.AvailableEpisode),
      ...editedItem,
    };
    onSave(record);
    // const { id, ...fields } = editedItem;
    console.log('saved:');
    console.log(record);
    // console.log(id, fields);
    // onSave(id, fields);
    onClose();
  };

  return (
    <Dialog open={openDialog}>
      <DialogTitle>Edit {editShow.name}</DialogTitle>
      <DialogContent sx={{ paddingTop: '.5em !important' }}>
        <Box
          display='flex'
          flexDirection='column'
          gap='.5em'
        >
          <TextField
            label='Show'
            value={editedItem.Name}
            onChange={handleChange('Name')}
            variant='outlined'
            // defaultValue={editedItem.Name}
            fullWidth={true}
          />
          <Box
            display='flex'
            justifyContent='space-between'
          >
            <TextField
              label='Current Season'
              value={editedItem.CurrentSeason}
              onChange={handleChange('CurrentSeason')}
              type='number'
              size='small'
              margin='normal'
            />

            <TextField
              label='Current Episode'
              value={editedItem.CurrentEpisode}
              onChange={handleChange('CurrentEpisode')}
              type='number'
              size='small'
              margin='normal'
            />
          </Box>
          <Box
            display='flex'
            justifyContent='space-between'
          >
            <TextField
              label='Available Season'
              value={editedItem.AvailableSeason}
              onChange={handleChange('AvailableSeason')}
              type='number'
              size='small'
              margin='normal'
            />

            <TextField
              label='Available Episode'
              value={editedItem.AvailableEpisode}
              onChange={handleChange('AvailableEpisode')}
              type='number'
              size='small'
              margin='normal'
            />
          </Box>
          <TextField
            label='Link'
            value={editedItem.Link}
            onChange={handleChange('Link')}
            fullWidth={true}
          />

          <TextField
            label='Image'
            value={editedItem.Image}
            onChange={handleChange('Image')}
            fullWidth={true}
          />
          <FormGroup>
            <Box
              display='flex'
              justifyContent='space-between'
            >
              <FormControlLabel
                control={<Switch />}
                checked={editedItem.Production}
                label='Production'
                onClick={() => handleSwitch('Production')}
              />
              <FormControlLabel
                control={<Switch />}
                checked={editedItem.NewEpisodes}
                label='NewEpisodes'
                onClick={() => handleSwitch('NewEpisodes')}
                sx={{ marginRight: '0' }}
              />
              <FormControlLabel
                control={<Switch />}
                checked={editedItem.Archive}
                label='Archive'
                onClick={() => handleSwitch('Archive')}
              />
            </Box>
          </FormGroup>
          {/* <Switch
          label='Production'
          checked={editedItem.Production}
          onClick={() => handleSwitch('Production')}
        />

        <Switch
          label='Archive'
          checked={editedItem.Production}
          onClick={() => handleSwitch('Archive')}
        />

        <Switch
          label='New Episodes'
          checked={editedItem.NewEpisodes}
          onClick={() => handleSwitch('NewEpisodes')}
        /> */}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button onClick={() => handleSave(editedItem)}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
