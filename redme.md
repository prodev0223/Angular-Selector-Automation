Chrome Extension: Angular Selector Automation
Overview
This Chrome extension, built with Angular 14, provides a user-friendly interface for selecting multiple similar elements on a webpage and performing various automated actions. The extension utilizes Angular Material for a sleek UI and Tailwind CSS for styling.

Features
Element Selection: Easily select multiple similar elements on a webpage by specifying their common attributes.

Automation Actions:

Clicking: Automate clicking on selected elements.
Auto-filling Inputs: Fill input fields in the selected elements automatically.
Get Text Content: Retrieve and display the text content of the selected elements.
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your/repository.git
Navigate to the project directory:

bash
Copy code
cd angular-selector-automation
Install dependencies:

bash
Copy code
npm install
Build the Angular app:

bash
Copy code
ng build --prod
Load the extension in Chrome:

Open Chrome and go to chrome://extensions/.
Enable "Developer mode" in the top right corner.
Click "Load unpacked" and select the dist directory inside your project.
Usage
Open a webpage where you want to perform automated actions.

Click on the extension icon in the Chrome toolbar to open the Angular Selector Automation panel.

Use the user-friendly interface to select multiple similar elements by specifying their common attributes.

Choose the automation action you want to perform (Click, Auto-fill Inputs, Get Text Content).

Click the "Run Automation" button to execute the selected actions on the chosen elements.

Technologies Used
Angular 14: Frontend framework for building the extension's user interface.

Angular Material: UI component library for a consistent and polished design.

Tailwind CSS: Utility-first CSS framework for efficient styling.