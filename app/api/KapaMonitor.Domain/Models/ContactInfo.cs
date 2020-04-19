using KapaMonitor.Domain.Models.ManyToManyHelper;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace KapaMonitor.Domain.Models
{
    public class ContactInfo
    {
        public int Id { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string Email { get; set; }
        public string? Phone { get; set; }


        [Required]
        public Address Address { get; set; }
        public ICollection<ContactInfoLocation> ContactInfoLocations { get; set; }
        public ICollection<Offer> Offers { get; set; }
        public ICollection<Requirement> Requirements { get; set; }
    }
}
