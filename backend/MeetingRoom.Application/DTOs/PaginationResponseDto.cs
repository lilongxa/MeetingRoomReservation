using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MRR.Application.DTOs
{
    public class PaginationResponseDto<T>
    {
        public List<T> Items { get; set; } = new List<T>(); // 数据列表
        public int TotalCount { get; set; } // 总记录数
        public int TotalPages => (int)Math.Ceiling((double)TotalCount / PageSize);
        public int PageNumber { get; set; }  // 当前页
        public int PageSize { get; set; }  // 每页大小
    }

}
