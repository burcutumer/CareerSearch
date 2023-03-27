using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data.Entities;

namespace API.Data.Dtos
{
    public class UserDto
    {
        public int Id { get; set; }
        public string? FullName { get; set; } = null!;
        public string? Email { get; set; }
    }
}