using MRR.Application.DTOs;
using MRR.Application.Interfaces;
using MRR.Domain.Entities;
using MRR.Infrastructure.Repositories;
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

        public async Task<PaginationResponseDto<User>> GetUsers(PaginationRequestDto request)
        {
            var query = _db.Queryable<User>();

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

            var response = new PaginationResponseDto<User>
            {
                Items = users,
                TotalCount = totalCount,
                PageNumber = request.PageNumber,
                PageSize = request.PageSize
            };

            return response;
        }
    }
}
