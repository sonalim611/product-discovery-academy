# Product Discovery Academy

An interactive Product Management learning platform designed to help aspiring and practicing Product Managers build practical product discovery skills.

The platform provides structured lessons, interactive exercises, quizzes, and progress tracking across three key areas of product discovery: Problem Discovery, Opportunity Sizing, and Solution Validation.

**Live Application:** https://product-discovery-academy.vercel.app/

**GitHub Repository:** https://github.com/sonalim611/product-discovery-academy

## Key Features

### 1. Structured Learning Modules

The platform includes three modules with nine lessons covering essential Product Management concepts.

| Module | Lessons |
|---|---|
| Problem Discovery | What is Problem Discovery?; Conducting User Interviews; Continuous Discovery Framework |
| Opportunity Sizing | Defining the Opportunity Space; Prioritization with RICE & ICE; Bottom-Up Market Sizing |
| Solution Validation | Risk & Assumptions Mapping; Rapid Prototyping & MVPs; Usability & A/B Testing |

### 2. Interactive RICE Calculator

A prioritization tool that helps learners evaluate and rank product ideas using:

- Reach
- Impact
- Confidence
- Effort

Users can add and edit feature ideas, calculate RICE scores, and sort ideas based on their prioritization scores.

### 3. Assumptions Mapping

An interactive assumptions mapping grid that helps learners organize and evaluate assumptions across four dimensions:

- Value
- Usability
- Feasibility
- Viability

Assumptions can be classified based on their importance and available evidence to help identify areas requiring further validation.

### 4. Knowledge Assessment

Each module includes an interactive quiz to reinforce learning.

- Multiple-choice questions.
- Immediate feedback.
- Explanations for answers.
- Quiz scoring.

### 5. Learning Progress Dashboard

A dashboard provides visibility into learning progress, including:

- Completed lessons.
- Quiz scores.
- Overall learning progress.

Progress is stored in browser localStorage, allowing learners to continue from where they left off on the same browser.

## Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | Next.js 16, React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Icons | Lucide React |
| Data Persistence | Browser localStorage |
| Deployment | Vercel |

## Application Structure

The learning experience follows a structured progression:

```text
Product Discovery Academy
          |
          v
    Learning Dashboard
          |
          v
    Select a Module
          |
          +-------------------+
          |                   |
          v                   v
    Study Lessons       Interactive Tools
          |                   |
          v                   |
    Module Quiz               |
          |                   |
          +---------+---------+
                    |
                    v
             Track Progress
```

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

Clone the repository:

```bash
git clone https://github.com/sonalim611/product-discovery-academy.git
```

Navigate to the project directory:

```bash
cd product-discovery-academy
```

Install dependencies:

```bash
npm install
```

### Run Locally

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

## Product Design Considerations

The platform is designed around a few learning principles:

- **Structured learning:** Organize product discovery concepts into progressive modules.
- **Learning by doing:** Reinforce theoretical concepts through interactive prioritization and assumption-mapping exercises.
- **Knowledge reinforcement:** Use quizzes and explanations to help learners assess their understanding.
- **Progress visibility:** Make learning progress visible through a dashboard.

## Current Scope and Limitations

- Lessons and quiz content are predefined.
- Learning progress is stored locally in the browser.
- No login or user-account system is currently implemented.
- Progress does not synchronize across devices or browsers.
- The platform focuses on foundational Product Management and discovery concepts.

## Future Enhancements

Potential areas for future development:

- Additional advanced Product Management modules.
- More practical product discovery case studies.
- Scenario-based exercises and assessments.
- Personalized learning recommendations.
- User accounts and cross-device progress synchronization.

## Repository

https://github.com/sonalim611/product-discovery-academy

