using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MRR.Application.DTOs;
using MRR.Application.Interfaces;
using MRR.Application.Services;
using MRR.Shared.Models;

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

        [HttpPost("create")]
        public async Task<IActionResult> AddMeetingRoom([FromBody] MeetingRoomDTO dto)
        {
            if (await _meetingRoomService.GetMeetingRoomByNameAsync(dto.Name) != null)
            {
                return BadRequest(new { message = $"The meeting room {dto.Name} already exists!" });
            }
            var meetingRoom = await _meetingRoomService.AddMeetingRoomAsync(dto);

            return Ok(meetingRoom);
        }

        [HttpPost("update")]
        public async Task<IActionResult> UpdateMeetingRoom([FromBody] MeetingRoomDTO dto)
        {
            var entity = await _meetingRoomService.GetMeetingRoomByIdAsync(dto.Id);
            if (entity == null)
            {
                return BadRequest(new { message = $"The meeting room {dto.Name} doesn't exist!" });
            }

            var meetingRoom = new Domain.Entities.MeetingRoom
            {
                Id = dto.Id,
                Name = dto.Name,
                AvailableTimeSlots = dto.AvailableTimeSlots,
                Capacity = dto.Capacity,
                Notes = dto.Notes,
                RoomType = dto.RoomType,
                Status = dto.Status
            };
            await _meetingRoomService.UpdateMeetingRoomAsync(meetingRoom);

            return Ok(new { message = "MeetingRoom updating succeeded!" });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMeetingRoom(int id)
        {
            await _meetingRoomService.GetMeetingRoomByIdAsync(id);
            return Ok();
        }


        [HttpGet("paged")]
        public async Task<IActionResult> GetMeetingRooms([FromQuery] PaginationRequest request)
        {
            var meetingRooms = await _meetingRoomService.GetPagedMeetingRooms(request);

            return Ok(meetingRooms);
        }
    }
}
