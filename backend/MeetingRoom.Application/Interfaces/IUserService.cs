using MRR.Application.DTOs;
using MRR.Domain.Entities;

namespace MRR.Application.Interfaces
{
    public interface IUserService
    {
        Task<User> GetUserByIdAsync(int id);
        Task RegisterUserAsync(User user);
        Task UpdateUserAsync(User user);
        Task DeleteUserAsync(int id);
        Task<PaginationResponseDto<User>> GetUsers(PaginationRequestDto request);
    }
}
