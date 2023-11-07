using HRMS.Domain.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRMS.Application.Models.GeneralSettingDTO
{
    public class GeneralDataDTO:BaseEntity
    {
        public int Bonus { get; set; }
        public int Discount { get; set; }
        public int EmployeeID { get; set; }
        public string VacationDay1 { get; set; }
        public string VacationDay2 { get; set; }
    }
}
