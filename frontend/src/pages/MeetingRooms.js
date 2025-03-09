import React, { useState, useEffect } from "react";
import { 
  Button, 
  CircularProgress, 
  Alert, 
  Pagination, 
  Box, 
  TextField, 
  Typography 
} from "@mui/material";
import { useNotification } from "../components/NotificationProvider";
import GlobalDialog from "../components/GlobalDialog";
import AddMeetingRoomForm from "../components/meetingroom/AddMeetingRoomForm";
import EditMeetingRoomForm from "../components/meetingroom/EditMeetingRoomForm";
import MeetingRoomListTable from "../components/meetingroom/MeetingRoomListTable";
import api from "../api/api";

const MeetingRooms = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [openReserveDialog, setOpenReserveDialog] = useState(false);
  const [roomData, setRoomData] = useState({
    name: "",
    capacity: "",
    description: "",
    status: "Available",
    roomType: "Standard",
    availableTimeSlots: "",
    notes: ""
  });
  const [meetingRooms, setMeetingRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const { showNotification } = useNotification();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState(null);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const fetchMeetingRooms = async () => {
      try {
        setLoading(true);
        const response = await api.get("/meetingrooms/paged", {
          params: { pageNumber: page, pageSize, search }
        });
        const items = response.data.items || [];
        const formattedItems = items.map(item => ({
          id: item.id,
          name: item.name || '',
          capacity: item.capacity || '',
          description: item.description || '',
          status: item.status || 'Available',
          roomType: item.roomType || 'Standard',
          availableTimeSlots: item.availableTimeSlots || '',
          notes: item.notes || ''
        }));
        setMeetingRooms(formattedItems);
        setTotalCount(response.data.totalCount || 0);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch meeting rooms");
        setLoading(false);
      }
    };
    fetchMeetingRooms();
  }, [page, pageSize, search, refresh]);

  const handleOpenAddDialog = () => {
    setIsEditMode(false);
    setRoomData({
      name: "",
      capacity: "",
      description: "",
      status: "Available",
      roomType: "Standard",
      availableTimeSlots: "",
      notes: ""
    });
    setOpenDialog(true);
  };

  const handleOpenEditDialog = (room) => {
    setIsEditMode(true);
    setRoomData(room);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const validateForm = (room) => {
    let newErrors = {};
    if (!room.name?.trim()) newErrors.name = "Room name is required";
    if (!room.capacity) newErrors.capacity = "Capacity is required";
    if (!room.status) newErrors.status = "Status is required";
    if (!room.roomType) newErrors.roomType = "Room type is required";
    
    const hasErrors = Object.keys(newErrors).length > 0;
    if (hasErrors) {
      setError(Object.values(newErrors).join(", "));
    } else {
      setError(null);
    }
    return !hasErrors;
  };

  const handleSubmit = async (room) => {
    if (!validateForm(room)) return;

    try {
      if (isEditMode) {
        await api.post(`/meetingrooms/update`, room);
        setMeetingRooms(rooms => rooms.map(r => r.id === room.id ? room : r));
        showNotification("Meeting room updated successfully", "success");
      } else {
        const response = await api.post("/meetingrooms/create", room);
        setMeetingRooms(rooms => [...rooms, response.data]);
        setTotalCount(count => count + 1);
        showNotification("Meeting room added successfully", "success");
      }
      setOpenDialog(false);
      setRefresh(prev => prev + 1);
    } catch (err) {
      showNotification("Failed to submit meeting room data: " + err, "error");
    }
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    setRefresh(prev => prev + 1);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setPage(1);
    setRefresh(prev => prev + 1);
  };

  const handleDeleteClick = (room) => {
    setRoomToDelete(room);
    setOpenDeleteDialog(true);
  };

  const handleDeleteCancel = () => {
    setOpenDeleteDialog(false);
    setRoomToDelete(null);
  };

  const handleDeleteConfirm = async () => {
    if (!roomToDelete) return;
    
    try {
      await api.delete(`/meetingrooms/${roomToDelete.id}`);
      showNotification("Meeting room deleted successfully", "success");
      setTotalCount(count => count - 1);
      setOpenDeleteDialog(false);
      setRoomToDelete(null);
      setRefresh(prev => prev + 1);
    } catch (err) {
      showNotification("Failed to delete meeting room: " + err, "error");
    }
  };

  const handleReserveClick = (room) => {
    // TODO: Implement room reservation logic
    setOpenReserveDialog(true);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>Meeting Room Management</Typography>
      <Box display="flex" justifyContent="flex-end" alignItems="center" my={2} gap={2}>
        <TextField 
          label="Search" 
          variant="outlined" 
          size="small" 
          value={search} 
          onChange={handleSearch}
        />
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleOpenAddDialog}
        >
          New Room
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <MeetingRoomListTable
            meetingRooms={meetingRooms}
            onEditClick={handleOpenEditDialog}
            onDeleteClick={handleDeleteClick}
            onReserveClick={handleReserveClick}
          />
          <Box display="flex" justifyContent="center" mt={2}>
            <Pagination
              count={Math.ceil(totalCount / pageSize)}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </>
      )}

      <GlobalDialog
        open={openDialog}
        onClose={handleCloseDialog}
        title={isEditMode ? "Edit Meeting Room" : "Add Meeting Room"}
      >
        {isEditMode ? (
          <EditMeetingRoomForm
            initialData={roomData}
            onSubmit={handleSubmit}
            onCancel={handleCloseDialog}
          />
        ) : (
          <AddMeetingRoomForm
            onSubmit={handleSubmit}
            onCancel={handleCloseDialog}
          />
        )}
      </GlobalDialog>

      <GlobalDialog
        open={openDeleteDialog}
        onClose={handleDeleteCancel}
        title="Confirm Delete"
      >
        <Typography>
          Are you sure you want to delete this meeting room?
        </Typography>
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button onClick={handleDeleteCancel} sx={{ mr: 1 }}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </Box>
      </GlobalDialog>
    </div>
  );
};

export default MeetingRooms;