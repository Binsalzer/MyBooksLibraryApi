using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyBooksLibraryApi.Data
{
    public class UsersRepository
    {      
            private readonly string _connection;

            public UsersRepository(string connection)
            {
                _connection = connection;
            }

            public void SignUp(User user, string password)
            {
                user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(password);
                using var context = new BooksDataContext(_connection);
                context.Users.Add(user);
                context.SaveChanges();
            }

            public User Login(string email, string password)
            {
                var user = GetByEmail(email);

            if (user != null && BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
            {
                return user;
            }

            return null;
            }

            public User GetByEmail(string email)
            {
                using var context = new BooksDataContext(_connection);
                return context.Users.FirstOrDefault(u => u.Email == email);
            }
        }
}
