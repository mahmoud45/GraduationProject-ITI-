using AutoMapper;
using HRMS.Application.Repository.SalaryRepository;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace HRMS.Application.Services.SalaryServices.Queries.GetSalaries
{
    public class GetSalariesQueryHandler : IRequestHandler<GetSalariesQuery, PaginatedDtO>
    {
        ISalaryRepository _salaryRepository;
        private readonly IMapper _mapper;

        public GetSalariesQueryHandler(ISalaryRepository salaryRepository, IMapper mapper)
        {
            this._salaryRepository = salaryRepository;
            this._mapper = mapper;
        }
        public async Task<PaginatedDtO> Handle(GetSalariesQuery request, CancellationToken cancellationToken)
        {
            try
            {
                if (string.IsNullOrEmpty(request.Month))
                {
                    request.Month = (DateTime.Now.Month - 1).ToString();
                }

                if (string.IsNullOrEmpty(request.Year))
                {
                    request.Year = DateTime.Now.Year.ToString();
                }

                var empSalary = _salaryRepository
                    .GetAll(e => (string.IsNullOrEmpty(request.Search)
                    || e.FirstName.Contains(request.Search) || e.LastName.Contains(request.Search)
                    || e.Department == null || e.Department.Name.Contains(request.Search))
                    && e.Attendance.Any(a => a.ArrivalTime != null && a.ArrivalTime.Month.ToString() == request.Month && a.ArrivalTime.Year.ToString() == request.Year))
                    .Include(x => x.Department)
                    .Include(x => x.SpecialSettings)
                    .Include(x => x.Attendance.Where(a => a.ArrivalTime != null && a.ArrivalTime.Month.ToString() == request.Month && a.ArrivalTime.Year.ToString() == request.Year))
                    .ToList();

                var count = empSalary.Count();

                var mappedObjs = _mapper.Map<List<SalaryDTO>>(empSalary.Skip((request.PageNumber - 1) * (request.PageSize))
                    .Take(request.PageSize));
                int bounsHours = 0;
                int penalityHours = 0;
                for (int i = 0; i < mappedObjs.Count; i++)
                {
                    foreach (var item in empSalary[i].Attendance)
                    {
                        if (item.DepartureTime.Hour > empSalary[i].LeaveTime.Hour && item.ArrivalTime.Hour <= empSalary[i].ArrivalTime.Hour)
                        {
                            bounsHours += item.DepartureTime.Hour - empSalary[i].LeaveTime.Hour;
                        }

                        else if (item.DepartureTime.Hour < empSalary[i].LeaveTime.Hour || item.ArrivalTime.Hour > empSalary[i].ArrivalTime.Hour)
                        {
                            penalityHours += (empSalary[i].LeaveTime.Hour - item.DepartureTime.Hour) + (item.ArrivalTime.Hour - empSalary[i].ArrivalTime.Hour);
                        }
                    }
                    penalityHours += mappedObjs[i].Absence * 8;

                    mappedObjs[i].TotalBouns += bounsHours * mappedObjs[i].SpecialSettingsBonus;
                    mappedObjs[i].TotalPenality += penalityHours * mappedObjs[i].SpecialSettingsPenality;
                    mappedObjs[i].TotalSalary += (mappedObjs[i].Salary + mappedObjs[i].TotalBouns) - mappedObjs[i].TotalPenality;
                    mappedObjs[i].SpecialSettingsBonus = bounsHours;
                    mappedObjs[i].SpecialSettingsPenality= penalityHours;
                    bounsHours = 0;
                    penalityHours = 0;
                }

                return new PaginatedDtO() { salaryDTOs = mappedObjs, pageCount = count % request.PageSize == 0 ? count/request.PageSize: (count / request.PageSize) + 1};

            }
            catch (Exception ex)
            {
                return null;
            }

        }
    }
}
