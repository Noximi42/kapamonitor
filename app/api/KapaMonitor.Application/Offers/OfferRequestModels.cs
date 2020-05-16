using KapaMonitor.Application.ContactInfos;
using KapaMonitor.Application.Locations;
using KapaMonitor.Application.Resources;
using KapaMonitor.Domain.Models;
using System;
using System.Collections.Generic;

namespace KapaMonitor.Application.Offers
{
    public class OfferModel
    {
        public OfferModel() { }

        public OfferModel(Offer offer)
        {
            Number = offer.Number;
        }

        public float? Number { get; set; }


        public virtual (bool isValid, List<string> errors) CheckValidity()
        {
            List<string> errors = new List<string>();

            if (Number == null || Number <= 0)
                errors.Add("number has to be greater than 0.");

            return (errors.Count == 0, errors);
        }
    }

    public class OfferGetModel : OfferModel
    {
        public OfferGetModel(Offer offer) : base(offer)
        {
            Id = offer.Id;

            ContactInfo = new ContactInfoGetModel(offer.ContactInfo);
            Location = offer.Location == null ? null : new LocationGetModel(offer.Location);
            Resource = new ResourceGetModel(offer.Resource);

            CreationDate = offer.CreationDate;
            LastChangedDate = offer.LastChangedDate;
        }

        public int Id { get; set; }

        public DateTime? CreationDate { get; set; }
        public DateTime? LastChangedDate { get; set; }

        public ContactInfoGetModel ContactInfo { get; set; }
        public LocationGetModel? Location { get; set; }
        public ResourceGetModel Resource { get; set; }
    }

    public class OfferCreateModel : OfferModel
    {
        public int? ContactInfoId { get; set; }
        public int? LocationId { get; set; }
        public int? ResourceId { get; set; }

        public override (bool isValid, List<string> errors) CheckValidity()
        {
            List<string> errors = base.CheckValidity().errors;

            if (ContactInfoId <= 0)
                errors.Add("contactInfoId is required.");
            if (LocationId != null && LocationId <= 0)
                errors.Add("locationId is required.");
            if (ResourceId <= 0)
                errors.Add("resourceId is required.");

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
