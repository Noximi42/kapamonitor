using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KapaMonitor.Domain.Models.ManyToManyHelper
{
    public class OfferCertificate
    {
        public int OfferId { get; set; }
        public Offer Offer { get; set; }
        public int CertificateId { get; set; }
        public Certificate Certificate { get; set; }
    }
}
