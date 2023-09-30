// EditDialog.js

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';

const EditDialog = ({ editShow, onSave, onOpen }) => {
  const [editedItem, setEditedItem] = useState(editShow);

  console.log('triggered edit');

  const handleChange = (field) => (event) => {
    setEditedItem({
      ...editedItem,
      [field]: event.target.value,
    });
  };
  onOpen(editShow);
  // const handleSave = () => {
  //   onSave(editShow);
  //   onclose();
  // };

  // const onSave = ({ editShow }) => {
  //   // handle save PATCH calls
  // };

  return (
    <Dialog>
      <DialogTitle>Edit {editShow.name}</DialogTitle>
      <DialogContent>
        <TextField
          label='Name'
          value={editedItem.name}
          onChange={handleChange('name')}
        />
        {/* other fields */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
