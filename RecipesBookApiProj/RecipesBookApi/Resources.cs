using IdentityServer4.Models;
using System.Collections.Generic;

namespace RecipesBookApi
{
    internal class Resources
    {
        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new List<IdentityResource> {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
                new IdentityResources.Email(),
                //custom identity resource in the form of role which returns an role claims for authenticated user.
                new IdentityResource {
                    Name = "role",
                    UserClaims = new List<string> {"role"}
                }
            };
        }

        public static IEnumerable<ApiResource> GetApiResources()
        {
            return new List<ApiResource> {
            new ApiResource {
                Name = "recipesBookAPI",
                DisplayName = "Recipes Book API",
                Description = "Recipes Book API Access",
                UserClaims = new List<string> {"role"},
                ApiSecrets = new List<Secret> {new Secret("scopeSecret".Sha256())},
                Scopes = new List<Scope> {
                    new Scope("recipesBookAPI.read"),
                    new Scope("recipesBookAPI.write")
                }
            }
        };
        }
    }
}
