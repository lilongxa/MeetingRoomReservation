using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace MRR.Application.DTOs
{
    public class PaginationRequestDto
    {
        [JsonProperty("page")]
        public int PageNumber { get; set; } = 1; // 默认第一页
        [JsonProperty("pageSize")]
        public int PageSize { get; set; } = 10;  // 默认每页 10 条
        [JsonProperty("search")]
        public string? Search { get; set; }  // 可选的搜索关键字
        public string? SortField { get; set; }  // 可选的排序字段
        public string? SortOrder { get; set; } = "asc"; // 默认升序
    }

}
