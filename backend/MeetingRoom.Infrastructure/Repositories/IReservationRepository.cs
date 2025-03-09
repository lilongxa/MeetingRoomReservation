using MRR.Domain.Entities;
using MRR.Shared.Models;

namespace MRR.Infrastructure.Repositories
{
    public interface IReservationRepository
    {
        Task<IEnumerable<Reservation>> GetUserReservationsAsync(int userId);
        Task<bool> HasOverlappingReservationAsync(Reservation reservation);
        Task<Reservation> AddReservationAsync(Reservation reservation);
        Task<Reservation> GetReservationByIdAsync(int reservationId);
        Task<Reservation> GetReservationByIdAsync(int reservationId, int userId);
        Task UpdateReservationAsync(Reservation reservation);
        Task<PaginationResponse<Reservation>> GetPagedReservations(PaginationRequest request);
    }
}
