using MRR.Domain.Entities;
using MRR.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MRR.Tests
{
    public class MeetingRoomTests
    {
        [Fact]
        public void MeetingRoom_ShouldBeAvailable_WhenCreated()
        {
            // Arrange
            var room = new MeetingRoom(1, "Room A", 10);

            // Assert
            Assert.Equal(MeetingRoomStatus.Available.ToString(), room.Status);
            Assert.Equal("Room A", room.Name);
            Assert.Equal(10, room.Capacity);
        }

        [Fact]
        public void MarkAsOccupied_ShouldSetStatusToOccupied()
        {
            // Arrange
            var room = new MeetingRoom(1, "Room B", 5);

            // Act
            room.MarkAsOccupied();

            // Assert
            Assert.Equal(MeetingRoomStatus.Occupied.ToString(), room.Status);
        }

        [Fact]
        public void MarkAsAvailable_ShouldSetStatusToAvailable()
        {
            // Arrange
            var room = new MeetingRoom(1, "Room C", 8);
            room.MarkAsOccupied();

            // Act
            room.MarkAsAvailable();

            // Assert
            Assert.Equal(MeetingRoomStatus.Available.ToString(), room.Status);
        }

        [Fact]
        public void MeetingRoom_ShouldHaveCorrectProperties()
        {
            var id = 1;
            var name = "Conference Room";
            var capacity = 20;

            var room = new MeetingRoom(id, name, capacity);

            Assert.Equal(id, room.Id);
            Assert.Equal(name, room.Name);
            Assert.Equal(capacity, room.Capacity);
        }
    }
}
