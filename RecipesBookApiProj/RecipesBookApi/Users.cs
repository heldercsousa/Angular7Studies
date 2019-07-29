using System.Collections.Generic;

namespace RecipesBookApi
{
    internal class Users
    {
        public static List<IdentityServer4.Test.TestUser> Get()
        {
            return new List<IdentityServer4.Test.TestUser> {
                new IdentityServer4.Test.TestUser {
                    SubjectId = "5BE86359-073C-434B-AD2D-A3932222DABE", // unique identifier
                    Username = "helder",
                    Password = "senha",
                    Claims = new List<System.Security.Claims.Claim> {
                        new System.Security.Claims.Claim(IdentityModel.JwtClaimTypes.Email, "heldercsousa@gmail.com"),
                        new System.Security.Claims.Claim(IdentityModel.JwtClaimTypes.Role, "admin")
                    }
                }
            };
        }
    }
}
