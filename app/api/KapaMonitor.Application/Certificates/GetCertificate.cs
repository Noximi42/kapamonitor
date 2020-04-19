using KapaMonitor.Database;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace KapaMonitor.Application.Certificates
{
    public class GetCertificate
    {
        private readonly ApplicationDbContext _context;

        public GetCertificate(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<CertificateViewModel?> Do(int id)
        {
            var certificate = await _context.Certificates.Include(c => c.Resource).FirstOrDefaultAsync(c => c.Id == id);

            if (certificate == null)
                return null;

            return new CertificateViewModel(certificate);
        }
    }
}
