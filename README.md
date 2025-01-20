# Online Status Checker with Node.js

This is a simple web application built with Node.js and Express that allows users to monitor the online status of websites or services. It periodically checks the status of the websites and notifies users via desktop notifications and email (using Gmail SMTP).

## Features

- Add, edit, and remove websites to monitor
- Check the status of multiple websites
- Receive notifications when websites go online or offline
- Set check intervals for all monitored websites
- Responsive UI with simple CRUD actions for managing websites
- Validates website URLs before adding or editing them
- Notifications via desktop and email (Gmail SMTP)

## Tech Stack

- **Backend**: Node.js, Express
- **Frontend**: EJS (Embedded JavaScript Templates)
- **Database**: JSON file storage (for simplicity)
- **Notifications**: Nodemailer for email notifications
- **URL Validation**: Regular expressions for URL validation

## Installation

### Prerequisites

- Node.js
- npm (Node Package Manager)

### Step 1: Clone the repository

```bash
git clone https://github.com/Developer-Nijat/Online-Status-Checker-with-Node.js.git
cd online-status-checker
```

### Step 2: Install dependencies

Run the following command to install the required dependencies:

```bash
npm install
```

### Step 3: Set up Gmail SMTP for email notifications

1. Create a `.env` file in the root of the project directory and add your Gmail credentials:

```text
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-password
```

2. Alternatively, you can configure Gmail's "App Passwords" if you have 2-factor authentication enabled for better security.

### Step 4: Start the application

Run the following command to start the server:

```bash
npm start
```

The application will be running on `http://localhost:3000`.

## Usage

1. **Home Page**: Displays a list of websites being monitored. You can add new sites, edit existing ones, or remove sites.
2. **Add a New Site**: Navigate to `/add` to add a new website URL. The URL is validated before adding it.
3. **Edit a Site**: Navigate to `/edit/<site-id>` to edit an existing website. The URL is validated before saving changes.
4. **Remove a Site**: From the home page, you can remove a site by confirming the action via a confirmation dialog.
5. **Check Status**: The app periodically checks the online status of the websites, showing the current status (Online/Offline) next to each site. You can adjust the interval for all sites from the settings.

## File Structure

```plaintext
/online-status-checker
  ├── /node_modules        # Node.js modules
  ├── /views               # EJS templates (UI)
  ├── /utils               # Utility functions (site manager, email, etc.)
  ├── /public              # Assets
  ├── /services            # Services
  ├── /routes              # Routes
  ├── siteList.json        # Stores the websites and statuses
  ├── app.js               # Main server file
  ├── config.json          # Stores email and interval data
  ├── package.json         # Node.js project configuration
  ├── package-lock.json    # Lock file for dependencies
  └── README.md            # This file
```

## Configuration

### Changing the Check Interval

You can configure the check interval for all monitored websites by modifying the check interval setting in the UI. The app will check the websites periodically and notify you if they go online or offline.

### Email Notifications

Email notifications are sent using **Nodemailer**. When a website goes online or offline, an email will be sent to the configured email address to notify you of the change in status.

### URL Validation

URLs are validated before they are added or edited. If the URL format is invalid, the user will be notified via an alert.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-xyz`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-xyz`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.