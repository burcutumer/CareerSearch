using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data.Entities;

namespace API.Data
{
    public class DbInitializer
    {
        public static async Task Initialize(StoreContext context)
        {
            if (context.JobPostings.Any()) return;

            var JobPostings = new List<JobPosting>
            {
                new JobPosting
                {
                    Id = 1,
                    CompanyName = "Mercedes",
                    Position = "Backend Developer",
                    CreatedAt = DateTime.UtcNow
                },
                new JobPosting
                {
                    Id = 2,
                    CompanyName = "Mercedes",
                    Position = "Frontend Developer",
                    CreatedAt = DateTime.UtcNow
                },
                new JobPosting
                {
                    Id = 3,
                    CompanyName = "Braun",
                    Position = "Senior Software Developer",
                    CreatedAt = DateTime.UtcNow
                }
            };
            foreach (var job in JobPostings)
            {
                await context.JobPostings.AddAsync(job);
            }

            await context.SaveChangesAsync();
        }
    }
}