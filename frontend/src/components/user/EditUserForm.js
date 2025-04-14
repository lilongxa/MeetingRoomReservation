// import AddUserForm from './AddUserForm';

// const EditUserForm = ({ user, onChange }) => {
//   return <AddUserForm formData={user} onChange={onChange} />;
// };

// export default EditUserForm;

import React, { useState, useEffect } from "react";
import { TextField, MenuItem } from "@mui/material";

const EditUserForm = ({ user, onChange }) => {
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    role: "User",
    ...user
  });

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleChange = (field, value) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onChange?.(newData);
  };

  return (
    <div>
      <TextField
        label="Username"
        fullWidth
        margin="dense"
        value={formData.username || ""}
        onChange={(e) => handleChange("username", e.target.value)}
      />
      <TextField
        label="Full Name"
        fullWidth
        margin="dense"
        value={formData.fullName || ""}
        onChange={(e) => handleChange("fullName", e.target.value)}
      />
      <TextField
        label="Email"
        fullWidth
        margin="dense"
        value={formData.email || ""}
        onChange={(e) => handleChange("email", e.target.value)}
      />
      <TextField
        select
        label="Role"
        fullWidth
        margin="dense"
        value={formData.role || "User"}
        onChange={(e) => handleChange("role", e.target.value)}
      >
        <MenuItem value="Admin">Admin</MenuItem>
        <MenuItem value="User">User</MenuItem>
        <MenuItem value="Manager">Manager</MenuItem>
      </TextField>
    </div>
  );
};

export default EditUserForm;
