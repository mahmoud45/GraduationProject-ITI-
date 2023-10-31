using HRMS.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRMS.Application.Context
{
    public class SeedContext
    {
        private readonly DBContext context;

        public SeedContext(DBContext context)
        {
            this.context = context;
        }


    }
}
