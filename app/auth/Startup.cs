using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KapaMonitor.Auth.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Logging;

namespace KapaMonitor.Auth
{
    public class Startup
    {
        private const string CORS_POLICY = "corspolicy";

        private readonly IWebHostEnvironment _env;
        public IConfiguration Configuration { get; }
        private readonly bool IsDockerEnvironment = Environment.GetEnvironmentVariable("DEPLOYMENT") == "Docker";

        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            Configuration = configuration;
            _env = env;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            string connection = _env.IsDevelopment() ? Configuration.GetConnectionString("DefaultConnection")
                                                     : (Environment.GetEnvironmentVariable("PostgresKapaMonitorConnection") ?? "");
            if (_env.IsDevelopment() && IsDockerEnvironment)
                connection = connection.Replace("host=localhost", "host=db-server");
            services.AddDbContext<ApplicationDbContext>(options => options.UseNpgsql(connection));

            services.AddIdentity<IdentityUser, IdentityRole>(config =>
                    {
                        config.Password.RequiredLength = 6;
                        config.Password.RequireDigit = false;
                        config.Password.RequireNonAlphanumeric = false;
                        config.Password.RequireLowercase = false;
                        config.Password.RequireUppercase = false;
                    })
                    .AddEntityFrameworkStores<ApplicationDbContext>()
                    .AddDefaultTokenProviders();

            var assembly = typeof(Startup).Assembly.GetName().Name;

            services.AddIdentityServer()
                    .AddDeveloperSigningCredential()
                    .AddAspNetIdentity<IdentityUser>()
                    .AddConfigurationStore(options =>
                    {
                        options.ConfigureDbContext = b => b.UseNpgsql(connection, sql => sql.MigrationsAssembly(assembly));
                    })
                    .AddOperationalStore(options =>
                    {
                        options.ConfigureDbContext = b => b.UseNpgsql(connection, sql => sql.MigrationsAssembly(assembly));
                    });

            services.AddCors(options =>
            {
                if (_env.IsDevelopment())
                {
                    options.AddPolicy(CORS_POLICY,
                    builder =>
                    {
                        builder.WithOrigins()
                               .AllowAnyOrigin()
                               .AllowAnyMethod()
                               .AllowAnyHeader();
                    });
                }
                else
                {
                    options.AddPolicy(CORS_POLICY,
                    builder =>
                    {
                        builder.SetIsOriginAllowedToAllowWildcardSubdomains()
                               .WithOrigins("https://*.kapamonitor.de")
                               .AllowAnyMethod()
                               .AllowAnyHeader();
                    });
                }
            });

            services.AddControllersWithViews();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ApplicationDbContext context)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            // migrate any database changes on startup
            context.Database.Migrate();
            DbInitializer.InitializeDb(app);

            app.UseRouting();

            app.UseCors(CORS_POLICY);

            app.UseIdentityServer();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapDefaultControllerRoute();
            });
        }
    }
}
