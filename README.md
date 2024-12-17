# **School Management System API by Carlo Pasmonte**

This project is a **School Management System API** designed to handle school operations such as:
1. **School Management** (CRUD Operations - Superadmin only)
2. **Classroom Management** (Managed by School Admin)
   - Capacity and Resource Management.
3. **Student Management** (Managed by School Admin)
   - Enrollment and Transfer Capabilities.
   - Student Profile Management.

---

## **1. Installation Guide**

### **Prerequisites**
Make sure that you have the following installed:
- **Git**
- **Node.js** (v18+)
- **MongoDB**
- **Redis**
- **npm**

### **Step-by-Step Setup**

1. **Clone the repository**
    ```bash
    git clone https://github.com/cool-guru/school-management.git
    cd school-management
    ```
   
2. **Install dependencies**

    ```bash
    npm install
    ```
3. **Set up the .env file**

    Create a .env file in the project root and configure the following environment variables:
    ```
    LONG_TOKEN_SECRET=6b8f4a5f9b3a1d9e12c8efb14d6d29a8e52f3f7c3e5b2f6f23af8e9c4b7d6f3a
    SHORT_TOKEN_SECRET=1e2f3d4c5b6a7f8e9d0c1a2b3c4d5e6f7a8b9c0d1e2f3d4c5b6a7f8e9d0c1a2b
    NACL_SECRET=2df86c07b98a8e3f7b2a4d6e5f1c2b3a4e5d6f7c8e9b1d0c2a3b4d5e6f7a8b9c0d1e2f
    MONGO_URI=mongodb://localhost:27017/school-management
    JWT_SECRET=secret
    ```

4. **Start MongoDB**
5. **Start Redis Server**
6. **Run the Server**

    Start both of Admin and User servers:
    ```
    node app.js
    ```

## **2. Test the API**

I recommend to use **Postman** to test the API endpoints. Also you can use other tools like **curl** or **Insomnia** if you want.

### **2.1   Create Super Admin via Mongo shell script**

```
db.users.insertOne({
    username: "superadmin",
    email: "admin@admin.com",
    password: "$2b$12$Ipl0BBWI3QtFkq1k3TIsOuufbieJ5SVBYyyjlEYC.fv9zbXI3jnEW", // this is hashedCode of "password1234"
    role: "superadmin"
});
```
### **2.2 Authentication**

1. **Register as a School Admin**
```
POST /api/register
Content-Type: application/json

{
    "username": "schooladmin1",
    "email": "schooladmin1@example.com",
    "password": "password1234"
}

```
2. **Login as Superadmin to create School**
```
POST /api/login
Content-Type: application/json

{
    "email": "admin@admin.com",
    "password": "password1234"
}

```
Response
```
{
    "user": {
        "id": "<ID>",
        "username": "superadmin",
        "role": "superadmin"
    },
    "token": "<JWT_TOKEN>"
}

```
### **2.3 School Management(Superadmin Only)**

1. **Create a School**
```
POST /api/schools
Authorization: Bearer <superadmin_token>
Content-Type: application/json

{
    "name": "Havard University",
    "address": "Massachusetts Hall, Cambridge, MA 02138"
}
```
2. **Get All Schools**
```
GET /api/schools
Authorization: Bearer <superadmin_token>

```
### **2.4 Classroom Management (Superadmin and School Admin)**

1. **Create a Classroom**
```
POST /api/classroom
Authorization: Bearer <schooladmin_token> or <superadmin_token>
Content-Type: application/json

{
    "name": "Classroom A",
    "schoolId": "<SCHOOL_ID>",
    "capacity": 30,
    "resources": [
        { "type": "projector", "quantity": 1 },
        { "type": "whiteboard", "quantity": 2 }
    ]
}

```
2. **Update Classroom Capacity**
```
PUT /api/classroom/{CLASSROOM_ID}/capacity
Authorization: Bearer <token>
Content-Type: application/json

{
    "capacity": 40
}
```
3. **Update Classroom Resource**
```
PUT /api/classroom/{CLASSROOM_ID}/resources
Authorization: Bearer <token>
Content-Type: application/json

{
    "resources": [
        { "type": "projector", "quantity": 2 },
        { "type": "whiteboard", "quantity": 3 }
    ]
}
```
4. **Get Available Seats for Classroom**
```
GET /api/classroom/{CLASSROOM_ID}/available-seats
Authorization: Bearer <token>

```
5. **Get Classrooms associated with a Specific School**
```
GET /api/classroom/{SCHOOL_ID}
Authorization: Bearer <token>
```

### **2.5 Student Management (Superadmin and School Admin)**

1. **Enroll a Student**
```
POST /api/student
Authorization: Bearer <school-admin_token>
Content-Type: application/json

{
    "name": "John Doe",
    "classroomId": <CLASSROOM_ID>,
    "enrollmentDate": "2024-06-11"
}

```
2. **Transfer a Student to Another Classroom**
```
PUT /api/student/{STUDENT_ID}
Authorization: Bearer <school-admin_token>
Content-Type: application/json

{
    "newClassroomId": <NEW_CLASSROOM_ID>
}

```
3. **Update Student Profile**
```
PUT /api/student/{STUDENT_ID}/profile
Authorization: Bearer <token>
Content-Type: application/json

{
    "email": "john.doe@school.edu",
    "phone": "1234567890"
}
```
4. **Get All Students in a Classroom**
```
GET /api/student/{CLASSROOM_ID}
Authorization: Bearer <token>

```

## **3. Notes**

- Superadmin: Must be created manually via MongoDB shell script for initial setup.
- School Admins: Created via the /register API.
- Security:
    * JWT-based authentication.
    * Role-based access control ensures only authorized users access specific endpoints.
- `occupiedSeats` for `classroom` will be automatically increased or decreased based on the number of `students` that associated to that `classroom`



# **Carlo Pasamonte**
