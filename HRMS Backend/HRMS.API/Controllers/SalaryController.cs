
using HRMS.Application.Repository;
using HRMS.Application.Repository.SalaryRepository;
using HRMS.Application.Services.SalaryServices.Queries.GetSalaries;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HRMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalaryController : ControllerBase
    {
        private ISalaryRepository salaryRepository;
        private IMediator _mediator { get; set; }

        public SalaryController( ISalaryRepository salaryRepository, IMediator mediator)
        {
            this.salaryRepository = salaryRepository;
            this._mediator = mediator;
            
        }

        [HttpGet]
        [Route("Get")]
        public async Task<List<SalaryDTO>>? Get(int pageNumber, int pageSize, string? search, string? month, string? year)
        {
            return  await _mediator.Send(new GetSalariesQuery()
            {
                Month = month,
                Year = year,
                PageNumber = pageNumber,
                PageSize = pageSize,
                Search = search,
            });

        }

    }
}
