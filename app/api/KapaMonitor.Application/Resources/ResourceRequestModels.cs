using KapaMonitor.Application.Certificates;
using KapaMonitor.Domain.Models;
using System.Collections.Generic;
using System.Linq;

namespace KapaMonitor.Application.Resources
{
    public class ResourceModel
    {
        public ResourceModel(Resource resource)
        {
            Id = resource.Id;
            Name = resource.Name;
            UnitOfMeasure = resource.UnitOfMeasureName;
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string UnitOfMeasure { get; set; }
    }

    public class ResourceGetModel : ResourceModel
    {
        public ResourceGetModel(Resource resource) : base(resource) 
        {
            Certificates = resource.Certificates.Select(c => new CertificateGetModel(c));
        }

        public IEnumerable<CertificateGetModel> Certificates { get; set; }
    }
}
