from configration import (
    hackathon_collection,
    hackathon_application_collection,
    db
)

def fetch_all_hackathons():
    return list(hackathon_collection.find({}, {"_id": 0}))



def save_new_application(application_data):
    try:
        # Create the ID as you defined
        college_clean = application_data["college_name"].replace(" ", "")
        hackathon_clean = application_data["hackathon_title"].replace(" ", "")
        application_id = f"{college_clean}_{hackathon_clean}"

        # Insert into MongoDB
        hackathon_application_collection.insert_one({
            **application_data,
            "application_id": application_id
        })
        
        return {"status": "success", "message": "Application submitted"}
        
    except DuplicateKeyError:
        return {"status": "error", "message": "You have already applied to this hackathon."}
    except Exception as e:
        return {"status": "error", "message": str(e)}