using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Data.Dtos
{
    public class JobApplicationDto
    {
        public string Cv { get; set; } = null!;
        public UserDto Applicant { get; set; } = null!;
        public JobPostingDto JobPosting { get; set; } = null!;
        public DateTime CreatedAt { get; set; }
    }
}