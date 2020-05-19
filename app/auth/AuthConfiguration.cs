using IdentityModel;
using IdentityServer4.Models;
using System.Collections.Generic;
using System.Security.Permissions;

namespace KapaMonitor.Auth
{
    public static class AuthConfiguration
    {
        private const string KAPAMONITOR_API_SCOPE = "KapaMonitor_Api";
        private const string REDIRECT_URI = "http://localhost:3000/account/signin";


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

        public static IEnumerable<Client> GetClients() => 
            new List<Client> 
            { 
                new Client { 
                    ClientId = "client_id", 
                    AllowedGrantTypes = GrantTypes.Implicit,
                    
                    RedirectUris = { REDIRECT_URI },

                    AllowedScopes = { KAPAMONITOR_API_SCOPE },

                    AllowAccessTokensViaBrowser = true,
                    RequireConsent = false,

                    // token life span in seconds
                    // AccessTokenLifetime = 1,
                } 
            };
    }
}
