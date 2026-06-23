# SDA Red Teaming Backend

Backend API for an AI red-teaming platform. The service runs adversarial test scenarios against language models, evaluates responses with an AI judge, stores attack evidence, and exposes authenticated APIs for users, admins, reports, and dashboard metrics.

## Features

- FastAPI backend with Swagger UI at `/docs`
- JWT authentication with user and admin roles
- Role-based access control for protected user, admin, scenario, attack, and report operations
- User registration, login, profile update, and deletion
- Admin user management
- Seeded attack scenario library
- Admin scenario create, read, update, delete, and filtering
- Automated attack runs across selected attack types
- Manual single-prompt attack runs
- Overall attack evaluation returned with the attack run
- Background scenario evaluation using FastAPI `BackgroundTasks`
- Rule-based sensitive data leakage checks before AI judge evaluation
- Safe-response handling that hides unsafe model responses from report output
- Report cards and report detail views for each authenticated user
- Dashboard metrics for attack risk distribution, scenario totals, and latest attack time
- SQLite by default, with `DATABASE_URL` support for SQLAlchemy-compatible databases
- CORS enabled for `http://localhost:3000` and `http://localhost:5173`

## Attack Types

The backend supports these attack categories:

- `prompt_injection`
- `jailbreak`
- `toxicity`
- `data_leakage`
- `hallucination`
- `tool_misuse`

## Model Targets

| Request value | Provider |
| --- | --- |
| `llama` | Groq |
| `gpt` | Groq |
| `gemma` | OpenRouter |
| `user` | Custom endpoint URL |

OpenRouter is also used for the judge model configured by `OPENROUTER_JUDGE_MODEL`.

## Project Structure

```text
SDA-Red-Teaming/
|-- README.md
`-- Red-Teaming/
    |-- docker-compose.yml
    |-- Diagrams/
    |   |-- database.mmd
    |   `-- flowchart.mmd
    `-- backend/
        |-- run.py
        |-- requirements.txt
        |-- Dockerfile
        `-- app/
            |-- main.py
            |-- extensions.py
            |-- seed.py
            |-- dependencies/
            |-- routes/
            |-- services/
            |-- schemas/
            |-- database_models/
            |-- models/
            |-- attacks/
            |-- ai_judge/
            `-- prompts/
```

## Tech Stack

- Python
- FastAPI
- Uvicorn
- SQLAlchemy
- Pydantic
- SQLite by default
- JWT with `python-jose`
- Password hashing with `passlib` and `bcrypt`
- Groq API
- OpenRouter API
- Docker

## Setup

1. Go to the backend directory:

```bash
cd Red-Teaming/backend
```

2. Create and activate a virtual environment:

```bash
python -m venv .venv
.venv\Scripts\activate
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Create a `.env` file in `Red-Teaming/backend`:

```env
SECRET_KEY=replace-with-a-secure-secret
DATABASE_URL=sqlite:///./red_teaming.db

GROQ_API_KEY=your-groq-api-key
OPENROUTER_API_KEY=your-openrouter-api-key

GROQ_LLAMA_MODEL=llama-3.1-8b-instant
GROQ_GPT_MODEL=openai/gpt-oss-20b
OPENROUTER_GEMMA_MODEL=google/gemma-4-31b-it:free
OPENROUTER_JUDGE_MODEL=qwen/qwen3-32b
```

`SECRET_KEY` is required. `DATABASE_URL` is optional and defaults to `sqlite:///./red_teaming.db`.

5. Run the API:

```bash
python run.py
```

The API starts on:

```text
http://127.0.0.1:8000
```

Swagger documentation is available at:

```text
http://127.0.0.1:8000/docs
```

## Docker

From `Red-Teaming/backend`:

```bash
docker build -t sda-red-teaming-backend .
docker run --env-file .env -p 8000:8000 sda-red-teaming-backend
```

The repository also includes `Red-Teaming/docker-compose.yml`, which builds the backend from `Red-Teaming/backend`, loads `Red-Teaming/backend/.env`, and exposes the API on port `8000`.

## API Overview

