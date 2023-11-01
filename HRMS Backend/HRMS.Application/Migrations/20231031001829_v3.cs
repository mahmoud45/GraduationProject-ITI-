using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HRMS.Application.Migrations
{
    /// <inheritdoc />
    public partial class v3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_GeneralSettings_GeneralSetting",
                table: "Employees");

            migrationBuilder.DropIndex(
                name: "IX_Employees_GeneralSetting",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "Bonus",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "GeneralSetting",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "VacationDay1",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "VacationDay2",
                table: "Employees");

            migrationBuilder.RenameColumn(
                name: "Penality",
                table: "Employees",
                newName: "SpecialSetting");

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
                name: "FK_Employees_GeneralSettings_SpecialSetting",
                table: "Employees",
                column: "SpecialSetting",
                principalTable: "GeneralSettings",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_GeneralSettings_Employees_EmpID",
                table: "GeneralSettings",
                column: "EmpID",
                principalTable: "Employees",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_GeneralSettings_SpecialSetting",
                table: "Employees");

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

            migrationBuilder.RenameColumn(
                name: "SpecialSetting",
                table: "Employees",
                newName: "Penality");

            migrationBuilder.AddColumn<int>(
                name: "Bonus",
                table: "Employees",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "GeneralSetting",
                table: "Employees",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "VacationDay1",
                table: "Employees",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "VacationDay2",
                table: "Employees",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Employees_GeneralSetting",
                table: "Employees",
                column: "GeneralSetting");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_GeneralSettings_GeneralSetting",
                table: "Employees",
                column: "GeneralSetting",
                principalTable: "GeneralSettings",
                principalColumn: "Id");
        }
    }
}
