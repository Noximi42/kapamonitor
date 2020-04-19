using KapaMonitor.Domain.Models;
using System.Collections.Generic;
using System.Linq;

namespace KapaMonitor.Database
{
    public static class DbInitializer
    {
        public static void SeedData(ApplicationDbContext context)
        {
            if (context.Resources.Any(r => r.Name == "Handschuhe"))
                return;

            UnitOfMeasure pieceUnit = new UnitOfMeasure { Name = "Stück" };

            context.AddRange(Resources(pieceUnit));
            context.SaveChanges();
        }

        private static List<Resource> Resources(UnitOfMeasure pieceUnit) => new List<Resource>
        { 
            new Resource
            {
                Name = "Handschuhe",
                Certificates = new List<Certificate>
                {
                    new Certificate { Name = "EN455" },
                    new Certificate { Name = "EN374" },
                },
                UnitOfMeasure = pieceUnit,
            },
            new Resource
            {
                Name = "Atemmasken",
                Certificates = new List<Certificate>
                {
                    new Certificate { Name = "FFP2" },
                    new Certificate { Name = "FFP3" },
                    new Certificate { Name = "N95" },
                    new Certificate { Name = "steril" },
                    new Certificate { Name = "ventil" },
                },
                UnitOfMeasure = pieceUnit,
            },
            new Resource
            {
                Name = "Betten",
                UnitOfMeasure = pieceUnit,
            }
        };
    }
}
