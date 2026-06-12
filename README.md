# SDA Red Teaming Platform

An AI security testing platform that red-teams language models, evaluates their responses, and turns risky behavior into clear, reviewable security results.

SDA Red Teaming Platform helps teams test how AI models behave under adversarial prompts such as jailbreaks, prompt injection, data leakage attempts, toxic requests, and hallucination checks. Instead of running manual tests one by one, the platform provides a structured backend for launching attacks, judging responses, storing evidence, and tracking risk over time.

## What Makes It Stand Out

- Multi-attack AI red teaming in one API
- AI-judge evaluation for every model response
- Overall risk score, risk level, pass/fail status, and improvement advice
- Safe-response controls that hide risky model output when it should not be displayed
- Scenario library seeded automatically at startup
- Custom scenario management for admins
- Attack history with detailed per-scenario results
- Support for hosted models and user-provided model endpoints
- JWT authentication with user and admin access control
- Clean FastAPI documentation through Swagger UI

## Core Features

| Area | Features |
| --- | --- |
| Authentication | User registration, login, JWT bearer tokens, password hashing, profile updates, account deletion |
| Authorization | Regular user access, admin-only management, protected attack results |
| Scenario Library | Seeded attack scenarios, scenario codes, filtering by attack type, admin create/update/delete |
| Attack Runner | Runs selected attack types against selected model targets and stores each test run |
| AI Evaluation | Scenario-level judging, overall judging, risk score, risk level, safe/unsafe counts, evidence summary |
| Output Safety | Marks whether model responses are safe to show and protects sensitive or harmful outputs |
| Model Support | Groq models, OpenRouter models, OpenRouter judge model, and custom user endpoints |
| Persistence | SQLite database with SQLAlchemy models for users, scenarios, attack runs, and results |
| Documentation | Interactive API docs at `/docs` plus Mermaid database and workflow diagrams |

## Attack Coverage

The platform currently supports five major AI risk categories:

- `prompt_injection` - tests whether a model follows malicious instructions that override its role or policy
- `jailbreak` - tests attempts to bypass safety behavior through roleplay or manipulation
- `toxicity` - checks whether the model produces harmful, abusive, or unsafe language
- `data_leakage` - tests whether the model exposes secrets, private data, or hidden instructions
- `hallucination` - checks whether the model invents unsupported or unreliable information

## Supported Model Targets

| Model Type | Provider |
| --- | --- |
| `llama` | Groq |
| `gpt` | Groq |
| `gemma` | OpenRouter |
| `user` | Custom endpoint URL |
| `judge` | OpenRouter evaluation model |

## How It Works

1. A user registers or logs in.
2. The user selects a target model and one or more attack types.
3. The platform loads matching scenarios from the scenario library.
4. Each scenario prompt is sent to the selected model.
5. The AI judge evaluates the model's response.
6. Results are saved with severity, pass/fail status, risk score, evidence, unsafe categories, and suggested improvements.
7. The attack run receives an overall score, risk level, safe/unsafe counts, and summary.
8. The user reviews their attack history and detailed results through the API.

## Project Structure

```text
SDA-Red-Teaming/
|-- README.md
|-- Diagrams/
|   |-- database.mmd
|   `-- flowchart.mmd
`-- Red-Teaming/
    |-- run.py
    |-- requirements.txt
    |-- test_Ai.py
    `-- app/
        |-- main.py
        |-- routes/
        |-- services/
        |-- schemas/
        |-- database_models/
        |-- models/
        |-- attacks/
        |-- ai_judge/
        `-- prompts/
```

## API Modules

### Users

Base path: `/users`

- Register and log in
- Get, update, or delete the current user
- Admin list, view, update, and delete users

### Scenarios

Base path: `/scenarios`

- Get all scenarios
- Filter scenarios by attack type
- Get scenario details
- Admin create, update, and delete scenarios

### Attacks

Base path: `/attacks`

- Run a new attack test
- View the current user's attack history
- View detailed attack results
- Admins can access attack runs across users

## Tech Stack

- Python
- FastAPI
- Uvicorn
- SQLAlchemy
- SQLite
- Pydantic
- JWT with `python-jose`
- Password hashing with `passlib` and `bcrypt`
- Groq API
- OpenRouter API
- Mermaid diagrams

## Setup

1. Go to the backend directory:

```bash
cd Red-Teaming
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

4. Create a `.env` file in the `Red-Teaming` directory:

```env
SECRET_KEY=replace-with-a-secure-secret
GROQ_API_KEY=your-groq-api-key
OPENROUTER_API_KEY=your-openrouter-api-key

GROQ_LLAMA_MODEL=llama-3.1-8b-instant
GROQ_GPT_MODEL=openai/gpt-oss-20b
OPENROUTER_GEMMA_MODEL=google/gemma-4-31b-it:free
OPENROUTER_JUDGE_MODEL=qwen/qwen3-32b
```

5. Run the API:

```bash
python run.py
```

The server starts at:

```text
http://127.0.0.1:8000
```

Swagger API documentation:

```text
http://127.0.0.1:8000/docs
```

## Database

The platform uses SQLite:

```text
Red-Teaming/red_teaming.db
```

Database tables are created automatically when the app starts, and the default attack scenarios are seeded during startup.

## Diagrams

Mermaid diagrams are included in the `Diagrams` folder:

- `database.mmd` - database design
- `flowchart.mmd` - platform workflow

## Team

- Manar Alzhrani
- Nora
- Lujain
- Ghada
