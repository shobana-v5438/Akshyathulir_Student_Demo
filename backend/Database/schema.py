from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional

class SiblingSchema(BaseModel):
    id: int
    name: str
    age: str
    gender: str

class AcademicSchema(BaseModel):
    institutionType: str
    schoolName: Optional[str] = ""
    classGrade: Optional[str] = ""
    medium: Optional[str] = ""
    board: Optional[str] = ""
    collegeName: Optional[str] = ""
    degree: Optional[str] = ""
    department: Optional[str] = ""
    startYear: Optional[int] = None
    endYear: Optional[int] = None
    stayType: str
    transportMode: Optional[str] = ""
    # Added for your specific Akshaya college logic
    isAkshayaStudent: Optional[str] = ""
    akshayaCollegeType: Optional[str] = ""
    currentSemester: Optional[int] = None

class FamilySchema(BaseModel):
    familyType: str
    fatherName: Optional[str] = ""
    fatherOccupation: Optional[str] = ""
    fatherIncome: Optional[str] = ""
    motherName: Optional[str] = ""
    motherOccupation: Optional[str] = ""
    motherIncome: Optional[str] = ""
    guardianName: Optional[str] = ""
    guardianOccupation: Optional[str] = ""
    guardianIncome: Optional[str] = ""
    headOfFamily: Optional[str] = ""
    siblings: List[SiblingSchema] = []

class AddressSchema(BaseModel):
    pincode: str
    country: str
    state: str
    district: str
    taluk: str
    address: str

class LanguageDetail(BaseModel):
    read: bool = False
    write: bool = False
    speak: bool = False

class LanguageSchema(BaseModel):
    English: LanguageDetail
    Tamil: LanguageDetail
    Other: LanguageDetail
    otherLangName: Optional[str] = ""

class FullStudentSchema(BaseModel):
    firstName: str
    lastName: str
    email: EmailStr
    mobile: str
    mobileCountryCode: dict # To store the flag/label/code object
    dob: str
    gender: str
    community: str
    academics: AcademicSchema
    family: FamilySchema
    address: AddressSchema
    languages: LanguageSchema
    declaration: bool

class HackathonApply(BaseModel):
    email: str
    hackathon_title: str
    college_name: str
    reason: str
    teamSize: int
    memberDetails: str



