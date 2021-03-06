﻿using KapaMonitor.Application.Services;
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

        public async Task<(bool success, ContactInfoGetModel? viewModel, RequestError? error)> Do(ContactInfoCreateModel request)
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

            return (true, new ContactInfoGetModel(contactInfo), null);
        }


        
    }
}
