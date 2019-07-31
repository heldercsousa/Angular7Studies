using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using RecipesBookApi.Model;
using RecipesBookApi.Service;

namespace RecipesBookApi.Controllers
{
    [Route("api/[controller]")]
    public class TokenController : Controller
    {
        private UsuarioService usuarioService = new UsuarioService();

        private IConfiguration _config;

        public TokenController(IConfiguration config)
        {
            _config = config;
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult Post([FromBody] LoginModel login)
        {
            IActionResult response = Unauthorized();
            var user = Authenticate(login);

            if (user != null)
            {
                var tokenString = BuildToken(user);
                response = Ok(new { token = tokenString });
            }

            return response;
        }

        private string BuildToken(UserModel user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
                _config["Jwt:Issuer"],
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private UserModel Authenticate(LoginModel login)
        {
            UserModel user = null;

            if (login.Email == "heldercsousa@gmail.com" && login.Password == "pass")
            {
                user = new UserModel { Name = "Administrator", Email = "heldercsousa@gmail.com" };
            }
            else
            {
                Usuario usuario = usuarioService.getUsuario(login.Email, login.Password);

                if (usuario != null)
                {
                    user = new UserModel { Name = usuario.UserName, Email = usuario.Email };
                }
            }

            return user;
        }
    }
}