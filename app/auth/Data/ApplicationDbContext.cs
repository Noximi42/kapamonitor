using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace KapaMonitor.Auth.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public object firstOrDefaultAsync;

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
    }
}
