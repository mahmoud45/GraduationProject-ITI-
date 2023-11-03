using HRMS.Application.Models.AddedRolesAndClaimsDTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

//namespace HRMS.API.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class AddRolesWithClaimsController : ControllerBase
//    {
//        private readonly RoleManager<IdentityRole> roleManager;

//        public AddRolesWithClaimsController(RoleManager<IdentityRole> roleManager)
//        {
//            this.roleManager = roleManager;
//        }
//        public async Task<IActionResult> SaveRolesWithClaims(AddedRolesAndClaimsDTO addedRolesAndClaimsDTO)
//        {
//            string type = "";
//            string value = "";
//            Claim claim = new Claim(type, value);

//            //var roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>( DBContext));
//            //using (var ServiceScope = .Services.CreateScope())
//            //{
//            //    var roleManager = ServiceScope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

//            if (!await roleManager.RoleExistsAsync(addedRolesAndClaimsDTO.RoleName))
//            {

//                await roleManager.CreateAsync(new IdentityRole(addedRolesAndClaimsDTO.RoleName));
//                var role = await roleManager.FindByNameAsync(addedRolesAndClaimsDTO.RoleName);
//                foreach (var names in addedRolesAndClaimsDTO.Permissions)
//                {
//                    if (names.Permissions == true)
//                    {
//                        type = names.PageName.Split('.')[0];
//                        value = names.PageName.Split('.')[1];
//                        await roleManager.AddClaimAsync(role, claim);
//                    }
//                }
//                return Ok("added");

//            }
//            else
//            {
//                return BadRequest();

//            }

//            //}
//        }
//    }
//}

//===============================================================================
namespace HRMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddRolesWithClaimsController : ControllerBase
    {
        private readonly RoleManager<IdentityRole> roleManager;

        public AddRolesWithClaimsController(RoleManager<IdentityRole> roleManager)
        {
            this.roleManager = roleManager;
        }

        [HttpPost] 
        public async Task<IActionResult> SaveRolesWithClaims(AddedRolesAndClaimsDTO addedRolesAndClaimsDTO)
        {
            // Check if the role already exists.
            if (await roleManager.RoleExistsAsync(addedRolesAndClaimsDTO.RoleName))
            {
                return BadRequest("Role already exists.");
            }

            // Create a new role and a list to store claims.
            var role = new IdentityRole(addedRolesAndClaimsDTO.RoleName);
            var claimsToAdd = new List<Claim>();

            foreach (var permission in addedRolesAndClaimsDTO.Permissions)
            {
                // Check if permission is granted and the PageName is not empty.
                if (permission.Permissions == true && !string.IsNullOrEmpty(permission.PageName))
                {
                    // Split PageName into type and value.
                    var pageNameParts = permission.PageName.Split('.');
                    if (pageNameParts.Length == 2)
                    {
                        var type = pageNameParts[0];
                        var value = pageNameParts[1];
                        // Create a new claim and add it to the list.
                        claimsToAdd.Add(new Claim(type, value));
                    }
                }
            }

            // Create the role and add associated claims.
            var result = await roleManager.CreateAsync(role);
            if (result.Succeeded)
            {
                foreach (var claim in claimsToAdd)
                {
                    // Add claims to the role.
                    await roleManager.AddClaimAsync(role, claim);
                }
                return Ok("Role added with claims and permissions.");
            }

            // If role creation fails, return an error response.
            return BadRequest("Role creation failed.");
        }
    }
}