using API.Data.Dtos;
using API.Data.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class JobApplicationController : BaseApiController
    {
        private readonly IJobApplicationService _applicationService;
        public JobApplicationController(IJobApplicationService applicationService)
        {
            _applicationService = applicationService;
        }

        [Authorize(Roles ="employee")]
        [HttpPost]
        public async Task<ActionResult<Response<JobApplicationDto>>> CreateJobApplication([FromBody]CreateJobApplicationDto createDto)
        {
            var userEmail = User.Identity!.Name;
            var result = await _applicationService.CreateJobApplication(createDto,userEmail!);
            if (result.Error != null)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }

        [Authorize(Roles ="employee")]
        [HttpGet]
        public async Task<ActionResult<Response<JobApplicationDto>>> GetJobApplications()
        {
            var userEmail = User.Identity!.Name;
            var result = await _applicationService.GetJobApplications(userEmail!);
            if (result.Error != null)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }

        [Authorize(Roles ="employee")]
        [HttpGet("{id}")]
        public async Task<ActionResult<Response<JobApplicationDto>>> GetJobApplication(int id)
        {
            var userEmail = User.Identity!.Name;
            var result = await _applicationService.GetJobApplication(id, userEmail!);
            if (result.Error != null)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }
    }
}