using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MRR.Domain.ValueObjects
{
    public class TimeSlot
    {
        public DateTime Start { get; }
        public DateTime End { get; }

        public TimeSlot(DateTime start, DateTime end)
        {
            if (end <= start)
                throw new ArgumentException("End time must be after start time.");
            Start = start;
            End = end;
        }

        public bool OverlapsWith(TimeSlot other)
        {
            return Start < other.End && End > other.Start;
        }
    }

}
