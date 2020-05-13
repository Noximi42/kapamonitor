using KapaMonitor.Application.Services;
using KapaMonitor.Database;
using KapaMonitor.Domain.Internal;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace KapaMonitor.Application.Offers
{
    public class UpdateOffer
    {
        private readonly ApplicationDbContext _context;

        public UpdateOffer(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<(bool success, OfferGetModel? viewModel, RequestError? error)> Do(OfferUpdateModel vm)
        {
            (bool isValid, List<string> errors) = vm.CheckValidity();

            if (!isValid)
                return (false, null, new RequestError(HttpStatusCode.BadRequest, errors));
            if (vm.ContactInfoId > 0 && !_context.ContactInfos.Any(c => c.Id == vm.ContactInfoId))
                return (false, null, new RequestError(HttpStatusCode.BadRequest, "contactInfo not found."));
            if (vm.LocationId > 0 && !_context.Locations.Any(l => l.Id == vm.LocationId))
                return (false, null, new RequestError(HttpStatusCode.BadRequest, "location not found."));
            if (vm.ResourceId > 0 && !_context.Resources.Any(r => r.Id == vm.ResourceId))
                return (false, null, new RequestError(HttpStatusCode.BadRequest, "resource not found."));

            var offer = await _context.Offers.FirstOrDefaultAsync(c => c.Id == vm.Id);

            if (offer == null)
                return (false, null, new RequestError(HttpStatusCode.BadRequest, "offer not found."));

            offer.Number = (float)vm.Number!;
            if (vm.ContactInfoId > 0)
                offer.ContactInfoId = (int)vm.ContactInfoId;
            offer.LocationId = vm.LocationId;
            if (vm.ResourceId > 0)
                offer.ResourceId = (int)vm.ResourceId;

            offer.LastChangedDate = DateTime.Now;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                await new ErrorLogging(_context).LogError(ErrorMessages.UpdateOffer, ex, vm);
                return (false, null, new RequestError(HttpStatusCode.InternalServerError, ErrorMessages.DatabaseOperationFailed));
            }

            return (true, new OfferGetModel(offer), null);
        }
    }
}
