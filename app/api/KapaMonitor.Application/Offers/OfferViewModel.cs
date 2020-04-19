using KapaMonitor.Domain.Models;
using System;
using System.Collections.Generic;

namespace KapaMonitor.Application.Offers
{
    public class OfferViewModel
    {
        public OfferViewModel() { }

        public OfferViewModel(Offer offer)
        {
            Id = offer.Id;
            Number = offer.Number;

            ContactInfoId = offer.ContactInfoId;
            LocationId = offer.LocationId;
            ResourceId = offer.ResourceId;

            CreationDate = offer.CreationDate;
            LastChangedDate = offer.LastChangedDate;
        }

        public int Id { get; set; }
        public float? Number { get; set; }

        public int? ContactInfoId { get; set; }
        public int? LocationId { get; set; }
        public int? ResourceId { get; set; }

        public DateTime? CreationDate { get; set; }
        public DateTime? LastChangedDate { get; set; }


        public (bool isValid, List<string> errors) CheckValidity()
        {
            List<string> errors = new List<string>();

            if (Id <= 0)
                errors.Add("id is required.");
            if (Number == null || Number <= 0)
                errors.Add("number has to be greater than 0.");

            return (errors.Count == 0, errors);
        }
    }
}
