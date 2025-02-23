using MRR.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MRR.Application.Interfaces
{
    public interface IMeetingRoomService
    {
        Task<IEnumerable<MeetingRoom>> GetMeetingRoomsAsync();
        Task<MeetingRoom> GetMeetingRoomByIdAsync(int meetingRoomId);
        Task AddMeetingRoomAsync(MeetingRoom meetingRoom);
        Task UpdateMeetingRoomAsync(MeetingRoom meetingRoom);
        Task DeleteMeetingRoomAsync(int meetingRoomId);
    }
}
