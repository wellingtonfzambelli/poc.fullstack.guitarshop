using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace poc.fullstack.guitarshop.api.Controllers;

[AllowAnonymous]
public sealed class FallbackController : Controller
{
    public IActionResult Index() =>
        PhysicalFile
        (
            Path.Combine(Directory.GetCurrentDirectory(), 
            "wwwroot", 
            "index.html"
        ), "text/HTML");
}