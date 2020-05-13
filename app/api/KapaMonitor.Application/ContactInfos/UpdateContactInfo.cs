using KapaMonitor.Application.Services;
using KapaMonitor.Database;
using KapaMonitor.Domain.Internal;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

namespace KapaMonitor.Application.ContactInfos
{
    public class UpdateContactInfo
    {
        private readonly ApplicationDbContext _context;

        public UpdateContactInfo(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<(bool success, ContactInfoGetModel? viewModel, RequestError? error)> Do(ContactInfoUpdateModel vm)
        {
            (bool isValid, List<string> errors) requestValidity = vm.CheckValidity();

            if (!requestValidity.isValid)
                return (false, null, new RequestError(HttpStatusCode.BadRequest, requestValidity.errors));

            var contactInfo = await _context.ContactInfos.FirstOrDefaultAsync(c => c.Id == vm.Id);

            if (contactInfo == null)
                return (false, null, new RequestError(HttpStatusCode.BadRequest, "ContactInfo not found."));

            contactInfo.FirstName = vm.FirstName!;
            contactInfo.LastName = vm.LastName!;
            contactInfo.Email = vm.Email!;
            contactInfo.Phone = vm.Phone;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                await new ErrorLogging(_context).LogError(ErrorMessages.UpdateContactInfo, ex, vm);
                return (false, null, new RequestError(HttpStatusCode.InternalServerError, ErrorMessages.DatabaseOperationFailed));
            }

            return (true, new ContactInfoGetModel(contactInfo), null);
        }
    }
}
