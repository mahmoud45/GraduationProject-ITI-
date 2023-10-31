using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HRMS.Application.Migrations
{
    /// <inheritdoc />
    public partial class v2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Attendances_SeasonalVacations_SeasonalVacationID",
                table: "Attendances");

            migrationBuilder.DropForeignKey(
                name: "FK_Employees_GeneralSettings_GeneralSetting",
                table: "Employees");

            migrationBuilder.AlterColumn<int>(
                name: "GeneralSetting",
                table: "Employees",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "SeasonalVacationID",
                table: "Attendances",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Attendances_SeasonalVacations_SeasonalVacationID",
                table: "Attendances",
                column: "SeasonalVacationID",
                principalTable: "SeasonalVacations",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_GeneralSettings_GeneralSetting",
                table: "Employees",
                column: "GeneralSetting",
                principalTable: "GeneralSettings",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Attendances_SeasonalVacations_SeasonalVacationID",
                table: "Attendances");

            migrationBuilder.DropForeignKey(
                name: "FK_Employees_GeneralSettings_GeneralSetting",
                table: "Employees");

            migrationBuilder.AlterColumn<int>(
                name: "GeneralSetting",
                table: "Employees",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "SeasonalVacationID",
                table: "Attendances",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Attendances_SeasonalVacations_SeasonalVacationID",
                table: "Attendances",
                column: "SeasonalVacationID",
                principalTable: "SeasonalVacations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_GeneralSettings_GeneralSetting",
                table: "Employees",
                column: "GeneralSetting",
                principalTable: "GeneralSettings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
