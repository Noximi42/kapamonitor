using KapaMonitor.Domain.Models;

namespace KapaMonitor.Application.Certificates
{
    public class CertificateModel
    {
        public CertificateModel(Certificate certificate)
        {
            Id = certificate.Id;
            Name = certificate.Name;
            ResourceId = certificate.ResourceId;
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int ResourceId { get; set; }
    }

    public class CertificateGetModel : CertificateModel
    {
        public CertificateGetModel(Certificate certificate) : base(certificate) { }
    }
}
