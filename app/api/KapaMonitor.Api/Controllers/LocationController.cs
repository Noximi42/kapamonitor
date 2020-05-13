using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using KapaMonitor.Database;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using KapaMonitor.Application.Locations;
using KapaMonitor.Domain.Internal;
using static KapaMonitor.Application.Locations.CreateLocation;
using System.Collections.Generic;

namespace KapaMonitor.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    [Consumes("application/json")]
    [Produces("application/json")]
    public class LocationController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public LocationController(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Returns a specific Location
        /// </summary>
        /// <param name="id">The id of the Location</param>
        /// <returns>The specified Location</returns>
        /// <response code="200">Returns the Location</response>
        /// <response code="401">If the user is not logged in</response>
        /// <response code="404">If the Location with the spezified id doesn't exist</response>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(LocationGetModel))]
        public async Task<IActionResult> Get(int id)
        {
            LocationGetModel? vm = await new GetLocation(_context).Do(id);

            if (vm == null)
                return NotFound();

            return Ok(vm);
        }

        /// <summary>
        /// Adds the transmitted Location to the database
        /// </summary>
        /// <remarks>
        /// <b>Required:</b>
        /// <ul>
        ///     <li>name</li>
        ///     <li>address.zipCode</li>
        /// </ul>
        /// </remarks>
        /// <param name="location">The Location to add</param>
        /// <returns>The the newly created Location</returns>
        /// <response code="200">Returns the newly created Location</response>
        /// <response code="400">The request parameters are invalid. Check error messages in response.</response>
        /// <response code="401">If the user is not logged in</response>
        /// <response code="500">If the database operation failed unexpectedly</response>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(LocationGetModel))]
        public async Task<IActionResult> Post([FromBody] LocationCreateModel location)
        {
            (bool success, LocationGetModel? vm, RequestError? error) = await new CreateLocation(_context).Do(location);

            if (!success && error != null)
                return StatusCode((int)error.StatusCode, error.Errors);

            return Ok(vm);
        }

        /// <summary>
        /// Updates the transmitted Location in the database
        /// </summary>
        /// /// <remarks>
        /// <b>Required:</b>
        /// <ul>
        ///     <li>name</li>
        ///     <li>address.zipCode</li>
        /// </ul>
        /// </remarks>
        /// <param name="location">The Location to update. Ensure that the correct id was provided.</param>
        /// <returns>The the updated Location</returns>
        /// <response code="200">Returns the updated Location</response>
        /// <response code="400">The request parameters are invalid. Check error messages in response.</response>
        /// <response code="401">If the user is not logged in</response>
        /// <response code="500">If the database operation failed unexpectedly</response>
        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(LocationGetModel))]
        public async Task<IActionResult> Put([FromBody] LocationUpdateModel location)
        {
            (bool success, LocationGetModel? vm, RequestError? error) = await new UpdateLocation(_context).Do(location);

            if (!success && error != null)
                return StatusCode((int)error.StatusCode, error.Errors);

            return Ok(vm);
        }

        /// <summary>
        /// Removes the spezified Location from the database
        /// </summary>
        /// <param name="id">The id of the Location that should be removed</param>
        /// <response code="200">If the Location was removed</response>
        /// <response code="401">If the user is not logged in</response>
        /// <response code="404">If the Location with the spezified id doesn't exist</response>
        /// <response code="500">If the database operation failed unexpectedly</response>
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            (bool success, RequestError? error) = await new DeleteLocation(_context).Do(id);

            if (!success && error != null)
                return StatusCode((int)error.StatusCode, error.Errors);

            return Ok();
        }
    }
}
