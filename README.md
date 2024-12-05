
## **Steps for Local Execution**

### **Prerequisites**

Before running the project locally, ensure you have the following installed:

- **Node.js**: [Download and install Node.js](https://nodejs.org/)
- **npm (Node Package Manager)**: npm is bundled with Node.js, so it should be available after installing Node.js.

### **Clone the Repository**

1. Clone the repository to your local machine using Git. Open your terminal and run:

   ```bash
   git clone https://github.com/your-username/google-sheet-form.git
   ```

2. Navigate to the project directory:

   ```bash
   cd google-sheet-form
   ```

### **Install Dependencies**

3. Install the required dependencies for the project by running the following command in the terminal:

   ```bash
   npm install
   ```

   This will install all the required packages listed in the `package.json` file, such as `express`, `body-parser`, and `node-fetch`.

### **Set Up the Google Sheets Script**

1. Open Google Sheets and create a new spreadsheet.
2. Click on **Extensions** > **Apps Script**.
3. Replace the default script with the **App Script code** provided above (ensure to include both the `updateStatus()` and `onFormSubmit()` functions).
4. Save the script.
5. Set up the triggers for Google Sheets to automatically run the script when data is submitted via the form. This includes setting up the `onFormSubmit` trigger in the Apps Script editor.

### **Configure the Node.js Server**

1. In the project folder, ensure that the `server.js` file contains the following code (replace with your actual Google Sheets API configuration):

   ```javascript
   import express from 'express';
   import fetch from 'node-fetch';
   import bodyParser from 'body-parser';

   const app = express();
   const port = 3000;

   app.use(bodyParser.json());
   app.use(express.static('public'));

   // POST route to receive form data and send it to Google Sheets
   app.post('/submit', async (req, res) => {
     const { name, email, age } = req.body;
     
     // The URL of the Google Sheet API (you can find this in your Google Sheets API documentation)
     const sheetURL = 'YOUR_GOOGLE_SHEET_API_URL';

     // POST request to Google Sheets API to add data
     try {
       const response = await fetch(sheetURL, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({ name, email, age })
       });

       if (response.ok) {
         res.status(200).send('Form submitted successfully!');
       } else {
         res.status(500).send('Error submitting form!');
       }
     } catch (error) {
       res.status(500).send('Server Error');
     }
   });

   app.listen(port, () => {
     console.log(`Server running at http://localhost:${port}`);
   });
   ```

2. In the above code:
   - Replace `YOUR_GOOGLE_SHEET_API_URL` with the actual API endpoint that corresponds to your Google Sheets document.
   - You may need to set up **Google Sheets API** and **OAuth credentials** for secure interaction with your Google Sheets.

### **Running the Application Locally**

1. **Start the Node.js server** by running the following command in your terminal:

   ```bash
   npm start
   ```

   This will start the local server on **http://localhost:3000**.

2. **Access the Form**:
   - Open a web browser and navigate to **http://localhost:3000**.
   - You should see the form displayed with fields for **Name**, **Email**, and **Age**.
   - When you submit the form, the data will be sent to your Google Sheets via the API.

### **Check Google Sheets**

- After submitting the form, the data will appear in your Google Sheets.
- The **Status** field will automatically update based on the **Age** value (i.e., 'Senior' for 60+ and 'Junior' for below 60).

With these steps, you should be able to run the project locally, handle form submissions, and sync data with Google Sheets while ensuring that the **Status** column gets automatically updated based on the **Age**.

Let me know if you need any further assistance!
