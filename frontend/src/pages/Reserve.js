import React, { useState, useEffect } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import api from '../api/api';

const Reserve = () => {
  const [selectedRoom, setSelectedRoom] = useState('');
  const [meetingRooms, setMeetingRooms] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeetingRooms = async () => {
      try {
        const response = await api.get('/meetingrooms');
        setMeetingRooms(response.data || []);
        if (response.data?.length > 0) {
          setSelectedRoom(response.data[0].id);
        }
      } catch (error) {
        console.error('Failed to fetch meeting rooms:', error);
      }
    };
    fetchMeetingRooms();
  }, []);

  useEffect(() => {
    const fetchReservations = async () => {
      if (!selectedRoom) return;
      
      try {
        setLoading(true);
        const response = await api.get('/reservations', {
          params: { meetingRoomId: selectedRoom }
        });
        
        // Convert reservation data to calendar events format
        const events = (response.data || []).map(reservation => ({
          id: reservation.id,
          title: `${reservation.topic} (${reservation.attendees})`,
          start: reservation.startTime,
          end: reservation.endTime,
          backgroundColor: getStatusColor(reservation.status),
          extendedProps: {
            status: reservation.status,
            attendees: reservation.attendees
          }
        }));
        
        setReservations(events);
      } catch (error) {
        console.error('Failed to fetch reservations:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchReservations();
  }, [selectedRoom]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return '#4caf50';
      case 'Rejected':
        return '#f44336';
      case 'Pending':
      default:
        return '#ff9800';
    }
  };

  const handleRoomChange = (event) => {
    setSelectedRoom(event.target.value);
  };

  const handleEventClick = (clickInfo) => {
    const event = clickInfo.event;
    console.log('Event clicked:', {
      id: event.id,
      title: event.title,
      start: event.start,
      end: event.end,
      status: event.extendedProps.status,
      attendees: event.extendedProps.attendees
    });
    // Add event click handler here, e.g., show detail dialog
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Meeting Room Calendar
      </Typography>
      
      <Box sx={{ mb: 3, maxWidth: 300 }}>
        <FormControl fullWidth>
          <InputLabel>Meeting Room</InputLabel>
          <Select
            value={selectedRoom}
            onChange={handleRoomChange}
            label="Meeting Room"
          >
            {meetingRooms.map((room) => (
              <MenuItem key={room.id} value={room.id}>
                {room.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ 
        '.fc': {
          fontFamily: 'inherit',
        },
        '.fc-event': {
          cursor: 'pointer',
          '&:hover': {
            opacity: 0.9,
          },
        },
        '.fc-toolbar-title': {
          fontSize: '1.2rem',
        },
        '.fc-timegrid-event-harness': {
          margin: '0 2px',
        },
        '.fc-timegrid-event': {
          padding: '4px',
        },
      }}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          events={reservations}
          eventClick={handleEventClick}
          slotMinTime="07:00:00"
          slotMaxTime="22:00:00"
          allDaySlot={false}
          height="auto"
          expandRows={true}
          stickyHeaderDates={true}
          nowIndicator={true}
        />
      </Box>
    </Box>
  );
};

export default Reserve;