# Jules AI – QA Automation Assignment

A complete QA automation framework for Jules AI, combining UI automation with Playwright and API testing using Postman + Newman. Integrated with GitHub Actions for a full CI/CD pipeline experience.

---

## 🔗 Live Repository

📁 [GitHub Repository](https://github.com/Shobhit-core/JulesPlaywrightFrameWork)

---

## 📂 Project Structure

```bash
jules-ai-qa-assignment/
├── tests/
│   ├── ui/                 # UI automation tests (Playwright)
│   └── api/
│       ├── newman/         # Newman runner script
│       └── postman/        # Postman collection and environment
├── reports/                # Test reports (UI & API)
├── .github/workflows/ci.yml  # GitHub Actions workflow
├── playwright.config.js    # Playwright configuration
├── BUG-REPORT.md           # Logged bugs during testing
└── README.md
✅ Features
🎯 UI Automation (Playwright + JavaScript)
Valid login/logout flow

Dashboard navigation verification

Data-driven form validation using external JSON

HTML & JUnit report generation

Global setup/teardown for authentication and cleanup

🔌 API Automation (Postman + Newman)
GraphQL login success and failure validation

API ↔ UI data consistency checks

Error code validation for edge cases (400, 401, 500)

HTML report generation using newman-reporter-htmlextra

🔁 CI/CD Integration
GitHub Actions pipeline with two parallel jobs:

ui-tests: Runs Playwright tests and uploads reports

api-tests: Executes Newman tests and uploads reports

Test artifacts (reports) uploaded to GitHub Actions

🐞 Bug Report
ID	Title	Severity	Priority
JULES-001	Email format not validated on UI	Medium	High
📄 Details available in: BUG-REPORT.md

🚀 Getting Started
🛠 Prerequisites
Node.js >= 16.x

npm

Newman (npm install -g newman)

Postman (optional, for editing collections)

📦 Install Dependencies
bash
Copy
Edit
npm install
▶️ Run UI Tests (Playwright)
bash
Copy
Edit
npx playwright test
Or run a specific test:

bash
Copy
Edit
npx playwright test tests/ui/login.spec.js
🔁 Run API Tests (Postman + Newman)
bash
Copy
Edit
node tests/api/newman/run-api-tests.js
📸 Reports
UI Report: reports/ui/html-report/index.html

API Report: reports/api/html-report.html

Reports are also uploaded to GitHub Actions as artifacts.

🧪 CI/CD Workflow
Located at: .github/workflows/ci.yml

yaml
Copy
Edit
name: CI Tests

jobs:
  ui-tests:
    # Playwright UI Tests
  api-tests:
    # Newman API Tests
Runs on push/pull request to main, generates reports, and uploads them to GitHub.

👤 Author
Shobhit
Automation Test Engineer
🔗 [LinkedIn](https://www.linkedin.com/in/shobhit-budhlakoti-34492b161)
