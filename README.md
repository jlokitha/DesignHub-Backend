﻿<div style="display: flex; align-items: center; justify-content: center;">
  <img src="/public/code.svg" alt="DesignHub Logo" width="60" style="margin-right: 15px;" />
  <h1 style="margin: 0;">DesignHub Backend</h1>
</div>

DesignHub is a platform where users share and tweak React component code snippets—from buttons to modals—making UI design knowledge accessible to everyone. This repository contains the backend server powering DesignHub, built with Node.js, Express, and TypeScript, with Prisma managing a MySQL database.

---

<details>
  <summary>Table of Contents</summary>

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Environment Variables](#environment-variables)
- [Development](#development)
- [API Documentation](#api-documentation)
- [Frontend Repository](#frontend-repository)
- [License](#license)
</details>


---

## Overview

The DesignHub backend is responsible for handling all server-side operations, including:
- User management and authentication.
- CRUD operations for UI component snippets.
- Serving data via a RESTful API.

By leveraging Express and TypeScript, the backend provides a robust and type-safe environment, while Prisma simplifies database interactions with MySQL.

---

## Tech Stack

- **Node.js** – JavaScript runtime.
- **Express.js** – Web framework for building APIs.
- **TypeScript** – Superset of JavaScript for type safety.
- **Prisma** – ORM for MySQL database management.
- **MySQL** – Relational database.

---

## Getting Started

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/en/download)
- [MySQL](https://www.mysql.com/downloads/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/jlokitha/DesignHub-Backend.git
   cd DesignHub-Backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Generate Prisma Client:**

   ```bash
   npx prisma generate
   ```

---

### Environment Variables

Create a `.env` file in the project root and configure the following variables:

```env
# MySQL connection string
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE_NAME"
BASE_URL="http://localhost:3000"

# Secret keys
SECRET_KEY=[Secret key for JWT]
REFRESH_TOKEN=[Refresh token secret key]
```
---
## Development

To start the development server with live reload, run:
   ```bash
      npm start
   ```

---

## API Documentation

Detailed API endpoint documentation is available via our Postman collection.  
Access it [here](https://documenter.getpostman.com/view/35384124/2sAYdfqWRK).

---

## Frontend Repository

Access the frontend repository on GitHub [here](https://github.com/jlokitha/DesignHub-Frontend.git).

---

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

<div align="center">
  <a href="https://github.com/jlokitha" target="_blank">
    <img src="https://img.shields.io/badge/GitHub-000000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
  </a>
  <a href="https://nodejs.org/" target="_blank">
    <img src="https://img.shields.io/badge/Node.js-000000?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js">
  </a>
  <a href="https://expressjs.com/" target="_blank">
    <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js">
  </a>
  <a href="https://www.prisma.io/" target="_blank">
    <img src="https://img.shields.io/badge/Prisma-000000?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma">
  </a>
  <a href="https://www.mysql.com/" target="_blank">
    <img src="https://img.shields.io/badge/MySQL-000000?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL">
  </a>
  <a href="https://www.typescriptlang.org/" target="_blank">
    <img src="https://img.shields.io/badge/TypeScript-000000?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  </a>
</div>

<p align="center">
  &copy; 2025 Janindu Lokitha
</p>
