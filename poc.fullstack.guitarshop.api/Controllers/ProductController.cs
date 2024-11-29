using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using poc.fullstack.guitarshop.api.Data;
using poc.fullstack.guitarshop.api.Dto;
using poc.fullstack.guitarshop.api.Entities;
using poc.fullstack.guitarshop.api.Extensions;
using System.Text.Json;

namespace poc.fullstack.guitarshop.api.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public sealed class ProductController : ControllerBase
{
    private readonly ILogger<ProductController> _logger;
    private readonly GuitarShopContext _context;

    public ProductController
    (
        GuitarShopContext context, 
        ILogger<ProductController> logger
    )
    {
        _context = context;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<IList<Product>>> GetProductsAsync
    (
        [FromQuery]ProductParamsDto productParamsDto,
        CancellationToken ct
    )
    {
        var query = _context.Products
            .Sort(productParamsDto.OrderBy)
            .Search(productParamsDto.SearchTerm)
            .Filter(productParamsDto.Brands, productParamsDto.Types)
            .AsQueryable();

        var products = await PagedList<Product>.ToPagedList
            (
                query,
                productParamsDto.PageNumber,
                productParamsDto.PageSize,
                ct
            );

        Response.AddPagination(products.PaginationMetaDataDto);

        return products;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetProductByIdAsync
    (
        Guid id, 
        CancellationToken ct
    )
    {
        var product = await _context.Products.FindAsync(id, ct);

        if (product is null)
            return NotFound();

        return Ok(product);
    }

    [HttpGet("filters")]
    public async Task<IActionResult> GetFilters(CancellationToken ct)
    {
        var brands = await _context.Products.Select(s => s.Brand).Distinct().ToListAsync(ct);
        var types = await _context.Products.Select(s => s.Type).Distinct().ToListAsync(ct);

        return Ok(new { brands, types });
    }
}