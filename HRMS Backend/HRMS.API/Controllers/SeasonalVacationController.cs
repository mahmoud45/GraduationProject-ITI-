using HRMS.Application.Repository;
using HRMS.Domain.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HRMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeasonalVacationController : ControllerBase
    {
        IGenaricrepository<SeasonalVacation> genaricrepository;
        public SeasonalVacationController(IGenaricrepository<SeasonalVacation> genaricrepository)
        {
            this.genaricrepository = genaricrepository;
        }

        [HttpGet]
        public ActionResult Index()
        {
           var data= genaricrepository.GetAllAsync();
            return Ok(data);
        }

        [HttpPost]
        [Route("/SeasonVacation/addNew")]
        public ActionResult AddNewVacation(SeasonalVacation vacation)
        {


            return NoContent();
        }
    }
}
