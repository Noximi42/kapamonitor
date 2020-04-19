using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KapaMonitor.Domain.Models.ManyToManyHelper
{
    public class RequirementCertificate
    {
        public int RequirementId { get; set; }
        public Requirement Requirement { get; set; }
        public int CertificateId { get; set; }
        public Certificate Certificate { get; set; }
    }
}
