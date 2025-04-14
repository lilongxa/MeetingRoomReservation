using MRR.Domain.Enums;

namespace MRR.Domain.Entities
{
    public class MeetingRoom
    {
        public MeetingRoom() { }
        public int Id { get; set; }
        public string Name { get; set; }
        public int Capacity { get; set; }
        public string Status { get; set; }
        public string RoomType { get; set; }
        public string AvailableTimeSlots { get; set; }
        public string Notes { get; set; }

        public void MarkAsOccupied() => Status = MeetingRoomStatus.Occupied.ToString();
        public void MarkAsAvailable() => Status = MeetingRoomStatus.Available.ToString();

        public MeetingRoom(int id, string name, int capacity)
        {
            Id = id;
            Name = name;
            Capacity = capacity;
            Status = MeetingRoomStatus.Available.ToString();
        }
    }
}
