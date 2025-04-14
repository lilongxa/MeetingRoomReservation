using MRR.Application.Interfaces;
using MRR.Domain.Entities;
using MRR.Infrastructure.Persistence.Entities;
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
            var entity =  await _db.Queryable<UserEntity>().FirstAsync(u => u.Username == username);

            return entity == null? null:UserEntity.MapToDomain(entity);
        }
        public async Task<User> GetUserByEmailAsync(string email)
        {
            var entity = await _db.Queryable<UserEntity>().FirstAsync(u => string.Equals(u.Email,email, StringComparison.OrdinalIgnoreCase));
            return UserEntity.MapToDomain(entity);
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
        public async Task<User> CreateUserAsync(string username, string password, string role, string fullName, string email)
        {
            var existingUser = await _db.Queryable<UserEntity>().FirstAsync(u => u.Username == username);
            if (existingUser != null)
            {
                return null; 
            }

            var hashedPassword = HashPassword(password);

            var newUser = new UserEntity
            {
                Username = username,
                PasswordHash = hashedPassword,
                Role = role,
                FullName = fullName,
                Email = email
            };

            var result = await _db.Insertable(newUser).ExecuteReturnEntityAsync();
            return UserEntity.MapToDomain(result);
        }
    }
}
