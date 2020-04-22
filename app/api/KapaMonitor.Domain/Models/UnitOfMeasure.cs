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
        [Key]
        public string Name { get; set; }


        public ICollection<Resource> Resources { get; set; }
    }
}
