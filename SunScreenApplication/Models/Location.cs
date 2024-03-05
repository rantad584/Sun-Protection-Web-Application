using Microsoft.EntityFrameworkCore;

namespace SunScreenApplication.Models
{
    public class Location
    {
        public int Id { get; set; }
        public string? Postcode { get; set; }
        public string? Suburb { get; set; }
        public string? State { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
    }

    public class LocationDBContext : DbContext
    {
        public LocationDBContext(DbContextOptions<LocationDBContext> options) : base(options)
        {

        }

        public DbSet<Location> postcodes_geo { get; set; }
    }
}
