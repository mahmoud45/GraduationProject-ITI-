using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace HRMS.Application.Context
{
	public class AppUser : IdentityUser
	{
        public string FullName { get; set; }
    }
}
