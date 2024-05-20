using Microsoft.Identity.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace MyBooksLibraryApi.Data
{
    public class DataBook
    {
        public int Id { get; set; }
        public string Key { get; set; }
        public string Notes { get; set; }
        public int UserId { get; set; }

        [JsonIgnore]
        public User User { get; set; }
    }
}
