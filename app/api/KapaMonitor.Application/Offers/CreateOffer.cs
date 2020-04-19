using KapaMonitor.Application.Services;
using KapaMonitor.Database;
using KapaMonitor.Domain.Internal;
using KapaMonitor.Domain.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Net;
using System.Linq;

namespace KapaMonitor.Application.Offers
{
    public class CreateOffer
    {
        private readonly ApplicationDbContext _context;

        public CreateOffer(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<(bool success, OfferViewModel? viewModel, RequestError? error)> Do(CreateOfferRequest request)
        {
            (bool isValid, List<string> errors) = request.CheckValidity();

            if (!isValid)
                return (false, null, new RequestError(HttpStatusCode.BadRequest,  errors));
            if (!_context.ContactInfos.Any(c => c.Id == request.ContactInfoId))
                return (false, null, new RequestError(HttpStatusCode.BadRequest,  "contactInfo not found."));
            if (request.LocationId > 0 && !_context.Locations.Any(l => l.Id == request.LocationId))
                return (false, null, new RequestError(HttpStatusCode.BadRequest, "location not found."));
            if (!_context.Resources.Any(r => r.Id == request.ResourceId))
                return (false, null, new RequestError(HttpStatusCode.BadRequest,  "resource not found."));



            Offer offer = new Offer
            {
                Number = (float)request.Number!,

                ContactInfoId = (int)request.ContactInfoId!,
                LocationId = request.LocationId == 0 ? null : request.LocationId,
                ResourceId = (int)request.ResourceId!,

                CreationDate = DateTime.Now,
            };

            _context.Add(offer);
            try
            {
                await _context.SaveChangesAsync();
            } 
            catch (Exception ex)
            {
                await new ErrorLogging(_context).LogError(ErrorMessages.CreateOffer, ex, request);
                return (false, null, new RequestError(HttpStatusCode.InternalServerError, ErrorMessages.DatabaseOperationFailed));
            }

            return (true, new OfferViewModel(offer), null);
        }


        public class CreateOfferRequest
        {
            public float? Number { get; set; }

            public int? ContactInfoId { get; set; }
            public int? LocationId { get; set; }
            public int? ResourceId { get; set; }


            public (bool isValid, List<string> errors) CheckValidity()
            {
                List<string> errors = new List<string>();

                if (Number == null || Number <= 0)
                    errors.Add("number has to be greater than 0.");
                if (ContactInfoId == null || ContactInfoId <= 0)
                    errors.Add("contactInfoId is required.");
                if (ResourceId == null || ResourceId <= 0)
                    errors.Add("resourceId is required.");

                return (errors.Count == 0, errors);
            }
        }
    }
}
