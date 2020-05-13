using KapaMonitor.Application.Services;
using KapaMonitor.Database;
using KapaMonitor.Domain.Internal;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

namespace KapaMonitor.Application.Locations
{
    public class UpdateLocation
    {
        private readonly ApplicationDbContext _context;

        public UpdateLocation(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<(bool success, LocationGetModel? viewModel, RequestError? error)> Do(LocationUpdateModel vm)
        {
            (bool isValid, List<string> errors) requestValidity = vm.CheckValidity();

            if (!requestValidity.isValid)
                return (false, null, new RequestError(HttpStatusCode.BadRequest, requestValidity.errors));

            var location = await _context.Locations.Include(l => l.Address).FirstOrDefaultAsync(c => c.Id == vm.Id);

            if (location == null)
                return (false, null, new RequestError(HttpStatusCode.BadRequest, "Location not found."));

            location.Name = vm.Name!;

            location.Address.State = vm.Address!.State;
            location.Address.ZipCode = vm.Address.ZipCode!;
            location.Address.City = vm.Address.City;
            location.Address.Street = vm.Address.Street;
            location.Address.HouseNumber = vm.Address.HouseNumber;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                await new ErrorLogging(_context).LogError(ErrorMessages.UpdateLocation, ex, vm);
                return (false, null, new RequestError(HttpStatusCode.InternalServerError, ErrorMessages.DatabaseOperationFailed));
            }

            return (true, new LocationGetModel(location), null);
        }
    }
}
