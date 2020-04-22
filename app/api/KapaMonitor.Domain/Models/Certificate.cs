using KapaMonitor.Domain.Models.ManyToManyHelper;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace KapaMonitor.Domain.Models
{
    public class Certificate
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }


        [Required]
        public Resource Resource { get; set; }
        public ICollection<OfferCertificate> OfferCertificates { get; set; }
        public ICollection<RequirementCertificate> RequirementCertificates { get; set; }

    }
}
