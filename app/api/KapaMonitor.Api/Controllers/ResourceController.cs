using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using KapaMonitor.Database;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using KapaMonitor.Application.Resources;

namespace KapaMonitor.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    [Consumes("application/json")]
    [Produces("application/json")]
    public class ResourceController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ResourceController(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Returns a specific Resource
        /// </summary>
        /// <param name="id">The id of the Resource</param>
        /// <returns>The specified Resource</returns>
        /// <response code="200">Returns the Resource</response>
        /// <response code="401">If the user is not logged in</response>
        /// <response code="404">If the Resource with the spezified id doesn't exist</response>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ResourceViewModel))]
        public async Task<IActionResult> Get(int id)
        {
            ResourceViewModel? vm = await new GetResource(_context).Do(id);

            if (vm == null)
                return NotFound();

            return Ok(vm);
        }
    }
}
