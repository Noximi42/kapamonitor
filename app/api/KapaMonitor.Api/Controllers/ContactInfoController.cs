﻿using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using KapaMonitor.Database;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using KapaMonitor.Application.ContactInfos;
using KapaMonitor.Domain.Internal;
using static KapaMonitor.Application.ContactInfos.CreateContactInfo;
using System.Collections.Generic;

namespace KapaMonitor.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    [Consumes("application/json")]
    [Produces("application/json")]
    public class ContactInfoController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ContactInfoController(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Returns a specific ContactInfo
        /// </summary>
        /// <param name="id">The id of the ContactInfo</param>
        /// <returns>The specified ContactInfo</returns>
        /// <response code="200">Returns the ContactInfo</response>
        /// <response code="401">If the user is not logged in</response>
        /// <response code="404">If the ContactInfo with the spezified id doesn't exist</response>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ContactInfoViewModel))]
        public async Task<IActionResult> Get(int id)
        {
            ContactInfoViewModel? vm = await new GetContactInfo(_context).Do(id);

            if (vm == null)
                return NotFound();

            return Ok(vm);
        }

        /// <summary>
        /// Adds the transmitted ContactInfo to the database
        /// </summary>
        /// <remarks>
        /// <b>Required:</b>
        /// <ul>
        ///     <li>firstName</li>
        ///     <li>lastName</li>
        ///     <li>email</li>
        ///     <li>address.zipCode</li>
        /// </ul>
        /// </remarks>
        /// <param name="contactInfo">The ContactInfo to add</param>
        /// <returns>The the newly created ContactInfo</returns>
        /// <response code="200">Returns the newly created ContactInfo</response>
        /// <response code="400">The request parameters are invalid. Check error messages in response.</response>
        /// <response code="401">If the user is not logged in</response>
        /// <response code="500">If the database operation failed unexpectedly</response>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ContactInfoViewModel))]
        public async Task<IActionResult> Post([FromBody] CreateContactInfoRequest contactInfo)
        {
            (bool success, ContactInfoViewModel? vm, RequestError? error) = await new CreateContactInfo(_context).Do(contactInfo);

            if (!success && error != null)
                return StatusCode((int)error.StatusCode, error.Errors);

            return Ok(vm);
        }

        /// <summary>
        /// Updates the transmitted ContactInfo in the database
        /// </summary>
        /// /// <remarks>
        /// <b>Required:</b>
        /// <ul>
        ///     <li>id</li>
        ///     <li>firstName</li>
        ///     <li>lastName</li>
        ///     <li>email</li>
        /// </ul>
        /// </remarks>
        /// <param name="contactInfo">The ContactInfo to update. Ensure that the correct id was provided.</param>
        /// <returns>The the updated ContactInfo</returns>
        /// <response code="200">Returns the updated ContactInfo</response>
        /// <response code="400">The request parameters are invalid. Check error messages in response.</response>
        /// <response code="401">If the user is not logged in</response>
        /// <response code="500">If the database operation failed unexpectedly</response>
        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ContactInfoViewModel))]
        public async Task<IActionResult> Put([FromBody] ContactInfoViewModel contactInfo)
        {
            (bool success, ContactInfoViewModel? vm, RequestError? error) = await new UpdateContactInfo(_context).Do(contactInfo);

            if (!success && error != null)
                return StatusCode((int)error.StatusCode, error.Errors);

            return Ok(vm);
        }

        /// <summary>
        /// Removes the spezified ContactInfo from the database
        /// </summary>
        /// <param name="id">The id of the ContactInfo that should be removed</param>
        /// <response code="200">If the ContactInfo was removed</response>
        /// <response code="401">If the user is not logged in</response>
        /// <response code="404">If the ContactInfo with the spezified id doesn't exist</response>
        /// <response code="500">If the database operation failed unexpectedly</response>
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            (bool success, RequestError? error) = await new DeleteContactInfo(_context).Do(id);

            if (!success && error != null)
                return StatusCode((int)error.StatusCode, error.Errors);

            return Ok();
        }
    }
}
