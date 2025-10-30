# Recipe Finder: Project Description

## 1. Project Title
**Recipe Finder**

---

## 2. Objective
The primary focus of this project is to build a fast, intuitive, mobile-first web application that lets users search and discover recipes using the **Spoonacular API**.  
Our team will keep API keys secure behind a **Python backend**.

---

## 3. Requirements

### 3.1 Functional Requirements
- **API Integration (Spoonacular):**
  - Search recipes by ingredients  
  - View recipe details (ingredients, title)
- **Search and Filter:**  
  - Ingredient input separated by commas  
  - Updates results with filter options
- **Recipe Details View:**  
  - Full detail page including ingredients and steps
- **Saved/Favorited Recipes:**  
  - The application lets users save recipes locally (if possible)

### 3.2 Non-Functional Requirements
- **Performance:** Initial page loads within 3–5 seconds  
- **Responsiveness:** Usable and attractive on phone, tablet, and desktop  
- **Security:** API key stored on server; never exposed on client side  
- **Usability:** Clear forms, obvious filters, and accessible controls  

---

## 4. User Stories
- As a **busy student**, I want to enter a few ingredients on hand so I can quickly find meals I can cook tonight.  
- As a **health-conscious user**, I want diet/intolerance filters so I can avoid recipes that won’t work for me.  
- As a **culinary student**, I want a detailed page that provides full ingredients and steps so I can follow along easily.  
- As a **satisfied returning user**, I want to save my favorite meals so I can come back to them later.  

---

## 5. Implementation Details

### 5.1 Technical Stack

| **Component**  | **Technology** | **Rationale**  |
|----------------|----------------|----------------|
| Frontend | React | Component model, fast dev, strong ecosystem |
| Styling | CSS Modules | Rapid, responsive UI |
| Backend | Python (FastAPI or Flask) | Simple, performant API layer; easy to host |
| Data Fetching | Axios / Fetch | Standard HTTP client |
| State | React Hooks + optional Context | Lightweight global state (filters, saved items) |
| Env/Secrets | `.env` + server config | Keeping API keys off client side |
| Deployment | Web hosting service | — |

### 5.2 Architecture Overview
The **React frontend** contacts the **Python API**, which in turn communicates with the **Spoonacular API**.  
API keys are secured on the server side.  
The Python API acts as a **proxy** and forwards requests/responses between the frontend and Spoonacular.

---

## 6. Deliverables
1. Deployed Web Application (frontend + backend)  
2. Source Code (clean, commented, with README)  
3. API Documentation  
4. UX Artifacts (wireframes and style notes)  
5. Brief Demonstration (live or recorded video)  
