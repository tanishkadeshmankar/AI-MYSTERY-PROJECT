# AI MYSTERY ROOM
## Software Requirements & Product Specification Document

**Document Version:** 1.0  
**Project Type:** AI-Powered Interactive Mystery Solving Website  
**Development Approach:** Specification-Driven Development (SDD)  
**Primary Audience:** OpenAI Codex  
**Technology Stack:** MERN Stack + Google Gemini AI

---

# 1. PROJECT OVERVIEW

## 1.1 Project Description

AI MYSTERY ROOM is an AI-powered interactive mystery-solving platform where users become detectives and solve fictional mystery cases generated using Artificial Intelligence.

The user provides a short scenario, story, or situation. Based on this input, the AI generates a fictional mystery challenge containing:

- A mystery background and incident.
- Multiple fictional suspects.
- One actual culprit.
- Supporting evidence and clues.
- Misleading evidence and red herrings.
- A logical timeline of events.
- A final solution with an explanation.

The user investigates the case by examining evidence such as fictional WhatsApp conversations, photographs, timestamps, CCTV descriptions or recordings, witness statements, and other digital clues.

After investigating, the user submits their guess about the culprit.

The platform then reveals the actual culprit and explains how the evidence leads to the correct conclusion.

## 1.2 Core Concept

**User Story → AI Mystery Generation → Evidence Investigation → Culprit Guess → AI Mystery Reveal**

The main objective is to create an immersive detective experience where users use observation, reasoning, deduction, and logical thinking to solve mysteries.

## 1.3 Project Goals

1. Generate unique fictional mystery cases using Gemini AI.
2. Convert simple user scenarios into complete detective challenges.
3. Generate realistic-looking fictional evidence.
4. Provide an interactive investigation experience.
5. Allow users to identify the culprit.
6. Reveal the correct answer with logical explanations.
7. Create an engaging, visually appealing mystery-solving interface.

---

# 2. TARGET USERS

- Mystery and detective story enthusiasts.
- Students interested in logical reasoning.
- Casual users looking for interactive entertainment.
- Users interested in AI-generated storytelling.
- Groups of friends who want to solve mysteries together (future enhancement).

---

# 3. TECHNOLOGY STACK

## 3.1 Frontend

- React.js
- Vite
- JavaScript
- Tailwind CSS
- React Router
- Axios
- Lucide React Icons

## 3.2 Backend

- Node.js
- Express.js
- REST APIs
- Gemini API integration

## 3.3 Database

- MongoDB
- Mongoose ODM

## 3.4 Artificial Intelligence

- Google Gemini API
- Structured JSON generation
- AI-generated fictional scenarios
- AI-generated evidence and clues
- AI-generated solution explanations

## 3.5 Other Technologies

- JWT authentication (if authentication is implemented)
- bcrypt for password hashing
- Multer only if user uploads are supported
- Environment variables for API keys and secrets

**Important:** Gemini API calls must happen only on the backend. Never expose the Gemini API key in frontend code.

---

# 4. FUNCTIONAL REQUIREMENTS

## FR-01: Landing Page

The website must have an attractive landing page introducing AI MYSTERY ROOM.

Required elements:

- Website logo/name.
- Hero section.
- Tagline: "Every Clue Tells a Story. Every Story Hides a Secret."
- Short project description.
- Start Investigating button.
- How It Works section.
- Featured mystery examples.
- Footer with basic information.

Primary CTA: START YOUR INVESTIGATION.

## FR-02: Create Mystery Scenario

The user must be able to enter a short fictional scenario.

Input fields:

- Mystery title (optional).
- Scenario description (required).
- Mystery category.
- Difficulty level.
- Generate Mystery button.

Categories:
- Murder mystery (non-graphic).
- Theft.
- Missing object.
- Cybercrime.
- Suspicious incident.
- Corporate mystery.
- Custom mystery.

Difficulty:
- Easy
- Medium
- Hard

Validation:
- Scenario must not be empty.
- Set a reasonable input length limit.
- Reject inappropriate or unsafe scenarios.
- Display a loading screen while AI generates the mystery.

