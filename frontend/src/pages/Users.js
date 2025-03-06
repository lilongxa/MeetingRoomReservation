import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, Pagination } from "@mui/material";
import { AddUserDialog, UserTable } from "../components/user/AddUserDialog";
import api from "../api/api";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0); 

  useEffect(() => {
    fetchUsers(page, pageSize, search);
  }, [refreshKey]);

  const fetchUsers = async (page, pageSize, search) => {
    try {
      const response = await api.get("/users/paged", {
        params: { page, pageSize, search },
      });
      setUsers(response.data.items);
      setTotal(response.data.totalCount);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setPage(1);
    fetchUsers(1, pageSize, event.target.value);
  };

  const handleAddUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, { ...newUser, id: prevUsers.length + 1 }]);
    setRefreshKey((prev) => prev + 1);
  };

  const handleEdit = (user) => {
    let newName = user.name;
    let updatedUser = { ...user };
    };

  const handleDelete = async (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    fetchUsers(newPage, pageSize, search);
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>User Management</Typography>
      <Box display="flex" justifyContent="flex-end" alignItems="center" my={2} gap={2}>
        <TextField label="Search" variant="outlined" size="small" value={search} onChange={handleSearch} />
        <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)}>
          New
        </Button>
      </Box>

      <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />

      <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
        <Typography variant="body2">
          Showing {(page - 1) * pageSize + 1} - {Math.min(page * pageSize, users.length)} of {users.length}
        </Typography>
        <Pagination count={Math.ceil(users.length / pageSize)} page={page} onChange={handlePageChange} />
      </Box>

      <AddUserDialog open={openDialog} onClose={() => setOpenDialog(false)} onSubmit={handleAddUser} />
    </>
  );
};

export default UserManagement;
