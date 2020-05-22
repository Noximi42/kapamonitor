using KapaMonitor.Database;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KapaMonitor.Application.Resources
{
    public class GetResources
    {
        private readonly ApplicationDbContext _context;

        public GetResources(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ResourceGetModel>> Do()
        {
            return await _context.Resources.Include(r => r.Certificates).AsNoTracking().Select(r => new ResourceGetModel(r)).ToListAsync();
        }
    }
}
