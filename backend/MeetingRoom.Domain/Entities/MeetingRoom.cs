namespace MRR.Domain.Entities
{
    public class MeetingRoom
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Capacity { get; set; }
        public string Status { get; set; }
        public string RoomType { get; set; }
        public string AvailableTimeSlots { get; set; }
        public string Notes { get; set; }
    }
}
