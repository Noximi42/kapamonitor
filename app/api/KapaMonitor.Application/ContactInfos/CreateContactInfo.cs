using KapaMonitor.Application.Services;
using KapaMonitor.Database;
using KapaMonitor.Domain.Internal;
using KapaMonitor.Domain.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Net;

namespace KapaMonitor.Application.ContactInfos
{
    public class CreateContactInfo
    {
        private readonly ApplicationDbContext _context;

        public CreateContactInfo(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<(bool success, ContactInfoViewModel? viewModel, RequestError? error)> Do(CreateContactInfoRequest request)
        {
            (bool isValid, List<string> errors) = request.CheckValidity();

            if (!isValid)
                return (false, null, new RequestError(HttpStatusCode.BadRequest,  errors));

            ContactInfo contactInfo = new ContactInfo
            {
                FirstName = request.FirstName!,
                LastName = request.LastName!,
                Email = request.Email!,
                Phone = request.Phone,

                Address = new Address
                {
                    State = request.Address?.State,
                    ZipCode = request.Address!.ZipCode!,
                    City = request.Address?.City,
                    Street = request.Address?.Street,
                    HouseNumber = request.Address?.HouseNumber,
                },
            };

            _context.Add(contactInfo);
            try
            {
                await _context.SaveChangesAsync();
            } 
            catch (Exception ex)
            {
                await new ErrorLogging(_context).LogError(ErrorMessages.CreateContactInfo, ex, request);
                return (false, null, new RequestError(HttpStatusCode.InternalServerError, ErrorMessages.DatabaseOperationFailed));
            }

            return (true, new ContactInfoViewModel(contactInfo), null);
        }


        public class CreateContactInfoRequest
        {
            public string? FirstName { get; set; }
            public string? LastName { get; set; }
            public string? Email { get; set; }
            public string? Phone { get; set; }

            public AddressRequest? Address { get; set; }

            public class AddressRequest
            {
                public string? State { get; set; }
                public string? ZipCode { get; set; }
                public string? City { get; set; }
                public string? Street { get; set; }
                public string? HouseNumber { get; set; }
            }


            public (bool isValid, List<string> errors) CheckValidity()
            {
                List<string> errors = new List<string>();

                if (string.IsNullOrEmpty(FirstName))
                    errors.Add("firstName is required.");
                if (string.IsNullOrEmpty(LastName))
                    errors.Add("lastName is required.");
                if (string.IsNullOrEmpty(Email))
                    errors.Add("email is required.");
                if (string.IsNullOrEmpty(Address?.ZipCode))
                    errors.Add("address with zipCode is required.");

                return (errors.Count == 0, errors);
            }
        }
    }
}
