using MRR.Domain.Entities;
using MRR.Infrastructure.Persistence.Entities;
using MRR.Shared.Models;
using SqlSugar;
using System.Runtime.CompilerServices;

namespace MRR.Infrastructure.Repositories
{
    public class MeetingRoomRepository(ISqlSugarClient db) : Repository<MeetingRoomEntity>(db), IMeetingRoomRepository
    {
        private readonly ISqlSugarClient _db;

        public async Task<MeetingRoom> AddMeetingRoomAsync(MeetingRoom meetingRoom)
        {
            var entity = await  this.AddAsync(MapToEntity(meetingRoom));
            return MapToDomain(entity);
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
        public async Task<MeetingRoom> GetMeetingRoomByNameAsync(string name)
        { 
             var entity = await this._db.Queryable<MeetingRoomEntity>().Where(x => x.Name == name).FirstAsync();
            return MapToDomain(entity);
        }

        public async Task<IEnumerable<MeetingRoom>> GetMeetingRoomsAsync()
        {
            var entities =  await this.GetAllAsync();
            return entities.Select(MapToDomain);
        }

        public async Task UpdateMeetingRoomAsync(MeetingRoom meetingRoom)
        {
            var entity = MapToEntity(meetingRoom);
            await _db.Updateable(entity).UpdateColumns(dt=>new 
            {
                dt.Name,
                dt.RoomType,
                dt.AvailableTimeSlots, 
                dt.Capacity, 
                dt.Status, 
                dt.UpdatedAt 
            }).ExecuteCommandAsync();
        }

        public async Task<PaginationResponse<MeetingRoom>> GetMeetingRooms(PaginationRequest request)
        {
            var query = _db.Queryable<MeetingRoomEntity>();

            if (!string.IsNullOrEmpty(request.Search))
            {
                query = query.Where(u => u.Name.Contains(request.Search));
            }

            if (!string.IsNullOrEmpty(request.SortField))
            {
                bool isDescending = request.SortOrder?.ToLower() == "desc";
                query = isDescending ? query.OrderBy($"{request.SortField} desc") : query.OrderBy($"{request.SortField} asc");
            }

            int totalCount = await query.CountAsync();
            var entities = await query.Skip((request.PageNumber - 1) * request.PageSize)
                                   .Take(request.PageSize)
                                   .ToListAsync();

            var response = new PaginationResponse<MeetingRoom>
            {
                Items = entities.Select(MapToDomain).ToList(),
                TotalCount = totalCount,
                PageNumber = request.PageNumber,
                PageSize = request.PageSize
            };

            return response;
        }

        private static MeetingRoom MapToDomain(MeetingRoomEntity entity)
        {
            if (entity == null)
            {
                return null;
            }

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

        private MeetingRoomEntity MapToEntity(MeetingRoom meetingRoom)
        {
            if (meetingRoom == null) {
                return null;
            }

            return new MeetingRoomEntity
            {
                Id = meetingRoom.Id,
                Name = meetingRoom.Name,
                Capacity = meetingRoom.Capacity,
                Status = meetingRoom.Status,
                RoomType = meetingRoom.RoomType,
                AvailableTimeSlots = meetingRoom.AvailableTimeSlots,
                Notes = meetingRoom.Notes,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now
            };
        }
    }
}
