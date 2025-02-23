using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MRR.Application.Interfaces;
using MRR.Application.Services;
using MRR.Domain.Entities;

namespace MRR.WebAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/meetingrooms")]
    public class MeetingRoomController : ControllerBase
    {
        private readonly IMeetingRoomService _meetingRoomService;

        public MeetingRoomController(MeetingRoomService meetingRoomService)
        {
            _meetingRoomService = meetingRoomService;
        }

        [HttpGet]
        public async Task<IActionResult> GetRooms()
        {
            var rooms = await _meetingRoomService.GetMeetingRoomsAsync();
            return Ok(rooms);
        }

        [HttpPost]
        public async Task<IActionResult> AddRoom([FromBody] MeetingRoom room)
        {
            await _meetingRoomService.AddMeetingRoomAsync(room);
            return Ok();
        }
    }
}
