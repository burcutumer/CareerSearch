using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Data.Entities
{
    [Table("Applications")]
    public class Application
    {
        public int Id { get; set; }
        public string Cv { get; set; } = null!;
        public DateTime CreatedAt { get; set; }
        public int UserId { get; set; }
        public User User { get; set; } = null!;
        public int JobPostingId { get; set; }
        public JobPosting JobPosting { get; set; } = null!;
    }
}