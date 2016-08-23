using System.Configuration;
using PhoenixChatDemoApi.Models;
using Twilio.Auth;

namespace PhoenixChatDemoApi.Factory
{
    public static class TokenFactory
    {
        public static TokenModel CreateToken(string identity, string device)
        {
            // Load Twilio configuration from Web.config
            var accountSid = ConfigurationManager.AppSettings["TwilioAccountSid"];
            var apiKey = ConfigurationManager.AppSettings["TwilioApiKey"];
            var apiSecret = ConfigurationManager.AppSettings["TwilioApiSecret"];
            var ipmServiceSid = ConfigurationManager.AppSettings["TwilioIpmServiceSid"];

            if (string.IsNullOrWhiteSpace(accountSid))
            {
                throw new System.Exception("Account Sid is missing from config");
            }

            // Create an Access Token generator
            var token = new AccessToken(accountSid, apiKey, apiSecret);
            token.Identity = identity;

            // Create an IP messaging grant for this token
            var grant = new IpMessagingGrant();
            grant.EndpointId = $"TwilioChatDemo:{identity}:{device}";
            grant.ServiceSid = ipmServiceSid;
            token.AddGrant(grant);

            return new TokenModel
            {
                Identity = identity,
                Token = token.ToJWT()
            };
        }
    }
}