using HRMS.Application.Models.UserDTOModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRMS.Application.Services.UsereService
{
    public interface IUserService
    {
        Task<string> RegisterAsync(RegisterDTO registerDTO);
        Task<AuthenticationDTO> LoginAsync(LoginDTO loginDTO);
    }
}
