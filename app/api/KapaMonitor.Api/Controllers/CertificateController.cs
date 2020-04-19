using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using KapaMonitor.Database;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using KapaMonitor.Application.Certificates;

namespace KapaMonitor.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    [Consumes("application/json")]
    [Produces("application/json")]
    public class CertificateController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CertificateController(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Returns a specific Certificate
        /// </summary>
        /// <param name="id">The id of the Certificate</param>
        /// <returns>The specified Certificate</returns>
        /// <response code="200">Returns the Certificate</response>
        /// <response code="401">If the user is not logged in</response>
        /// <response code="404">If the Certificate with the spezified id doesn't exist</response>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CertificateViewModel))]
        public async Task<IActionResult> Get(int id)
        {
            CertificateViewModel? vm = await new GetCertificate(_context).Do(id);

            if (vm == null)
                return NotFound();

            return Ok(vm);
        }
    }
}
