using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyBooksLibraryApi.Data
{
    public class Book
    {
        public string Key { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string CoverUrl { get; set; }
        public string Notes { get; set; }
        public bool IsFavorite { get; set; }
    }
}
