using MRR.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MRR.Application.Interfaces
{
    public interface IAuthService
    {
        Task<User> GetUserByEmailAsync(string email);
        Task<User> GetUserByUsernameAsync(string username);
        bool VerifyPassword(string password, string hashedPassword);
        string HashPassword(string password);
        Task<User> CreateUserAsync(string username, string password, string role, string fullName, string email);
    }
}
