using Microsoft.AspNetCore.Builder;
using System.Threading.Tasks;

namespace WebpackExample
{
    public class Startup
    {
        public void Configure(IApplicationBuilder app)
        {
            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.MapWhen(context => {
                var path = context.Request.Path.Value;
                return !path.Contains(".");
            },
            spa => {
                spa.Use((context, next) =>
                {
                    context.Request.Path = new Microsoft.AspNetCore.Http.PathString("/index.html");
                    return next();
                });

                spa.UseStaticFiles();
            });

        }
    }
}