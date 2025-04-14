using MRR.Domain.Entities;
using MRR.Shared.Models;

namespace MRR.Application.Interfaces
{
    public interface IUserService
    {
        Task<User> GetUserByIdAsync(int id);
        Task RegisterUserAsync(User user);
        Task UpdateUserAsync(User user);
        Task DeleteUserAsync(int id);
        Task<User> CreateAsync(string username, string password, string role, string fullName, string email);
        Task<PaginationResponse<User>> GetUsers(PaginationRequest request);
    }
}
