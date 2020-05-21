using IdentityModel;
using IdentityServer4;
using IdentityServer4.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using System.Collections.Generic;
using System.Security.Permissions;

namespace KapaMonitor.Auth
{
    public static class AuthConfiguration
    {
        private const string KAPAMONITOR_API_SCOPE = "KapaMonitor_Api";

        public static IEnumerable<IdentityResource> GetIdentityResources() =>
            new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
            };

        public static IEnumerable<ApiResource> GetApiResources() => 
            new List<ApiResource> 
            { 
                new ApiResource(KAPAMONITOR_API_SCOPE, new string[] { "km.role" }) 
            };

        public static IEnumerable<Client> GetClients(bool isDevelopment) => 
            new List<Client> 
            { 
                new Client {
                    ClientId = "kmclient",
                    AllowedGrantTypes = GrantTypes.ResourceOwnerPassword,
                    AllowOfflineAccess = true,
                    RequireClientSecret = false,
                    UpdateAccessTokenClaimsOnRefresh = true,

                    AllowedScopes =
                    {
                        KAPAMONITOR_API_SCOPE,
                        IdentityServerConstants.StandardScopes.OfflineAccess,
                        IdentityServerConstants.StandardScopes.OpenId,
                    },

                    AllowedCorsOrigins = isDevelopment ? new List<string> { "http://127.0.0.1:3000", "http://localhost:3000" } : new List<string>(),
                } 
            };
    }
}
