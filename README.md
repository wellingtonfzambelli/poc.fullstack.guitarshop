# About


# Stacks of this project
- ReactJs
- Vite
- .NET 8
- Entity Framework Core (Migrations)
- SQLIte
- Web Api
- Swagger
- Visual Studio Community 2022


Action Filter
Filter Validation
Serilog
Rate Limit
Bearer Token
Identity
HealthCheck
RabbitMQ
MediatR
Redis
XUnit
SonarQube
Bootstrap
Docker (Docker Compose)
Postman (for API testing)

# Setting up the backend application
1 - Run migration commands
```Migrations
dotnet ef migrations add SeedProducts
```
```Migrations
dotnet ef database update
```
2 - Run the application once (press F5) and stop it!

It'll run the SEED logic on the "Progran.cs" file for the initial data in the 'Products' table
![image](https://github.com/user-attachments/assets/845848f5-9687-4c3d-ac5f-c4cc93b4ebca)

3 - Install the SQLite extension for Visual Studio
![image](https://github.com/user-attachments/assets/88ab2ade-e37e-4d34-9b90-1efc4d550612)

4 - Open the SQLite window and you're ready to run the queries
![image](https://github.com/user-attachments/assets/5a2fdebe-30b6-4d15-bab9-1c0dc71f2a4c)

# Setting up the frontend application
Open the workspace "poc.fullstack.guitarshop.frontend" on the Visual Studio Code

On the terminal execute the commands bellow

```terminal vs code
npm install
```
```terminal vs code
npm run dev
```
