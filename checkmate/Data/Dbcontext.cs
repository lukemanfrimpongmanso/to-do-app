using checkmate.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace checkmate.Data
{
    public class ApplicationDbContext : IdentityDbContext<IdentityUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // This DbSet represents the TaskItem table in your database
        public DbSet<TaskItem> Tasks { get; set; }
    }
}


//  dotnet ef migrations add AddIdentity
// dotnet ef database update
