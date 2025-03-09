const mockMeetingRooms = [
  { 
    id: 1, 
    name: 'Main Conference Room',
    capacity: 30,
    description: 'Large conference room suitable for team meetings and presentations',
    status: 'Available',
    roomType: 'Conference',
    availableTimeSlots: '09:00-18:00',
    notes: 'Equipped with modern presentation facilities'
  },
  { 
    id: 2, 
    name: 'Executive Board Room',
    capacity: 15,
    description: 'Premium meeting room for executive meetings',
    status: 'Available',
    roomType: 'Board Room',
    availableTimeSlots: '09:00-18:00',
    notes: 'Advance booking required'
  },
  { 
    id: 3, 
    name: 'Training Room',
    capacity: 40,
    description: 'Spacious room for training sessions',
    status: 'Available',
    roomType: 'Training',
    availableTimeSlots: '09:00-18:00',
    notes: '20 training computers available'
  }
];

const generateMockReservations = () => {
  const reservations = [];
  const startDate = new Date();
  startDate.setHours(9, 0, 0, 0);

  mockMeetingRooms.forEach(room => {
    for (let i = 0; i < 5; i++) {
      const startTime = new Date(startDate);
      startTime.setDate(startTime.getDate() + Math.floor(i / 2));
      startTime.setHours(9 + (i * 2));
      
      const endTime = new Date(startTime);
      endTime.setHours(startTime.getHours() + 1);

      reservations.push({
        id: room.id * 100 + i,
        meetingRoomId: room.id,
        meetingRoomName: room.name,
        topic: `Meeting ${i + 1} in ${room.name}`,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        status: ['Pending', 'Approved', 'Rejected'][Math.floor(Math.random() * 3)],
        attendees: 'John Doe, Jane Smith'
      });
    }
  });

  return reservations;
};

const mockReservations = generateMockReservations();

export const mockApi = {
  get: async (endpoint, config = {}) => {
    await new Promise(resolve => setTimeout(resolve, 500));

    if (endpoint === '/meetingrooms') {
      return { data: mockMeetingRooms };
    }

    if (endpoint === '/meetingrooms/paged') {
      const { pageNumber = 1, pageSize = 10, search = '' } = config.params || {};
      let filteredRooms = mockMeetingRooms;
      
      if (search) {
        filteredRooms = mockMeetingRooms.filter(
          r => r.name.toLowerCase().includes(search.toLowerCase()) ||
               r.description.toLowerCase().includes(search.toLowerCase()) ||
               r.notes.toLowerCase().includes(search.toLowerCase())
        );
      }

      const start = (pageNumber - 1) * pageSize;
      const items = filteredRooms.slice(start, start + pageSize);
      
      return {
        data: {
          items,
          totalCount: filteredRooms.length,
          pageNumber,
          pageSize
        }
      };
    }

    if (endpoint === '/reservations') {
      const { meetingRoomId } = config.params || {};
      let filteredReservations = mockReservations;
      
      if (meetingRoomId) {
        filteredReservations = mockReservations.filter(
          r => r.meetingRoomId === parseInt(meetingRoomId)
        );
      }
      
      return { data: filteredReservations };
    }

    if (endpoint === '/reservations/paged') {
      const { pageNumber = 1, pageSize = 10, search = '' } = config.params || {};
      let filteredReservations = mockReservations;
      
      if (search) {
        filteredReservations = mockReservations.filter(
          r => r.topic.toLowerCase().includes(search.toLowerCase()) ||
               r.attendees.toLowerCase().includes(search.toLowerCase())
        );
      }

      const start = (pageNumber - 1) * pageSize;
      const items = filteredReservations.slice(start, start + pageSize);
      
      return {
        data: {
          items,
          totalCount: filteredReservations.length,
          pageNumber,
          pageSize
        }
      };
    }

    throw new Error(`Endpoint not mocked: ${endpoint}`);
  },

  post: async (endpoint, data) => {
    await new Promise(resolve => setTimeout(resolve, 500));

    if (endpoint === '/meetingrooms/create') {
      const newRoom = {
        id: Date.now(),
        ...data
      };
      mockMeetingRooms.push(newRoom);
      return { data: newRoom };
    }

    if (endpoint === '/meetingrooms/update') {
      const index = mockMeetingRooms.findIndex(r => r.id === data.id);
      if (index !== -1) {
        mockMeetingRooms[index] = { ...mockMeetingRooms[index], ...data };
        return { data: mockMeetingRooms[index] };
      }
    }

    if (endpoint === '/reservations/create') {
      const newReservation = {
        id: Date.now(),
        ...data,
        meetingRoomName: mockMeetingRooms.find(r => r.id === data.meetingRoomId)?.name
      };
      mockReservations.push(newReservation);
      return { data: newReservation };
    }

    if (endpoint === '/reservations/update') {
      const index = mockReservations.findIndex(r => r.id === data.id);
      if (index !== -1) {
        mockReservations[index] = { ...mockReservations[index], ...data };
        return { data: mockReservations[index] };
      }
    }

    throw new Error(`Endpoint not mocked: ${endpoint}`);
  },

  delete: async (endpoint) => {
    await new Promise(resolve => setTimeout(resolve, 500));

    if (endpoint.startsWith('/meetingrooms/')) {
      const id = parseInt(endpoint.split('/').pop());
      const index = mockMeetingRooms.findIndex(r => r.id === id);
      if (index !== -1) {
        mockMeetingRooms.splice(index, 1);
        return { data: { success: true } };
      }
    }

    if (endpoint.startsWith('/reservations/')) {
      const id = parseInt(endpoint.split('/').pop());
      const index = mockReservations.findIndex(r => r.id === id);
      if (index !== -1) {
        mockReservations.splice(index, 1);
        return { data: { success: true } };
      }
    }

    throw new Error(`Endpoint not mocked: ${endpoint}`);
  }
};