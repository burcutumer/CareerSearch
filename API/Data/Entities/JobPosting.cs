using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Data.Entities
{
    [Table("JobPostings")]
    public class JobPosting
    {
        public int Id { get; set; }
        public string CompanyName { get; set; } = null!;
        public string Position { get; set; } = null!;
        public DateTime CreatedAt { get; set; }
        public List<Application> Applications { get; set; } = new();
    }
}