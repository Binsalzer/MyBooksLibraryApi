using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyBooksLibraryApi.Data.Migrations
{
    /// <inheritdoc />
    public partial class _3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Author",
                table: "MyBooks",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CoverUrl",
                table: "MyBooks",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsFavorite",
                table: "MyBooks",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "MyBooks",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Author",
                table: "MyBooks");

            migrationBuilder.DropColumn(
                name: "CoverUrl",
                table: "MyBooks");

            migrationBuilder.DropColumn(
                name: "IsFavorite",
                table: "MyBooks");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "MyBooks");
        }
    }
}
