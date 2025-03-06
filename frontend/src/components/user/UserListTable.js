import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit"; 
import DeleteIcon from "@mui/icons-material/Delete"; 

const UserListTable = ({ users, onEditClick, onDeleteClick }) => {
  return (
    <TableContainer>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>Full Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={user?.id || index}>
            <TableCell>{user?.username || ''}</TableCell>
            <TableCell>{user?.fullName || ''}</TableCell>
            <TableCell>{user?.email || ''}</TableCell>
            <TableCell>{user?.role || ''}</TableCell>
              <TableCell>
                <IconButton
                  onClick={() => onEditClick(user)} 
                  color="primary"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => onDeleteClick(user)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserListTable;