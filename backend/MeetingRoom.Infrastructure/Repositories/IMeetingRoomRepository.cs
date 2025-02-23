using MRR.Domain.Entities;

namespace MRR.Infrastructure.Repositories
{
    public interface IMeetingRoomRepository
    {
        Task<IEnumerable<MeetingRoom>> GetMeetingRoomsAsync();
        Task<MeetingRoom> GetMeetingRoomByIdAsync(int meetingRoomId);
        Task AddMeetingRoomAsync(MeetingRoom meetingRoom);
        Task UpdateMeetingRoomAsync(MeetingRoom meetingRoom);
        Task DeleteMeetingRoomAsync(int meetingRoomId);
    }
}
