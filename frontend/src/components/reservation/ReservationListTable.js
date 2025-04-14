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
  Tooltip,
  Chip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ReservationListTable = ({ reservations, onEditClick, onDeleteClick }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'warning';
      case 'Approved':
        return 'success';
      case 'Rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  const formatDateTime = (dateTimeString) => {
    return new Date(dateTimeString).toLocaleString();
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Meeting Room</TableCell>
            <TableCell>Topic</TableCell>
            <TableCell>Start Time</TableCell>
            <TableCell>End Time</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Attendees</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reservations.map((reservation) => (
            <TableRow key={reservation.id}>
              <TableCell>{reservation.meetingRoomName}</TableCell>
              <TableCell>{reservation.topic}</TableCell>
              <TableCell>{formatDateTime(reservation.startTime)}</TableCell>
              <TableCell>{formatDateTime(reservation.endTime)}</TableCell>
              <TableCell>
                <Chip 
                  label={reservation.status} 
                  color={getStatusColor(reservation.status)}
                  size="small"
                />
              </TableCell>
              <TableCell>{reservation.attendees}</TableCell>
              <TableCell align="center">
                <Tooltip title="Edit">
                  <IconButton onClick={() => onEditClick(reservation)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton onClick={() => onDeleteClick(reservation)}>
                    <DeleteIcon />
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

export default ReservationListTable;