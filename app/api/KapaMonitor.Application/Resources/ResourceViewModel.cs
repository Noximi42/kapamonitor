using KapaMonitor.Domain.Models;

namespace KapaMonitor.Application.Resources
{
    public class ResourceViewModel
    {
        public ResourceViewModel(Resource resource)
        {
            Id = resource.Id;
            Name = resource.Name;
            UnitOfMeasure = resource.UnitOfMeasureName;
        }

        public int Id { get; set; }
        public string? Name { get; set; }
        public string UnitOfMeasure { get; set; }
    }
}
