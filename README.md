# SubTrack - Subscription Management System

## Team Members
- **Varshitha Sathish**
- **Sanjay Baskaran**

---

## Project Overview
SubTrack is a cloud-based subscription management platform designed to simplify and automate tracking of recurring payments. With integrations to financial APIs and cloud services, it provides users with actionable insights into their subscription spending while ensuring timely notifications to avoid missed payments.


### Key Features:
- Automatic retrieval of transaction data using the Plaid API for subscription management.
- Real-time email notifications for upcoming subscription renewals.
- Comprehensive dashboard for managing and tracking all subscriptions.
- Hosted and deployed on Google Cloud Platform (GCP) for scalability and reliability.

---

## Tech Stack
### Frontend:
- **React.js**: For building a responsive and user-friendly interface.
- **React-Plaid-Link**: For secure Plaid API integration to link bank accounts.

### Backend:
- **Node.js** with **Express.js**: To handle server-side logic and API endpoints.
- **Plaid Node SDK**: For securely fetching transaction data from the Plaid API.
- **Firebase Admin SDK**: To interact with Google Cloud Firestore for data storage.
- **Nodemailer**: For email notifications to users.

### Cloud Services:
- **Google Cloud Platform (GCP):**
---

## Prerequisites
Before you begin, ensure you have the following installed:
- **Node.js** (v14+)
- **npm** (v6+)
- A **Google Cloud Platform** project with necessary APIs enabled.
- **Plaid API credentials** (Client ID, Secret).

---

## Setup Instructions
### 1. Clone the Repository
git clone https://github.com/varshiha-09/subtrack.git
cd subtrack

### 2. Install Dependencies
npm install

### 3. Configure Environment Variables
PLAID_CLIENT_ID=your_client_id
PLAID_SECRET=your_secret
GCP_PROJECT_ID=your_project_id
FIRESTORE_COLLECTION=your_firestore_collection
EMAIL_SERVICE_API_KEY=your_email_service_api_key
PORT=5001

### 4. Run the Backend
node server.js
### 5. Running the Frontend
npm start



