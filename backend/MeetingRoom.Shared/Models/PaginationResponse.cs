using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MRR.Shared.Models
{
    public class PaginationResponse<T>
    {
        public List<T> Items { get; set; } = new List<T>();
        public int TotalCount { get; set; } 
        public int TotalPages => (int)Math.Ceiling((double)TotalCount / PageSize);
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
    }

}
