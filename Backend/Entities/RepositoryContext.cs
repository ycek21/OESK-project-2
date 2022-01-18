using Entities.models;
using Microsoft.EntityFrameworkCore;
using Microsoft;



namespace Entities
{
    public class RepositoryContext : DbContext

    {
        public RepositoryContext(DbContextOptions options)
            : base(options)
        {
        }

        public DbSet<HistoricData> HistoricData {get;set;}
    }
}