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

            Certificates = resource.Certificates.Select(c => new CertificatGetModel(c));
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string UnitOfMeasure { get; set; }

        public IEnumerable<CertificatGetModel> Certificates { get; set; }
    }

    public class ResourceGetModel : ResourceModel
    {
        public ResourceGetModel(Resource resource) : base(resource) { }
    }
}
