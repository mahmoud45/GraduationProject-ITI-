﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HRMS.Application.Base;

namespace HRMS.Domain.Models
{
	public class SeasonalVacation :BaseEntity
	{
        public string Name { get; set; }
        public DateTime VacationDate { get; set; }
		public ICollection<Attendance>? Attendance { get; set; }


	}
}