## FR-03: AI Mystery Generation

Gemini must convert the user-provided scenario into a structured mystery.

Every generated mystery must contain:

1. Mystery ID.
2. Title.
3. Background story.
4. Incident description.
5. Location.
6. Date and time.
7. List of suspects.
8. Suspect profiles.
9. Motives.
10. Evidence.
11. Investigation timeline.
12. Red herrings.
13. Correct culprit.
14. Explanation of the solution.

The AI must ensure:

- Exactly one actual culprit.
- Evidence is logically consistent.
- Suspects have distinguishable characteristics.
- At least some evidence supports the correct culprit.
- Red herrings do not make the mystery impossible to solve.
- The final solution can be logically deduced from available clues.

The culprit and solution must remain hidden from the user until reveal.

## FR-04: Suspect Investigation

Display suspects as individual cards.

Each suspect card should include:

- Fictional photograph or avatar.
- Name.
- Age (optional).
- Occupation.
- Relationship to the incident.
- Short biography.
- Initial statement.

The user can click a suspect to view their detailed profile.

## FR-05: Evidence Room

The evidence room is the core feature of the website.

Evidence should be displayed in different formats.

### A. WhatsApp Messages

Display fictional chat conversations.

Include:
- Sender name.
- Recipient name.
- Message content.
- Date and timestamp.
- Message status where appropriate.

### B. Photographic Evidence

Display fictional photographs relevant to the case.

Examples:
- A room photograph.
- An object found at the scene.
- A suspicious item.
- A photograph containing a hidden clue.

### C. CCTV Evidence

Display fictional CCTV evidence.

Include:
- Camera location.
- Recording date.
- Recording timestamp.
- Description of the observed events.
- Important observations.

If actual video assets are unavailable, display a CCTV-style evidence card with a realistic textual transcript or generated image.

### D. Timeline Evidence

Display:
- Event description.
- Timestamp.
- Person involved.
- Location.

### E. Additional Evidence

Support:
- Witness statements.
- Email conversations.
- Call records.
- Documents.
- Digital footprints.

Every evidence item must have a unique ID and a reference to the mystery it belongs to.

## FR-06: Investigation Dashboard

Create a central investigation workspace.

It must contain:

- Mystery overview.
- Suspect list.
- Evidence collection.
- Investigation timeline.
- Investigation notes.
- Culprit selection section.
- Submit final accusation button.

The user should be able to navigate between evidence items without losing investigation progress.

## FR-07: Culprit Selection

After reviewing evidence, the user must be able to select one suspect as the culprit.

Requirements:

- Display all suspects.
- Allow only one selection.
- Require a selection before submission.
- Display a confirmation before final submission.
- Prevent multiple submissions for the same mystery.

## FR-08: Mystery Reveal

After submission, reveal:

- Actual culprit.
- Whether the user's guess was correct.
- Explanation of the crime.
- Evidence supporting the conclusion.
- Explanation of misleading clues.
- Final chronological reconstruction.

The reveal must use the original stored solution rather than independently generating a new culprit.

## FR-09: Mystery History

Store previously generated mysteries for users.

Display:
- Mystery title.
- Creation date.
- Difficulty.
- Investigation status.
- User's guess.
- Result.

This feature requires user authentication. For the MVP, anonymous session-based history can be used if authentication is deferred.

---

# 5. USER FLOW

The complete user journey:

1. User visits the landing page.
2. User clicks START INVESTIGATING.
3. User enters a short scenario.
4. User selects category and difficulty.
5. User clicks GENERATE MYSTERY.
6. Backend sends the request to Gemini.
7. Gemini generates a structured mystery.
8. Backend validates and stores the mystery.
9. User enters the investigation dashboard.
10. User reviews the suspects.
11. User examines the available evidence.
12. User develops a theory.
13. User selects the suspected culprit.
14. User submits the final accusation.
15. Website reveals the actual culprit.
16. User views the explanation and result.

---

# 6. AI INTEGRATION SPECIFICATION

## 6.1 Gemini Responsibilities

