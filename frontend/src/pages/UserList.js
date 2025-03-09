import React, { useState, useEffect } from "react";
import { Button, CircularProgress, Alert, Pagination, Box, TextField, Typography } from "@mui/material";
import { create, update, remove } from "../services/userService";
import api from "../api/api";
import {useNotification} from "../components/NotificationProvider";
import GlobalDialog from "../components/GlobalDialog"; // 引入全局弹窗组件
import AddUserForm from "../components/user/AddUserForm"; // 引入新增用户表单
import EditUserForm from "../components/user/EditUserForm"; // 引入编辑用户表单
import UserListTable from "../components/user/UserListTable"; // 引入用户列表表格组件

const UserList = () => {
  const [openDialog, setOpenDialog] = useState(false); // 控制弹框的显示与隐藏
  const [isEditMode, setIsEditMode] = useState(false); // 判断是新增还是编辑
  const [userData, setUserData] = useState({
    userName: "",
    fullName: "",
    email: "",
    role: "User", // 默认值为 User
  }); // 存储用户数据（用于编辑时填充表单）
  const [users, setUsers] = useState([]); // 存储从后台获取的用户数据
  const [loading, setLoading] = useState(true); // 控制加载状态
  const [error, setError] = useState(null); // 存储错误信息
  const [page, setPage] = useState(1); // 当前页码
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(10); // 每页条数
  const [totalCount, setTotalCount] = useState(0); // 总记录数
  const { showNotification } = useNotification();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [refresh, setRefresh] = useState(0); // 添加刷新触发器


  // 获取用户列表数据
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true); // 开始加载
        const response = await api.get("/users/paged", {
          params: { pageNumber:page, pageSize, search } // 传递分页参数
        });
        const items = response.data.items || [];
        const formattedItems = items.map(item => ({
          id: item.id,
          username: item.username || '',
          fullName: item.fullName || '',
          email: item.email || '',
          role: item.role || 'User'
        }));
        setUsers(formattedItems);
        setTotalCount(response.data.totalCount || 0);
        setLoading(false); // 加载完成
      } catch (err) {
        setError("Failed to fetch users"); // 发生错误时设置错误信息
        setLoading(false); // 加载完成
      }
    };
    fetchUsers();
  }, [page, pageSize, search, refresh]); // 当页码或每页条数变化时重新获取数据

 
  
  const handleOpenAddDialog = () => {
    setIsEditMode(false);
    setUserData({
      username: "",
      fullName: "",
      email: "",
      role: "User"
    });
    setOpenDialog(true);
  };

  const handleOpenEditDialog = (user) => {
    setIsEditMode(true); // 编辑用户
    setUserData(user); // 设置用户数据
    setOpenDialog(true); // 打开弹框
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // 关闭弹框
  };

    const validateForm = (user) => {
      let newErrors = {};
      if (!user.username?.trim()) newErrors.username = "Username is required";
      if (!user.fullName?.trim()) newErrors.fullName = "Full Name is required";
      if (!user.email?.trim()) {
        newErrors.email = "Email is required";
      } else if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(user.email)) {
        newErrors.email = "Invalid email format";
      }
      if (!user.role) newErrors.role = "Role is required";
      
      const hasErrors = Object.keys(newErrors).length > 0;
      if (hasErrors) {
        setError(Object.values(newErrors).join(", "));
      } else {
        setError(null);
      }
      return !hasErrors;
    };


  const handleSubmit = async (user) => {
    if (!validateForm(user)) return;

    try {
        if (isEditMode) {
            await update(user);
            setUsers(users.map((u) => (u.id === user.id ? user : u)));
            showNotification("User updated successfully","success");
            setRefresh(refresh + 1);
        } else {
            const response = await create(user);
            setUsers([...users, response.data]);
            setTotalCount(totalCount + 1);
            showNotification("User added successfully","success");
            setRefresh(refresh + 1);
        }
        setOpenDialog(false);
    } catch (err) {
        showNotification("Failed to submit user data:"+err, "error");
    }
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setPage(1);
  };

  // 处理分页变化
  const handlePageChange = (event, value) => {
    setPage(value); // 更新页码
    setRefresh(prev => prev + 1); // 添加刷新触发
  };

  // 处理每页条数变化
  const handlePageSizeChange = (event) => {
    // setPageSize(event.target.value); // 更新每页条数
    setPage(1); // 每次更改每页条数时从第一页开始
    setPageSize(parseInt(event.target.value, 10));
    setRefresh(prev => prev + 1); // 添加刷新触发
  };

  const handleDeleteUser = async (user) => {
    try {
      await remove(user.id);
      setUsers(users.filter((u) => u.id !== user.id));
      setTotalCount(totalCount - 1);
      showNotification("User deleted successfully","success");
    } catch (err) {
        showNotification("Failed to delete user:"+err, "error");
    }
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setOpenDeleteDialog(true);
  };

  const handleDeleteCancel = () => {
    setOpenDeleteDialog(false);
    setUserToDelete(null);
  };

  const handleDeleteConfirm = async () => {
    if (!userToDelete) return;
    
    try {
      await remove(userToDelete.id);
      showNotification("User deleted successfully", "success");
      //fetchUsers();
      setTotalCount(totalCount - 1);
      setOpenDeleteDialog(false);
      setUserToDelete(null);
    } catch (err) {
      showNotification("Failed to delete user:" + err, "error");
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>User Management</Typography>
      <Box display="flex" justifyContent="flex-end" alignItems="center" my={2} gap={2}>
        <TextField label="Search" variant="outlined" size="small" value={search} onChange={handleSearch} />
        <Button variant="contained" color="primary" onClick={() => handleOpenAddDialog()}>
          New
        </Button>
      </Box>

      {/* 错误提示 */}
      {error && typeof error === 'string' && <Alert severity="error">{error}</Alert>}

       {/* 加载状态 */}
       {loading ? (
        <CircularProgress />
      ) : (
        <UserListTable users={users} onEditClick={handleOpenEditDialog} onDeleteClick={handleDeleteClick} />
      )}

      <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
        <Typography variant="body2">
        Showing {(page - 1) * pageSize + 1} - {Math.min(page * pageSize, totalCount)} of {totalCount}
        </Typography>
        <Pagination count={Math.ceil(totalCount / pageSize)} page={page} onChange={handlePageChange} color="primary"/>
        <select
          value={pageSize}
          onChange={handlePageSizeChange}
          //style={{ marginLeft: 20, padding: "5px" }}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
     </Box>

      {/* 使用全局弹框组件 */}
      <GlobalDialog
        open={openDialog}
        onClose={handleCloseDialog}
        title={isEditMode ? "Edit User" : "Add New User"}
        onSubmit={() => handleSubmit(userData)}
      >
        {isEditMode ? (
          <EditUserForm user={userData} onChange={setUserData} />
        ) : (
          <AddUserForm user={userData} onChange={setUserData} />
        )}
      </GlobalDialog>

      {/* 使用全局弹框组件 */}
      <GlobalDialog
        open={openDeleteDialog}
        onClose={handleDeleteCancel}
        title="Delete User"
        onSubmit={handleDeleteConfirm}
      >
        <Typography>Are you sure you want to delete this user?</Typography>
      </GlobalDialog>
    </div>
  );
};

export default UserList;
