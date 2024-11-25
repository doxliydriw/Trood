# Trood Internship Test Project:

This project is a single-page application (SPA) featuring a user data form.
User input is validated and then saved to localStorage, allowing data to persist even after a page refresh.

The application includes a user profile form where users can:
Enter personal data such as name, job title, phone number, address, and other details.
Upload an avatar.
Add interests, potential interests, and profile links.
Save this data locally using localStorage.
Retrieve and edit the saved data, even after refreshing the page.
The application provides validation for all form fields and ensures a smooth user experience.

# Instructions for Running the Application:

Please ensure the following tools are installed on your system: - Node.js - Git

# To Run the Application Locally:

1. Clone the Repository
   git clone https://github.com/doxliydriw/Trood.git

2. Navigate to the Project Directory

3. Install Dependencies
   Use npm to install all the required dependencies:
   npm install

4. Run the Development Server
   Start the development server:
   npm run dev
   The application will run locally on http://localhost:5173 (or another port if 5173 is unavailable).
   Open this URL in your web browser to view and interact with the application.

# Core Dependencies:

1.  These are used to build and run the application:
    React: Core library for building the user interface.
    npm install react react-dom
    Vite: Build tool for fast development.
    npm install vite
    React Vite Plugin: Enables React support in Vite.
    npm install @vitejs/plugin-react
2.  Form and Validation
    Used for form handling and validation:
    Formik: Manages the form state and submission.
    npm install formik
    Yup: Schema validation for form inputs.
    npm install yup
3.  Local Development
    Optional tools for smoother development experience:
    gh-pages: To deploy the application to GitHub Pages.
    npm install gh-pages --save-dev
4.  Development Scripts
    Ensure your package.json includes the following scripts:

                "scripts": {
                "dev": "vite",
                "build": "vite build",
                "preview": "vite preview",
                "deploy": "gh-pages -d dist"
                }

5.  Install All Dependencies
    To install all required dependencies, run:
    npm install
    This command will use the package.json file to fetch and install all listed dependencies.
