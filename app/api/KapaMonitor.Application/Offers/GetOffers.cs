using KapaMonitor.Database;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KapaMonitor.Application.Offers
{
    public class GetOffers
    {
        private readonly ApplicationDbContext _context;

        public GetOffers(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<OfferViewModel>> Do()
        {
            return await _context.Offers.Select(o => new OfferViewModel(o)).ToListAsync();
        }
    }
}
