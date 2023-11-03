using AutoMapper;
using HRMS.Application.Repository.SalaryRepository;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace HRMS.Application.Services.SalaryServices.Queries.GetSalaries
{
    public class GetSalariesQueryHandler : IRequestHandler<GetSalariesQuery, List<SalaryDTO>>
    {
        ISalaryRepository _salaryRepository;
        private readonly IMapper _mapper;

        public GetSalariesQueryHandler(ISalaryRepository salaryRepository, IMapper mapper)
        {
            this._salaryRepository = salaryRepository;
            this._mapper = mapper;
        }
        public async Task<List<SalaryDTO>> Handle(GetSalariesQuery request, CancellationToken cancellationToken)
        {
            try
            {
                if (request.Month == null)
                {
                    request.Month = (DateTime.Now.Month - 1).ToString();
                }

                if (request.Year == null)
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
                    .Skip((request.PageNumber - 1) * (request.PageSize))
                    .Take(request.PageSize).ToList();





                var mappedObjs = _mapper.Map<List<SalaryDTO>>(empSalary);
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
                    //mappedObjs[i].SpecialSettingsBouns = bounsHours;
                    //mappedObjs[i].SpecialSettingsPenality = penalityHours;
                    mappedObjs[i].TotalBouns += bounsHours * mappedObjs[i].SpecialSettingsBonus;
                    mappedObjs[i].TotalPenality += penalityHours * mappedObjs[i].SpecialSettingsPenality;
                    mappedObjs[i].TotalSalary += (mappedObjs[i].Salary + mappedObjs[i].TotalBouns) - mappedObjs[i].TotalPenality;

                    bounsHours = 0;
                    penalityHours = 0;
                }

                return mappedObjs;

            }
            catch (Exception ex)
            {
                return null;
            }

        }
    }
}
