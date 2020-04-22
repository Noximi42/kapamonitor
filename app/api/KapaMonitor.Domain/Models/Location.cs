using KapaMonitor.Domain.Models.ManyToManyHelper;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace KapaMonitor.Domain.Models
{
    public class Location
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }

        [Required]
        public Address Address { get; set; }
        public ICollection<ContactInfoLocation> ContactInfoLocations { get; set; }
        public ICollection<Offer> Offers { get; set; }
    }
}

