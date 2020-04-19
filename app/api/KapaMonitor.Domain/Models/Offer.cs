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


        [Required]
        public ContactInfo ContactInfo { get; set; }
        public Location Location { get; set; }
        [Required]
        public Resource Resource { get; set; }
        public ICollection<OfferCertificate> OfferCertificates { get; set; }
    }
}
