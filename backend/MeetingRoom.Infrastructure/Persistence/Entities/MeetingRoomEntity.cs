using SqlSugar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MRR.Infrastructure.Persistence.Entities
{
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
    }
}
