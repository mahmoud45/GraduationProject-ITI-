using HRMS.Application.Models;
using HRMS.Application.Repository;
using HRMS.Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static HRMS.Domain.Data.Constants.Authorization;

namespace HRMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly IGenaricrepository<Department> _genaricrepository;

        public DepartmentController(IGenaricrepository<Department>genaricrepository)
        {
            _genaricrepository = genaricrepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Department>>>GetAll()
        {
          var  dept =await _genaricrepository.GetAllAsync();
            return Ok(dept);
        }
		[HttpGet("{id:int}")]
		public ActionResult<Department> getDepartmentByID(int id)
		{
			var dept =  _genaricrepository.GetById(id);
			return Ok(dept);
		}

		[HttpPost]
        public ActionResult<EmployeeDto> Create(DepartmentDto departmentDto)
        {
            var dept = new Department()
            {
                Name =departmentDto.Name
                   
            };
            _genaricrepository.Create(dept);
            return Ok(dept);
        }

        [HttpPut("{id}")]
        public IActionResult Edite(int id, DepartmentDto departmentDto)
        {

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var dept = _genaricrepository.GetById(id);

            if (dept ==null )
                return NotFound($"No department with this {dept.Id}");
            dept.Name = departmentDto.Name;
            _genaricrepository.Edite(dept);
            return Ok("updated");

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var department = _genaricrepository.GetById(id);

            if (department == null)
                return NotFound($"No Departmnt was found with ID {id}");
            await _genaricrepository.Delete(department);
            return Ok();
        }
    }
}
