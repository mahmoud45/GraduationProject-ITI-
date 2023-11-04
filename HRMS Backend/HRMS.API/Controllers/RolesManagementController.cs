using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace HRMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolesManagementController : ControllerBase
    {
        private readonly RoleManager<IdentityRole> roleManager;

        public RolesManagementController(RoleManager<IdentityRole> roleManager)
        {
            this.roleManager = roleManager;
        }

        [HttpPost("AddEmployeeRoleWithClaims")]
        public async Task<IActionResult> AddEmployeeRoleWithClaims()
        {
            //  adding roles and claims for the Employee page
            var employeeRole = new IdentityRole("EmployeeRole");
            await roleManager.CreateAsync(employeeRole);

            var addEmployeeClaim = new Claim("PagePermissions", "Employee.Add");
            var editEmployeeClaim = new Claim("PagePermissions", "Employee.Edit");
            var deleteEmployeeClaim = new Claim("PagePermissions", "Employee.Delete");
            var showEmployeeClaim = new Claim("PagePermissions", "Employee.Show");

            await roleManager.AddClaimAsync(employeeRole, addEmployeeClaim);
            await roleManager.AddClaimAsync(employeeRole, editEmployeeClaim);
            await roleManager.AddClaimAsync(employeeRole, deleteEmployeeClaim);
            await roleManager.AddClaimAsync(employeeRole, showEmployeeClaim);

            return Ok("Role and claims added for Employee page.");
        }

        [HttpPost("AddGeneralSettingsRoleWithClaims")]
        public async Task<IActionResult> AddGeneralSettingsRoleWithClaims()
        {
            //  adding a role with specific claims for the General Settings page
            var generalSettingsRole = new IdentityRole("GeneralSettingsRole");
            await roleManager.CreateAsync(generalSettingsRole);

            var AddSettingsClaim = new Claim("PagePermissions", "GeneralSettings.Add");
            var EditSettingsClaim = new Claim("PagePermissions", "GeneralSettings.Edit");
            var DeleteSettingsClaim = new Claim("PagePermissions", "GeneralSettings.Delete");
            var showSettingsClaim = new Claim("PagePermissions", "GeneralSettings.Show");

            await roleManager.AddClaimAsync(generalSettingsRole, AddSettingsClaim);  
            await roleManager.AddClaimAsync(generalSettingsRole, EditSettingsClaim); 
            await roleManager.AddClaimAsync(generalSettingsRole, DeleteSettingsClaim);  
            await roleManager.AddClaimAsync(generalSettingsRole, showSettingsClaim);


            return Ok("Role and claims added for General Settings page.");
        }

        // Similar actions for other pages
    }
}
