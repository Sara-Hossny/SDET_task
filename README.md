
# 🧪 Automated Testing Project
[![CircleCI](https://dl.circleci.com/status-badge/img/circleci/W3Ru6CVv8mYHTc4JPsDNqZ/Noi6edEbbpfwPQxcTm59v4/tree/main.svg?style=svg&circle-token=CCIPRJ_6TqgDWPfebv6Mrny2eSqoi_88465e7c5182f7258d78ef6e3bb9b29f0d58fdae)](https://dl.circleci.com/status-badge/redirect/circleci/W3Ru6CVv8mYHTc4JPsDNqZ/Noi6edEbbpfwPQxcTm59v4/tree/main)
![jest](https://img.shields.io/badge/tested%20with-jest-99424f?style=for-the-badge&logo=jest)
![Supertest](https://img.shields.io/badge/tested%20with-supertest-blue?style=for-the-badge)
![Nightwatch](https://img.shields.io/badge/tested%20with-nightwatch-yellow?style=for-the-badge&logo=chrome)

This project contains a full stack **automated testing framework** using:

- ✅ **Jest + Supertest** for REST API testing for mock user auth using data-driven 
- ✅ **Nightwatch.js** End-to-End UI testing for a commercial website (Contact and Search pages) using a data-driven automated testing suite and the Page Object Model for robust, maintainable validation.

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
│   ├── MockBugReport.docx       #bug tickets for the founded bugs
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
│   └── UIBugReport.docx          #bug tickets for the founded bugs
│   └── UItestcases.xlsx          # document for the testcases 
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

