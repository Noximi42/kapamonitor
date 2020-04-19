using System.ComponentModel.DataAnnotations;

namespace KapaMonitor.Domain.Models
{
    public class Address
    {
        public int Id { get; set; }
        public string? State { get; set; }
        [Required]
        public string ZipCode { get; set; }
        public string? City { get; set; }
        public string? Street { get; set; }
        public string? HouseNumber { get; set; }


        public int? ContactInfoId { get; set; }
        public ContactInfo ContactInfo { get; set; }
        public int? LocationId { get; set; }
        public Location Location { get; set; }
    }
}
