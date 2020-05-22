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

        public async Task<IEnumerable<OfferGetModel>> Do()
        {
            return await _context.Offers.Include(o => o.ContactInfo)
                                        .Include(o => o.Resource)
                                        .Include(o => o.Location).ThenInclude(l => l.Address)
                                        .Include(o => o.OfferCertificates).ThenInclude(oc => oc.Certificate)
                                        .Select(o => new OfferGetModel(o, o.OfferCertificates.Select(oc => oc.Certificate)))
                                        .AsNoTracking().ToListAsync();
        }
    }
}
