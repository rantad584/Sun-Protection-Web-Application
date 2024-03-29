using Microsoft.AspNetCore.Mvc;
using SunScreenApplication.Models;
using System.Diagnostics;

namespace SunScreenApplication.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        public ActionResult FunSunSafety()
        {
            ViewBag.Message = "Fun Sun Safety for Children page";

            return View();
        }

        public ActionResult SunscreenUsage()
        {
            ViewBag.Message = "Sunscreen Usage page";

            return View();
        }

        public ActionResult ClothingRecommendations()
        {
            ViewBag.Message = "Clothing Recommendations page";

            return View();
        }
    }
}
