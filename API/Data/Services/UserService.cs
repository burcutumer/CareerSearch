using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data.Dtos;
using API.Data.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<User> _userManager;
        private readonly StoreContext _context;
        public UserService(UserManager<User> userManager, StoreContext context)
        {
            _context = context;
            _userManager = userManager;

        }
        public async Task<Response<UserDto>> CreateUserAsync(CreateUserDto user)
        {
            if (user != null)
            {
                var newUser = new User
                {
                    UserName = user.Email,
                    FullName = user.FullName,
                    Email = user.Email
                };
                var result = await _userManager.CreateAsync(newUser, user.Password);
                if (!result.Succeeded)
                {
                    return new Response<UserDto>
                    {
                        Error = result.Errors.Select(e => e.Description).ToList()
                    };
                }
                if (!user.IsEmployee)
                {
                    await _userManager.AddToRoleAsync(newUser, "employer");
                }
                else
                {
                    await _userManager.AddToRoleAsync(newUser, "employee");
                }


                return MapToResponseUserDtoData(newUser);
            }
            return new Response<UserDto>
            {
                Error = "User can not created"
            };
        }

        public async Task<Response<UserDto>> DeleteUserAsync(int userId)
        {
            var user = await _userManager.FindByIdAsync(userId.ToString());

            if (user == null)
            {
                return new Response<UserDto>()
                {
                    Error = "User not found"
                };
            }
            var result = await _userManager.DeleteAsync(user);

            if (!result.Succeeded)
            {
                return new Response<UserDto>()
                {
                    Error = "User can not delete"
                };
            }
            return MapToResponseUserDtoData(user);
        }

        public async Task<Response<UserDto>> GetUserByIdAsync(int userId)
        {
            var user = await _context.Users
                .Include(a => a.Applications)
               .FirstOrDefaultAsync(p => p.Id == userId);

            if (user == null)
            {
                return new Response<UserDto>()
                {
                    Error = "User not found"
                };
            }
            return MapToResponseUserDtoData(user);
        }

        public async Task<Response<bool>> UpdateUserAsync(UpdateUserDto dto, int userId)
        {
            var user = await _userManager.FindByIdAsync(userId.ToString());
            if (user != null)
            {
                if (dto.CurrentPassword != null && dto.Password != null)
                {
                    var res = await _userManager.ChangePasswordAsync(user, dto.CurrentPassword, dto.Password);

                    if (!res.Succeeded)
                    {
                        return new Response<bool>()
                        {
                            Error = res.Errors.Select(e => e.Description).ToArray()
                        };
                    }
                    return new Response<bool>
                    {
                        Data = true
                    };
                }
            }
            return new Response<bool>()
            {
                Error = "User not found"
            };
        }

        private static Response<UserDto> MapToResponseUserDtoData(User user)
        {
            return new Response<UserDto>
            {
                Data = new UserDto
                {
                    Id = user.Id,
                    FullName = user.FullName,
                    Email = user.Email
                }
            };
        }
    }
}