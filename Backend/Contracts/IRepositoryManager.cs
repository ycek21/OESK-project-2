using System.Threading.Tasks;

namespace Contracts
{
    public interface IRepositoryManager
    {
        IHistoricDataRepository HistoricData {get;}
        void Save();
        Task SaveAsync();
    }
}