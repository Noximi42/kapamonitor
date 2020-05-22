using KapaMonitor.Application.Services;
using KapaMonitor.Database;
using KapaMonitor.Domain.Internal;
using KapaMonitor.Domain.Models;
using KapaMonitor.Domain.Models.ManyToManyHelper;
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
            
            List<Certificate> certificates = new List<Certificate>();
            if (vm.CertificateIds != null)
                certificates = await _context.Certificates.Where(c => vm.CertificateIds.Contains(c.Id)).ToListAsync();

            if (!isValid)
                return (false, null, new RequestError(HttpStatusCode.BadRequest, errors));
            if (vm.ContactInfoId > 0 && !_context.ContactInfos.Any(c => c.Id == vm.ContactInfoId))
                return (false, null, new RequestError(HttpStatusCode.BadRequest, "contactInfo not found."));
            if (vm.LocationId > 0 && !_context.Locations.Any(l => l.Id == vm.LocationId))
                return (false, null, new RequestError(HttpStatusCode.BadRequest, "location not found."));
            if (vm.ResourceId > 0 && !_context.Resources.Any(r => r.Id == vm.ResourceId))
                return (false, null, new RequestError(HttpStatusCode.BadRequest, "resource not found."));
            if (vm.CertificateIds != null && vm.CertificateIds.Count() != certificates.Count)
                return (false, null, new RequestError(HttpStatusCode.BadRequest, $"certificates with the ids {string.Join(", ", vm.CertificateIds)} were not found."));
            if (certificates.Any(c => c.ResourceId != vm.ResourceId))
            {
                var wrongCertificates = certificates.Where(c => c.ResourceId != vm.ResourceId).Select(c => c.Id);
                return (false, null, new RequestError(HttpStatusCode.BadRequest, $"certificates with the ids {string.Join(", ", wrongCertificates)} do not belong to the provided ressource."));
            }

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

            offer.OfferCertificates = certificates.Select(c => new OfferCertificate
            {
                Offer = offer,
                Certificate = c
            }).ToList();

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                await new ErrorLogging(_context).LogError(ErrorMessages.UpdateOffer, ex, vm);
                return (false, null, new RequestError(HttpStatusCode.InternalServerError, ErrorMessages.DatabaseOperationFailed));
            }

            return (true, new OfferGetModel(offer, certificates), null);
        }
    }
}
