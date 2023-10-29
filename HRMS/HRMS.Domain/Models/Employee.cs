using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HRMS.Application.Base;

namespace HRMS.Domain.Models
{
    public class Employee : BaseEntity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public char Gender { get; set; }
        public DateTime BirthDate { get; set; }
        public string Nationality { get; set; }
        public string NationalId { get; set; }
        public DateTime HireDate { get; set; }
        [Column(TypeName ="money")]
        public decimal Salary { get; set; }
		public DateTime ArrivalTime { get; set; }
		public DateTime LeaveTime { get; set; }
        public bool IsDeleted { get; set; }
        public int? Bonus { get; set; } = null;
		public int? Penality { get; set; } = null;
		public string? VacationDay1 { get; set; } = null;
		public string? VacationDay2 { get; set; } = null;

		[ForeignKey("Department")]
        public int DepartID { get; set; }
        public virtual Department? Department { get; set; }
		[ForeignKey("GeneralSettings")]
		public int GeneralSetting { get; set; }
		public virtual GeneralSettings? GeneralSettings{ get; set; }
		public ICollection<Attendance>? Attendance { get; set; }

	}
}
