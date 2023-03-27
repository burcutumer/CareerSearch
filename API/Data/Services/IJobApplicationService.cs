using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data.Dtos;

namespace API.Data.Services
{
    public interface IJobApplicationService
    {
        Task<Response<JobApplicationDto>> CreateJobApplication(CreateJobApplicationDto createDto, string userEmail);
        Task<Response<JobApplicationDto>> GetJobApplication(int applicationId,string userEmail);
        Task<Response<List<JobApplicationDto>>> GetJobApplications(string userEmail);
    }
}