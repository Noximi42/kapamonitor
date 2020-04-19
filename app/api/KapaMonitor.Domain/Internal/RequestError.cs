using System.Collections.Generic;
using System.Net;

namespace KapaMonitor.Domain.Internal
{
    public class RequestError
    {
        public RequestError() { }
        public RequestError(HttpStatusCode statusCode, string error) : this(statusCode, new List<string> { error }) { }
        public RequestError(HttpStatusCode statusCode, List<string> errors)
        {
            StatusCode = statusCode;
            Errors = errors;
        }


        public HttpStatusCode StatusCode { get; set; }
        public List<string> Errors { get; set; }
    }
}
