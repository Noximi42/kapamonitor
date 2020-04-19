using KapaMonitor.Database;
using Microsoft.EntityFrameworkCore;
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

        public async Task<OfferViewModel?> Do(int id)
        {
            var offer = await _context.Offers.FirstOrDefaultAsync(o => o.Id == id);

            if (offer == null)
                return null;

            return new OfferViewModel(offer);
        }
    }
}
