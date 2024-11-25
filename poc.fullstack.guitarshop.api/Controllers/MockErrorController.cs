using Microsoft.AspNetCore.Mvc;

namespace poc.fullstack.guitarshop.api.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public sealed class MockErrorController : ControllerBase
{
    [HttpGet("not-found")]
    public async Task<IActionResult> GetNotFoundAsync(CancellationToken ct) =>
        NotFound();

    [HttpGet("bad-request")]
    public async Task<IActionResult> GetBadRequestAsync(CancellationToken ct) =>
        BadRequest(new ProblemDetails { Title = "This is a bad request" });

    [HttpGet("unauthorized")]
    public async Task<IActionResult> GetUnauthorizedAsync(CancellationToken ct) =>
        Unauthorized();

    [HttpGet("validation-error")]
    public async Task<IActionResult> GetValidationErrordAsync(CancellationToken ct)
    {
        ModelState.AddModelError("Problem1", "This is the first error");
        ModelState.AddModelError("Problem1", "This is the second error");

        return ValidationProblem();
    }

    [HttpGet("server-error")]
    public async Task<IActionResult> GetExceptiondAsync(CancellationToken ct) =>
        throw new Exception("This is a server error");
}