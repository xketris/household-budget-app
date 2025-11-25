# Household Budget App

The **Household Budget App** is a full-stack mobile application designed to help users manage both shared & personal expenses. It features a robust backend built with **Node.js** and **Express**, and a modern mobile frontend developed with **React Native** and **Expo**.

**Key Features:**
* **User Authentication:** Secure registration, login, and token management (Access/Refresh tokens) using JWT.
* **Group Management:** Create and manage household groups, invite members, and view group details.
* **Expense Tracking:** Add, edit, and delete expenses within specific groups.
* **Real-time Data:** specific endpoints for fetching user and group-specific data.
* **Rate Limiting:** Implemented using **Upstash (Redis)** to prevent API abuse.
* **Modern UI:** Built with **NativeWind** (Tailwind CSS for React Native) for a clean and responsive design.

## Status
In Development

## Development Server

To run this application locally, you need to set up both the backend server and the mobile application.

### Prerequisites
* Node.js installed
* MongoDB (Local or Atlas)
* Upstash Redis (for rate limiting)
* Expo Go app (on your physical device) or an Android/iOS Emulator

---

### Backend Setup

The backend is located in the `backend/` directory.

1.  **Navigate to the backend folder**
    ```bash
    cd backend
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env` file in the `backend/` directory with the following variables:
    ```env
    PORT=5001
    CONNECTION_STRING=your_mongodb_connection_string
    ACCESS_TOKEN_SECRET=your_access_token_secret
    REFRESH_TOKEN_SECRET=your_refresh_token_secret
    UPSTASH_REDIS_REST_URL=your_upstash_url
    UPSTASH_REDIS_REST_TOKEN=your_upstash_token
    ```

4.  **Run the Server**
    ```bash
    npm run dev
    ```
    The server will start (default: `http://localhost:5001`).

---

### Frontend (Mobile) Setup

The mobile app is located in the `mobile/` directory.

1.  **Navigate to the mobile folder**
    ```bash
    cd mobile
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env` file in the `mobile/` directory to point to your local backend IP address (use your computer's local IP, not `localhost`, if testing on a physical device):
    ```env
    EXPO_PUBLIC_API_URL=http://YOUR_LOCAL_IP:5001/api
    ```

4.  **Run the App**
    ```bash
    npx expo start
    ```
    Scan the QR code with the **Expo Go** app on your phone to load the project.

---

## API Endpoints

### Authentication (`/api/users`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/register` | Register a new user |
| `POST` | `/login` | Login user and receive tokens |
| `POST` | `/refresh` | Refresh access token using refresh token |
| `GET` | `/current` | Get current user's information |
| `PUT` | `/current` | Update the user |

### Groups (`/api/groups`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Get all groups the user belongs to |
| `POST` | `/` | Create a new group |
| `GET` | `/:id` | Get details of a specific group |
| `PUT` | `/:id` | Update group information |
| `DELETE` | `/:id` | Delete a group |
| `GET` | `/:groupId/expenses` | Get expenses of the group |

### Expenses (`/api/expenses`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Get all expenses |
| `POST` | `/` | Create a new expense |
| `GET` | `/:id` | Get a single expense by ID |
| `PUT` | `/:id` | Update an expense |
| `DELETE` | `/:id` | Delete an expense |

## License
This project currently has no specified license.

## Author
- [xketris](https://github.com/xketris)
