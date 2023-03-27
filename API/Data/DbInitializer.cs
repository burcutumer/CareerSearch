using API.Data.Entities;
using Microsoft.AspNetCore.Identity;

namespace API.Data
{
    public class DbInitializer
    {
        public static async Task Initialize(StoreContext context, RoleManager<UserRole> roleManager,
        UserManager<User> userManager)
        {

            if (userManager.Users.Any()) return;

            await roleManager.CreateAsync(new UserRole
            {
                Name = "employee"
            });
            await roleManager.CreateAsync(new UserRole
            {
                Name = "admin"
            });
            await roleManager.CreateAsync(new UserRole
            {
                Name = "employer"
            });

            var adminUser = new User
            {
                FullName = "admin@mail.com",
                Email = "admin@mail.com",
                UserName = "admin@mail.com"
            };
            await userManager.CreateAsync(adminUser, "Pa$$w0rd!");
            await userManager.AddToRoleAsync(adminUser, "admin");

            // var JobPostings = new List<JobPosting>
            // {
            //     new JobPosting
            //     {
            //         Id = 1,
            //         CompanyName = "Mercedes",
            //         Position = "Backend Developer",
            //         CreatedAt = DateTime.UtcNow
            //     },
            //     new JobPosting
            //     {
            //         Id = 2,
            //         CompanyName = "Mercedes",
            //         Position = "Frontend Developer",
            //         CreatedAt = DateTime.UtcNow
            //     },
            //     new JobPosting
            //     {
            //         Id = 3,
            //         CompanyName = "Braun",
            //         Position = "Senior Software Developer",
            //         CreatedAt = DateTime.UtcNow
            //     }
            // };
            // foreach (var job in JobPostings)
            // {
            //     await context.JobPostings.AddAsync(job);
            // }

            // await context.SaveChangesAsync();
        }
    }
}