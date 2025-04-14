import React, { useState, useEffect } from 'react';
import { 
  TextField, 
  Box, 
  MenuItem,
  FormControl,
  InputLabel,
  Select
} from '@mui/material';
import api from '../../api/api';

const AddReservationForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    meetingRoomId: '',
    startTime: '',
    endTime: '',
    status: 'Pending',
    topic: '',
    attendees: ''
  });

  const [meetingRooms, setMeetingRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeetingRooms = async () => {
      try {
        const response = await api.get('/meetingrooms');
        setMeetingRooms(response.data || []);
      } catch (error) {
        console.error('Failed to fetch meeting rooms:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMeetingRooms();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = {
      ...formData,
      [name]: value
    };
    setFormData(newFormData);
    onSubmit(newFormData);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box>
        <FormControl fullWidth>
          <InputLabel>Meeting Room</InputLabel>
          <Select
            name="meetingRoomId"
            value={formData.meetingRoomId}
            onChange={handleChange}
            label="Meeting Room"
            required
          >
            {meetingRooms.map((room) => (
              <MenuItem key={room.id} value={room.id}>
                {room.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box>
        <TextField
          fullWidth
          required
          name="startTime"
          label="Start Time"
          type="datetime-local"
          value={formData.startTime}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Box>

      <Box>
        <TextField
          fullWidth
          required
          name="endTime"
          label="End Time"
          type="datetime-local"
          value={formData.endTime}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Box>

      <Box>
        <TextField
          fullWidth
          required
          name="topic"
          label="Topic"
          value={formData.topic}
          onChange={handleChange}
        />
      </Box>

      <Box>
        <TextField
          fullWidth
          required
          name="attendees"
          label="Attendees"
          value={formData.attendees}
          onChange={handleChange}
          multiline
          rows={2}
          helperText="Enter attendees' names or emails, separated by commas"
        />
      </Box>

      <Box>
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={formData.status}
            onChange={handleChange}
            label="Status"
            required
          >
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Approved">Approved</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default AddReservationForm;