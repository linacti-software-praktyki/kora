from fastapi import APIRouter

from .api import people, finances
from .schemas import (CreatePerson, UpdatePerson, PersonOut, PersonWithFinancesOut, CreateFinances, UpdateFinances, FinancesOut)

router = APIRouter()


# REPORTS

@router.get("/report/", response_model=list[PersonWithFinancesOut])
def get_people_with_finances():
    """Endpoint to get report all people with their financial operations"""

    return people.get_people_with_finances()


@router.get("/report/{slug}/", response_model=PersonWithFinancesOut)
def get_person_with_finances(slug: str):
    """Endpoint to get person with his financial operations"""

    return people.get_person_with_finances(slug=slug)


@router.get("/report/{slug}/{id}/", response_model=FinancesOut)
def get_operation_by_person(slug: str, id: int):
    """Endpoint to get single financial operation belonging to particular person"""

    return finances.get_operation_by_person(slug=slug, id=id)


# FINANCIAL OPERATIONS

@router.get("/operations", response_model=list[FinancesOut])
def get_multiple_finances(offset: int = 0, limit: int = 10):
    """Endpoint to get multiple financial operation based on offset and limit values"""

    return finances.get_multiple(offset=offset, limit=limit)


@router.post("/operations/{slug}/", response_model=CreateFinances)
def create_finance(slug: str, request: CreateFinances):
    """Create a financial operation"""

    return finances.create(slug=slug, new_item=request)


@router.put("/operations/{slug}/{id}/", response_model=FinancesOut)
def update_finance(slug: str, id: int, request: UpdateFinances):
    """Update the financial operation"""

    return finances.update(id=id, slug=slug, new_item=request)


@router.delete("/operations/{slug}/{id}/")
def delete_finance(slug: str, id: int):
    """Delete the financial operation"""

    return finances.delete(id=id, slug=slug)


# PEOPLE

@router.get("/people", response_model=list[PersonOut])
def get_multiple_people(offset: int = 0, limit: int = 10):
    """Endpoint to get multiple people based on offset and limit values"""

    return people.get_multiple(offset=offset, limit=limit)


@router.get("/people/{slug}/", response_model=PersonOut)
def get_person(slug: str):
    """Endpoint to get person"""

    return people.get(slug=slug)


@router.post("/people/", response_model=CreatePerson)
def create_person(request: CreatePerson):
    """Endpoint to create a person"""

    return people.create(new_item=request)


@router.put("/people/{slug}/", response_model=UpdatePerson)
def update_person(slug: str, request: UpdatePerson):
    """Endpoint to update a person"""

    return people.update(new_item=request, slug=slug)


@router.delete("/people/{slug}")
def delete_person(slug: str):
    """Endpoint to delete a person"""

    return people.delete(slug=slug)