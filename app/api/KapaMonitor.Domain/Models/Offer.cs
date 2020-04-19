using KapaMonitor.Domain.Models.ManyToManyHelper;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace KapaMonitor.Domain.Models
{
    public class Offer
    {
        public int Id { get; set; }
        [Required]
        [Range(float.Epsilon, float.MaxValue)]
        public float Number { get; set; }
        [Required]
        public DateTime CreationDate { get; set; }
        public DateTime? LastChangedDate { get; set; }


        public int ContactInfoId { get; set; }
        public ContactInfo ContactInfo { get; set; }

        public int? LocationId { get; set; }
        public Location Location { get; set; }

        public int ResourceId { get; set; }
        public Resource Resource { get; set; }

        public ICollection<OfferCertificate> OfferCertificates { get; set; }
    }
}
