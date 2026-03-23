
def solo(user) -> dict:

    if not user:
        return {}
        
    return {
        "id": str(user["_id"]),
        "firstName": user.get("firstName"),
        "lastName": user.get("lastName"),
        "email": user.get("email"),
        "mobile": user.get("mobile"),
        "mobileCountryCode": user.get("mobileCountryCode"),
        "dob": user.get("dob"),
        "gender": user.get("gender"),
        "community": user.get("community"),
        
        "academics": user.get("academics", {}),
        "family": user.get("family", {}),
        "address": user.get("address", {}),
        "languages": user.get("languages", {}),
        
        "declaration": user.get("declaration"),
        "created_at": user.get("created_at"),
        "is_logined": user.get("is_logined", False)
    }

def squad(users) -> list:
   
    return [solo(user) for user in users]

def test_db():
    try:
        client.admin.command('ping')
        print("Model: Connection to Arch Linux MongoDB successful.")
    except Exception as e:
        print(f"Model: Connection failed: {e}")

if __name__ == "__main__":
    test_db()