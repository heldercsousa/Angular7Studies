using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RecipesBookApi.Model;

namespace RecipesBookApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("uai",
                    builder =>
                    {
                        builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader().AllowCredentials();
                    }
                );
            });


            /*
            Register the minimum identityserver4 required dependencies -- see https://www.scottbrady91.com/Identity-Server/Getting-Started-with-IdentityServer-4#Entity-Framework-Core
            What we have done here is registered IdentityServer in our DI container using AddIdentityServer, used a demo signing 
            certificate with AddDeveloperSigningCredential, and used in-memory stores for our clients, resources and users. By using 
            AddIdentityServer we are also causing all generated tokens/grants to be stored in memory. We will add actual clients, 
            resources and users shortly. 
            */
            services.AddIdentityServer()
            .AddInMemoryClients(new List<IdentityServer4.Models.Client>())
            .AddInMemoryIdentityResources(new List<IdentityServer4.Models.IdentityResource>())
            .AddInMemoryApiResources(new List<IdentityServer4.Models.ApiResource>())
            .AddTestUsers(new List<IdentityServer4.Test.TestUser>())
            .AddDeveloperSigningCredential();

            services.AddMvc()
            .SetCompatibilityVersion(CompatibilityVersion.Version_2_2)
            .AddJsonOptions(
                options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            );

            var connect = Configuration.GetConnectionString("RecipesDBConection");
            //var connection = @"Server=(localdb)\mssqllocaldb;Database=RecipesDB;Trusted_Connection=True;ConnectRetryCount=0";
            services.AddDbContext<RecipeDBContext>(options => options.UseSqlServer(connect));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            // add the IdentityServer middleware to the HTTP pipeline
            // UseIdentityServer allows IdentityServer to start intercepting routes and handle requests.
            app.UseIdentityServer();

            app.UseCors("uai");
            app.UseHttpsRedirection();
            app.UseMvc();
        }
    }
}
