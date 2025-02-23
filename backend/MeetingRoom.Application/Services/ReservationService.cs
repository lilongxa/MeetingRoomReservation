using MRR.Application.Interfaces;
using MRR.Domain.Entities;
using MRR.Infrastructure.Repositories;

namespace MRR.Application.Services
{
    public class ReservationService: IReservationService
    {
        private readonly IReservationRepository _reservationRepository;

        public ReservationService(IReservationRepository reservationRepository)
        {
            _reservationRepository = reservationRepository;
        }

        public async Task<IEnumerable<Reservation>> GetUserReservations(int userId)
        {
            var entity = await _reservationRepository.GetUserReservationsAsync(userId);
            return entity.Select(e => new Reservation()
            {
                Id = e.Id,
                UserId = e.UserId,
                MeetingRoomId = e.MeetingRoomId,
                StartTime = e.StartTime,
                EndTime = e.EndTime,
                Topic = e.Topic,
                Attendees = e.Attendees,
                Status = e.Status
            });
        }

        public async Task<Reservation> MakeReservation(Reservation reservation)
        {
            if (await _reservationRepository.HasOverlappingReservationAsync(reservation))
            {
                return null;
            }

            var savedReservation = await _reservationRepository.AddReservationAsync(reservation);
            return savedReservation;
        }

        public async Task<bool> CancelReservation(int reservationId, int userId)
        {
            var reservation = await _reservationRepository.GetReservationByIdAsync(reservationId, userId);
            if (reservation == null) return false;

            reservation.Status = "Cancelled";
            await _reservationRepository.UpdateReservationAsync(reservation);
            return true;
        }

        public async Task<bool> UpdateReservationStatus(int reservationId, int userId, string status)
        {
            var reservation = await _reservationRepository.GetReservationByIdAsync(reservationId, userId);
            if (reservation == null) return false;

            reservation.Status = status;
            await _reservationRepository.UpdateReservationAsync(reservation);
            return true;
        }

        public async Task<Reservation> GetReservationById(int reservationId, int userId)
        {
            var reservation = await _reservationRepository.GetReservationByIdAsync(reservationId, userId);
            return reservation;
        }

        public async Task<Reservation> GetReservationById(int reservationId)
        {
            var reservation = await _reservationRepository.GetReservationByIdAsync(reservationId);
            return reservation;
        }
    }
}
