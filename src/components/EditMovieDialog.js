// EditMovieDialog.js

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

const EditMovieDialog = ({ openDialog, editMovie, onSave, onClose }) => {
  const [editedItem, setEditedItem] = useState(editMovie);
  // const id = editMovie.id;
  const [checked, setChecked] = useState({
    Watched: editMovie.Watched || false,
  });
  // console.log(checked);
  console.log('triggered movie edit');
  console.log(editMovie);
  // const [editedMovie, setEditedMovie] = useState(movie);

  const handleChange = (field) => (event) => {
    setEditedItem({
      ...editedItem,
      [field]: event.target.value,
    });
    // console.log(editedItem);
  };

  // const handleSwitch = (field) => {
  //   setEditedItem({ ...editedItem, [field]: !editedItem[field] });
  //   console.log(editedItem);
  // };

  //switch handler
  const handleCheckedChange = (name) => (event) => {
    setChecked({
      ...checked,
      [name]: event.target.checked,
    });
    // console.log(checked);
    // setEditedItem({
    //   ...checked,
    //   ...editedItem,
    //   // [name]: event.target.value,
    // });
    // console.log(editedItem);
  };

  const handleSave = () => {
    const record = {
      id: editedItem.id,
      Duration: parseInt(editedItem.Duration),
      Rating: parseInt(editedItem.Rating),
      // AvailableSeason: parseInt(editedItem.AvailableSeason),
      // AvailableEpisode: parseInt(editedItem.AvailableEpisode),
      ...editedItem,
      Watched: checked.Watched,
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
      <DialogTitle>Edit {editMovie.Name}</DialogTitle>
      <DialogContent sx={{ paddingTop: '.5em !important' }}>
        <Box
          display='flex'
          flexDirection='column'
          gap='.5em'
        >
          <TextField
            label='Movie'
            value={editedItem.Name}
            onChange={handleChange('Name')}
            variant='outlined'
            // defaultValue={editedItem.Name}
            fullWidth={true}
          />
          {/* <Box
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
          > */}
          <TextField
            label='Duration'
            value={editedItem.Duration}
            onChange={handleChange('Duration')}
            type='number'
            size='small'
            margin='normal'
          />

          <TextField
            label='Rating'
            value={editedItem.Rating}
            onChange={handleChange('Rating')}
            type='number'
            size='small'
            margin='normal'
          />
          {/* </Box> */}
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
              // justifyContent='space-between'
            >
              <FormControlLabel
                control={<Switch />}
                checked={checked.Watched}
                label='Watched'
                onClick={handleCheckedChange('Watched')}
              />
            </Box>
          </FormGroup>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button onClick={() => handleSave(editedItem)}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditMovieDialog;
