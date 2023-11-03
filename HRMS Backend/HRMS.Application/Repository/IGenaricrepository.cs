using HRMS.Domain.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HRMS.Application.Repository
{
    public interface IGenaricrepository<T> where T : BaseEntity
    {
        Task<IEnumerable<T>> GetAllAsync();
        T GetById(int id);
        void Create(T entity);
        Task Delete(T entity);
        void Edite(T entity);

    }
}