Gemini is responsible for:

- Understanding user scenarios.
- Creating fictional mystery stories.
- Creating fictional suspects.
- Generating clues and evidence.
- Maintaining consistency across all generated information.
- Creating logical timelines.
- Generating the final mystery explanation.

Gemini must NOT independently decide the culprit during the reveal stage.

The original generated solution must be stored securely and reused.

## 6.2 Mystery Generation Architecture

Input:

{
  "scenario": "A valuable painting disappeared from an art gallery.",
  "category": "Theft",
  "difficulty": "Medium"
}

Expected structured output:

{
  "title": "The Missing Masterpiece",
  "story": "A fictional gallery mystery...",
  "suspects": [],
  "evidence": [],
  "timeline": [],
  "solution": {
    "culpritId": "suspect_02",
    "motive": "Fictional motive",
    "explanation": "Logical explanation",
    "supportingEvidenceIds": []
  }
}

This is an illustrative schema, not literal output that should be accepted without validation.

## 6.3 AI Consistency Rules

- Every suspect must have a unique ID.
- Every evidence item must have a unique ID.
- Evidence references must point to existing suspects.
- Timestamps must follow a consistent timeline.
- There must be exactly one culprit.
- The culprit must belong to the suspect list.
- The solution must reference valid evidence IDs.
- The evidence must support the solution.
- The solution must remain hidden until the reveal endpoint is called.

## 6.4 AI Failure Handling

If Gemini returns:
- Invalid JSON: attempt a controlled repair or regeneration.
- Missing fields: reject and regenerate.
- Contradictory evidence: regenerate.
- Missing culprit: reject.
- API timeout: show a retry option.
- Rate limit: show an appropriate temporary error.

Never display an incomplete or unvalidated mystery.

---

# 7. DATABASE DESIGN

Use MongoDB with Mongoose.

## 7.1 Mystery Collection

Mystery:
- _id
- title
- originalScenario
- category
- difficulty
- story
- incident
- location
- incidentDate
- suspects[]
- evidence[]
- timeline[]
- solution (protected)
- status
- createdAt
- updatedAt

## 7.2 Suspect Object

- suspectId
- name
- age
- occupation
- biography
- motive
- statement
- imageUrl

## 7.3 Evidence Object

- evidenceId
- type
- title
- description
- content
- timestamp
- relatedSuspectIds[]
- assetUrl (optional)

## 7.4 Timeline Object

- eventId
- timestamp
- description
- location
- relatedSuspectIds[]

## 7.5 Solution Object

- culpritId
- motive
- explanation
- supportingEvidenceIds[]
- redHerringExplanation

**Security requirement:** Never return the solution object through ordinary mystery or investigation API responses.

## 7.6 User Collection (Future / Authentication)

- _id
- name
- email
- passwordHash
- createdAt

## 7.7 Investigation Collection

- _id
- mysteryId
- userId or sessionId
- selectedCulpritId
- isCorrect
- submittedAt
- status

---

# 8. API SPECIFICATION

Base URL:

/api/v1

## Mystery APIs

### POST /mysteries/generate

Purpose: Generate a new mystery using Gemini.

Request:
- scenario
- category
- difficulty

Response:
- mysteryId
- title
- story
- suspects
- evidence
- timeline

Do not return the solution.

### GET /mysteries/:id

Purpose: Retrieve the investigation data.

Response:
- Mystery overview.
- Suspects.
- Evidence.
- Timeline.

Do not return the solution.

### POST /mysteries/:id/submit-guess

Purpose: Submit the user's culprit selection.

Request:

{
  "suspectId": "suspect_02"
}

Response:
- isCorrect
- selectedSuspect
- actualCulprit
- explanation
- supportingEvidence

This endpoint performs the reveal only after a valid submission.

### GET /mysteries/:id/result

Purpose: Retrieve an already-unlocked result.

Must verify that the investigation has been submitted.

## Health API

GET /api/v1/health

Purpose: Check backend availability.

---

# 9. FRONTEND DESIGN SPECIFICATION

## 9.1 Overall Design Theme

