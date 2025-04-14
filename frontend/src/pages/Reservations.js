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
import AddReservationForm from "../components/reservation/AddReservationForm";
import EditReservationForm from "../components/reservation/EditReservationForm";
import ReservationListTable from "../components/reservation/ReservationListTable";
import api from "../api/api";

const Reservations = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [reservationData, setReservationData] = useState({
    meetingRoomId: '',
    startTime: null,
    endTime: null,
    status: 'Pending',
    topic: '',
    attendees: ''
  });
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const { showNotification } = useNotification();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [reservationToDelete, setReservationToDelete] = useState(null);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setLoading(true);
        const response = await api.get("/reservations/paged", {
          params: { pageNumber: page, pageSize, search }
        });
        const items = response.data.items || [];
        const formattedItems = items.map(item => ({
          id: item.id,
          meetingRoomId: item.meetingRoomId,
          meetingRoomName: item.meetingRoomName || '',
          startTime: item.startTime,
          endTime: item.endTime,
          status: item.status || 'Pending',
          topic: item.topic || '',
          attendees: item.attendees || ''
        }));
        setReservations(formattedItems);
        setTotalCount(response.data.totalCount || 0);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch reservations");
        setLoading(false);
      }
    };
    fetchReservations();
  }, [page, pageSize, search, refresh]);

  const handleOpenAddDialog = () => {
    setIsEditMode(false);
    setReservationData({
      meetingRoomId: '',
      startTime: null,
      endTime: null,
      status: 'Pending',
      topic: '',
      attendees: ''
    });
    setOpenDialog(true);
  };

  const handleOpenEditDialog = (reservation) => {
    setIsEditMode(true);
    setReservationData(reservation);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const validateForm = (reservation) => {
    let newErrors = {};
    if (!reservation.meetingRoomId) newErrors.meetingRoomId = "Meeting room is required";
    if (!reservation.startTime) newErrors.startTime = "Start time is required";
    if (!reservation.endTime) newErrors.endTime = "End time is required";
    if (!reservation.topic?.trim()) newErrors.topic = "Topic is required";
    if (!reservation.attendees?.trim()) newErrors.attendees = "Attendees are required";
    
    const hasErrors = Object.keys(newErrors).length > 0;
    if (hasErrors) {
      setError(Object.values(newErrors).join(", "));
    } else {
      setError(null);
    }
    return !hasErrors;
  };

  const handleSubmit = async (reservation) => {
    if (!validateForm(reservation)) return;

    try {
      if (isEditMode) {
        await api.post(`/reservations/update`, reservation);
        setReservations(items => items.map(item => item.id === reservation.id ? reservation : item));
        showNotification("Reservation updated successfully", "success");
      } else {
        const response = await api.post("/reservations/create", reservation);
        setReservations(items => [...items, response.data]);
        setTotalCount(count => count + 1);
        showNotification("Reservation added successfully", "success");
      }
      setOpenDialog(false);
      setRefresh(prev => prev + 1);
    } catch (err) {
      showNotification("Failed to submit reservation: " + err, "error");
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

  const handleDeleteClick = (reservation) => {
    setReservationToDelete(reservation);
    setOpenDeleteDialog(true);
  };

  const handleDeleteCancel = () => {
    setOpenDeleteDialog(false);
    setReservationToDelete(null);
  };

  const handleDeleteConfirm = async () => {
    if (!reservationToDelete) return;
    
    try {
      await api.delete(`/reservations/${reservationToDelete.id}`);
      showNotification("Reservation deleted successfully", "success");
      setTotalCount(count => count - 1);
      setOpenDeleteDialog(false);
      setReservationToDelete(null);
      setRefresh(prev => prev + 1);
    } catch (err) {
      showNotification("Failed to delete reservation: " + err, "error");
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>Meeting Reservations</Typography>
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
          New Reservation
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <ReservationListTable
            reservations={reservations}
            onEditClick={handleOpenEditDialog}
            onDeleteClick={handleDeleteClick}
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
        title={isEditMode ? "Edit Reservation" : "Add Reservation"}
      >
        {isEditMode ? (
          <EditReservationForm
            initialData={reservationData}
            onSubmit={handleSubmit}
          />
        ) : (
          <AddReservationForm
            onSubmit={handleSubmit}
          />
        )}
      </GlobalDialog>

      <GlobalDialog
        open={openDeleteDialog}
        onClose={handleDeleteCancel}
        title="Confirm Delete"
      >
        <Typography>
          Are you sure you want to delete this reservation?
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

export default Reservations;