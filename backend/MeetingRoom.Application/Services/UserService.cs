using MRR.Application.DTOs;
using MRR.Application.Interfaces;
using MRR.Domain.Entities;
using MRR.Infrastructure.Persistence.Entities;
using MRR.Infrastructure.Repositories;
using MRR.Shared.Models;
using SqlSugar;

namespace MRR.Application.Services
{
    public class UserService : IUserService
    {
        private readonly ISqlSugarClient _db;
        private readonly IUserRepository _userRepository;
        private readonly IPasswordHasher _passwordHasher;

        public UserService(IUserRepository userRepository, ISqlSugarClient db, IPasswordHasher passwordHasher)
        {
            _db = db;
            _userRepository = userRepository;
            _passwordHasher = passwordHasher;
        }

        public async Task<User> GetUserByIdAsync(int id)
        {
            var user = await _userRepository.GetUserById(id);
            return user;
        }

        public async Task RegisterUserAsync(User user)
        {
            await _userRepository.AddUser(user);
        }

        public async Task UpdateUserAsync(User user)
        {
            await _userRepository.UpdateUser(user);
        }

        public async Task DeleteUserAsync(int id)
        {
            await _userRepository.DeleteUser(id);
        }

        public async Task<User> CreateAsync(string username, string password, string role, string fullName, string email)
        {
            var existingUser = await _db.Queryable<UserEntity>().FirstAsync(u => u.Username == username);
            if (existingUser != null)
            {
                return null;
            }

            var hashedPassword = _passwordHasher.Hash(password);

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

        public async Task<PaginationResponse<User>> GetUsers(PaginationRequest request)
        {
            var query = _db.Queryable<UserEntity>();
            query = query.WhereIF(!string.IsNullOrEmpty(request.Search), u => u.Username.Contains(request.Search));

            if (!string.IsNullOrEmpty(request.SortField))
            {
                bool isDescending = request.SortOrder?.ToLower() == "desc";
                query = isDescending ? query.OrderBy($"{request.SortField} desc") : query.OrderBy($"{request.SortField} asc");
            }

            int totalCount = await query.CountAsync();
            var users = await query.Skip((request.PageNumber - 1) * request.PageSize)
                                   .Take(request.PageSize)
                                   .ToListAsync();

            var response = new PaginationResponse<User>
            {
                Items = users.Select(u => new User
                {
                    Id = u.Id,
                    Username = u.Username,
                    Role = u.Role,
                    FullName = u.FullName,
                    Email = u.Email
                }).ToList(),
                TotalCount = totalCount,
                PageNumber = request.PageNumber,
                PageSize = request.PageSize
            };

            return response;
        }
    }
}
