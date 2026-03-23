
from configuration import collection, competition_collection  # Import both
from models.competition_model import save_competition_application

def handle_competition_apply(data):
    # Find student in the students collection, not competitions collection
    student = collection.find_one(  # Changed from competition_collection to collection
        {"email": data["email"]},
        {"_id": 0}
    )

    if not student:
        return {"error": "Student profile not found"}

    application_data = {}
    application_data["competition_name"] = data["competition_name"]
    application_data["name"] = student.get("firstName","") + " " + student.get("lastName","")
    application_data["email"] = student.get("email","")
    application_data["phone"] = student.get("mobile","")
    application_data["college_name"] = student.get("college","")

    # This probably saves to competition_applications collection
    return save_competition_application(application_data)


