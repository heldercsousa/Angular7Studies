using IdentityServer4.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecipesBookApi
{
    internal class Clients
    {
        public static IEnumerable<Client> Get()
        {
            return new List<Client> {
                new Client {
                    ClientId = "oauthClient",
                    ClientName = "Example Client Credentials Client Application",
                    AllowedGrantTypes = GrantTypes.ClientCredentials,
                    ClientSecrets = new List<Secret> {
                        new Secret("superSecretPassword".Sha256())},
                    AllowedScopes = new List<string> { "recipesBookAPI.read" }
                },
                new Client {
                    ClientId = "openIdConnectClient",
                    ClientName = "Example Implicit Client Application",
                    AllowedGrantTypes = GrantTypes.Implicit,
                    AllowedScopes = new List<string>
                    {
                        IdentityServer4.IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServer4.IdentityServerConstants.StandardScopes.Profile,
                        IdentityServer4.IdentityServerConstants.StandardScopes.Email,
                        "role",
                        "recipesBookAPI.write"
                    },
                    RedirectUris = new List<string> {"https://localhost:8888/signin-oidc"},
                    PostLogoutRedirectUris = new List<string> { "https://localhost:8888" }
                }
            };
        }
    }
}
