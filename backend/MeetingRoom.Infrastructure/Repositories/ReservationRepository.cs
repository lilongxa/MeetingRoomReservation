using MRR.Domain.Entities;
using MRR.Infrastructure.Persistence.Entities;
using SqlSugar;

namespace MRR.Infrastructure.Repositories
{
    public class ReservationRepository : Repository<ReservationEntity>, IReservationRepository
    {
        private readonly ISqlSugarClient _db;

        public ReservationRepository(ISqlSugarClient db):base(db)
        {
            _db = db;
        }

        public async Task<IEnumerable<Reservation>> GetUserReservationsAsync(int userId)
        {
            return await _db.Queryable<ReservationEntity>()
                .Where(r => r.UserId == userId)
                .Select(x => MapToDomain(x))
                .ToListAsync();
        }

        public async Task<bool> HasOverlappingReservationAsync(Reservation reservation)
        {
            return await _db.Queryable<ReservationEntity>()
                .Where(r => r.MeetingRoomId == reservation.MeetingRoomId &&
                            r.StartTime < reservation.EndTime &&
                            reservation.StartTime < r.EndTime)
                .AnyAsync();
        }

        public async Task<Reservation> AddReservationAsync(Reservation reservation)
        {
            var entity = await _db.Insertable(MapToEntity(reservation)).ExecuteReturnEntityAsync();
            return MapToDomain(entity);
        }

        public async Task<Reservation> GetReservationByIdAsync(int reservationId, int userId)
        {
            var entity = await _db.Queryable<ReservationEntity>()
                .FirstAsync(r => r.Id == reservationId && r.UserId == userId);

            return entity == null ? null : MapToDomain(entity);
        }

        public async Task<Reservation> GetReservationByIdAsync(int reservationId)
        {
            var entity = await _db.Queryable<ReservationEntity>()
                .FirstAsync(r => r.Id == reservationId);

            return entity == null ? null : MapToDomain(entity);
        }

        public async Task UpdateReservationAsync(Reservation reservation)
        {
            await _db.Updateable(MapToEntity(reservation)).ExecuteCommandAsync();
        }

        private Reservation MapToDomain(ReservationEntity entity)
        {
            return new Reservation()
            {
                Id = entity.Id,
                UserId = entity.UserId,
                MeetingRoomId = entity.MeetingRoomId,
                StartTime = entity.StartTime,
                EndTime = entity.EndTime,
                Topic = entity.Topic,
                Attendees = entity.Attendees,
                Status = entity.Status
            };
        }

        private ReservationEntity MapToEntity(Reservation reservation)
        {
            return new ReservationEntity()
            {
                Id = reservation.Id,
                UserId = reservation.UserId,
                MeetingRoomId = reservation.MeetingRoomId,
                StartTime = reservation.StartTime,
                EndTime = reservation.EndTime,
                Topic = reservation.Topic,
                Attendees = reservation.Attendees,
                Status = reservation.Status
            };
        }
    }
}
