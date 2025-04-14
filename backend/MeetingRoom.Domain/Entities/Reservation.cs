namespace MRR.Domain.Entities
{
    public class Reservation
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int MeetingRoomId { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string Topic { get; set; }
        public string Attendees { get; set; }
        public string Status { get; set; }
    }
}
