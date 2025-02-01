using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy => policy.WithOrigins("http://localhost:3000")  // React 本地开发端口
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    // 配置 Swagger 文档
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Meeting Room Reservation API", // API 名称
        Version = "v1", // API 版本
        Description = "This is a sample API for demonstrating Swagger configuration in .NET 9.0"
    });

    // 可选：添加认证信息（如果需要）
    // options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    // {
    //     In = ParameterLocation.Header,
    //     Description = "Enter your Bearer token",
    //     Name = "Authorization",
    //     Type = SecuritySchemeType.ApiKey
    // });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger(); // 启用 Swagger UI
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Meeting Room Reservation API v1"); // 指定 Swagger JSON 文件的路径
        c.RoutePrefix = string.Empty; // 如果你想让 Swagger UI 在根目录下显示
    });
}

app.UseCors("AllowReactApp");  // 允许前端 React 调用后端 API
app.UseAuthorization();
app.MapControllers();
app.UseHttpsRedirection();

app.MapGet("/", () => "Hello World!");

app.Run();

