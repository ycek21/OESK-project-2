using System.Threading.Tasks;
using Contracts;
using Entities;

namespace Repository
{
    public class RepositoryManager: IRepositoryManager
    {
        private RepositoryContext _repositoryContext;
        private IHistoricDataRepository _historicDataRepository;

        public RepositoryManager(RepositoryContext repositoryContext)
        {
            _repositoryContext = repositoryContext;
        }
        public IHistoricDataRepository HistoricData
        {
            get
            {
                if (_historicDataRepository == null)
                    _historicDataRepository= new HistoricDataRepository(_repositoryContext);
                return _historicDataRepository;
            }
        }
        public void Save() => _repositoryContext.SaveChanges();

        public async Task SaveAsync() => await _repositoryContext.SaveChangesAsync();
    }
}