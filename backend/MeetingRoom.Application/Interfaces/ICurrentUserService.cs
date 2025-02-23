using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MRR.Application.Interfaces
{
    public interface ICurrentUserService
    {
        string UserId { get; }
        string Username { get; }
        string Role { get; }
    }
}
