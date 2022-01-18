using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.models
{
    public class HistoricData
    {
        public Guid Id {get;set;}
        [Required]
        public int NumberOfPhotos {get;set;}
        [Required]
        public string Quality  { get; set; }
        [Required]
        public float Time {get;set;}
        [Required]
        public string ApiType {get;set;}
        [Required]
        public DateTime createdAt {get;set;} 
    }
}