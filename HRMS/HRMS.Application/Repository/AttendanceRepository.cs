using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HRMS.Domain;
using HRMS.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace HRMS.Application.Repository
{
	public class AttendanceRepository : IAttendanceRepository
	{
		private readonly DBContext dBContext;

		public AttendanceRepository(DBContext dBContext)
        {
			this.dBContext = dBContext;
		}

		public void addAttendance(Attendance attendance)
		{
			dBContext.Add(attendance);
		}

		public void deleteAttendance(int AttendanceID)
		{
			dBContext.Remove(getAttendancesByID(AttendanceID));
		}

		public void editAttendance(Attendance attendance)
		{
			dBContext.Update(attendance);
		}

		public List<Attendance> getAllAttendances()
		{
			return dBContext.Attendances.Include(a=>a.Employee).ThenInclude(e => e.Department).ToList();
		}

		public List<Attendance> getAttendancesByDepartmentName(string dept_name)
		{
			return dBContext.Attendances.Include(a => a.Employee).ThenInclude(e => e.Department)
				.Where(x => x.Employee.Department.Name == dept_name).ToList();
		}

		public List<Attendance> getAttendancesByEmployeeName(string emp_name)
		{
			return dBContext.Attendances.Include(a => a.Employee).ThenInclude(e => e.Department).
				Where(att => emp_name.Contains(att.Employee.FirstName) || emp_name.Contains(att.Employee.LastName,StringComparison.InvariantCultureIgnoreCase)).ToList();
		}

		public Attendance getAttendancesByID(int id)
		{
			return dBContext.Attendances.Include(a => a.Employee).ThenInclude(e => e.Department).Where(x => x.Id==id).FirstOrDefault();
		}

		int IAttendanceRepository.saveChanges()
		{
			return dBContext.SaveChanges();
		}
	}
}
