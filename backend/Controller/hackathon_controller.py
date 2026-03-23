from models.hackathon_model import fetch_all_hackathons, save_new_application

def get_hackathons_list():
    return fetch_all_hackathons()
def handle_apply_logic(data):
    application_data = data.dict()

    # 🔥 Auto-fetch student profile using email
    student = collection.find_one(
        {"email": application_data["email"]},
        {"_id": 0}
    )

    if not student:
        return {"error": "Student profile not found"}

    # ✅ Auto-fill from profile (do NOT trust frontend)
    application_data["name"] = student.get("firstName", "") + " " + student.get("lastName", "")
    application_data["phone"] = student.get("mobile", "")
    application_data["college_name"] = student.get("college", "")

    # 🚀 Store application
    return save_new_application(application_data)