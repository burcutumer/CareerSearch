using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Data.Dtos
{
    public class JobPostingEmployerDto
    {
        public int Id { get; set; }
        public string CompanyName { get; set; } = null!;
        public string Position { get; set; } = null!;
        public DateTime CreatedAt { get; set; }
        public List<JobApplicationDto> Applications { get; set; } = new();
    }
}