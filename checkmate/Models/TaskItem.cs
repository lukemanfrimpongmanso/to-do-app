using System;
using System.ComponentModel.DataAnnotations;

namespace checkmate.Models
{
    public class TaskItem
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public DateTime DueDate { get; set; }

        [Required]
        public DateTime StartTime { get; set; }
    }
}
