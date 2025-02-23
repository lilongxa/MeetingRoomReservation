using MRR.Domain.Entities;
using MRR.Infrastructure.Persistence.Entities;
using SqlSugar;

namespace MRR.Infrastructure.Repositories
{
    public class MeetingRoomRepository(ISqlSugarClient db) : Repository<MeetingRoomEntity>(db), IMeetingRoomRepository
    {
        private readonly ISqlSugarClient _db;

        public async Task AddMeetingRoomAsync(MeetingRoom meetingRoom)
        {
            await this.AddAsync(MapToEntity(meetingRoom));
        }

        public async Task DeleteMeetingRoomAsync(int meetingRoomId)
        {
            await this.DeleteAsync(meetingRoomId);
        }

        public async Task<MeetingRoom> GetMeetingRoomByIdAsync(int meetingRoomId)
        {
            var entity =  await this.GetByIdAsync(meetingRoomId);
            return MapToDomain(entity);
        }

        public async Task<IEnumerable<MeetingRoom>> GetMeetingRoomsAsync()
        {
            var entities =  await this.GetAllAsync();
            return entities.Select(MapToDomain);
        }

        public async Task UpdateMeetingRoomAsync(MeetingRoom meetingRoom)
        {
            await this.UpdateAsync(MapToEntity(meetingRoom));
        }

        private static MeetingRoom MapToDomain(MeetingRoomEntity entity)
        {
            return new MeetingRoom
            {
                Id = entity.Id,
                Name = entity.Name,
                Capacity = entity.Capacity,
                Status = entity.Status,
                RoomType = entity.RoomType,
                AvailableTimeSlots = entity.AvailableTimeSlots,
                Notes = entity.Notes
            };
        }

        private static MeetingRoomEntity MapToEntity(MeetingRoom meetingRoom)
        {
            return new MeetingRoomEntity
            {
                Id = meetingRoom.Id,
                Name = meetingRoom.Name,
                Capacity = meetingRoom.Capacity,
                Status = meetingRoom.Status,
                RoomType = meetingRoom.RoomType,
                AvailableTimeSlots = meetingRoom.AvailableTimeSlots,
                Notes = meetingRoom.Notes
            };
        }
    }
}
