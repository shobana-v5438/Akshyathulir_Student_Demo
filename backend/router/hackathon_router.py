from fastapi import APIRouter, HTTPException, Body
from datetime import datetime
from configration import collection, db  # 'collection' is your student profile collection

router = APIRouter()

@router.post("/apply-hackathon")
def apply_hackathon(data: dict = Body(...)):
    email = data.get("email")
    hackathon_title = data.get("hackathon_title")
    organizing_college = data.get("organizing_college") or "UnknownHost"

    # 1️⃣ Basic Validation
    if not email or not hackathon_title:
        raise HTTPException(status_code=400, detail="Email and Hackathon Title are required")

    # 2️⃣ Check for Duplicate Application
    # We check the user's specific collection to see if this title already exists
    user_history_collection = f"{email}_hackathons"
    existing_application = db[user_history_collection].find_one({"hackathon_title": hackathon_title})

    if existing_application:
        raise HTTPException(
            status_code=400, 
            detail=f"You have already applied for the {hackathon_title}!"
        )

    # 3️⃣ Fetch student profile for details
    student = collection.find_one({"email": email})
    if not student:
        raise HTTPException(status_code=404, detail="Student profile not found")

    # 4️⃣ Format Collection Names
    clean_org = organizing_college.replace(" ", "")
    clean_title = hackathon_title.replace(" ", "")
    event_collection = f"{clean_org}_{clean_title}"

    application_data = {
        "name": f"{student.get('firstName', '')} {student.get('lastName', '')}".strip(),
        "email": email,
        "phone": student.get("mobile", "N/A"),
        "host_college": organizing_college,
        "student_college": student.get("collegeName"),
        "hackathon_title": hackathon_title,"reason": data.get("reason"),
        "teamSize": data.get("teamSize"),
        "memberDetails": data.get("memberDetails"),
        "applied_at": datetime.utcnow().isoformat()
    }

    # 6️⃣ Insert into both collections
    db[event_collection].insert_one(application_data.copy())
    
    if "_id" in application_data: del application_data["_id"] # Clear ID for second insert
    db[user_history_collection].insert_one(application_data)

    return {
        "status": "success",
        "message": "Application submitted successfully!"
    }

@router.get("/my-applications/{email}")
def get_my_applications(email: str):
  
    user_col_name = f"{email}_hackathons"
    
  
    applications = list(db[user_col_name].find({}, {"_id": 0}))

    return applications



   
