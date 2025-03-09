using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MRR.Application.Interfaces;
using MRR.Domain.Entities;

namespace MRR.WebAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/reservations")]
    public class ReservationsController : ControllerBase
    {
        private readonly ICurrentUserService _currentUserService;
        private readonly IReservationService _reservationService;

        public ReservationsController(IReservationService reservationService, ICurrentUserService currentUserService)
        {
            _reservationService = reservationService;
            _currentUserService = currentUserService;
        }

        // 创建预约
        [HttpPost]
        public async Task<IActionResult> CreateReservation([FromBody] Reservation reservation)
        {
            try
            {
                var booking = await _reservationService.MakeReservation(reservation);
                return CreatedAtAction(nameof(GetReservationById), new { id = booking.Id }, booking);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // 获取用户的所有预约记录
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetUserReservations(int userId)
        {
            var bookings = await _reservationService.GetUserReservations(userId);
            return Ok(bookings);
        }

        // 获取单个预约记录
        [HttpGet("{id}")]
        public async Task<IActionResult> GetReservationById(int id)
        {
            var booking = await _reservationService.GetReservationById(id);
            return booking == null ? NotFound() : Ok(booking);
        }

        // 修改预约状态（如取消预约）
        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateReservationStatus(int id, [FromBody] string status)
        {
            var userId = int.Parse(_currentUserService.UserId);
            await _reservationService.UpdateReservationStatus(id, userId, status);
            return NoContent();
        }
    }
}
