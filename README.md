## API Documentation

This API provides endpoints for managing tasks in a task management application. It's built using NestJS and follows RESTful principles.

### Base URL

All endpoints are prefixed with `/api/tasks`.

### Endpoints

#### 1. Create a Task

- **Method**: POST
- **Endpoint**: `/api/tasks`
- **Description**: Creates a new task
- **Request Body**:
  ```json
  {
    "title": "string",
    "description": "string"
  }
  ```
- **Response**: Returns the created task object

#### 2. Get All Tasks

- **Method**: GET
- **Endpoint**: `/api/tasks`
- **Description**: Retrieves all tasks that are not deleted
- **Query Parameters**:
  - `status` (optional): Filter tasks by status ('pending', 'in_progress', 'completed', 'deleted')
- **Response**: Returns an array of task objects

#### 3. Get a Specific Task

- **Method**: GET
- **Endpoint**: `/api/tasks/:id`
- **Description**: Retrieves a specific task by its ID
- **Response**: Returns the task object if found

#### 4. Update a Task

- **Method**: PATCH
- **Endpoint**: `/api/tasks/:id`
- **Description**: Updates the title and description of a specific task
- **Request Body**:
  ```json
  {
    "title": "string",
    "description": "string"
  }
  ```
- **Response**: Returns the updated task object

#### 5. Delete a Task

- **Method**: DELETE
- **Endpoint**: `/api/tasks/:id`
- **Description**: Marks a task as deleted (soft delete)
- **Response**: Returns the updated list of tasks (excluding deleted tasks)

#### 6. Update Task Status

- **Method**: PATCH
- **Endpoint**: `/api/tasks/:id/status`
- **Description**: Updates the status of a specific task
- **Request Body**:
  ```json
  {
    "status": "pending" | "in_progress" | "completed"
  }
  ```
- **Response**: Returns the updated task object

#### 7. Get Days Since Task Creation

- **Method**: GET
- **Endpoint**: `/api/tasks/:id/dias-transcurridos`
- **Description**: Calculates the number of days since the task was created
- **Response**: Returns an object with the task ID and the number of days

#### 8. Health Check

- **Method**: GET
- **Endpoint**: `/healthz`
- **Description**: Checks the health status of the API
- **Response**: Returns "ok" if the API is healthy

### Response Format

- All endpoints return responses in the following format:

  ```json
  {
    "statusCode": number,
    "data": object | array
  }
  ```

The `statusCode` field contains the HTTP status code of the response, and the `data` field contains the actual response data.
