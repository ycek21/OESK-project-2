using System.Collections.Generic;
using System.Threading.Tasks;
using Entities.models;

namespace Contracts
{
    public interface IHistoricDataRepository:IRepositoryBase<HistoricData>
    {
        Task<List<HistoricData>> GetAllHistoricDataAsync(bool trackChanges);
        Task<List<HistoricData>> GetSmallQualityHistoricDataAsync(bool trackChanges);
        Task<List<HistoricData>> GetMediumQualityHistoricDataAsync(bool trackChanges);
        Task<List<HistoricData>> GetLargeQualityHistoricDataAsync(bool trackChanges);
    }
}