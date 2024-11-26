using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using poc.fullstack.guitarshop.api.Data;
using poc.fullstack.guitarshop.api.Entities;

namespace poc.fullstack.guitarshop.api.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public sealed class ProductController : ControllerBase
{
    private readonly ILogger<ProductController> _logger;
    private readonly GuitarShopContext _context;

    public ProductController(GuitarShopContext context, ILogger<ProductController> logger)
    {
        _context = context;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<IList<Product>>> GetProductsAsync(CancellationToken ct)
    {
        var products = await _context.Products.ToListAsync(ct);

        if (products is null)
            return NotFound();

        return Ok(products);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetProductByIdAsync(Guid id, CancellationToken ct)
    {
        var product = await _context.Products.FindAsync(id, ct);

        if (product is null)
            return NotFound();

        return Ok(product);
    }
}