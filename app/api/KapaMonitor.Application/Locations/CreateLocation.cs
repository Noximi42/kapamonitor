using KapaMonitor.Application.Services;
using KapaMonitor.Database;
using KapaMonitor.Domain.Internal;
using KapaMonitor.Domain.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Net;

namespace KapaMonitor.Application.Locations
{
    public class CreateLocation
    {
        private readonly ApplicationDbContext _context;

        public CreateLocation(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<(bool success, LocationGetModel? viewModel, RequestError? error)> Do(LocationCreateModel request)
        {
            (bool isValid, List<string> errors) = request.CheckValidity();

            if (!isValid)
                return (false, null, new RequestError(HttpStatusCode.BadRequest,  errors));

            Location location = new Location
            {
                Name = request.Name!,

                Address = new Address
                {
                    State = request.Address?.State,
                    ZipCode = request.Address!.ZipCode!,
                    City = request.Address?.City,
                    Street = request.Address?.Street,
                    HouseNumber = request.Address?.HouseNumber,
                },
            };

            _context.Add(location);
            try
            {
                await _context.SaveChangesAsync();
            } 
            catch (Exception ex)
            {
                await new ErrorLogging(_context).LogError(ErrorMessages.CreateLocation, ex, request);
                return (false, null, new RequestError(HttpStatusCode.InternalServerError, ErrorMessages.DatabaseOperationFailed));
            }

            return (true, new LocationGetModel(location), null);
        }
    }
}
