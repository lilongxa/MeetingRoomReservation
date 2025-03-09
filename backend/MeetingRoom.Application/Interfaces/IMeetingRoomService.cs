using MRR.Application.DTOs;
using MRR.Domain.Entities;
using MRR.Shared.Models;
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
        Task<MeetingRoom> GetMeetingRoomByNameAsync(string name);
        Task<MeetingRoom> AddMeetingRoomAsync(MeetingRoomDTO dto);
        Task UpdateMeetingRoomAsync(MeetingRoom meetingRoom);
        Task DeleteMeetingRoomAsync(int meetingRoomId);
        Task<PaginationResponse<MeetingRoom>> GetPagedMeetingRooms(PaginationRequest request);
    }
}
