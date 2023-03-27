using API.Data.Dtos;
using API.Data.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class JobPostingController : BaseApiController
    {
        private readonly IJobPostingService _jobService;

        public JobPostingController(IJobPostingService jobService)
        {
            _jobService = jobService;
        }

        [Authorize(Roles = "employer")]
        [HttpPost]
        public async Task<ActionResult<Response<JobPostingDto>>> CreateJob([FromBody] CreateJobPostingDto job)
        {
            var userEmail = User.Identity!.Name;
            var result = await _jobService.CreateJobAsync(job, userEmail!);

            if (result.Error == null)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }

        [Authorize(Roles = "employer")]
        [HttpGet("jobs/employer")]
        public async Task<ActionResult<Response<List<JobPostingDto>>>> GetJobPostingsEmployer()
        {
            var userEmail = User.Identity?.Name;
            var result = await _jobService.GetJobPostingsEmployerAsync(userEmail!);

            if (result.Error != null)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }

        [HttpGet("jobs")]
        public async Task<ActionResult<Response<List<JobPostingDto>>>> GetJobPostings()
        {
            var result = await _jobService.GetJobPostingsAsync();

            if (result.Error != null)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }

        [Authorize(Roles = "employer")]
        [HttpGet("jobs/employer/{id}")]
        public async Task<ActionResult<Response<JobPostingEmployerDto>>> GetJobByIdEmployer(int id)
        {
            var userEmail = User.Identity?.Name;
            var result = await _jobService.GetJobByIdEmployerAsync(id, userEmail!);

            if (result.Error != null)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }

        [HttpGet("jobs/{id}")]
        public async Task<ActionResult<Response<JobPostingDto>>> GetJobById(int id)
        {
            var result = await _jobService.GetJobByIdAsync(id);
            if (result.Error != null)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }

        [Authorize(Roles = "employer")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJob(int id)
        {
            var result = await _jobService.DeleteJobAsync(id);
            if (result) return Ok();
            return BadRequest(new ProblemDetails { Title = "problem deleting Job Posting" });
        }
    }
}