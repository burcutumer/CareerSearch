using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Data.Dtos
{
    public class CreateJobPostingDto
    {
        public string CompanyName { get; set; } = null!;
        public string Position { get; set; } = null!;
    }
}