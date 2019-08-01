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
                var token = BuildToken(user);
                var tokenString = new JwtSecurityTokenHandler().WriteToken(token);
                response = Ok(new {
                    email =user.Email,
                    id =user.Name,
                    _token = tokenString,
                    _tokenExpirationDate = token.ValidTo.Ticks
                });
            }

            return response;
        }

        private JwtSecurityToken BuildToken(UserModel user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
                _config["Jwt:Issuer"],
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: creds);

            return token;
        }

        private UserModel Authenticate(LoginModel login)
        {
            UserModel user = null;

            if (login.Email == "heldercsousa@gmail.com" && login.Password == "pass")
            {
                user = new UserModel { Name = "Administrador", Email = "heldercsousa@gmail.com" };
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