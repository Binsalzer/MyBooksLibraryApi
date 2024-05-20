using MyBooksLibraryApi.Data;

namespace MyBooksLibraryApi.Web.Models
{
    public class SignUpVM : User
    {
        public string Password { get; set; }
    }
}
