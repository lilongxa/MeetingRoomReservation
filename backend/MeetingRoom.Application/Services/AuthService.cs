using MRR.Application.Interfaces;
using MRR.Domain.Entities;
using SqlSugar;
using System.Security.Cryptography;
using System.Text;

namespace MRR.Application.Services
{
    public class AuthService: IAuthService
    {
        private readonly ISqlSugarClient _db;

        public AuthService(ISqlSugarClient db)
        {
            _db = db;
        }

        public async Task<User> GetUserByUsernameAsync(string username)
        {
            return await _db.Queryable<User>().FirstAsync(u => u.Username == username);
        }
        public async Task<User> GetUserByEmailAsync(string email)
        {
            return await _db.Queryable<User>().FirstAsync(u => string.Equals(u.Email,email, StringComparison.OrdinalIgnoreCase));
        }

        public bool VerifyPassword(string password, string hashedPassword)
        {
            using var sha256 = SHA256.Create();
            var hashBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            var hashString = BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
            return hashString == hashedPassword;
        }

        public string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            var hashBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            return BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
        }
        public async Task<bool> CreateUserAsync(string username, string password, string role, string fullName, string email)
        {
            var existingUser = await _db.Queryable<User>().FirstAsync(u => u.Username == username);
            if (existingUser != null)
            {
                return false; 
            }

            var hashedPassword = HashPassword(password);

            var newUser = new User
            {
                Username = username,
                PasswordHash = hashedPassword,
                Role = role,
                FullName = fullName,
                Email = email
            };

            var result = await _db.Insertable(newUser).ExecuteCommandAsync();
            return result > 0;
        }
    }
}
