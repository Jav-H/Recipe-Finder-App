
from pathlib import Path
from dotenv import load_dotenv
load_dotenv(dotenv_path=Path(__file__).with_name(".env"))
# Loading environment variables from the environment file...
from fastapi import FastAPI, HTTPException, Query, Path as FPath
from fastapi.middleware.cors import CORSMiddleware
import os, requests

SPOONACULAR_API_KEY = os.getenv("SPOONACULAR_API_KEY", "")
FRONTEND_ORIGIN     = os.getenv("FRONTEND_ORIGIN", "http://127.0.0.1:5500")

if not SPOONACULAR_API_KEY:
    raise RuntimeError("Missing API Key")

app = FastAPI(title="Recipe Finder API", version="1.0")

# Configure CORS middleware to allow requests from the frontend origin.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_ORIGIN, "http://localhost:5500"],
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_URL = "https://api.spoonacular.com"

def spoonacular_get(path: str, **params):
   
    try:
        r = requests.get(
            f"{BASE_URL}{path}",
            params={**params, "apiKey": SPOONACULAR_API_KEY},
            timeout=8,
        )
    except requests.RequestException as e:
        raise HTTPException(status_code=502, detail=f"Upstream error: {e}")

    if r.status_code >= 400:
        # If there is an error, extract from JSON...
        try:
            detail = r.json()
        except ValueError:
            detail = r.text
        raise HTTPException(status_code=r.status_code, detail=detail)

    return r.json()
# Route to check API health.
@app.get("/api/health")
def health():
    return {"status": "ok"}
# Debug route to check if the API key is loaded.
@app.get("/api/_debug/env")
def debug_env():
    return {"hasKey": bool(SPOONACULAR_API_KEY), "len": len(SPOONACULAR_API_KEY)}
# Search recipes by query.
@app.get("/api/search")
def search(query: str = Query(..., min_length=1), number: int = 10):
    number = max(1, min(number, 20))
    data = spoonacular_get("/recipes/complexSearch", query=query, number=number)
    return data.get("results", [])
# Search recipes by ingredients.
@app.get("/api/recipes")
def recipes_by_ingredients(ingredients: str = Query(..., min_length=1), number: int = 10):
    number = max(1, min(number, 20))
    return spoonacular_get("/recipes/findByIngredients", ingredients=ingredients, number=number)
# Get detailed recipe information by ID.
@app.get("/api/recipes/{recipe_id}")
def recipe_detail(recipe_id: int = FPath(..., gt=0)):
    return spoonacular_get(f"/recipes/{recipe_id}/information")
