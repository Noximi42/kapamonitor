using KapaMonitor.Application.Services;
using KapaMonitor.Database;
using KapaMonitor.Domain.Internal;
using KapaMonitor.Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Net;
using System.Threading.Tasks;

namespace KapaMonitor.Application.Offers
{
    public class DeleteOffer
    {
        private readonly ApplicationDbContext _context;

        public DeleteOffer(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<(bool Succeeded, RequestError? error)> Do(int id)
        {
            var offer = await _context.Offers.FirstOrDefaultAsync(c => c.Id == id);

            if (offer == null)
                return (false, new RequestError(HttpStatusCode.BadRequest, "offer not found."));

            _context.Remove(offer);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                await new ErrorLogging(_context).LogError(ErrorMessages.DeleteOffer, ex);
                return (false, new RequestError(HttpStatusCode.InternalServerError, ErrorMessages.DatabaseOperationFailed));
            }

            return (true, null);
        }
    }
}
