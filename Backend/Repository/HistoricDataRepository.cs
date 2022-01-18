using System.Collections.Generic;
using System.Threading.Tasks;
using Contracts;
using Entities;
using Entities.models;
using Microsoft.EntityFrameworkCore;

namespace Repository
{
    public class HistoricDataRepository :RepositoryBase<HistoricData>, IHistoricDataRepository
    {
        public HistoricDataRepository(RepositoryContext repositoryContext)
            : base(repositoryContext)
        {
        }
        public async Task<List<HistoricData>> GetAllHistoricDataAsync(bool trackChanges)
        {
            return await FindAll(trackChanges).ToListAsync();
        }
    }
}