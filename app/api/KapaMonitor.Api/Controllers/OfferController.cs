using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using KapaMonitor.Database;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using KapaMonitor.Application.Offers;
using KapaMonitor.Domain.Internal;
using static KapaMonitor.Application.Offers.CreateOffer;
using System.Collections.Generic;

namespace KapaMonitor.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    [Consumes("application/json")]
    [Produces("application/json")]
    public class OfferController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OfferController(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Returns a specific Offer
        /// </summary>
        /// <param name="id">The id of the Offer</param>
        /// <returns>The specified Offer</returns>
        /// <response code="200">Returns the Offer</response>
        /// <response code="401">If the user is not logged in</response>
        /// <response code="404">If the Offer with the spezified id doesn't exist</response>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(OfferViewModel))]
        public async Task<IActionResult> Get(int id)
        {
            OfferViewModel? vm = await new GetOffer(_context).Do(id);

            if (vm == null)
                return NotFound();

            return Ok(vm);
        }

        /// <summary>
        /// Returns all Offers
        /// </summary>
        /// <returns>All Offers</returns>
        /// <response code="200">Returns all Offers as list</response>
        /// <response code="401">If the user is not logged in</response>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<OfferViewModel>))]
        public async Task<IActionResult> Get()
        {
            var vms = await new GetOffers(_context).Do();

            return Ok(vms);
        }


        /// <summary>
        /// Adds the transmitted Offer to the database
        /// </summary>
        /// <remarks>
        /// <b>Required:</b>
        /// <ul>
        ///     <li>number</li>
        ///     <li>ContactInfoId</li>
        ///     <li>ResourceId</li>
        /// </ul>
        /// </remarks>
        /// <param name="offer">The Offer to add</param>
        /// <returns>The the newly created Offer</returns>
        /// <response code="200">Returns the newly created Offer</response>
        /// <response code="400">The request parameters are invalid. Check error messages in response.</response>
        /// <response code="401">If the user is not logged in</response>
        /// <response code="500">If the database operation failed unexpectedly</response>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(OfferViewModel))]
        public async Task<IActionResult> Post([FromBody] CreateOfferRequest offer)
        {
            (bool success, OfferViewModel? vm, RequestError? error) = await new CreateOffer(_context).Do(offer);

            if (!success && error != null)
                return StatusCode((int)error.StatusCode, error.Errors);

            return Ok(vm);
        }

        /// <summary>
        /// Updates the transmitted Offer in the database
        /// </summary>
        /// /// <remarks>
        /// <span style="color: orange"><b>Caution:</b></span>
        /// <ul style="color: orange">
        ///     <li>If no locationId was provided, the current Location will be uset</li>
        /// </ul>
        /// <b>Required:</b>
        /// <ul>
        ///     <li>id</li>
        ///     <li>number</li>
        /// </ul>
        /// <b>Remarks:</b>
        /// <ul>
        ///     <li>ContactInfo and Resource will only be updated if contactInfoId or resourceId were provided.</li>
        /// </ul>
        /// </remarks>
        /// <param name="offer">The Offer to update. Ensure that the correct id was provided.</param>
        /// <returns>The the updated Offer</returns>
        /// <response code="200">Returns the updated Offer</response>
        /// <response code="400">The request parameters are invalid. Check error messages in response.</response>
        /// <response code="401">If the user is not logged in</response>
        /// <response code="500">If the database operation failed unexpectedly</response>
        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(OfferViewModel))]
        public async Task<IActionResult> Put([FromBody] OfferViewModel offer)
        {
            (bool success, OfferViewModel? vm, RequestError? error) = await new UpdateOffer(_context).Do(offer);

            if (!success && error != null)
                return StatusCode((int)error.StatusCode, error.Errors);

            return Ok(vm);
        }

        /// <summary>
        /// Removes the spezified Offer from the database
        /// </summary>
        /// <param name="id">The id of the Offer that should be removed</param>
        /// <response code="200">If the Offer was removed</response>
        /// <response code="401">If the user is not logged in</response>
        /// <response code="404">If the Offer with the spezified id doesn't exist</response>
        /// <response code="500">If the database operation failed unexpectedly</response>
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            (bool success, RequestError? error) = await new DeleteOffer(_context).Do(id);

            if (!success && error != null)
                return StatusCode((int)error.StatusCode, error.Errors);

            return Ok();
        }
    }
}