Theme: Dark Detective / Cyber Investigation Room.

Visual inspiration:
- Detective investigation boards.
- Dark forensic laboratories.
- Digital evidence analysis interfaces.
- Mystery investigation dashboards.

Color palette:

- Background: #0B0F19
- Secondary Background: #151B2B
- Card Background: #1B2435
- Primary Accent: #D6A84F
- Secondary Accent: #4DA3FF
- Main Text: #F5F5F5
- Muted Text: #A0A8B8
- Danger Accent: #D9534F

Typography:
- Headings: Space Grotesk.
- Body: Inter.

## 9.2 Required Pages

### Page 1: Landing Page

Hero section with:
- AI MYSTERY ROOM branding.
- Catchy tagline.
- Animated detective-themed background.
- Start Investigation CTA.

### Page 2: Create Mystery

- Scenario text area.
- Category selector.
- Difficulty selector.
- Generate button.

### Page 3: Loading Screen

Display rotating messages:
- "Analyzing the incident..."
- "Identifying potential suspects..."
- "Generating digital evidence..."
- "Connecting the clues..."

### Page 4: Investigation Dashboard

Layout:
- Left sidebar: suspects.
- Main section: evidence viewer.
- Right sidebar: investigation notes and timeline.

Use responsive layouts on smaller screens.

### Page 5: Culprit Selection

Display suspects with selection controls.

Provide a final accusation button.

### Page 6: Reveal Page

Display:
- Culprit reveal animation.
- Correct/incorrect result.
- Mystery explanation.
- Evidence breakdown.
- Play Again button.

---

# 10. NON-FUNCTIONAL REQUIREMENTS

## Performance
- Fast page loading.
- Lazy-load evidence images.
- Use loading indicators for AI requests.
- Avoid unnecessary Gemini API calls.

## Security
- Store API keys in backend environment variables.
- Validate all user inputs.
- Sanitize user-generated text.
- Apply rate limiting to AI generation endpoints.
- Protect hidden solutions.
- Prevent users from changing investigation results through client-side manipulation.
- Never trust the selected culprit or correctness value submitted by the frontend.

## Reliability
- Handle Gemini API failures.
- Validate generated JSON.
- Store completed mysteries before exposing them to the frontend.
- Avoid duplicate submissions.

## Responsiveness
- Desktop-first investigation dashboard.
- Fully responsive tablet and mobile layouts.

## Privacy
- Do not collect unnecessary personal information.
- Do not use real people's private messages, images, or recordings as generated evidence.
- All AI-generated evidence must be clearly identified as fictional.

---

# 11. PROJECT FOLDER STRUCTURE

ai-mystery-room/

frontend/
- src/
  - components/
    - Navbar.jsx
    - SuspectCard.jsx
    - EvidenceCard.jsx
    - Timeline.jsx
    - LoadingScreen.jsx
    - MysteryReveal.jsx
  - pages/
    - Home.jsx
    - CreateMystery.jsx
    - Investigation.jsx
    - Reveal.jsx
  - services/
    - api.js
  - hooks/
  - context/
  - assets/
  - App.jsx
  - main.jsx
  - index.css

backend/
- config/
  - db.js
  - gemini.js
- controllers/
  - mysteryController.js
  - investigationController.js
- models/
  - Mystery.js
  - Investigation.js
  - User.js
- routes/
  - mysteryRoutes.js
  - investigationRoutes.js
- services/
  - geminiService.js
  - mysteryValidationService.js
- middleware/
  - errorMiddleware.js
  - rateLimiter.js
- utils/
- server.js

.env.example
.gitignore
README.md

---

# 12. MVP SCOPE

The first version must prioritize the core mystery-solving experience.

### Must Have

- Landing page.
- Scenario input.
- Category and difficulty selection.
- Gemini-based mystery generation.
- Suspect profiles.
- Multiple evidence formats.
- Investigation dashboard.
- Culprit selection.
- Mystery reveal.
- Secure solution handling.
- Basic error handling.

### Should Have

