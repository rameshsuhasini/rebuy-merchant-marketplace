# RebuyMerchantMarketplace

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.3.
A small end-to-end demo application that showcases a Rebuy-style electronics offers platform.
Users can:
- Visitors can see a list of all offers ordered by votes
- Visitors can see details of a specific offer
- a user can up/down vote themoffers
- a user can purchase an offer using our existing platform

The app is built as a **layered system** with a frontend, API layer, and a backend service that currently uses a **mock data store**, which can later be replaced by a real database.

## Tech Stack

### Frontend
- Angular
- TypeScript
- Angular Material
- RxJS (BehaviorSubject-based store)
- Cypress (for end-to-end tests)
- Jasmine/Karma (for unit tests)

### Backend
- Node.js mock API (e.g. Express or json-server)
- In-memory / JSON file data store for `Offer` entities

## High-Level End-to-End Flow
User (Browser)
   │
   ▼
Angular Frontend (SPA)
   │  (HTTP, JSON)
   ▼
Backend API (Node.js + Express)
   │
   ▼
Service Layer (Offer Service: business rules, mapping)
   │
   ▼
Data Layer (Mock JSON / in-memory store → future DB)

## Architecture Overview

┌───────────────────────────────────────────┐
│                 Frontend                  │
│  - Angular components                     │
│    - Offers List                          │
│    - Offer Details                        │
│  - Routing (/offers, /offers/:id)         │
│  - Angular Material UI                    │
└──────────────▲────────────────────────────┘
               │
               │ uses
               │
┌──────────────┴────────────────────────────┐
│        Frontend Application Layer         │
│  - OffersStoreService (RxJS BehaviorSubject)
│  - OffersApiService (HTTP client)         │
│    - GET /offers                          │
│    - GET /offers/:id                      │
│    - POST/PATCH /offers/:id/vote          │
└──────────────▲────────────────────────────┘
               │
               │ HTTP (REST)
               │
┌──────────────┴────────────────────────────┐
│               Backend API                 │
│  - Express controllers / routes           │
│    - GET /offers                          │
│    - GET /offers/:id                      │
│    - POST /offers/:id/vote                │
└──────────────▲────────────────────────────┘
               │
               │ delegates
               │
┌──────────────┴────────────────────────────┐
│              Service Layer                │
│  - OfferService                           │
│    - getAllOffers()                       │
│    - getOfferById(id)                     │
│    - upvoteOffer(id)                      │
│  - Contains business logic & validation   │
└──────────────▲────────────────────────────┘
               │
               │ reads/writes
               │
┌──────────────┴────────────────────────────┐
│                Data Layer                 │
│  - In-memory array or db.json file        │
│  - Responsible for persistence-like ops   │
│  - Can be replaced by:                    │
│    - PostgreSQL/MySQL (AWS RDS)           │
│    - DynamoDB                             │
└───────────────────────────────────────────┘

## Prerequisites

Node.js (LTS)
npm (or yarn)
Angular CLI (if running Angular commands manually)


npm install -g @angular/cli

## Installation

git clone [<your-repo-url>.git](https://github.com/rameshsuhasini/rebuy-merchant-marketplace.git)
cd rebuy-merchant-marketplace

Install both Frontend and Backend dependencies

## Running the Application

1. Start the backend

From the server folder:

cd ../rebuy-merchant-marketplace/server
npm run dev

Default backend URL:

http://localhost:3000

2. Start the frontend

From the frontend folder:

cd ../rebuy-merchant-marketplace
npm start
# or
ng serve

Angular dev server default:

http://localhost:4200

## Testing

The project includes:

Unit tests (Angular / Jasmine )
End-to-end tests with Cypress

1. Unit Tests (Frontend)

From the frontend folder:

cd ../rebuy-merchant-marketplace
npm run test
or
ng test
Opens a new window to run the test cases 

2. Cypress End-to-End Tests
Setup

From frontend (if not already installed):

cd ../rebuy-merchant-marketplace
npm install --save-dev cypress
npx cypress open

select the E2E testing in Cypress window , then Test in chrome and finally select the file offers.cy.ts and test starts to run.

## Deployment on AWS

The system is deployment ready and supports a scalable AWS architecture.

Proposed AWS deployment landscape
Angular Build → S3 → CloudFront CDN → Browser
                              │
                              ▼
                     API Gateway / Load Balancer
                              │
                              ▼
                    Node.js Backend (EC2 / Lambda)
                              │
                              ▼
                       AWS RDS / DynamoDB

## Backend API Base URL:
'http://rebuy-merchant-backend-env.eba-j9mdrzfg.eu-north-1.elasticbeanstalk.com/offers'

## Frontend URL:

'https://main.d1an6t2xjknipf.amplifyapp.com/offers'


## Notes for Reviewers

This project demonstrates:

A full end-to-end system:

Angular SPA frontend

Node.js backend with a service layer

Mock data layer designed to be swapped with a real database

Unit tests and Cypress E2E tests

Clear separation of concerns:

UI, application/store, API, service, and data layers

Cloud-readiness:

Architecture is hosted on AWS (S3 + CloudFront + API Gateway/EC2 + RDS/DynamoDB)

To run the full system locally:

cd server && npm start
cd frontend && npm start
(Optional) cd frontend && npm test
(Optional) cd frontend && npm run e2e


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
