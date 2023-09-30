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

const EditDialog = ({ openDialog, editShow, onSave, onClose }) => {
  const [editedItem, setEditedItem] = useState(editShow);

  console.log('triggered edit');

  const handleChange = (field) => (event) => {
    setEditedItem({
      ...editedItem,
      [field]: event.target.value,
    });
  };

  const handleSave = () => {
    onSave(editedItem);
    onClose();
  };

  return (
    <Dialog open={openDialog}>
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
