using KapaMonitor.Application.Certificates;
using KapaMonitor.Application.ContactInfos;
using KapaMonitor.Application.Locations;
using KapaMonitor.Application.Resources;
using KapaMonitor.Domain.Models;
using Microsoft.EntityFrameworkCore.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.ConstrainedExecution;

namespace KapaMonitor.Application.Offers
{
    public class OfferModel
    {
        public OfferModel() { }

        public OfferModel(Offer offer)
        {
            Number = offer.Number;
            Price = offer.Price;
            Description = offer.Description;
        }

        public float? Number { get; set; }
        public int? Price { get; set; }
        public string? Description { get; set; }


        public virtual (bool isValid, List<string> errors) CheckValidity()
        {
            List<string> errors = new List<string>();

            if (Number == null || Number <= 0)
                errors.Add("number has to be greater than 0.");
            if (Price != null && Price <= 0)
                errors.Add("price should be null or greater than 0.");
            if (Description != null && Description.Count() == 0)
                errors.Add("description should be null or not empty.");

            return (errors.Count == 0, errors);
        }
    }

    public class OfferGetModel : OfferModel
    {
        public OfferGetModel(Offer offer, IEnumerable<Certificate> certificates) : base(offer)
        {
            Id = offer.Id;

            CreationDate = offer.CreationDate;
            LastChangedDate = offer.LastChangedDate;

            ContactInfo = new ContactInfoGetModel(offer.ContactInfo);
            Location = offer.Location == null ? null : new LocationGetModel(offer.Location);
            Resource = new ResourceModel(offer.Resource);
            Certificates = certificates.Select(c => new CertificateGetModel(c));
        }

        public int Id { get; set; }

        public DateTime CreationDate { get; set; }
        public DateTime? LastChangedDate { get; set; }

        public ContactInfoGetModel ContactInfo { get; set; }
        public LocationGetModel? Location { get; set; }
        public ResourceModel Resource { get; set; }
        public IEnumerable<CertificateGetModel> Certificates {get;set;}
    }

    public class OfferCreateModel : OfferModel
    {
        public int? ContactInfoId { get; set; }
        public int? LocationId { get; set; }
        public int? ResourceId { get; set; }
        public IEnumerable<int>? CertificateIds { get; set; }

        public override (bool isValid, List<string> errors) CheckValidity()
        {
            List<string> errors = base.CheckValidity().errors;

            if (ContactInfoId <= 0)
                errors.Add("contactInfoId is required.");
            if (LocationId != null && LocationId <= 0)
                errors.Add("locationId should be null or greater than 0.");
            if (ResourceId <= 0)
                errors.Add("resourceId is required.");
            if (CertificateIds != null && CertificateIds.Any(cId => cId <= 0))
                errors.Add("certificateIds should be null or only contain values greater than 0.");

            return (errors.Count == 0, errors);
        }
    }

    public class OfferUpdateModel : OfferCreateModel
    {
        public int Id { get; set; }

        public override (bool isValid, List<string> errors) CheckValidity()
        {
            List<string> errors = base.CheckValidity().errors;

            if (Id <= 0)
                errors.Add("id is required");

            return (errors.Count == 0, errors);
        }
    }
}
