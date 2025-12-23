# Job Portal API

A RESTful API for a job portal platform where **job-seekers** can apply for jobs, and **recruiters** can post jobs and view applications.

Built with **Node.js**, **Express**, **MongoDB**, **Mongoose**, **JWT authentication**, and **role-based access control**.

---

## Table of Contents

1. [Setup & Installation](#setup--installation)
2. [Environment Variables](#environment-variables)
3. [API Endpoints](#api-endpoints)

   - [Auth](#auth)
   - [Jobs](#jobs)
   - [Applications](#applications)

4. [Role-based Access](#role-based-access)
5. [File Uploads](#file-uploads)
6. [Sample Requests & Responses](#sample-requests--responses)
7. [Postman Testing Workflow](#postman-testing-workflow)

---

## Setup & Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd <project-folder>
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory (see [Environment Variables](#environment-variables)).

4. Start MongoDB locally or connect to MongoDB Atlas:

```bash
mongod
```

5. Start the server:

```bash
npm run dev
```

Server will run at: `http://localhost:5000`

---

## Environment Variables

Create a `.env` file in the root:

```env
PORT=5000
MONGO_URL=mongodb://localhost:27017/jobportal
JWT_SECRET=your_jwt_secret_here
```

- `PORT` – Port the server listens on
- `MONGO_URL` – MongoDB connection string
- `JWT_SECRET` – Secret key for JWT token generation

---

## API Endpoints

### Auth

| Method | Endpoint             | Access | Description             |
| ------ | -------------------- | ------ | ----------------------- |
| POST   | `/api/auth/register` | Public | Register a new user     |
| POST   | `/api/auth/login`    | Public | Login and get JWT token |

**Register Request (JSON):**

```json
{
  "name": "Alice",
  "email": "alice@example.com",
  "password": "password123",
  "accountType": "job-seeker"
}
```

**Register Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Login Request (JSON):**

```json
{
  "email": "alice@example.com",
  "password": "password123"
}
```

**Login Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### Jobs

| Method | Endpoint         | Access                 | Description              |
| ------ | ---------------- | ---------------------- | ------------------------ |
| POST   | `/api/jobs/jobs` | Recruiter Only         | Create a new job posting |
| GET    | `/api/jobs/jobs` | Public / Authenticated | Get all job postings     |

**Create Job Request (JSON):**

```json
{
  "title": "Software Engineer",
  "company": "Tech Corp",
  "location": "New York",
  "description": "Develop web applications."
}
```

**Create Job Response:**

```json
{
  "_id": "64a7f3b2e1d0a1234567890",
  "title": "Software Engineer",
  "company": "Tech Corp",
  "location": "New York",
  "description": "Develop web applications.",
  "postedBy": "64a7f2a1e1d0a0987654321",
  "active": true,
  "createdAt": "2025-12-23T12:34:56.789Z",
  "__v": 0
}
```

---

### Applications

| Method | Endpoint                    | Access     | Description                      |
| ------ | --------------------------- | ---------- | -------------------------------- |
| POST   | `/api/applications/:jobId`  | Job-Seeker | Apply for a specific job         |
| GET    | `/api/applications/my`      | Job-Seeker | Get all applications of the user |
| GET    | `/api/applications/job/:id` | Recruiter  | Get all applications for a job   |

**Apply Job Request (form-data):**

```
resume: resume.pdf (file)
```

**Apply Job Response:**

````json
{
  "_id": "64a7f4c1e1d0a2345678901",
  "applicant": "64a7f2a1e1d0a0987654321",
  "job": "64a7f3b2e1d0a1234567890",
  "resume": "uploads/resumes/1678901234567.pdf",
  "status": "applied",
  "createdAt": "2025-12-23T12:45:12.345Z",
  "__v": 0
}


## Role-based Access

* **Job-Seeker:**

  * Can apply for jobs (`POST /applications/:jobId`)
  * Can view own applications (`GET /applications/my`)
  * Cannot create jobs → receives `Access denied!`

* **Recruiter:**

  * Can create jobs (`POST /jobs/jobs`)
  * Can view applications for jobs (`GET /applications/job/:jobId`)
  * Cannot apply for jobs → receives `Access denied!`

---

## File Uploads

* **Resume uploads** are stored in `/uploads/resumes`
* Use **form-data** in Postman to upload resume files.

---

## Sample `.env` File

```env
PORT=5000
MONGO_URL=mongodb://localhost:27017/jobportal
JWT_SECRET=supersecretkey123
````

---

## Postman Testing Workflow

**Step 1: Register Users**

- Register Job-Seeker & Recruiter using `/auth/register`
- Store JWT in environment variable `TOKEN`

**Step 2: Login Users**

- Login using `/auth/login` to refresh token if needed

**Step 3: Jobs**

- **Create Job (Recruiter only):** `/jobs/jobs` → store `JOB_ID`
- **Get Jobs (All users):** `/jobs/jobs`

**Step 4: Applications**

- **Apply Job (Job-Seeker):** `/applications/{{JOB_ID}}` (form-data resume file)
- **Get My Applications (Job-Seeker):** `/applications/my`
- **Get Job Applications (Recruiter):** `/applications/job/{{JOB_ID}}`

**Step 5: Authorization Header**

- All protected routes require:

```
Authorization: Bearer {{TOKEN}}
```
