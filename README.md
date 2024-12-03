
# About

This project not only combines modern frameworks and tools but also offers a hands-on approach to building a robust and feature-rich e-commerce platform. Whether you're exploring frontend development with React or diving deep into backend APIs with .NET 8, this stack provides a comprehensive learning experience. 

Project URL: https://poc-react-guitarshop-app-apaybrg9eueyd4ea.brazilsouth-01.azurewebsites.net/catalog

# Stacks of this project
__Frontend__
- React 18
- Vite
- Library -> Redux _(https://redux.js.org)_
- Library -> Redux Toolkit _(https://redux-toolkit.js.org)_
- Library -> Axios _(https://axios-http.com)_
- Library -> Material UI _(https://mui.com/material-ui)_
- Library -> React Router _(https://reactrouter.com)_
- Library -> React Toastify _(https://www.npmjs.com/package/react-toastify)_
- Visual Studio Code -> Extensions (Simple React Snippets, ESLint, Material Icon Theme, Prettier, StandardJS)
- Browser Plugins -> React Developer Tools

__Backend__
- .NET 8
- Entity Framework Core (Migrations)
- MySQL
- Web Api
- Swagger
- Visual Studio Community 2022
- Google Chrome (using React DevTools) - main browser


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
1 - Open the workspace "poc.fullstack.guitarshop.frontend" on the Visual Studio Code

2 - On the terminal execute the commands bellow

```VS Code terminal
npm install
```
```VS Code terminal
npm run dev
```

3 - It will run the application using the port 3000

http://localhost:3000/

![image](https://github.com/user-attachments/assets/fa3294fd-6e95-4fe1-9798-a331dddf5004)

4 - Install the Material UI. Execute the command bellow using the terminal
```VS Code terminal
npm install @mui/material @emotion/react @emotion/styled
```

5 - Install the Material UI fonts. Execute the command bellow using the terminal
```VS Code terminal
npm install @fontsource/roboto
```

6 - Install the Material UI icons. Execute the command bellow using the terminal
```VS Code terminal
npm install @mui/icons-material
```

7 - Use the Material UI imports bellow on the main react page (index.tsx or layout.tsx)
```main react page
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
```

8 - Install the React Router Dom library using the terminal
```VS Code terminal
npm install react-router-dom
```

9 - Install the Axios library using the terminal
```VS Code terminal
npm install axios
```
10 - Install the Toastify library using the terminal
```VS Code terminal
npm install react-toastify
```

11 - Install the Redux toolkit using the terminal
```VS Code terminal
npm install @reduxjs/toolkit
```

# Azure Server Settings

Create a Resource Group

![image](https://github.com/user-attachments/assets/c77084aa-b20a-48b8-af3b-fc706f83d1f1)


Inside the Resource Group, add a Web App

![image](https://github.com/user-attachments/assets/905d9bb1-c8da-4260-aa90-7fac0c6e8657)

Inside the Resource Group, add the Azure MySQL

![image](https://github.com/user-attachments/assets/447ca934-fd49-42c7-bc75-af96ce299da8)


# CI/CD Azure + Github Actions

Go to your application on Azure, click on the left menu "Deployiment" -> "Deployment Center"
Log into your Github account e save it

![image](https://github.com/user-attachments/assets/3e366e5e-73a5-430d-ad94-ff085e97cc3f)


Back to your application Github Repository and click on "Code" tab

You'll see a new folder and .yml file with the configuration of the CI/CD pipelines

![image](https://github.com/user-attachments/assets/4744e9ed-8140-47bb-b60e-49de4d966f39)

Now go to the "Actions" tab and it shows the pipelines based on .yml file!

![image](https://github.com/user-attachments/assets/209208f5-bd51-4909-8d56-1cee60505d06)

Obs: In my case, I got a build error. I had to open the .yml file and create a new env variable pointing to the correcto project folder.

![image](https://github.com/user-attachments/assets/6732f79e-a40c-4e35-9477-f4454b841b17)

After that, I saved, committed and pushed the code to the "main" branch. It will trigger the pipeline automatically on Git Actions

![image](https://github.com/user-attachments/assets/e4f6181a-4098-4470-b4ea-4957cc0e5eac)

![image](https://github.com/user-attachments/assets/82173999-d19c-44d6-a4bc-da9caceaa765)

Now the application is deployed and working on the Azure environment
![image](https://github.com/user-attachments/assets/a7b5520c-5e76-45e9-aba1-6798ce85409e)


# Azure Deploy (Manually)

Choose your Azure Application
![image](https://github.com/user-attachments/assets/8b9ca9bd-0b80-4d06-b157-e21103beae6d)


![image](https://github.com/user-attachments/assets/5e08726b-2848-44ce-be9e-62958425184c)
