using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyBooksLibraryApi.Data.Migrations
{
    /// <inheritdoc />
    public partial class addingnotestomybookstable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Notes",
                table: "MyBooks",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Notes",
                table: "MyBooks");
        }
    }
}
