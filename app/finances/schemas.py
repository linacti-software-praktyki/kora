from pydantic import BaseModel
from datetime import date

class FinancesBase(BaseModel):
    """Base fields for finances"""
    type: str
    description: str
    amount: float
    cashflow_date: date

    class Config:
        orm_mode: bool = True

class CreateFinances(FinancesBase):
    """Fields for creating finances"""
    ...

class UpdateFinances(FinancesBase):
    """Fields for updating finances"""
    
    people: int

class FinancesOut(FinancesBase):
    """Response for finances"""

    id: int

#/////////////////////////////
class PeopleBase(BaseModel):
    """Base fields for person"""

    name: str

    class Config:
        orm_mode: bool = True

class CreatePerson(PeopleBase):
    """Fields for creating person"""
    ...

class UpdatePerson(PeopleBase):
    """Fields for updating person"""
    ...

class PersonOut(PeopleBase):
    """Response for person"""

    slug: str
    id: int

class PersonWithFinancesOut(PeopleBase):
    """Response for a person with his finances operation"""

    slug: str
    finances: list[FinancesOut]
    summary: float
    prediction: str
