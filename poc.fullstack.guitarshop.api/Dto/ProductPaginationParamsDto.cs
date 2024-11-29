using poc.fullstack.guitarshop.api.Helper.Pagination;

namespace poc.fullstack.guitarshop.api.Dto;

public sealed class ProductPaginationParamsDto : PaginationPraramsDto
{
    public string OrderBy { get; set; }
    public string SearchTerm { get; set; }
    public string Types { get; set; }
    public string Brands { get; set; }
}