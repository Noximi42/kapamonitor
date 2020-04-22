namespace KapaMonitor.Domain.Models.ManyToManyHelper
{
    public class ContactInfoLocation
    {
        public int ContactInfoId { get; set; }
        public ContactInfo ContactInfo { get; set; }
        public int LocationId { get; set; }
        public Location Location { get; set; }
    }
}
