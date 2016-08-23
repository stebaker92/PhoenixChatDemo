using System.Web.Http;
using System.Web.Http.Cors;
using PhoenixChatDemoApi.Factory;

namespace PhoenixChatDemoApi.Controllers
{
    [RoutePrefix("token")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class TokenController : ApiController
    {
        // GET: /token
        [HttpGet]
        [Route("get")]
        public IHttpActionResult Get(string identity, string device)
        {
            var tokenModel = TokenFactory.CreateToken(identity, device);
            return Ok(tokenModel);
        }

        [HttpPost]
        public IHttpActionResult Post([FromBody] TestModel model)
        {
            return Ok(model.WorkflowSid);
        }

        public class TestModel
        {
            public string Attributes { get; set; }
            public string WorkflowSid { get; set; }
        }

    }
}