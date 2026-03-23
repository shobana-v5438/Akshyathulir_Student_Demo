# from fastapi import APIRouter, HTTPException
# from configration import db, collection, competition_collection
# from datetime import datetime

# router = APIRouter()


# # ---------------- GET ALL COMPETITIONS ----------------
# @router.get("/competitions")
# def get_competitions():
#     competitions = list(competition_collection.find({}))

#     for comp in competitions:
#         comp["_id"] = str(comp["_id"])

#     return competitions


# # ---------------- APPLY COMPETITION ----------------
# @router.post("/apply-competition")
# def apply_competition(data: dict):

#     email = data.get("email")
#     competition_name = data.get("competition_name")

#     if not email or not competition_name:
#         raise HTTPException(status_code=400, detail="Missing data")

#     # ✅ 1. Get student profile
#     student = collection.find_one({"email": email})
#     if not student:
#         raise HTTPException(status_code=404, detail="Student not found")

#     # ✅ 2. Get competition details
#     competition = competition_collection.find_one({"name": competition_name})
#     if not competition:
#         raise HTTPException(status_code=404, detail="Competition not found")

#     card_college = competition.get("College_Name", "")

#     # ✅ 3. Create dynamic collection name
#     clean_college = "_".join(card_college.strip().split())
#     clean_comp = "_".join(competition_name.strip().split())
#     collection_name = f"{clean_college}_{clean_comp}"

#     # ✅ 4. GET COLLECTION
#     comp_collection = db[collection_name]

#     # ✅ 5. CHECK DUPLICATE (IMPORTANT)
#     existing = comp_collection.find_one({
#         "email": email,
#         "competition_name": competition_name
#     })

#     if existing:
#         return {"message": "Already applied"}

#     # ✅ 6. INSERT DATA
#     comp_collection.insert_one({
#         "firstName": student.get("firstName", ""),
#         "lastName": student.get("lastName", ""),
#         "email": email,
#         "phone": student.get("mobile", ""),

#         "college": student.get("collegeName", ""),
#         "competition_name": competition_name,

#         "participantType": data.get("participantType"),
#         "skillCategory": data.get("skillCategory"),
#         "experienceLevel": data.get("experienceLevel"),
#         "portfolio": data.get("portfolio"),
#         "tools": data.get("tools"),
#         "strategy": data.get("strategy"),

#         # ✅ DATE
#         "applied_at": datetime.now().strftime("%d %b %Y, %I:%M %p")
#     })

#     return {"message": "Application submitted successfully"}


# # ---------------- GET MY APPLICATIONS ----------------
# @router.get("/my-competition-applications/{email}")
# def get_my_applications(email: str):
#     results = []

#     try:
#         # ✅ 1. Get all collections
#         all_collections = db.list_collection_names()

#         # ✅ 2. Loop collections
#         for col_name in all_collections:

#             # Only your dynamic collections
#             if "_" in col_name:

#                 records = list(
#                     db[col_name].find({"email": email}, {"_id": 0})
#                 )

#                 for rec in records:
#                     rec["source_collection"] = col_name
#                     results.append(rec)

#         return results

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))


from fastapi import APIRouter, HTTPException
from configration import db, collection, competition_collection
from datetime import datetime

router = APIRouter()


# ---------------- GET ALL COMPETITIONS ----------------
@router.get("/competitions")
def get_competitions():
    competitions = list(competition_collection.find({}))
    for comp in competitions:
        comp["_id"] = str(comp["_id"])
    return competitions


# ---------------- APPLY COMPETITION ----------------
@router.post("/apply-competition")
def apply_competition(data: dict):

    email = data.get("email")
    competition_name = data.get("competition_name")

    if not email or not competition_name:
        raise HTTPException(status_code=400, detail="Missing data")

    # 1. Get student profile
    student = collection.find_one({"email": email})
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    # 2. Get competition details
    competition = competition_collection.find_one({"name": competition_name})
    if not competition:
        raise HTTPException(status_code=404, detail="Competition not found")

    card_college = competition.get("College_Name", "")

    # 3. Create dynamic collection name
    clean_college = "_".join(card_college.strip().split())
    clean_comp = "_".join(competition_name.strip().split())
    collection_name = f"{clean_college}_{clean_comp}"

    # 4. GET COLLECTION
    comp_collection = db[collection_name]

    # 5. CHECK DUPLICATE (IMPORTANT)
    existing = comp_collection.find_one({
        "email": email,
        "competition_name": competition_name
    })

    if existing:
        return {"message": "Already applied"}

    # Build application data
    app_data = {
        "firstName": student.get("firstName", ""),
        "lastName": student.get("lastName", ""),
        "email": email,
        "phone": student.get("mobile", ""),
        "college": student.get("collegeName", ""),
        "competition_name": competition_name,
        "participantType": data.get("participantType"),
        "skillCategory": data.get("skillCategory"),
        "experienceLevel": data.get("experienceLevel"),
        "portfolio": data.get("portfolio"),
        "tools": data.get("tools"),
        "strategy": data.get("strategy"),
        "applied_at": datetime.now().strftime("%d %b %Y, %I:%M %p")
    }

    # 6. INSERT DATA INTO MAIN COMPETITION COLLECTION
    comp_collection.insert_one(app_data)

    # ---------------- DUPLICATE DATA INTO PER-USER COLLECTION ----------------
    # Use email as-is in the collection name
    user_collection_name = f"{email}_competitions"
    user_collection = db[user_collection_name]

    # Check duplicate in user collection
    existing_user = user_collection.find_one({
        "competition_name": competition_name,
        "college": card_college
    })

    if not existing_user:
        user_collection.insert_one(app_data)

    return {"message": "Application submitted successfully"}


# ---------------- GET MY APPLICATIONS ----------------
@router.get("/my-competition-applications/{email}")
def get_my_applications(email: str):
    user_collection_name = f"{email}_competitions"

    if user_collection_name not in db.list_collection_names():
        return []

    records = list(db[user_collection_name].find({}, {"_id": 0}))
    return records