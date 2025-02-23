import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Pagination,
  Box,
  Typography,
  Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, FormControl, InputLabel, FormHelperText
} from "@mui/material";
import { Edit, Delete, Info } from "@mui/icons-material";
import api from "../api/api";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);


  useEffect(() => {
    fetchUsers(page, pageSize, search);
  }, []);

  const fetchUsers = async (page, pageSize, search) => {
    try {
      const response = await api.get('/users/paged', { params: { page, pageSize, search } });
      console.log(response);
      setUsers(response.data.items);
      setTotal(response.data.totalCount);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  
  const deleteUser = async (id) => {
    try {
      await fetch(`/api/users/${id}`, { method: "DELETE" });
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setPage(1); 
    fetchUsers(1, pageSize, event.target.value);
  };

  const handleEdit = (id) => {
    console.log("Edit User ID:", id);
  };

  const handleDetails = (id) => {
    console.log("View Details ID:", id);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(search.toLowerCase()) ||
      user.fullName.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    fetchUsers(newPage, pageSize, search);
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    setUsers(users.filter((user) => user.id !== id));
  };

  const [open, setOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    username: '',
    fullName: '',
    email: '',
    role: ''
  });

  const [errors, setErrors] = useState({});
  const handleOpenDialog = () => {
    setOpen(true); // Open the dialog when the "New" button is clicked
  };

  const handleCloseDialog = () => {
    setOpen(false); // Close the dialog
    setNewUser({ username: '', fullName: '', email: '', role: '' }); // Reset form
  };

  const validateForm = () => {
    let newErrors = {};
    if (!newUser.username.trim()) newErrors.username = 'Username is required';
    if (!newUser.fullName.trim()) newErrors.fullName = 'Full Name is required';
    
    if (!newUser.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(newUser.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!newUser.role) newErrors.role = 'Role is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitNewUser = () => {
    if (!validateForm()) return;
    // Send new user data to the backend
    fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then((data) => {
        // Add the new user to the state and close the dialog
        setUsers((prevUsers) => [...prevUsers, data]);
        handleCloseDialog();
      })
      .catch((error) => console.error('Error adding new user:', error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>User Management</Typography>
      <Box display="flex" justifyContent="flex-end" alignItems="center" my={2} gap={2}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={search}
          onChange={handleSearch}
        />
        <Button variant="contained" color="primary" onClick={handleOpenDialog}>
          New
        </Button>
      </Box>
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.slice((page - 1) * pageSize, page * pageSize).map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleDetails(user.id)}>
                      <Info />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleEdit(user.id)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(user.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Dialog for Adding New User */}
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Create New User</DialogTitle>
        <DialogContent>
        <TextField 
            autoFocus fullWidth margin="dense" label="Username" variant="outlined" 
            name="username" value={newUser.username} onChange={handleInputChange} 
            error={!!errors.username} helperText={errors.username} 
          />
          <TextField 
            fullWidth margin="dense" label="Full Name" variant="outlined" 
            name="fullName" value={newUser.fullName} onChange={handleInputChange} 
            error={!!errors.fullName} helperText={errors.fullName} 
          />
          <TextField 
            fullWidth margin="dense" label="Email" variant="outlined" 
            name="email" value={newUser.email} onChange={handleInputChange} 
            error={!!errors.email} helperText={errors.email} 
          />

          <FormControl fullWidth margin="dense" error={!!errors.role}>
            <InputLabel>Role</InputLabel>
            <Select name="role" value={newUser.role} onChange={handleInputChange}>
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="User">User</MenuItem>
              <MenuItem value="Manager">Manager</MenuItem>
            </Select>
            <FormHelperText>{errors.role}</FormHelperText>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} variant="contained" color="default">
            Cancel
          </Button>
          <Button onClick={handleSubmitNewUser} variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      </Paper>
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
        <Typography variant="body2">
          Showing {(page - 1) * pageSize + 1} - {Math.min(page * pageSize, filteredUsers.length)} of {filteredUsers.length}
        </Typography>
        <Pagination
          count={Math.ceil(filteredUsers.length / pageSize)}
          page={page}
          onChange={handlePageChange}
        />
      </Box>
    </>
  );
};

export default UserManagement;
