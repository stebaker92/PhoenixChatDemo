using System.Web.Http;
using Newtonsoft.Json.Serialization;

namespace PhoenixChatDemoApi
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.EnableCors();

            config.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
        }
    }
}