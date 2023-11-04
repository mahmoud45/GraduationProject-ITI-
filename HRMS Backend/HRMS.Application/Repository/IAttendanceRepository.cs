using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HRMS.Domain.Models;

namespace HRMS.Application.Repository
{
	public interface IAttendanceRepository
	{
		List<Attendance> getAllAttendances(int Pnum, DateTime FDate, DateTime TDate);
		List<Attendance> getAttendancesByName(string name);
		List<Attendance> getAttendancesByEmployeeName(string emp_name);
		Attendance getAttendancesByID(int id);
		List<Attendance> getAttendancesByDepartmentName(string dept_name);
		void addAttendance(Attendance attendance);
		void editAttendance(Attendance attendance);
		void deleteAttendance(int AttendanceID);
		int saveChanges();
	}
}
