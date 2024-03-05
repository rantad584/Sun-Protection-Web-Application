using Microsoft.AspNetCore.Mvc;
using SunScreenApplication.Models;

namespace SunScreenApplication.Controllers
{
    public class UvIndexController : Controller
    {
        private LocationDBContext _db;

        public UvIndexController(LocationDBContext db)
        {
            _db = db;
        }

        public IActionResult Form()
        {
            return View();
        }

        public IActionResult Results()
        {
            return View();
        }

        // POST: /UvIndex/Form
        [HttpPost]
        public IActionResult Form(string postcode)
        {
            var location = _db.postcodes_geo.FirstOrDefault(l => l.Postcode == postcode);

            if (location != null)
            {
                // Redirect to another action method
                return RedirectToAction("Results", new { latitude = location.Latitude, longitude = location.Longitude });
            }
            else
            {
                // Handle the case where no data is found for the provided postcode
                return RedirectToAction("Form");
            }
        }
    }
}
