﻿using Microsoft.EntityFrameworkCore;
using poc.fullstack.guitarshop.api.Entities;

namespace poc.fullstack.guitarshop.api.Data;

public sealed class GuitarShopContext : DbContext
{
    public GuitarShopContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<Product> Products { get; set; }
}