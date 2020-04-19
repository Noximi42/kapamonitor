using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace KapaMonitor.Domain.Models
{
    public class Resource
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }


        [Required]
        public UnitOfMeasure UnitOfMeasure { get; set; }
        public ICollection<Offer> Offers { get; set; }
        public ICollection<Requirement> Requirements { get; set; }
        public ICollection<Certificate> Certificate { get; set; }
    }
}
