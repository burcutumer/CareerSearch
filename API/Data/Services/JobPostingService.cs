using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data.Dtos;
using API.Data.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data.Services
{
    public class JobPostingService : IJobPostingService
    {
        private readonly StoreContext _context;
        public JobPostingService(StoreContext context)
        {
            _context = context;
        }

        public async Task<Response<JobPostingDto>> CreateJobAsync(CreateJobPostingDto dto, string employerEmail)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == employerEmail);

            if (user == null)
            {
                return new Response<JobPostingDto>
                {
                    Error = "User not exist"
                };
            }

            var job = new JobPosting
            {
                EmployerEmail = employerEmail,
                CompanyName = dto.CompanyName,
                Position = dto.Position,
                CreatedAt = DateTime.Now
            };
            await _context.JobPostings.AddAsync(job);
            var result = await _context.SaveChangesAsync() > 0;

            if (result)
            {
                return new Response<JobPostingDto>
                {
                    Data = MapToJobPostingDto(job)
                };
            }
            return new Response<JobPostingDto>
            {
                 Error = "Job Posting could not create"
            };
        }

        public async Task<bool> DeleteJobAsync(int jobId)
        {
            var job = await _context.JobPostings.FindAsync(jobId);

            if (job != null)
            {
                _context.JobPostings.Remove(job);

                var result = await _context.SaveChangesAsync() > 0;

                if (result) return true;
            }
            return false;
        }

        public async Task<Response<JobPostingDto>> GetJobByIdAsync(int jobId)
        {
            var jobPosting = await _context.JobPostings
                .FirstOrDefaultAsync(j => j.Id == jobId);

            if (jobPosting == null)
            {
                return new Response<JobPostingDto>
                {
                    Error = "Job Posting does not exist"
                };
            }

            return new Response<JobPostingDto>
            {
                Data = MapToJobPostingDto(jobPosting)
            };
        }

        public async Task<Response<JobPostingEmployerDto>> GetJobByIdEmployerAsync(int jobId, string employerEmail)
        {
            var job = await _context.JobPostings
                .Where(e => e.EmployerEmail == employerEmail)
                .Include(i => i.Applications)
                .ThenInclude(u => u.User)
                .FirstOrDefaultAsync(j => j.Id == jobId);

            if (job == null)
            {
                return new Response<JobPostingEmployerDto>
                {
                    Error = "Job Posting does not exist"
                };
            }
            return new Response<JobPostingEmployerDto>
            {
                Data = new JobPostingEmployerDto
                {
                    Id = job.Id,
                    CompanyName = job.CompanyName,
                    CreatedAt = job.CreatedAt,
                    Position = job.Position,
                    Applications = job.Applications.Select(j => new JobApplicationDto
                    {
                        Cv = j.Cv,
                        Applicant = new UserDto
                        {
                            Id = j.User.Id,
                            Email = j.User.Email,
                            FullName = j.User.FullName
                        },
                        CreatedAt = j.CreatedAt
                    }).ToList()
                }
            };
        }

        public async Task<Response<List<JobPostingDto>>> GetJobPostingsAsync()
        {
            var JobPostings = await _context.JobPostings
            .Select(j => MapToJobPostingDto(j))
            .ToListAsync();

            if (JobPostings == null)
            {
                return new Response<List<JobPostingDto>>
                {
                    Data = new()
                };
            }
            return new Response<List<JobPostingDto>>
            {
                Data = JobPostings
            };
        }

        public async Task<Response<List<JobPostingDto>>> GetJobPostingsEmployerAsync(string employerEmail)
        {
            var JobPostings = await _context.JobPostings
            .Where(i => i.EmployerEmail == employerEmail)
            .Select(j => MapToJobPostingDto(j))
            .ToListAsync();

            if (JobPostings == null)
            {
                return new Response<List<JobPostingDto>>
                {
                    Error = "Job Postings not found"
                };
            }
            return new Response<List<JobPostingDto>>
            {
                Data = JobPostings
            };
        }

        private static JobPostingDto MapToJobPostingDto(JobPosting job)
        {
            return new JobPostingDto
            {
                Id = job.Id,
                CompanyName = job.CompanyName,
                CreatedAt = job.CreatedAt,
                Position = job.Position
            };
        }
    }
}