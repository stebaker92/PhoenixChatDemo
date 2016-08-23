using System.Web.Http;

namespace PhoenixChatDemoApi
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);
            RouteConfig.RegisterRoutes();
        }
    }
}
