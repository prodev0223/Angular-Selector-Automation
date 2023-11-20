# Chrome Extension: Angular Selector Automation

## Overview

This Chrome extension, built with Angular 14, provides a user-friendly interface for selecting multiple similar elements on a webpage and performing various automated actions. The extension utilizes Angular Material for a sleek UI and Tailwind CSS for styling.

## Features

- **Element Selection:** Easily select multiple similar elements on a webpage by specifying their common attributes.
  
- **Automation Actions:**
  - **Clicking:** Automate clicking on selected elements.
  - **Auto-filling Inputs:** Fill input fields in the selected elements automatically.
  - **Get Text Content:** display and copy to clipboard the text content of the selected elements.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/prodev0223/Angular-Selector-Automation

2. Navigate to the project directory:

    ```bash
    cd angular-selector-automation

3. Install dependencies:

    ```bash
    npm install

4. Build the Angular app:

    ```bash
    ng build --prod

5. Load the extension in Chrome:

    - Open Chrome and go to chrome://extensions/.
    - Enable "Developer mode" in the top right corner.
    - Click "Load unpacked" and select the dist directory inside your project.

## Usage
1. Open a webpage where you want to perform automated actions.

2. Click on the extension icon in the Chrome toolbar to open the Angular Selector Automation panel.

3. Enable the selection mode by clicking on the **Select element** button

4. Select the first element, the similar elements will be highlighted in purplem and you can select them all at one by checking the **Select all** check box and vice-versa

5. Choose one of the provided automations to apply on the selected elements. 

## Technologies Used
- Angular 14: Frontend framework for building the extension's user interface.

- Angular Material: UI component library for a consistent and polished design.

- Tailwind CSS: Utility-first CSS framework for efficient styling.

- Clean Architecture (Partial Adoption): While the project size didn't necessitate full clean architecture, certain principles were adopted to maintain separation of concerns and enhance maintainability.