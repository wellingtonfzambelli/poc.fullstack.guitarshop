using poc.fullstack.guitarshop.api.Entities;
using poc.fullstack.guitarshop.api.Helper.Pagination;
using System.Text.Json;

namespace poc.fullstack.guitarshop.api.Extensions;

public static class HttpExtensions
{
    public static void AddPagination(this HttpResponse response, PaginationMetaDataDto metaData)
    {
        var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

        response.Headers.Append("Pagination", JsonSerializer.Serialize(metaData, options));
        response.Headers.Append("Access-Control-Expose-Headers", "Pagination");

    }
}