using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data.Dtos;

namespace API.Data.Services
{
    public interface IJobPostingService
    {
        Task<Response<JobPostingDto>> CreateJobAsync(CreateJobPostingDto dto, string employerEmail);
        Task<Response<JobPostingDto>> GetJobByIdAsync(int jobId);
        Task<Response<JobPostingEmployerDto>> GetJobByIdEmployerAsync(int jobId, string employerEmail);
        Task<Response<List<JobPostingDto>>> GetJobPostingsAsync();
        Task<Response<List<JobPostingDto>>> GetJobPostingsEmployerAsync(string employerEmail);
        Task<bool> DeleteJobAsync(int jobId);

    }
}