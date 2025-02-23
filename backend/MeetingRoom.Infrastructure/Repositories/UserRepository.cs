using MRR.Domain.Entities;
using MRR.Infrastructure.Persistence.Entities;
using SqlSugar;

namespace MRR.Infrastructure.Repositories
{
    public class UserRepository: Repository<UserEntity>, IUserRepository
    {
        private readonly ISqlSugarClient _db;

        public UserRepository(ISqlSugarClient db):base(db)
        {
            _db = db;
        }

        public async Task<User> GetUserById(int id)
        {
            var entity =  await this.GetByIdAsync(id);
            return MapToDomain(entity);
        }

        public async Task<User> GetUserByUsername(string username)
        {
            var entity = await this._db.Queryable<UserEntity>().FirstAsync(x => x.Username == username);
            return MapToDomain(entity);
        }

        public async Task<User> AddUser(User user)
        {
            var entity = await this.AddAsync(MapToEntity(user));
            return MapToDomain(entity);
        }

        public async Task UpdateUser(User user)
        {
            await this.UpdateAsync(MapToEntity(user));
        }

        public async Task DeleteUser(int id)
        {
            await this.DeleteAsync(id);
        }


        private static User MapToDomain(UserEntity entity)
        {
            return new User
            {
                Id = entity.Id,
                Username = entity.Username,
                PasswordHash = entity.PasswordHash,
                Role = entity.Role
            };
        }

        private static UserEntity MapToEntity(User user)
        {
            return new UserEntity
            {
                Id = user.Id,
                Username = user.Username,
                PasswordHash = user.PasswordHash,
                Role = user.Role
            };
        }
    }
}
