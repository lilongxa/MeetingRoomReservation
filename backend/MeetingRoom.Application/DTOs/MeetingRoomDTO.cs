using Newtonsoft.Json;

namespace MRR.Application.DTOs
{
    public class MeetingRoomDTO
    {
        [JsonProperty("id")]
        public int Id { get; set; }
        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("capacity")]
        public int Capacity { get; set; }
        [JsonProperty("description")]
        public string Description { get; set; }
        [JsonProperty("status")]
        public string Status { get; set; }
        [JsonProperty("roomType")]
        public string RoomType { get; set; }
        [JsonProperty("availableTimeSlots")]
        public string AvailableTimeSlots { get; set; }
        [JsonProperty("notes")]
        public string Notes { get; set; }
    }
}
