import React from 'react';
import { 
  TextField, 
  Box, 
  MenuItem
} from '@mui/material';

const AddMeetingRoomForm = ({ onSubmit }) => {
  const [formData, setFormData] = React.useState({
    name: '',
    capacity: '',
    description: '',
    status: 'Available',
    roomType: 'Standard',
    availableTimeSlots: '',
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  React.useEffect(() => {
    // 将表单数据传递给父组件
    onSubmit(formData);
  }, [formData, onSubmit]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box>
        <TextField
          fullWidth
          required
          name="name"
          label="Room Name"
          value={formData.name}
          onChange={handleChange}
        />
      </Box>
      <Box>
        <TextField
          fullWidth
          required
          name="capacity"
          label="Capacity"
          type="number"
          value={formData.capacity}
          onChange={handleChange}
        />
      </Box>
      <Box>
        <TextField
          fullWidth
          name="description"
          label="Description"
          multiline
          rows={2}
          value={formData.description}
          onChange={handleChange}
        />
      </Box>
      <Box>
        <TextField
          fullWidth
          required
          name="status"
          label="Status"
          select
          value={formData.status}
          onChange={handleChange}
        >
          <MenuItem value="Available">Available</MenuItem>
          <MenuItem value="Occupied">Occupied</MenuItem>
          <MenuItem value="Maintenance">Maintenance</MenuItem>
        </TextField>
      </Box>
      <Box>
        <TextField
          fullWidth
          required
          name="roomType"
          label="Room Type"
          select
          value={formData.roomType}
          onChange={handleChange}
        >
          <MenuItem value="Standard">Standard</MenuItem>
          <MenuItem value="Conference">Conference</MenuItem>
          <MenuItem value="Meeting">Meeting</MenuItem>
          <MenuItem value="Training">Training</MenuItem>
        </TextField>
      </Box>
      <Box>
        <TextField
          fullWidth
          name="availableTimeSlots"
          label="Available Time Slots"
          value={formData.availableTimeSlots}
          onChange={handleChange}
        />
      </Box>
      <Box>
        <TextField
          fullWidth
          name="notes"
          label="Notes"
          multiline
          rows={2}
          value={formData.notes}
          onChange={handleChange}
        />
      </Box>
    </Box>
  );
};

export default AddMeetingRoomForm;