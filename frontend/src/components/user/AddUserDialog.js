import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { create } from "../../services/userService";
import {useNotification} from "../NotificationProvider";

const AddUserDialog = ({ open, onClose, onSubmit }) => {
  const [newUser, setNewUser] = useState({
    username: "",
    fullName: "",
    email: "",
    role: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!newUser.username.trim()) newErrors.username = "Username is required";
    if (!newUser.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!newUser.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(newUser.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!newUser.role) newErrors.role = "Role is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async() => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // 调用后端 API 新增用户
      const response = await create(newUser);

      console.log(response);
      // 通知父组件刷新用户列表
      onSubmit(response.data);

      // 关闭弹窗并重置表单
      setNewUser({ username: "", fullName: "", email: "", role: "" });
      onClose();
      showNotification("User "+newUser.fullName+" is added successfully!","success");
    } catch (error) {
      showNotification("Failed to add user "+newUser.fullName+": "+error+"","error");
      console.error("Failed to add user:", error);
      //alert("Failed to add user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New User</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          margin="dense"
          label="Username"
          variant="outlined"
          name="username"
          value={newUser.username}
          onChange={handleInputChange}
          error={!!errors.username}
          helperText={errors.username}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Full Name"
          variant="outlined"
          name="fullName"
          value={newUser.fullName}
          onChange={handleInputChange}
          error={!!errors.fullName}
          helperText={errors.fullName}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Email"
          variant="outlined"
          name="email"
          value={newUser.email}
          onChange={handleInputChange}
          error={!!errors.email}
          helperText={errors.email}
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
        <Button onClick={onClose} variant="contained" color="default">
          Cancel
        </Button>
        <Button onClick={()=>{handleSubmit()}} variant="contained" color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const UserTable = ({ users, onEdit, onDelete, onDetails }) => {
  return (
    <Paper>
      <TableContainer>
        <Table size="small" aria-label="a dense table">
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
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <IconButton color="secondary" onClick={() => onEdit(user.id)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => onDelete(user.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export { AddUserDialog, UserTable };
