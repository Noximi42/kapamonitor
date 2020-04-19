using Microsoft.EntityFrameworkCore;
using KapaMonitor.Domain.Models;
using KapaMonitor.Domain.Internal;
using KapaMonitor.Domain.Models.ManyToManyHelper;

namespace KapaMonitor.Database
{
    public class ApplicationDbContext : DbContext
    {
        public object firstOrDefaultAsync;

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Address> Addresses { get; set; }
        public DbSet<ContactInfo> ContactInfos { get; set; }
        public DbSet<Location> Locations { get; set; }
        public DbSet<Offer> Offers { get; set; }
        public DbSet<Requirement> Requirements { get; set; }
        public DbSet<Resource> Resources { get; set; }
        public DbSet<Certificate> Certificates { get; set; }


        public DbSet<ErrorLog> ErrorLogs { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ContactInfo>()
                .HasOne(c => c.Address)
                .WithOne(a => a.ContactInfo)
                .HasForeignKey<Address>(a => a.ContactInfoId);

            modelBuilder.Entity<Location>()
               .HasOne(l => l.Address)
               .WithOne(a => a.Location)
               .HasForeignKey<Address>(a => a.LocationId);

            modelBuilder.Entity<Resource>()
               .HasOne(r => r.UnitOfMeasure)
               .WithOne(u => u.Resource)
               .HasForeignKey<UnitOfMeasure>(u => u.ResourceId);

            modelBuilder.Entity<ContactInfoLocation>()
                .HasKey(cl => new { cl.ContactInfoId, cl.LocationId });
            modelBuilder.Entity<ContactInfoLocation>()
                .HasOne(cl => cl.ContactInfo)
                .WithMany(c => c.ContactInfoLocations)
                .HasForeignKey(cl => cl.ContactInfoId);
            modelBuilder.Entity<ContactInfoLocation>()
                .HasOne(cl => cl.Location)
                .WithMany(l => l.ContactInfoLocations)
                .HasForeignKey(cl => cl.LocationId);

            modelBuilder.Entity<OfferCertificate>()
                .HasKey(oc => new { oc.OfferId, oc.CertificateId });
            modelBuilder.Entity<OfferCertificate>()
                .HasOne(oc => oc.Offer)
                .WithMany(o => o.OfferCertificates)
                .HasForeignKey(oc => oc.OfferId);
            modelBuilder.Entity<OfferCertificate>()
                .HasOne(oc => oc.Certificate)
                .WithMany(l => l.OfferCertificates)
                .HasForeignKey(oc => oc.CertificateId);

            modelBuilder.Entity<RequirementCertificate>()
                .HasKey(rc => new { rc.RequirementId, rc.CertificateId });
            modelBuilder.Entity<RequirementCertificate>()
                .HasOne(rc => rc.Requirement)
                .WithMany(c => c.RequirementCertificates)
                .HasForeignKey(rc => rc.RequirementId);
            modelBuilder.Entity<RequirementCertificate>()
                .HasOne(rc => rc.Certificate)
                .WithMany(l => l.RequirementCertificates)
                .HasForeignKey(rc => rc.CertificateId);
        }
    }
}
