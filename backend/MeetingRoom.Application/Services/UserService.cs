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

        public UserService(IUserRepository userRepository, ISqlSugarClient db)
        {
            _db = db;
            _userRepository = userRepository;
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

        public async Task<PaginationResponse<User>> GetUsers(PaginationRequest request)
        {
            var query = _db.Queryable<UserEntity>();

            if (!string.IsNullOrEmpty(request.Search))
            {
                query = query.Where(u => u.Username.Contains(request.Search));
            }

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
