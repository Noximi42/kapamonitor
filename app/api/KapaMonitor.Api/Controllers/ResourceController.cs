using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using KapaMonitor.Database;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using KapaMonitor.Application.Resources;
using System.Collections;
using System.Collections.Generic;

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
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ResourceGetModel))]
        public async Task<IActionResult> Get(int id)
        {
            var vm = await new GetResource(_context).Do(id);

            return Ok(vm);
        }

        /// <summary>
        /// Returns all Resources
        /// </summary>
        /// <returns>All Resources</returns>
        /// <response code="200">Returns all Resources as list</response>
        /// <response code="401">If the user is not logged in</response>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<ResourceGetModel>))]
        public async Task<IActionResult> Get()
        {
            var vms = await new GetResources(_context).Do();

            return Ok(vms);
        }
    }
}
