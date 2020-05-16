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

        public async Task<IEnumerable<CertificatGetModel>> Do()
        {
            return await _context.Certificates.Include(c => c.Resource).Select(c => new CertificatGetModel(c)).ToListAsync();
        }
    }
}
