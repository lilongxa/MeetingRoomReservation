using SqlSugar;

namespace MRR.Infrastructure.Persistence.Entities
{
    [SugarTable("MeetingRooms")]
    public class MeetingRoomEntity
    {
        [SugarColumn(IsPrimaryKey = true, IsIdentity = true)]
        public int Id { get; set; }

        public string Name { get; set; }

        public int Capacity { get; set; }

        public string Status { get; set; } 

        public string RoomType { get; set; }

        public string AvailableTimeSlots { get; set; }

        public string Notes { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
