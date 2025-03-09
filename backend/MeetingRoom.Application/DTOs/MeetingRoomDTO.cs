using Newtonsoft.Json;

namespace MRR.Application.DTOs
{
    public class MeetingRoomDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Capacity { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
        public string RoomType { get; set; }
        public string AvailableTimeSlots { get; set; }
        public string Notes { get; set; }
    }
}
