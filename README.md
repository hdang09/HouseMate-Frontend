# HouseMate - Student House Membership Cart

<div align="center">
    <img src="./public/assets/favicon/android-chrome-512x512.png" alt="HouseMate" width="100" height="100" />
    <p><a href="https://housemate.site">HouseMate</a> is a web application that provides service for student apartments.</p>
</div>

## 0. Introduction

The software system provides service packages for student apartments. Each apartment will purchase pre-designed service packages. Each service may include: hourly service, return service, delivery service, ... Each service package has constraints on usage time, repetition period, number of services per cycle... When used up Services in the package can still be ordered, the price of the additional service depends on the type of service package purchased.

-   Admin can manage individual services, service packages (including individual services)...
-   Staff performs work and updates results of services
-   Customer orders and tracks used services

## 1. Techstacks

<img src="./.github/readme/tech-stacks.png" />

## 2. Installation

Clone the repository:

```bash
git clone https://github.com/hdang09/HouseMate-Frontend
```

Change direction to the folder:

```bash
cd HouseMate-Frontend
```

Install the dependencies:

```bash
yarn
```

Set the environment variables:

```bash
cp .env .env.development

# open .env.development and modify the environment variables
```

## 3. Environment Variables

```bash
VITE_API_URL=https://api-gateway.housemate.site
```

## 4. Team members

-   [Tran Hai Dang](https://github.com/hdang09): Project Leader, Front-end Leader, Back-end Developer
-   [Tran Tan Thanh](https://github.com/ttthanhf): Back-end Leader
-   [Lam Thi Ngoc Han](https://github.com/LamHana): Front-end Developer, UI/UX Designer
-   [Duong Hoang Nam](https://github.com/namdh03): Front-end Developer
-   [Nguyen Hoang Anh](https://github.com/HanhNg23): Back-end Developer

## 5. Testing Accounts

### Admin

```bash
Email: admin@gmail.com
Password: Password123
```

### Staff

```bash
Email: staff@gmail.com
Password: Password123
```

### Customer

```bash
Email: customer@gmail.com
Password: Password123
```

## 6. Use case diagram

<img src="./.github/readme/use-case-diagram.png" />

## 7. Database Design

<img src="./.github/readme/database.png" />
