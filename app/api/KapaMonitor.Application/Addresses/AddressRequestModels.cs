using System.Collections.Generic;

namespace KapaMonitor.Application.Addresses
{
    public class AddressCreateModel
    {
        public string? State { get; set; }
        public string? ZipCode { get; set; }
        public string? City { get; set; }
        public string? Street { get; set; }
        public string? HouseNumber { get; set; }
    }
}
