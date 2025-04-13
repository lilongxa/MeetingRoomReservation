using MRR.Domain.ValueObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MRR.Tests
{
    public class TimeSlotTests
    {
        [Fact]
        public void TimeSlot_Overlap_ShouldReturnTrue_WhenOverlapping()
        {
            var slot1 = new TimeSlot(
                new DateTime(2025, 4, 13, 9, 0, 0),
                new DateTime(2025, 4, 13, 10, 0, 0)
            );

            var slot2 = new TimeSlot(
                new DateTime(2025, 4, 13, 9, 30, 0),
                new DateTime(2025, 4, 13, 10, 30, 0)
            );

            Assert.True(slot1.OverlapsWith(slot2));
        }

        [Fact]
        public void TimeSlot_Overlap_ShouldReturnFalse_WhenNonOverlapping()
        {
            var slot1 = new TimeSlot(
                new DateTime(2025, 4, 13, 9, 0, 0),
                new DateTime(2025, 4, 13, 10, 0, 0)
            );

            var slot2 = new TimeSlot(
                new DateTime(2025, 4, 13, 10, 0, 0),
                new DateTime(2025, 4, 13, 11, 0, 0)
            );

            Assert.False(slot1.OverlapsWith(slot2));
        }

        [Fact]
        public void TimeSlot_InvalidTime_ShouldThrow()
        {
            Assert.Throws<ArgumentException>(() =>
                new TimeSlot(
                    new DateTime(2025, 4, 13, 10, 0, 0),
                    new DateTime(2025, 4, 13, 9, 0, 0)
                )
            );
        }
    }

}
