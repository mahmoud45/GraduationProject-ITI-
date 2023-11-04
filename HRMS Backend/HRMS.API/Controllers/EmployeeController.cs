
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

        public class EmployeeController : ControllerBase
        {

            private readonly IGenaricrepository<Employee> _genaricrepository;
            

            public EmployeeController(IGenaricrepository<Employee> genaricrepository)
            {
                _genaricrepository = genaricrepository;
               
            }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetAll()
            {
                var Employee = await _genaricrepository.GetAllAsync();
                if (Employee is null)
                return NotFound();

                return Ok(Employee);
            }

            [HttpPost]
            public ActionResult Create([FromForm] EmployeeDto employeeDto)
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var emolyee = new Employee()
                {
                    FirstName = employeeDto.FirstName,
                    LastName = employeeDto.LastName,
                    Address = employeeDto.Address,
                    Phone = employeeDto.Phone,
                    Gender = employeeDto.Gender,
                    Nationality = employeeDto.Nationality,
                    BirthDate = employeeDto.BirthDate,
                    NationalId = employeeDto.NationalId,
                    HireDate = employeeDto.HireDate,
                    Salary = employeeDto.Salary,
                    ArrivalTime = employeeDto.ArrivalTime,
                    LeaveTime = employeeDto.LeaveTime,
                };
                _genaricrepository.Create(emolyee);
                return Ok(emolyee);


            }

            [HttpPut("{id}"),Authorize(Roles="programmerr")]
            public IActionResult Edite(int id, [FromForm] EmployeeDto employeeDto)
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);
                var emp = _genaricrepository.GetById(id);

                if (emp == null)
                    return NotFound($"No Employee with this {emp.Id}");

                emp.FirstName = employeeDto.FirstName;
                emp.Address = employeeDto.Address;
                emp.Phone = employeeDto.Phone;
                emp.Gender = employeeDto.Gender;
                emp.Nationality = employeeDto.Nationality;
                emp.BirthDate = employeeDto.BirthDate;
                emp.NationalId = employeeDto.NationalId;
                emp.HireDate = employeeDto.HireDate;
                emp.Salary = employeeDto.Salary;
                emp.ArrivalTime = employeeDto.ArrivalTime;
                emp.LeaveTime = employeeDto.LeaveTime;
                _genaricrepository.Edite(emp);

                return Ok();

            }

            [HttpDelete("{id}")]
            public async Task<IActionResult> DeleteAsync(int id)
            {
                var employee = _genaricrepository.GetById(id);

                if (employee == null)
                    return NotFound($"No employee was found with ID {id}");
                await _genaricrepository.Delete(employee);
                return Ok();
            }
        }
    }

