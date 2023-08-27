using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using checkmate.Models;
using Microsoft.Extensions.Logging;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.Extensions.Configuration;




namespace checkmate.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly ILogger<AccountController> _logger;
        private readonly IConfiguration _configuration;

      

        public AccountController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager, ILogger<AccountController> logger,IConfiguration configuration)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _logger = logger;
            _configuration = configuration;
        }


        [HttpPost]
        [Route("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            if (ModelState.IsValid)
            {
                var user = new IdentityUser { UserName = model.email, Email = model.email };
                var result = await _userManager.CreateAsync(user, model.password);
                if (result.Succeeded)
                {
                    await _signInManager.SignInAsync(user, isPersistent: false);
                    return Ok();
                }

                // If registration failed, log the errors and add them to the ModelState.
                foreach (var error in result.Errors)
                {
                    _logger.LogError(error.Description); // Log the error
                    ModelState.AddModelError(string.Empty, error.Description);
                }
            }

            // Log ModelState errors
            foreach (var modelState in ModelState.Values)
            {
                foreach (var error in modelState.Errors)
                {
                    _logger.LogError(error.ErrorMessage); // Log the error
                }
            }

            // If we got this far, something failed. Return a BadRequest or similar error status.
            return BadRequest(ModelState);
        }


        [HttpPost]
        [Route("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors)
                         .Select(e => e.ErrorMessage)
                         .ToList();
                return BadRequest(new { errors = errors });
            }

            var user = await _userManager.FindByEmailAsync(model.email);
            if (user == null)
            {
                // User not found
                return BadRequest(new { error = "User not found" });
            }

            var signInResult = await _signInManager.PasswordSignInAsync(user, model.password, isPersistent: false, lockoutOnFailure: false);

            if (signInResult.Succeeded)
            {
                var token = GenerateJwtToken(user);
                return Ok(new { message = "Login successful", token = token });  // Login successful
            }
            else
            {
                // Invalid password
                return BadRequest(new { error = "Invalid password" });
            }
        }

        private string GenerateJwtToken(IdentityUser user)
        {
            // Define token properties
            var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            // You can add more claims if needed
        };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:SecretKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays(Convert.ToDouble(_configuration["JWT:ExpiryInDays"]));

            var token = new JwtSecurityToken(
                _configuration["JWT:Issuer"],
                _configuration["JWT:Audience"],
                claims,
                expires: expires,
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}



//fail: checkmate.Controllers.AccountController[0]
//      Passwords must have at least one non alphanumeric character.
//fail: checkmate.Controllers.AccountController[0]
//      Passwords must have at least one digit ('0'-'9').
//fail: checkmate.Controllers.AccountController[0]
//      Passwords must have at least one uppercase ('A'-'Z').
//fail: checkmate.Controllers.AccountController[0]
//      Passwords must have at least one non alphanumeric character.
//fail: checkmate.Controllers.AccountController[0]
//      Passwords must have at least one digit ('0'-'9').
//fail: checkmate.Controllers.AccountController[0]
//      Passwords must have at least one uppercase ('A'-'Z').
