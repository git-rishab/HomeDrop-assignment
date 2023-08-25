# Backend Application for Dynamic PDF Generation and Sending

This repository contains the backend application that allows users to authenticate and send dynamic PDF files to specified phone numbers or email addresses.

## Table of Contents

- [Introduction](#introduction)
- [Deployed](#deployed)
- [Video Walkthrough](#video-walkthrough)
- [Getting Started](#getting-started)
- [Schema Design](#schema-design)
- [Tech Stack](#tech-stack)

## Introduction

This backend application provides APIs for user authentication, dynamic PDF generation, and sending PDF reports to specified phone numbers or email addresses. Users are authenticated using JWT tokens and can utilize various APIs to manage PDF reports and history.

## Deployed

The application is deployed at the following endpoint: [Deployment Link](https://qxyryoebc7.execute-api.us-east-1.amazonaws.com/dev)

## Video Walkthrough

A video walkthrough of the application's features and functionality can be found [here](https://www.youtube.com/watch?v=OOxP8z4eVHc)

## Getting Started

To set up and run the backend application locally, follow these steps:

1. Clone the repository: `git clone https://github.com/git-rishab/HomeDrop-assignment.git`
2. Navigate to the project directory: `cd HomeDrop-assignment`
3. Install dependencies: `npm install`
4. Run the application: `npm run server`

Make sure to configure your environment variables for database connections, AWS services, and other necessary settings.

## Schema Design

- The schema design for this application involves generating dynamic PDF reports with the current date and user identity. The PDF content is designed as specified in the task.
---
![schema-design](https://github.com/git-rishab/HomeDrop-assignment/assets/114337213/8a0d9bf7-0633-4721-a4a4-1ec97af36147)

## Tech Stack

The application is built using the following technologies:

- API: AWS API Gateway
- Computation: AWS Lambda with Node.js Runtime
- Database: MongoDB
- Email: SendGrid
- PDF Generation: PDFKit

## API Endpoints

### /auth

- **URL:** /auth
- **Method:** POST
- **Body:**
  ```json
  {
    "email": "rishab@gmail.com"
  }
- **Response:**
  ```json
  {
    "email": "rishab@gmail.com",
    "token": "JWT_TOKEN"
  }
### /send-report
- **URL:** /send-report
- **Method:** POST
- **Headers:**
  ```json
  {
    "Authorization": "JWT_TOKEN"
  }
- **Body:**
  ```json
  {
    "email": "rkc0660@gmail.com"
  }
- **Response:**
  ```json
  {
    "success": true
  }

### /get-history
- **URL:** /get-history
- **Method:** GET
- **Headers:**
  ```json
  {
    "Authorization": "JWT_TOKEN"
  }
- **Body:**
  ```json
  [
    {
      "date_created": 1692866222681,
      "sent_to": "PHONE or EMAIL"
    }

For any further details or issues, please contact [rishabkumarchaurasiya@gmail.com](mailto:rishabkumarchaurasiya@gmail.com)
