using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyBooksLibraryApi.Data;
using MyBooksLibraryApi.Web.Models;

namespace MyBooksLibraryApi.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly string _connection;

        public BooksController(IConfiguration config)
        {
            _connection = config.GetConnectionString("ConStr");
        }

        [HttpGet("getbooksforsearch")]
        public List<Book> GetBooksForSearch(string searchText)
        {
            var repo = new BooksRepository(_connection);
            var books = repo.GetSearchResults(searchText);

            if (User.Identity.IsAuthenticated)
            {
                var userRepo = new UsersRepository(_connection);
                var user = userRepo.GetByEmail(User.Identity.Name);
                var favorites = repo.GetBooksForUserId(user.Id);

                if (favorites != null)
                {
                    foreach (Book b in books)
                    {
                        var match = favorites.FirstOrDefault(f => f.Key == b.Key);

                        if (match != null)
                        {
                            b.IsFavorite = true;
                            b.Notes = match.Notes;
                        }
                    }
                }
            }

            return books;
        }

        [Authorize]
        [HttpPost("addtofavorites")]
        public void AddToFavorites(Book book)
        {
            var repo = new BooksRepository(_connection);
            var userRepo = new UsersRepository(_connection);
            var userId = userRepo.GetByEmail(User.Identity.Name).Id;
            book.UserId = userId;
            book.IsFavorite = true;
            repo.AddToFavorites(book);
        }

        [Authorize]
        [HttpPost("removefromfavorites")]
        public void RemoveFromFavorites(RemoveFromFavoritesVM vm)
        {
            var repo = new BooksRepository(_connection);
            var userRepo = new UsersRepository(_connection);
            repo.RemoveFromFavorites(userRepo.GetByEmail(User.Identity.Name).Id, vm.Key);
        }

        [Authorize]
        [HttpGet("getmyfavorites")]
        public List<Book> GetMyFavorites()
        {
            var repo = new BooksRepository(_connection);
            var userRepo = new UsersRepository(_connection);
            var userId = userRepo.GetByEmail(User.Identity.Name).Id;
            return repo.GetBooksForUserId(userId);
        }
    }
}
