using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Data.Dtos
{
    public class CreateJobApplicationDto
    {
        public string Cv { get; set; } = null!;
        public int JobId { get; set; }
    }
}