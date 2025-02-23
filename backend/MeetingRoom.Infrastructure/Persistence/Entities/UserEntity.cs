using SqlSugar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MRR.Infrastructure.Persistence.Entities
{
    [SugarTable("Users")]
    public class UserEntity
    {
        [SugarColumn(IsPrimaryKey = true, IsIdentity = true)]
        public int Id { get; set; }

        [SugarColumn(Length = 50, IsNullable = false)]
        public string Username { get; set; }

        [SugarColumn(Length = 255, IsNullable = false)]
        public string PasswordHash { get; set; }

        [SugarColumn(Length = 20, IsNullable = false)]
        public string Role { get; set; }

        [SugarColumn(Length = 50, IsNullable = false)]
        public string FullName { get; set; }

        [SugarColumn(Length = 50, IsNullable = false)]
        public string Email { get; set; }
    }
}
