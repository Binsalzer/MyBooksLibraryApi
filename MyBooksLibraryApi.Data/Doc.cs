using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace MyBooksLibraryApi.Data
{
    public class Doc
    {
        [JsonPropertyName("author_name")]
        public string[] AuthorName { get; set; }

        public string Key { get; set; }
        public string Title { get; set; }

        [JsonPropertyName("cover_i")]
        public int? CoverId { get; set; }
    }
}
