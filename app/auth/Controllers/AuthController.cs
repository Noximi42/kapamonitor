using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace KapaMonitor.Auth.Controllers
{
    public class AuthController : Controller
    {
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly UserManager<IdentityUser> _userManager;

        public AuthController(SignInManager<IdentityUser> signInManager, UserManager<IdentityUser> userManager)
        {
            _signInManager = signInManager;
            _userManager = userManager;
        }


        [HttpPost]
        public async Task<IActionResult> Register([FromBody] AuthModel authModel)
        {
            if (!IsPasswordValid(authModel.Password))
                return BadRequest();

            var user = new IdentityUser(authModel.Username);
            var result = await _userManager.CreateAsync(user, authModel.Password);
            await _userManager.AddClaimAsync(user, new Claim("km.role", "user"));

            if (result.Succeeded)
            {
                await _signInManager.SignInAsync(user, false);
                return Ok();
            }

            return StatusCode(StatusCodes.Status500InternalServerError);
        }

        private bool IsPasswordValid(string password)
        {
            return password?.Length >= 6;
        }
    }
}
