using KapaMonitor.Application.Certificates;
using KapaMonitor.Database;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KapaMonitor.Application.Resources
{
    public class GetCertificates
    {
        private readonly ApplicationDbContext _context;

        public GetCertificates(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<CertificateGetModel>> Do()
        {
            return await _context.Certificates.Select(c => new CertificateGetModel(c)).AsNoTracking().ToListAsync();
        }
    }
}
