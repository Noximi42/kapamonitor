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

        public async Task<IActionResult> Login(string username, string password, string returnUrl)
        {
            var result = await _signInManager.PasswordSignInAsync(username, password, false, false);

            if (result.Succeeded)
            {
                return Redirect(returnUrl);
            }

            return Ok();
        }   

        public async Task<IActionResult> Register(string username, string password, string returnUrl)
        {
            if (!IsPasswordValid(password))
                return BadRequest();

            var user = new IdentityUser(username);
            var result = await _userManager.CreateAsync(user, password);
            await _userManager.AddClaimAsync(user, new Claim("km.role", "user"));

            if (result.Succeeded)
            {
                await _signInManager.SignInAsync(user, false);
                return Redirect(returnUrl);
            }


            return Ok();
        }

        private bool IsPasswordValid(string password)
        {
            return password.Length >= 6;
        }
    }
}
