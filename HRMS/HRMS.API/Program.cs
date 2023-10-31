using HRMS.Application;
using HRMS.Application.Context;
using HRMS.Application.Repository;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

string MyAllowSpecificOrigins = "m";

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<DBContext>(o=>o.UseSqlServer(builder.Configuration.GetConnectionString("DB")));
builder.Services.AddIdentity<AppUser,IdentityRole>().AddEntityFrameworkStores<DBContext>();

builder.Services.AddScoped<IAttendanceRepository, AttendanceRepository>();

builder.Services.AddCors(options =>
{
	options.AddPolicy(MyAllowSpecificOrigins,
	builder =>
	{
		builder.AllowAnyOrigin();
		builder.AllowAnyMethod();
		builder.AllowAnyHeader();
	});
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.UseCors(MyAllowSpecificOrigins);

app.MapControllers();

app.Run();
