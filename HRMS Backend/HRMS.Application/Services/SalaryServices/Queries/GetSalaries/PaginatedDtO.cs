using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRMS.Application.Services.SalaryServices.Queries.GetSalaries
{
    public class PaginatedDtO
    {
        public  List<SalaryDTO> salaryDTOs { get; set; }
        public int pageCount { get; set; }
    }
}
