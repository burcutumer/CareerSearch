using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data.Dtos;
using API.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data.Services
{
    public class JobApplicationService : IJobApplicationService
    {
        private readonly StoreContext _context;
        public JobApplicationService(StoreContext context)
        {
            _context = context;
        }
        public async Task<Response<JobApplicationDto>> CreateJobApplication(CreateJobApplicationDto createDto,string userEmail)
        {
            var user =  await _context.Users.FirstOrDefaultAsync(u => u.Email == userEmail);

            if (user == null)
            {
                return new Response<JobApplicationDto>
                {
                    Error = "user is not found"
                };
            }

            var job = await _context.JobPostings.FindAsync(createDto.JobId);

            if (job == null)
            {
                return new Response<JobApplicationDto>
                {
                    Error = "job is not found"
                };
            }

            var application = new JobApplication
            {
                Cv = createDto.Cv,
                User = user,
                CreatedAt = DateTime.Now,
                JobPostingId = createDto.JobId
            };

            await _context.Applications.AddAsync(application);
            var res = await _context.SaveChangesAsync() > 0;

            if (!res)
            {
                return new Response<JobApplicationDto>
                {
                    Error = "Application not created"
                };
            }
            return new Response<JobApplicationDto>
            {
                Data = MapJobApplicationDto(application)
            };
        }

        public async Task<Response<JobApplicationDto>> GetJobApplication(int applicationId,string userEmail)
        {
            var application = await _context.Applications
                .Include(u => u.User)
                .Include(j => j.JobPosting)
                .Where(a=> a.User.Email == userEmail)
                .FirstOrDefaultAsync(u=> u.Id == applicationId);

            if (application == null)
            {
                return new Response<JobApplicationDto>
                {
                    Error = "Application is not found"
                };
            }
            return new Response<JobApplicationDto>
            {
                Data = MapJobApplicationDto(application)
            };
        }

        public async Task<Response<List<JobApplicationDto>>> GetJobApplications(string userEmail)
        {
            var applications = await _context.Applications
                .Include(u => u.User)
                .Include(j => j.JobPosting)
                .Where(a=> a.User.Email == userEmail)
                .Select(s => MapJobApplicationDto(s))
                .ToListAsync();

            if (applications == null)
            {
                return new Response<List<JobApplicationDto>>
                {
                    Error = "Application not found"
                };
            }
            return new Response<List<JobApplicationDto>>
            {
                Data = applications
            };
        }

        private static JobApplicationDto MapJobApplicationDto(JobApplication app)
        {
            return new JobApplicationDto{
                Cv = app.Cv,
                Applicant = new UserDto
                {
                    Id = app.User.Id,
                    Email = app.User.Email,
                    FullName = app.User.FullName
                },
                JobPosting = new JobPostingDto
                {
                    Id = app.JobPosting.Id,
                    CompanyName = app.JobPosting.CompanyName,
                    Position = app.JobPosting.Position,
                    CreatedAt = app.JobPosting.CreatedAt
                },
                CreatedAt = app.CreatedAt
            };
        }
    }
}