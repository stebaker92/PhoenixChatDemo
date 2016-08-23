using System.Web.Http;

namespace PhoenixChatDemoApi
{
    public static class RouteConfig
    {
        public static void RegisterRoutes()
        {
            GlobalConfiguration.Configuration.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "{controller}/{id}",
                defaults: new { id = System.Web.Http.RouteParameter.Optional }
            );
        }
    }
}
