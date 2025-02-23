using MRR.Domain.Entities;

namespace MRR.Infrastructure.Repositories
{
    public interface IUserRepository
    {
        Task<User> GetUserById(int id);
        Task<User> GetUserByUsername(string username);
        Task<User> AddUser(User user);
        Task UpdateUser(User user);
        Task DeleteUser(int id);
    }
}
