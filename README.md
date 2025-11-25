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

## Architeture
┌───────────────────────────────────────────┐
│                 Frontend                  │
│  Angular Components (List, Details)       │
│  - offers-list component                  │
│  - offer-details component                │
└──────────────▲────────────────────────────┘
               │
               │ uses
               │
┌──────────────┴────────────────────────────┐
│        Frontend Application Layer         │
│  - OffersService (BehaviorSubject)   │
│  - OffersApiService (HTTP client)         │
└──────────────▲────────────────────────────┘
               │
               │ HTTP (REST)
               │
┌──────────────┴────────────────────────────┐
│               Backend API                 │
│  - GET  /offers                           │
│  - GET  /offers/:id                       │
│  - PATCH/POST /offers/:id/vote            │
└──────────────▲────────────────────────────┘
               │
               │ reads/writes
               │
┌──────────────┴────────────────────────────┐
│                Data Layer                 │
│  - In-memory array or db.json file        │
│  - Can be swapped out with real DB        │
└───────────────────────────────────────────┘

## Prerequisites

Node.js (LTS)
npm (or yarn)
Angular CLI (if running Angular commands manually)


npm install -g @angular/cli

## Installation

git clone <your-repo-url>.git
cd <your-repo-folder>

Install both Frontend and Backend dependencies

## Running the Application

1. Start the backend

From the server folder:

cd server
npm run dev

Default backend URL:

http://localhost:3000

2. Start the frontend

From the frontend folder:

cd ../frontend
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

cd frontend
npm run test
# or
ng test

2. Cypress End-to-End Tests
Setup

From frontend (if not already installed):

cd frontend
npm install --save-dev cypress
npx cypress open

select the E2E testing in Cypress window , then Test in chrome and finally select the file offers.cy.ts and test starts to run.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