- Investigation notes.
- Mystery history.
- AI-generated fictional evidence images.
- Responsive mobile interface.
- Difficulty-based clue complexity.

### Future Enhancements

- User authentication.
- Multiplayer investigations.
- Leaderboards.
- Daily mystery challenges.
- Custom mystery sharing.
- AI-generated CCTV video.
- Voice-based interrogation.
- Detective scoring system.
- Mystery creation from uploaded documents (with appropriate privacy and safety controls).

---

# 13. DEVELOPMENT PHASES

## Phase 1: Project Setup
- Initialize React frontend.
- Initialize Express backend.
- Configure MongoDB.
- Configure Tailwind CSS.
- Set up environment variables.

## Phase 2: UI Development
- Build landing page.
- Build scenario form.
- Build loading screen.
- Build investigation dashboard.
- Build suspect and evidence cards.
- Build reveal page.

## Phase 3: Gemini Integration
- Configure Gemini SDK.
- Create mystery generation prompt.
- Implement structured JSON generation.
- Implement validation.
- Implement retry and error handling.

## Phase 4: Backend Integration
- Create MongoDB models.
- Implement REST APIs.
- Implement mystery storage.
- Implement secure culprit submission.
- Implement reveal logic.

## Phase 5: Testing
- Test mystery generation.
- Test different scenarios.
- Test all difficulty levels.
- Test invalid AI outputs.
- Test API security.
- Test solution leakage.
- Test mobile responsiveness.

## Phase 6: Finalization
- Fix bugs.
- Improve animations.
- Optimize performance.
- Write README.
- Prepare deployment configuration.

---

# 14. ACCEPTANCE CRITERIA

The MVP will be considered complete when:

1. A user can enter a custom scenario.
2. The backend successfully generates a mystery using Gemini.
3. Every mystery contains multiple suspects.
4. Every mystery has exactly one stored culprit.
5. The website displays multiple evidence items.
6. Evidence is logically connected to the mystery.
7. The user can investigate all available clues.
8. The user can select and submit one suspect.
9. The website reveals the correct culprit.
10. The solution explanation references actual evidence.
11. The solution is not exposed before submission.
12. Invalid AI responses are handled gracefully.
13. The website works on desktop and mobile.
14. All core flows work without manually editing the database.

---

# 15. CRITICAL DEVELOPMENT RULES FOR CODEX

These rules must be followed throughout development.

1. This document is the Single Source of Truth (SSOT) for the project.
2. Do not introduce additional technologies without a clear requirement.
3. Follow the specified MERN architecture.
4. Use Gemini exclusively for AI generation in the MVP.
5. Keep frontend, backend, and database responsibilities separate.
6. Never expose API keys or hidden solutions to the frontend.
7. Use reusable React components.
8. Use clean, modular, maintainable code.
9. Validate all AI-generated mystery data before database storage.
10. Ensure generated evidence and the final solution are logically consistent.
11. Never hardcode mystery answers into the frontend.
12. Do not use fake placeholder data in the final working application.
13. If an external AI-generated image or video service is unavailable, provide a clearly labelled fallback rather than pretending an asset exists.
14. Follow the acceptance criteria before declaring a feature complete.
15. Update README and environment examples whenever configuration changes.
16. Do not silently change the project scope or architecture.
17. Ask for clarification only when a genuinely important requirement is missing; otherwise use sensible defaults and document assumptions.

---

# 16. DEFINITION OF DONE

A feature is complete only when:

- Frontend implementation is complete.
- Backend implementation is complete where applicable.
- API integration works.
- Database integration works where applicable.
- Input validation is implemented.
- Error handling is implemented.
- Security requirements are satisfied.
- Relevant tests pass.
- The feature is usable through the actual website.

**FINAL PRODUCT VISION**

AI MYSTERY ROOM should feel like entering a real detective investigation environment.

The user should not simply read a story. They should actively investigate a fictional incident, inspect digital evidence, connect clues, challenge suspect statements, and ultimately identify the culprit.

**Core Product Philosophy:**

"Don't just read the mystery. Solve it."

---

END OF SPECIFICATION DOCUMENT