### System

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/` | Health-style API status message |

### Users

Base path: `/users`

| Method | Path | Access | Description |
| --- | --- | --- | --- |
| `POST` | `/users/register` | Public | Register a user |
| `POST` | `/users/login` | Public | Log in and receive a bearer token |
| `GET` | `/users/me` | User | Get the current user |
| `PUT` | `/users/me` | User | Update the current user |
| `DELETE` | `/users/me` | User | Delete the current user |
| `GET` | `/users` | Admin | List users |
| `GET` | `/users/{user_id}` | Admin | Get a user by ID |
| `PUT` | `/users/{user_id}` | Admin | Update any user |
| `DELETE` | `/users/{user_id}` | Admin | Delete any user |

Passwords must be 8-64 characters and include at least one uppercase letter, one lowercase letter, and one number.

Admin role assignment is handled through `PUT /users/{user_id}` by sending the `role` field as `admin` or `user`. There is no separate admin promotion endpoint.

### Attacks

Base path: `/attacks`

| Method | Path | Access | Description |
| --- | --- | --- | --- |
| `POST` | `/attacks/run` | User | Run selected seeded scenarios against a model |
| `POST` | `/attacks/manual` | User | Run one manual prompt against a model |
| `GET` | `/attacks` | Admin | List all attack runs |
| `GET` | `/attacks/{attack_run_id}` | Admin | Get detailed attack run results |

`POST /attacks/run` performs the model calls, stores the overall attack result, and then schedules scenario-level evaluation with FastAPI `BackgroundTasks`. While the background task is pending, individual scenario results may show pending evaluation fields. The background evaluator later updates each scenario with pass/fail status, risk score, evidence summary, unsafe categories, improvement guidance, and safe/hidden response handling.

Example attack request:

```json
{
  "model_type": "llama",
  "selected_attack_types": ["prompt_injection", "jailbreak"]
}
```

Example manual attack request:

```json
{
  "model_type": "gemma",
  "attack_type": "toxicity",
  "prompt": "Test prompt here"
}
```

For `model_type: "user"`, include `endpoint_url`. Include `api_key` when the custom endpoint needs one.

### Scenarios

Base path: `/scenarios`

All scenario endpoints require admin access.

| Method | Path | Description |
| --- | --- | --- |
| `POST` | `/scenarios` | Create a scenario |
| `GET` | `/scenarios` | List scenarios |
| `GET` | `/scenarios/type/{attack_type}` | List scenarios by attack type |
| `GET` | `/scenarios/{scenario_id}` | Get a scenario |
| `PUT` | `/scenarios/{scenario_id}` | Update a scenario |
| `DELETE` | `/scenarios/{scenario_id}` | Delete a scenario |

### Reports

Base path: `/reports`

All report endpoints require an authenticated user. Regular users can only access their own reports. Admin users can list report cards across users through the report service behavior and can access all detailed attack runs through the admin-protected `/attacks` endpoints.

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/reports` | List current user's report cards |
| `GET` | `/reports/{attack_run_id}` | Get current user's report details |

`GET /reports` supports optional filters:

- `attack_type`
- `model_provider`
- `model_name`
- `risk_level`

### Dashboard

Base path: `/dashboard`

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/dashboard/attack-risk-distribution` | Count and percentage of failed scenarios by attack type |
| `GET` | `/dashboard/total-scenarios` | Total saved attack results |
| `GET` | `/dashboard/last-attack` | Timestamp and relative message for the latest attack |

## Database

The backend creates database tables on startup with SQLAlchemy:

```python
Base.metadata.create_all(bind=engine)
```

By default, the SQLite database is created at:

```text
Red-Teaming/backend/red_teaming.db
```

Seed scenarios are inserted during startup through `seed_database()`.

## Authentication

After login, pass the returned token as a bearer token:

```http
Authorization: Bearer <access_token>
```

Tokens use `HS256` and expire after 60 minutes.

## Role-Based Access Control

The backend uses JWT bearer tokens and dependency-based RBAC:

- Public access: registration, login, and the root status endpoint.
- User access: authenticated users can manage their own account, run attacks, run manual attacks, and view their own reports.
- Admin access: admins can manage users, update user roles, manage scenarios, list all attack runs, and view detailed attack results for any user.

Non-admin users receive `403 Admin access required` when calling admin-only endpoints. Invalid or missing users receive authentication errors from the bearer-token dependency.

## Team

- Manar Alzhrani
- Nora Alqhtani
- Lujain Aljuaid
- Ghada Alghamdi
