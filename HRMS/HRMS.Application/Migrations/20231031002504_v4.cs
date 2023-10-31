using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HRMS.Application.Migrations
{
    /// <inheritdoc />
    public partial class v4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GeneralSettings_Employees_EmpID",
                table: "GeneralSettings");

            migrationBuilder.DropIndex(
                name: "IX_GeneralSettings_EmpID",
                table: "GeneralSettings");

            migrationBuilder.DropIndex(
                name: "IX_Employees_SpecialSetting",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "EmpID",
                table: "GeneralSettings");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_SpecialSetting",
                table: "Employees",
                column: "SpecialSetting",
                unique: true,
                filter: "[SpecialSetting] IS NOT NULL");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Employees_SpecialSetting",
                table: "Employees");

            migrationBuilder.AddColumn<int>(
                name: "EmpID",
                table: "GeneralSettings",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_GeneralSettings_EmpID",
                table: "GeneralSettings",
                column: "EmpID");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_SpecialSetting",
                table: "Employees",
                column: "SpecialSetting");

            migrationBuilder.AddForeignKey(
                name: "FK_GeneralSettings_Employees_EmpID",
                table: "GeneralSettings",
                column: "EmpID",
                principalTable: "Employees",
                principalColumn: "Id");
        }
    }
}
