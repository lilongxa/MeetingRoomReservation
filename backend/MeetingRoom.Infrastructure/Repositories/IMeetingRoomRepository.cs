using MRR.Domain.Entities;
using MRR.Shared.Models;

namespace MRR.Infrastructure.Repositories
{
    public interface IMeetingRoomRepository
    {
        Task<IEnumerable<MeetingRoom>> GetMeetingRoomsAsync();
        Task<MeetingRoom> GetMeetingRoomByNameAsync(string name);
        Task<MeetingRoom> GetMeetingRoomByIdAsync(int meetingRoomId);
        Task<MeetingRoom> AddMeetingRoomAsync(MeetingRoom meetingRoom);
        Task UpdateMeetingRoomAsync(MeetingRoom meetingRoom);
        Task DeleteMeetingRoomAsync(int meetingRoomId);
        Task<PaginationResponse<MeetingRoom>> GetMeetingRooms(PaginationRequest request);

    }
}
