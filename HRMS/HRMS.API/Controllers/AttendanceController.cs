using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HRMS.Domain;
using HRMS.Domain.Models;
using HRMS.Application.Repository;
using HRMS.Application.Services.AttendanceServices;
using HRMS.Application.Models.AttendancesDTO;

namespace HRMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AttendanceController : ControllerBase
    {
		private IAttendanceRepository attendanceRepository;
		AttendanceService attendanceService ;

		public AttendanceController(IAttendanceRepository attendanceRepository)
        {
			this.attendanceRepository = attendanceRepository;
            attendanceService = new AttendanceService();
		}

        // GET: api/Attendance
        [HttpGet]
        public ActionResult<List<AttendanceDTO>> GetAttendances()
        {
            return attendanceService.GetListAttendanceDTO(attendanceRepository.getAllAttendances());
        }
        [Route("/emp/{emp_name:alpha}", Name = "GetAttendancesByEmployeeName")]
        [HttpGet]
        public ActionResult<List<AttendanceDTO>> GetAttendancesByEmployeeName(string emp_name)
        {
            return attendanceService.GetListAttendanceDTO(attendanceRepository.getAttendancesByEmployeeName(emp_name));
        }
        [Route("/dept/{dept_name:alpha}", Name = "GetAttendancesByDepartmentName")]
		[HttpGet]
		public ActionResult<List<AttendanceDTO>> GetAttendancesByDepartmentName(string dept_name)
		{
			return attendanceService.GetListAttendanceDTO(attendanceRepository.getAttendancesByDepartmentName(dept_name));
		}
		[HttpPost]
		public ActionResult AddAttendance(AttendanceDTO attendanceDTO)
		{
            try
            {
                attendanceRepository.addAttendance(attendanceService.GetAttendanceModel(attendanceDTO));
				attendanceRepository.saveChanges();
			}
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
			return NoContent();
		}
		[HttpPut]
		public ActionResult EditAttendance(AttendanceDTO attendanceDTO)
		{
			try
			{
				attendanceRepository.editAttendance(attendanceService.GetAttendanceModel(attendanceDTO));
				attendanceRepository.saveChanges();
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
			return NoContent();
		}
		[HttpDelete]
		public ActionResult deleteAttendance(int id)
		{
			try
			{
				attendanceRepository.deleteAttendance(id);
				attendanceRepository.saveChanges();
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
			return NoContent();
		}

	}
}
