using KapaMonitor.Database;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace KapaMonitor.Application.Offers
{
    public class GetOffer
    {
        private readonly ApplicationDbContext _context;

        public GetOffer(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<OfferGetModel?> Do(int id)
        {
            var offer = await _context.Offers.Include(o => o.ContactInfo)
                                             .Include(o => o.Resource)
                                             .Include(o => o.Location).ThenInclude(l => l.Address)
                                             .Include(o => o.OfferCertificates).ThenInclude(oc => oc.Certificate)
                                             .AsNoTracking().FirstOrDefaultAsync(o => o.Id == id);

            if (offer == null)
                return null;

            return new OfferGetModel(offer, offer.OfferCertificates.Select(oc => oc.Certificate));
        }
    }
}
