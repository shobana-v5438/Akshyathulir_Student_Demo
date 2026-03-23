from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware

from router.competition_router import router as CompetitionRouter

from configration import (
    collection,
    hackathon_collection,
    hackathon_application_collection
)
from Database.schema import HackathonApply
from router.hackathon_router import router as HackathonRouter

import uvicorn

app = FastAPI(title="Student Registration API")

# -------------------- CORS Configuration --------------------
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------- Helper Function --------------------
def student_helper(student) -> dict:
    if not student:
        return None

    student["id"] = str(student.get("_id"))
    if "_id" in student:
        del student["_id"]

    return student

# -------------------- Student Profile APIs --------------------

@app.post("/submit")
async def save_or_update_student(student_data: dict = Body(...)):
    email = student_data.get("email")

    if not email:
        raise HTTPException(status_code=400, detail="Email is required for registration")

    data_to_save = {k: v for k, v in student_data.items() if k != "id"}

    collection.update_one(
        {"email": email},
        {"$set": data_to_save},
        upsert=True
    )

    return {
        "status": "success",
        "message": f"Record for {email} processed."
    }


@app.get("/user/{email}")
async def get_student(email: str):
    student = collection.find_one({
        "email": {"$regex": f"^{email}$", "$options": "i"}
    })

    if student:
        return student_helper(student)

    raise HTTPException(status_code=404, detail="Student not found")


@app.delete("/user/{email}")
async def delete_student(email: str):
    result = collection.delete_one({"email": email})

    if result.deleted_count > 0:
        return {
            "status": "success",
            "message": "Student record deleted successfully"
        }

    raise HTTPException(status_code=404, detail="Record not found")


# -------------------- Hackathon APIs --------------------
@app.get("/hackathons")
def get_hackathons():
    hackathons = list(hackathon_collection.find({}))  # REMOVE {"_id": 0}

    for hackathon in hackathons:
        hackathon["_id"] = str(hackathon["_id"])  # convert ObjectId

    return hackathons


# -------------------- Include Router --------------------
# This enables:
# POST http://127.0.0.1:8000/api/apply-hackathon

app.include_router(HackathonRouter, prefix="/api")



app.include_router(CompetitionRouter, prefix="/api")



# -------------------- Run Server --------------------
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)