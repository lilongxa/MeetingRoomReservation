using MRR.Application.Interfaces;
using MRR.Domain.Entities;
using MRR.Infrastructure.Repositories;

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

        public async Task AddMeetingRoomAsync(MeetingRoom room)
        {
            await _repository.AddMeetingRoomAsync(room);
        }

        public async Task UpdateMeetingRoomAsync(MeetingRoom room)
        {
            await _repository.UpdateMeetingRoomAsync(room);
        }

        public async Task DeleteMeetingRoomAsync(int id)
        {
            await _repository.DeleteMeetingRoomAsync(id);
        }
    }
}
