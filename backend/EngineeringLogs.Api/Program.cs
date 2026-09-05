using EngineeringLogs.Api.Services;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EngineeringLogs.Api.Data;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using EngineeringLogs.Api.Utilities;

var builder = WebApplication.CreateBuilder(args);

EnvVar.ConnectionString = builder.Configuration["ConnectionStrings:DefaultConnection"] ?? string.Empty;
// Add services to the container.

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(
            new JsonStringEnumConverter()
        );
    });

// Improve validation responses
builder.Services.Configure<ApiBehaviorOptions>(options =>
{
    options.InvalidModelStateResponseFactory = context =>
    {
        var problemDetails = new ValidationProblemDetails(context.ModelState)
        {
            Type = "https://tools.ietf.org/html/rfc7231#section-6.5.1",
            Title = "One or more validation errors occurred.",
            Status = StatusCodes.Status400BadRequest
        };
        return new BadRequestObjectResult(problemDetails)
        {
            ContentTypes = { "application/problem+json" }
        };
    };
});
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddScoped<IProjectService, ProjectService>();
builder.Services.AddScoped<IJournalService, JournalService>();
builder.Services.AddScoped<IJwtService, JwtService>();

// Register DbContext
var connectionString = builder.Configuration["ConnectionStrings:DefaultConnection"];

builder.Services.AddDbContext<EngineeringLogsDbContext>(options =>
{
    options.UseNpgsql(
        connectionString
    );
});
builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
    {
        policy.WithOrigins(
    "http://localhost:3000",
    "https://engineering-logs-five.vercel.app",
    "https://raazlab.vercel.app"
)
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});
builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,

            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],

            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!)
            )
        };
    });

builder.Services.AddAuthorization();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseExceptionHandler(errorApp =>
{
    errorApp.Run(async context =>
    {
        var logger = context.RequestServices.GetRequiredService<ILogger<Program>>();
        var exceptionHandlerPathFeature = context.Features.Get<IExceptionHandlerPathFeature>();
        logger.LogError(exceptionHandlerPathFeature?.Error, "Unhandled exception occurred processing request");

        context.Response.StatusCode = StatusCodes.Status500InternalServerError;
        context.Response.ContentType = "application/problem+json";

        var problem = new ProblemDetails
        {
            Status = StatusCodes.Status500InternalServerError,
            Title = "An unexpected error occurred.",
        };

        await context.Response.WriteAsJsonAsync(problem);
    });
});

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/openapi/v1.json", "Engineering Logs API");
    });
}

// app.UseHttpsRedirection();
app.UseCors("Frontend");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
