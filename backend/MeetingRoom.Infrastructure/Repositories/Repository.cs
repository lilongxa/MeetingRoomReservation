using SqlSugar;

namespace MRR.Infrastructure.Repositories
{
    public class Repository<T> : IRepository<T> where T : class, new()
    {
        private readonly ISqlSugarClient _db;

        public Repository(ISqlSugarClient db)
        {
            _db = db;
        }

        public async Task<T> GetByIdAsync(int id)
        {
            return await _db.Queryable<T>().InSingleAsync(id);
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _db.Queryable<T>().ToListAsync();
        }

        public async Task<T> AddAsync(T entity)
        {
            return await _db.Insertable<T>(entity).ExecuteReturnEntityAsync();
        }

        public async Task UpdateAsync(T entity)
        {
            await _db.Updateable(entity).ExecuteCommandAsync();
        }

        public async Task DeleteAsync(int id)
        {
            await _db.Deleteable<T>().In(id).ExecuteCommandAsync();
        }
    }
}
