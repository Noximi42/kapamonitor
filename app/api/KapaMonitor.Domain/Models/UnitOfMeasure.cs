using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KapaMonitor.Domain.Models
{
    public class UnitOfMeasure
    {
        public int Id { get; set; }
        public string Name { get; set; }


        public int ResourceId { get; set; }
        [Required]
        public Resource Resource { get; set; }
    }
}
