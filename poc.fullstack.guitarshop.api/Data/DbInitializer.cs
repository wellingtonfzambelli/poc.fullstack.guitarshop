using poc.fullstack.guitarshop.api.Entities;

namespace poc.fullstack.guitarshop.api.Data;

public static class DbInitializer
{
    public static void Initialize(GuitarShopContext context)
    {
        if (context.Products.Any()) return;


        var products = new List<Product>
        {
            new  Product
            {
                Name = "Fender Stratocaster",
                Description = "A legendary electric guitar known for its versatility and iconic design. Perfect for rock, blues, and jazz players.",
                Price = 1200,
                PictureUrl = "/images/products/stratocaster.png",
                Brand = "Fender",
                Type = "Electric Guitar",
                QuantityInStock = 15
            },
            new Product
            {
                Name = "Gibson Les Paul",
                Description = "A classic guitar delivering rich tones and sustain. Ideal for professional guitarists seeking premium quality.",
                Price = 2500,
                PictureUrl = "/images/products/les-paul.png",
                Brand = "Gibson",
                Type = "Electric Guitar",
                QuantityInStock = 10
            },
            new Product
            {
                Name = "Boss DS-1 Distortion Pedal",
                Description = "A distortion pedal that defines the sound of rock and metal for decades. Compact and powerful.",
                Price = 59,
                PictureUrl = "/images/products/boss-ds1.png",
                Brand = "Boss",
                Type = "Effects Pedal",
                QuantityInStock = 50
            },
            new Product
            {
                Name = "Ampeg SVT Bass Amp",
                Description = "A high-performance bass amplifier delivering exceptional sound quality. A favorite among bass players.",
                Price = 1400,
                PictureUrl = "/images/products/ampeg-svt.png",
                Brand = "Ampeg",
                Type = "Amplifier",
                QuantityInStock = 5
            },
            new Product
            {
                Name = "Yamaha Stage Custom Birch Drum Set",
                Description = "An excellent drum set for professionals and learners alike, offering great tonal quality and durability.",
                Price = 800,
                PictureUrl = "/images/products/stage-custom.png",
                Brand = "Yamaha",
                Type = "Drums",
                QuantityInStock = 20
            },
            new Product
            {
                Name = "Ibanez SR300E Bass Guitar",
                Description = "A modern bass guitar with smooth playability and dynamic sound. Great for beginners and professionals.",
                Price = 349,
                PictureUrl = "/images/products/ibanez-sr300e.png",
                Brand = "Ibanez",
                Type = "Bass Guitar",
                QuantityInStock = 18
            },
            new Product
            {
                Name = "Shure SM57 Microphone",
                Description = "A versatile microphone widely used for instruments and vocals, delivering studio-quality sound.",
                Price = 99,
                PictureUrl = "/images/products/sm57.png",
                Brand = "Shure",
                Type = "Microphone",
                QuantityInStock = 40
            },
            new Product
            {
                Name = "PRS SE Custom 24",
                Description = "A versatile guitar with a warm, resonant tone. Perfect for studio and live performances.",
                Price = 849,
                PictureUrl = "/images/products/prs-custom24.png",
                Brand = "PRS",
                Type = "Electric Guitar",
                QuantityInStock = 12
            },
            new Product
            {
                Name = "Epiphone Thunderbird IV",
                Description = "A powerful bass guitar with iconic design, known for its deep and punchy sound.",
                Price = 449,
                PictureUrl = "/images/products/thunderbird.png",
                Brand = "Epiphone",
                Type = "Bass Guitar",
                QuantityInStock = 8
            },
            new Product
            {
                Name = "Marshall DSL40C Tube Combo Amp",
                Description = "A classic tube amplifier delivering rich and powerful sound for professionals.",
                Price = 749,
                PictureUrl = "/images/products/marshall-dsl40c.png",
                Brand = "Marshall",
                Type = "Amplifier",
                QuantityInStock = 7
            },
            new Product
            {
                Name = "Line 6 Spider V 60 MkII",
                Description = "A feature-packed amplifier offering a variety of tones and effects for all genres.",
                Price = 399,
                PictureUrl = "/images/products/line6-spider.png",
                Brand = "Line 6",
                Type = "Amplifier",
                QuantityInStock = 10
            },
            new Product
            {
                Name = "MXR Carbon Copy Analog Delay",
                Description = "A lush analog delay pedal with a warm and vintage tone. Ideal for atmospheric sounds.",
                Price = 149,
                PictureUrl = "/images/products/mxr-carboncopy.png",
                Brand = "MXR",
                Type = "Effects Pedal",
                QuantityInStock = 25
            },
            new Product
            {
                Name = "Electro-Harmonix Big Muff Pi",
                Description = "An iconic fuzz pedal with a distinctive and saturated tone. A must-have for rock and grunge players.",
                Price = 99,
                PictureUrl = "/images/products/big-muff.png",
                Brand = "Electro-Harmonix",
                Type = "Effects Pedal",
                QuantityInStock = 30
            },
            new Product
            {
                Name = "Roland V-Drums TD-17KVX",
                Description = "A high-end electronic drum kit with realistic feel and premium sound quality.",
                Price = 1800,
                PictureUrl = "/images/products/roland-vdrums.png",
                Brand = "Roland",
                Type = "Electronic Drum Kit",
                QuantityInStock = 5
            },
            new Product
            {
                Name = "Zildjian A Custom Cymbal Pack",
                Description = "A professional cymbal set offering a bright and expressive tone. Perfect for live gigs.",
                Price = 799,
                PictureUrl = "/images/products/zildjian-custom.png",
                Brand = "Zildjian",
                Type = "Cymbals",
                QuantityInStock = 15
            },
            new Product
            {
                Name = "Ernie Ball Regular Slinky Guitar Strings",
                Description = "A set of high-quality strings known for durability and balanced tone.",
                Price = 6.99,
                PictureUrl = "/images/products/ernie-ball-slinky.png",
                Brand = "Ernie Ball",
                Type = "Strings",
                QuantityInStock = 100
            },
            new Product
            {
                Name = "Gator Deluxe Guitar Case",
                Description = "A durable and lightweight case to protect your guitar on the road.",
                Price = 120,
                PictureUrl = "/images/products/gator-case.png",
                Brand = "Gator",
                Type = "Accessories",
                QuantityInStock = 20
            }
        };

        foreach (var product in products)
        { 
            context.Products.Add(product);
        }

        context.SaveChanges();
    }
}