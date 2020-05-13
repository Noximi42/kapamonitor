using KapaMonitor.Application.Addresses;
using KapaMonitor.Domain.Models;
using System.Collections.Generic;

namespace KapaMonitor.Application.Locations
{
    public class LocationModel
    {
        public LocationModel() { }

        public LocationModel(Location location)
        {
            Name = location.Name;

            Address = new AddressCreateModel
            {
                State = location.Address.State,
                ZipCode = location.Address.ZipCode,
                City = location.Address.City,
                Street = location.Address.Street,
                HouseNumber = location.Address.HouseNumber,
            };
        }

        public string? Name { get; set; }

        public AddressCreateModel? Address { get; set; }


        public virtual (bool isValid, List<string> errors) CheckValidity()
        {
            List<string> errors = new List<string>();

            if (string.IsNullOrEmpty(Name))
                errors.Add("name is required");
            if (string.IsNullOrEmpty(Address?.ZipCode))
                errors.Add("address with zipCode is required.");

            return (errors.Count == 0, errors);
        }
    }

    public class LocationGetModel : LocationModel
    {
        public LocationGetModel(Location location) : base(location)
        {
            Id = location.Id;
        }

        public int Id { get; set; }
    }

    public class LocationCreateModel : LocationModel
    {
        public LocationCreateModel(Location location) : base(location) { }
    }

    public class LocationUpdateModel : LocationGetModel
    {
        public LocationUpdateModel(Location location) : base(location) { }
    }
}
