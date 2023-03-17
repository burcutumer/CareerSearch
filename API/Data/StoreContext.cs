using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class StoreContext: IdentityDbContext<User, UserRole, int>
    {
        public StoreContext(DbContextOptions<StoreContext> options) :base(options)
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<JobPosting> JobPostings { get; set; }
        public DbSet<Application> Applications { get; set; }

    }
}