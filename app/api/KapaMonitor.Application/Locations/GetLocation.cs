using KapaMonitor.Database;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace KapaMonitor.Application.Locations
{
    public class GetLocation
    {
        private readonly ApplicationDbContext _context;

        public GetLocation(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<LocationGetModel?> Do(int id)
        {
            var location = await _context.Locations.Include(l => l.Address).AsNoTracking().FirstOrDefaultAsync(c => c.Id == id);

            if (location == null)
                return null;

            return new LocationGetModel(location);
        }
    }
}
