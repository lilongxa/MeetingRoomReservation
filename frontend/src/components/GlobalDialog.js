import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

const GlobalDialog = ({ open, onClose, title, children, onSubmit }) => {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      onSubmit();
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      aria-labelledby="dialog-title"
      disableEscapeKeyDown={false}
      onKeyDown={handleKeyDown}
    >
      <DialogTitle id="dialog-title">{title}</DialogTitle>
      <DialogContent>
        {children} {/* 这里是弹窗的内容部分 */}
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={onClose} 
          color="secondary"
          tabIndex={0}
        >
          Cancel
        </Button>
        <Button 
          onClick={onSubmit} 
          color="primary"
          variant="contained"
          tabIndex={0}
          autoFocus
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GlobalDialog;
