using Microsoft.AspNetCore.Mvc;
using SunScreenApplication.Models;
using System.Text.Json;

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

        public IActionResult Results(string response)
        {
            return View("Results", response);
        }

        // POST: /UvIndex/Form
        [HttpPost]
        public async Task<IActionResult> Form(string postcode)
        {
            var location = _db.postcodes_geo.FirstOrDefault(l => l.Postcode == postcode);

            if (location != null)
            {
                decimal latitude = location.Latitude;
                decimal longitude = location.Longitude;

                // Call the web API with latitude and longitude values
                var response = await CallApi(latitude, longitude);

                // Check the result from the API and handle accordingly
                if (response.IsSuccessStatusCode)
                {
                // If the API call is successful, redirect to the "Results" action method
                    return RedirectToAction("Results", new { latitude, longitude, response });
                }
                else
                {
                    // If the API call fails, handle the error (e.g., display an error message)
                    ModelState.AddModelError(string.Empty, "Failed to call the web API.");
                    return View();
                }
            }
            else
            {
                // Handle the case where no data is found for the provided postcode
                return RedirectToAction("Form");
            }
        }

        private async Task<HttpResponseMessage> CallApi(decimal latitude, decimal longitude)
        {
            using (var client = new HttpClient())
            {
                // Construct the URL for the web API using latitude and longitude values
                string apiUrl = $"https://api.openweathermap.org/data/2.5/onecall?lat={latitude}&lon={longitude}&appid=8b600573654443eb01a6d8334d00efeb";

                // Make an HTTP GET request to the web API
                return await client.GetAsync(apiUrl);
            }
        }
    }
}
