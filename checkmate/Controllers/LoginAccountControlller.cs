//using checkmate.ViewModels;
//using Microsoft.AspNetCore.Identity;
//using Microsoft.AspNetCore.Mvc;

//[ApiController]
//[Route("[controller]")]
//public class AccountController : ControllerBase
//{
//    private readonly UserManager<IdentityUser> _userManager;
//    private readonly SignInManager<IdentityUser> _signInManager;

//    public AccountController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager)
//    {
//        _userManager = userManager;
//        _signInManager = signInManager;
//    }

//    // Other methods...

//    [HttpPost("Login")]
//    public async Task<IActionResult> Login(LoginViewModel model)
//    {
//        if (!ModelState.IsValid)
//        {
//            return BadRequest(ModelState);
//        }

//        var user = await _userManager.FindByEmailAsync(model.Email);
//        if (user == null)
//        {
//            // User not found
//            return BadRequest();
//        }

//        var signInResult = await _signInManager.PasswordSignInAsync(user, model.Password, model.RememberMe, lockoutOnFailure: false);

//        if (signInResult.Succeeded)
//        {
//            return Ok();  // Login successful
//        }
//        else
//        {
//            // Invalid password
//            return BadRequest();
//        }
//    }
//}
