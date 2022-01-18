using System.Linq;
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
        public async Task<List<HistoricData>> GetSmallQualityHistoricDataAsync(bool trackChanges)
        {
            return await FindAll(trackChanges).Where(d => d.Quality =="1080p") .ToListAsync();
        }
         public async Task<List<HistoricData>> GetMediumQualityHistoricDataAsync(bool trackChanges)
        {
            return await FindAll(trackChanges).Where(d => d.Quality =="4k") .ToListAsync();
        }
         public async Task<List<HistoricData>> GetLargeQualityHistoricDataAsync(bool trackChanges)
        {
            return await FindAll(trackChanges).Where(d => d.Quality =="raw") .ToListAsync();
        }
    }
}