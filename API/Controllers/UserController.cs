using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data.Dtos;
using API.Data.Entities;
using API.Data.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    public class UserController : BaseApiController
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<Response<UserDto>>> GetCurrentUser()
        {
            var userEmail = User.Identity?.Name;

            var result = await _userService.GetCurrentUserAsync(userEmail!);

            if (result.Error!= null)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Response<UserDto>>> GetUser(int id)
        {
            var result = await _userService.GetUserByIdAsync(id);

            if (result.Error != null)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<Response<UserDto>>> CreateUser([FromBody] CreateUserDto user)
        {
            var result = await _userService.CreateUserAsync(user);
            if (result.Error != null)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Response<UserDto>>> DeleteUser(int id)
        {
            var result = await _userService.DeleteUserAsync(id);
            if (result.Error != null)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Response<bool>>> UpdateUser([FromBody] UpdateUserDto user, int id)
        {
            var result = await _userService.UpdateUserAsync(user, id);

            if (result.Error != null)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }

    }
}