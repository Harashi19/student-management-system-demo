import { useState } from 'react';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { Modal, ConfirmDialog, FormDialog } from './index';

/**
 * ModalExamples Component
 * Demonstrates usage of Modal, ConfirmDialog, and FormDialog components
 * This file is for reference and testing purposes
 */
export const ModalExamples = () => {
  const [basicModalOpen, setBasicModalOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [formValue, setFormValue] = useState('');
  const [loading, setLoading] = useState(false);

  const handleConfirm = () => {
    setLoading(true);
    // Simulate async operation
    setTimeout(() => {
      setLoading(false);
      setConfirmDialogOpen(false);
      alert('Action confirmed!');
    }, 1500);
  };

  const handleFormSubmit = () => {
    setLoading(true);
    // Simulate async operation
    setTimeout(() => {
      setLoading(false);
      setFormDialogOpen(false);
      alert(`Form submitted with value: ${formValue}`);
      setFormValue('');
    }, 1500);
  };

  return (
    <Stack spacing={2} sx={{ p: 3 }}>
      <Typography variant="h4">Modal Component Examples</Typography>

      {/* Basic Modal Example */}
      <Button variant="contained" onClick={() => setBasicModalOpen(true)}>
        Open Basic Modal
      </Button>
      <Modal
        open={basicModalOpen}
        onClose={() => setBasicModalOpen(false)}
        title="Basic Modal"
        actions={
          <>
            <Button onClick={() => setBasicModalOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={() => setBasicModalOpen(false)}>
              Save
            </Button>
          </>
        }
      >
        <Typography>
          This is a basic modal with custom content and actions. You can put any content here.
        </Typography>
      </Modal>

      {/* Confirm Dialog Example */}
      <Button variant="contained" color="error" onClick={() => setConfirmDialogOpen(true)}>
        Open Confirm Dialog
      </Button>
      <ConfirmDialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        onConfirm={handleConfirm}
        title="Delete Student"
        message="Are you sure you want to delete this student? This action cannot be undone."
        confirmText="Delete"
        confirmColor="error"
        severity="error"
        loading={loading}
      />

      {/* Form Dialog Example */}
      <Button variant="contained" color="primary" onClick={() => setFormDialogOpen(true)}>
        Open Form Dialog
      </Button>
      <FormDialog
        open={formDialogOpen}
        onClose={() => setFormDialogOpen(false)}
        onSubmit={handleFormSubmit}
        title="Quick Note"
        submitText="Save Note"
        loading={loading}
      >
        <TextField
          label="Note"
          multiline
          rows={4}
          fullWidth
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Enter your note here..."
        />
      </FormDialog>
    </Stack>
  );
};
