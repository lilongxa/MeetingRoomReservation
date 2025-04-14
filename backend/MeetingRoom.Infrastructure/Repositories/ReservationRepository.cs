using MRR.Domain.Entities;
using MRR.Infrastructure.Persistence.Entities;
using MRR.Shared.Models;
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
                            r.StartTime < reservation.TimeSlot.End &&
                            reservation.TimeSlot.Start < r.EndTime)
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

        public async Task<PaginationResponse<Reservation>> GetPagedReservations(PaginationRequest request)
        {
            var query = _db.Queryable<ReservationEntity>();

            if (!string.IsNullOrEmpty(request.Search))
            {
                query = query.Where(u => u.Topic.Contains(request.Search));
            }

            if (!string.IsNullOrEmpty(request.SortField))
            {
                bool isDescending = request.SortOrder?.ToLower() == "desc";
                query = isDescending ? query.OrderBy($"{request.SortField} desc") : query.OrderBy($"{request.SortField} asc");
            }

            int totalCount = await query.CountAsync();
            var entities = await query.Skip((request.PageNumber - 1) * request.PageSize)
                                   .Take(request.PageSize)
                                   .ToListAsync();

            var response = new PaginationResponse<Reservation>
            {
                Items = entities.Select(MapToDomain).ToList(),
                TotalCount = totalCount,
                PageNumber = request.PageNumber,
                PageSize = request.PageSize
            };

            return response;
        }
        private Reservation MapToDomain(ReservationEntity entity)
        {
            return new Reservation()
            {
                Id = entity.Id,
                UserId = entity.UserId,
                MeetingRoomId = entity.MeetingRoomId,
                TimeSlot = new Domain.ValueObjects.TimeSlot(entity.StartTime, entity.EndTime),
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
                StartTime = reservation.TimeSlot.Start,
                EndTime = reservation.TimeSlot.End,
                Topic = reservation.Topic,
                Attendees = reservation.Attendees,
                Status = reservation.Status
            };
        }
    }
}
