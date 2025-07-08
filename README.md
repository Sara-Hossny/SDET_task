
# 🧪 Full Stack Automated Testing Project
[![CircleCI](https://circleci.com/gh/Sara-Hossny/SDET_task.svg?style=svg)](https://circleci.com/gh/Sara-Hossny/SDET_task)
![jest](https://img.shields.io/badge/tested%20with-jest-99424f?style=for-the-badge&logo=jest)
![Supertest](https://img.shields.io/badge/tested%20with-supertest-blue?style=for-the-badge)
![Nightwatch](https://img.shields.io/badge/tested%20with-nightwatch-yellow?style=for-the-badge&logo=chrome)
![License](https://img.shields.io/badge/license-MIT-brightgreen?style=for-the-badge)

This project contains a full stack **automated testing framework** using:

- ✅ **Jest + Supertest** for REST API testing for mock user auth
- ✅ **Nightwatch.js** for End-to-End UI testing for commerical website (contact page and search)

Perfect for CI/CD integration, modular and data-driven.

---

## 📁 Project Structure

```
SDET_TASK/
├── .circleci/
│   └── config.yml                # CI pipeline
├── Mock_user_Auth_Supertest-main/
│   ├── mock_user_authentication_API/
│   │   ├── package.json          # API app
│   │   └── package-lock.json
│   └── Testing_supertest/
│       ├── Config/
│       │   └── config.js         # API endpoints and base URL
│       ├── testData/
│       │   ├── requestData.js    # Request payloads
│       │   └── responseData.js   # Expected responses
│       ├── reports/
│       │   └── test-report.html  # Jest HTML report
│       ├── mock_user_auth.test.js # Main API test suite
│       ├── jest.config.js
│       ├── package.json
│       └── package-lock.json
├── UItest/
│   ├── page-objects/             # Page Object Model
│   ├── test-data/                # Input data (JSON)
│   ├── tests/                    # Nightwatch tests
│   ├── tests_output/             # HTML reports
│   ├── nightwatch.conf.js        # Nightwatch config
│   ├── package.json
│   └── package-lock.json
└── .gitignore
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v14+)
- Google Chrome (for UI tests)
- `npm`

---

## 🔧 Installation

Install dependencies for both the API and UI projects:

```bash
# Navigate to API
cd Mock_user_Auth_Supertest-main/mock_user_authentication_API
npm install

# Start server
npm run dev 8080

# Open a new terminal to run tests
cd ../Testing_supertest
npm install
```

---

## ✅ Run API Tests

```bash
npm test
```

Jest will run using Supertest and generate an HTML report in `reports/test-report.html`.

---

## 🌐 Run UI Tests (Nightwatch)

```bash
cd UItest
npm install
npx nightwatch
```

Reports will be stored in `tests_output/nightwatch-html-report`.

---

## 🔄 CI/CD with CircleCI

The project includes a `.circleci/config.yml` file that:

- Installs dependencies
- Starts the API server
- Executes tests (API + UI)
- Stores results (Jest + Nightwatch)

You can run both test suites automatically on push via GitHub + CircleCI.

---

