using MRR.Application.DTOs;
using MRR.Domain.Entities;

namespace MRR.Application.Interfaces
{
    public interface IUserService
    {
        Task<User> GetUserByIdAsync(int id);

        Task RegisterUserAsync(User user);
        Task<PaginationResponseDto<User>> GetUsers(PaginationRequestDto request);
    }
}
