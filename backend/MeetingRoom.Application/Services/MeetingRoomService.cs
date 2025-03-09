using MRR.Application.DTOs;
using MRR.Application.Interfaces;
using MRR.Domain.Entities;
using MRR.Infrastructure.Persistence.Entities;
using MRR.Infrastructure.Repositories;
using MRR.Shared.Models;

namespace MRR.Application.Services
{
    public class MeetingRoomService : IMeetingRoomService
    {
        private readonly IMeetingRoomRepository _repository;

        public MeetingRoomService(IMeetingRoomRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<MeetingRoom>> GetMeetingRoomsAsync()
        {
            return await _repository.GetMeetingRoomsAsync();
        }
   
        public async Task<MeetingRoom> GetMeetingRoomByIdAsync(int id)
        {
            return await _repository.GetMeetingRoomByIdAsync(id);
        }

        public async Task<MeetingRoom> GetMeetingRoomByNameAsync(string name)
        {
            return await _repository.GetMeetingRoomByNameAsync(name);
        }

        public async Task<MeetingRoom> AddMeetingRoomAsync(MeetingRoomDTO dto)
        {
            var room = new MeetingRoom
            {
                Name = dto.Name,
                Capacity = dto.Capacity,
                Status = dto.Status,
                RoomType = dto.RoomType,
                AvailableTimeSlots = dto.AvailableTimeSlots,
                Notes = dto.Notes
            };
            return await _repository.AddMeetingRoomAsync(room);
        }

        public async Task UpdateMeetingRoomAsync(MeetingRoom room)
        {
            await _repository.UpdateMeetingRoomAsync(room);
        }

        public async Task DeleteMeetingRoomAsync(int id)
        {
            await _repository.DeleteMeetingRoomAsync(id);
        }

        public async Task<PaginationResponse<MeetingRoom>> GetPagedMeetingRooms(PaginationRequest request)
        { 
            return await _repository.GetMeetingRooms(request);
        }
    }
}
