using MRR.Domain.Entities;

namespace MRR.Application.Interfaces
{
    public interface IReservationService
    {
        Task<IEnumerable<Reservation>> GetUserReservations(int userId);
        Task<Reservation> GetReservationById(int reservationId);
        Task<Reservation> MakeReservation(Reservation reservation);
        Task<bool> CancelReservation(int reservationId, int userId);
        Task<bool> UpdateReservationStatus(int reservationId, int userId, string status);
    }
}
