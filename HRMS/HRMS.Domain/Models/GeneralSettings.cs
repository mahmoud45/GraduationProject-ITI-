using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HRMS.Application.Base;

namespace HRMS.Domain.Models
{
    public class GeneralSettings :BaseEntity
    {
        public int Bonus { get; set; }
        public int Penality { get; set; }
        public string VacationDay1 { get; set; }
        public string VacationDay2 { get; set; }
		public ICollection<Employee>? Employees { get; set; }

	}
}
