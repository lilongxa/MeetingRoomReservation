using MRR.Domain.Enums;
using MRR.Domain.ValueObjects;

namespace MRR.Domain.Entities
{
    public class Reservation
    {
        public Reservation() { }
        public int Id { get; set; }
        public int UserId { get; set; }
        public int MeetingRoomId { get; set; }
        public TimeSlot TimeSlot { get; set; }
        public string Topic { get; set; }
        public string Attendees { get; set; }
        public string Status { get; set; }

        public Reservation(int id, int roomId, int userId, string topic, List<string> attendees, TimeSlot slot)
        {
            Id = id;
            MeetingRoomId = roomId;
            UserId = userId;
            Topic = topic;
            Attendees = string.Join("", attendees);
            TimeSlot = slot;
            Status = ReservationStatus.Active.ToString();
        }

        public void Cancel(int userId)
        {
            if (userId != UserId)
                throw new InvalidOperationException("Only the creator can cancel the reservation.");
            Status = ReservationStatus.Cancelled.ToString();
        }

        public bool ConflictsWith(TimeSlot otherSlot)
        {
            return TimeSlot.OverlapsWith(otherSlot);
        }
    }
}
