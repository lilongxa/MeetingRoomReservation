using MRR.Domain.Entities;
using MRR.Domain.Enums;
using MRR.Domain.ValueObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MRR.Tests
{
    public class ReservationTests
    {
        [Fact]
        public void CancelReservation_ByCreator_ShouldSetStatusToCancelled()
        {
            var userId = 1;
            var reservation = new Reservation(
                1,
                2,
                userId,
                "Weekly Meeting",
                new List<string>(),
                new TimeSlot(DateTime.Now, DateTime.Now.AddHours(1))
            );

            reservation.Cancel(userId);

            Assert.Equal(ReservationStatus.Cancelled.ToString(), reservation.Status);
        }

        [Fact]
        public void CancelReservation_ByOtherUser_ShouldThrow()
        {
            var creatorId = 1;
            var otherUserId = 2;

            var reservation = new Reservation(
                1,
                2,
                creatorId,
                "Internal Sync",
                new List<string>(),
                new TimeSlot(DateTime.Now, DateTime.Now.AddHours(1))
            );

            Assert.Throws<InvalidOperationException>(() =>
                reservation.Cancel(otherUserId)
            );
        }
    }

}
