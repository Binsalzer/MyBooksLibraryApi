﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace MyBooksLibraryApi.Data
{
    public class BooksRepository
    {
        private readonly string _connection;

        public BooksRepository(string connection)
        {
            _connection = connection;
        }

        public List<Book> GetSearchResults(string searchText)
        {
            var client = new HttpClient();
            string json = client.GetStringAsync($"https://openlibrary.org/search.json?q={searchText}").Result;
            var response = JsonSerializer.Deserialize<OpenLibraryResponse>(json, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });
            return ConvertResponseIntoBooks(response);
        }

        private List<Book> ConvertResponseIntoBooks(OpenLibraryResponse response)
        {
            if(response.Docs==null)
            {
                return null;
            }

            var books = new List<Book>();

            foreach(Doc doc in response.Docs)
            {
                books.Add(new()
                {
                    Key = doc.Key,
                    Title = doc.Title,
                    Author = doc.AuthorName?.Length > 0 ? doc.AuthorName[0] : "Unknown Author",
                    CoverUrl = doc.CoverId.HasValue ? $"https://covers.openlibrary.org/b/id/{doc.CoverId}-M.jpg" : "https://via.placeholder.com/150"
                });
            }

            return books;
        }

        public List<DataBook> GetDataBooksForUserId(int userId)
        {
            using var context = new BooksDataContext(_connection);
            return context.MyBooks.Where(b => b.UserId == userId).ToList();
        }

        public void AddToFavorites(DataBook dataBook)
        {
            using var context = new BooksDataContext(_connection);
            context.MyBooks.Add(dataBook);
            context.SaveChanges();
        }

        public void RemoveFromFavorites(int userId, string key)
        {
            using var context = new BooksDataContext(_connection);
            var toRemove = context.MyBooks.Where(b => b.UserId == userId).FirstOrDefault(b => b.Key == key);
            context.MyBooks.Remove(toRemove);
            context.SaveChanges();
        }

        //public List<Book> GetFavorites(int userId)
        //{
        //    return GetDataBooksForUserId(userId).Select(db => new Book { });
        //}
    }
}
