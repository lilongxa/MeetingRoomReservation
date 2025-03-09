import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  IconButton,
  Tooltip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

const MeetingRoomListTable = ({ meetingRooms, onEditClick, onDeleteClick, onReserveClick }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Capacity</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Room Type</TableCell>
            <TableCell>Available Time Slots</TableCell>
            <TableCell>Notes</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {meetingRooms.map((room) => (
            <TableRow key={room.id}>
              <TableCell>{room.name}</TableCell>
              <TableCell>{room.capacity}</TableCell>
              <TableCell>{room.description}</TableCell>
              <TableCell>{room.status}</TableCell>
              <TableCell>{room.roomType}</TableCell>
              <TableCell>{room.availableTimeSlots}</TableCell>
              <TableCell>{room.notes}</TableCell>
              <TableCell align="center">
                <Tooltip title="Edit">
                  <IconButton onClick={() => onEditClick(room)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton onClick={() => onDeleteClick(room)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Reserve">
                  <IconButton onClick={() => onReserveClick(room)}>
                    <EventAvailableIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MeetingRoomListTable;