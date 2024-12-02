# About


# Stacks of this project
__Frontend__
- ReactJs
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
- SQLIte
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

# Azure Deploy

Create a Resource Group
![image](https://github.com/user-attachments/assets/c77084aa-b20a-48b8-af3b-fc706f83d1f1)


Inside the Resource Group, add a Web App
![image](https://github.com/user-attachments/assets/905d9bb1-c8da-4260-aa90-7fac0c6e8657)

