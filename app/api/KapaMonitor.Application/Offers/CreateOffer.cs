using KapaMonitor.Application.Services;
using KapaMonitor.Database;
using KapaMonitor.Domain.Internal;
using KapaMonitor.Domain.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Net;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using KapaMonitor.Application.Certificates;
using KapaMonitor.Domain.Models.ManyToManyHelper;

namespace KapaMonitor.Application.Offers
{
    public class CreateOffer
    {
        private readonly ApplicationDbContext _context;

        public CreateOffer(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<(bool success, OfferGetModel? viewModel, RequestError? error)> Do(OfferCreateModel request)
        {
            (bool isValid, List<string> errors) = request.CheckValidity();
            
            List<Certificate> certificates = new List<Certificate>();
            if (request.CertificateIds != null)
                certificates = await _context.Certificates.Where(c => request.CertificateIds.Contains(c.Id)).ToListAsync();

            if (!isValid)
                return (false, null, new RequestError(HttpStatusCode.BadRequest,  errors));
            if (!_context.ContactInfos.Any(c => c.Id == request.ContactInfoId))
                return (false, null, new RequestError(HttpStatusCode.BadRequest,  "contactInfo not found."));
            if (request.LocationId > 0 && !_context.Locations.Any(l => l.Id == request.LocationId))
                return (false, null, new RequestError(HttpStatusCode.BadRequest, "location not found."));
            if (!_context.Resources.Any(r => r.Id == request.ResourceId))
                return (false, null, new RequestError(HttpStatusCode.BadRequest,  "resource not found."));
            if (request.CertificateIds != null && request.CertificateIds.Count() != certificates.Count)
                return (false, null, new RequestError(HttpStatusCode.BadRequest,  $"certificates with the ids {string.Join(", ", request.CertificateIds)} were not found."));
            if (certificates.Any(c => c.ResourceId != request.ResourceId))
            {
                var wrongCertificates = certificates.Where(c => c.ResourceId != request.ResourceId).Select(c => c.Id);
                return (false, null, new RequestError(HttpStatusCode.BadRequest, $"certificates with the ids {string.Join(", ", wrongCertificates)} do not belong to the provided ressource."));
            }

            Offer offer = new Offer
            {
                Number = (float)request.Number!,
                Price = request.Price,
                Description = request.Description,

                ContactInfoId = (int)request.ContactInfoId!,
                LocationId = request.LocationId,
                ResourceId = (int)request.ResourceId!,

                CreationDate = DateTime.Now,
            };
            offer.OfferCertificates = certificates.Select(c => new OfferCertificate
            {
                Offer = offer,
                Certificate = c
            }).ToList();

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

            offer = await _context.Offers.Include(o => o.ContactInfo)
                                         .Include(o => o.Resource).ThenInclude(r => r.Certificates)
                                         .Include(o => o.Location).ThenInclude(l => l.Address)
                                         .FirstAsync(o => o.Id == offer.Id);

            return (true, new OfferGetModel(offer, certificates), null);
        }
    }
}
