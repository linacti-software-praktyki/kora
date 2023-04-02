from app.crud import SLUGTYPE, BaseCRUD
from app.utils import slugify, make_predictions

from django.core.exceptions import ObjectDoesNotExist
from fastapi import HTTPException
from fastapi.encoders import jsonable_encoder

from .models import People, Finances
from .schemas import CreatePerson, UpdatePerson, CreateFinances, UpdateFinances


class FinancesCRUD(BaseCRUD[Finances, CreateFinances, UpdateFinances, SLUGTYPE]):
    """CRUD Operation for finances"""
    
    def get(self, id: int) -> Finances|None:
        """Get a single financial operation"""

        try:
            query = Finances.objects.get(id=id)
            return query
        except ObjectDoesNotExist:
            raise HTTPException(status_code=404, detail="This financial operation does not exists.")
        

    def get_multiple(self, limit:int = 100, offset: int = 0) -> list[Finances]:
        """Get multiple financial operation using a query limiting flag"""

        try:
            query = list(Finances.objects.all())
            query = query[offset:min(len(query), offset + limit)]
            return query
        except ObjectDoesNotExist:
            raise HTTPException(status_code=404, detail="There are no financial operations")
        except IndexError:
            raise HTTPException(status_code=404, detail="Not enough financial operations")
        

    def get_operation_by_person(self, slug: SLUGTYPE, id: int) -> Finances:
        try:
            person = People.objects.get(slug=slug)
            operation = person.finances_set.all().order_by("id")[id - 1]

            return operation
        except ObjectDoesNotExist:
            raise HTTPException(status_code=404, detail="This financial operation does not exists")


    def create(self, slug: SLUGTYPE, new_item: CreateFinances) -> Finances:
        """Create a financial operation"""
        
        new_item = jsonable_encoder(new_item)
        person = People.objects.get(slug=slug)
        query = person.finances_set.create(**new_item)

        return query
        

    def update(self, id: int, slug: str, new_item: UpdateFinances) -> Finances:
        """Update a financial operation"""

        new_item = jsonable_encoder(new_item)
        query = Finances.objects.filter(people__slug=slug).order_by("id")[id - 1]

        if not query:
            raise HTTPException(status_code=404, detail="This financial operation does not exists.")

        return Finances.objects.filter(id=query.id).update(**new_item)
    

    def delete(self, id: int, slug: SLUGTYPE):
        """Delete a financial operation"""

        operation_id = Finances.objects.filter(people__slug=slug).order_by("id")[id - 1].id
        Finances.objects.filter(id=operation_id).delete()
        
        return {"message": "Deleted successfully!"}


class PeopleCRUD(BaseCRUD[People, CreatePerson, UpdatePerson, SLUGTYPE]):
    """CRUD Operation for people"""
    
    def get(self, slug: SLUGTYPE) -> People|None:
        """Get single person"""

        try:
            query = People.objects.get(slug=slug)
            return jsonable_encoder(query)
        except ObjectDoesNotExist:
            raise HTTPException(status_code=404, detail="This person does not exists.")
        

    def get_multiple(self, limit:int = 100, offset: int = 0) -> list[People]:
        """Get multiple people using a query limit and offset flag"""

        try:
            query = list(People.objects.all())
            query = query[offset:min(len(query), offset + limit)]
            return query
        except ObjectDoesNotExist:
            raise HTTPException(status_code=404, detail="There are no financial operations")
        except IndexError:
            raise HTTPException(status_code=404, detail="Not enough financial operations")


    def get_person_with_finances(self, slug: SLUGTYPE) -> People:
        """Get all financial operations belonging to a particular person"""

        person = People.objects.get(slug=slug)

        if not person:
            raise HTTPException(status_code=404, detail="This person does not exist")
        
        summary = 0
        finances = []

        for operation in person.finances_set.all().order_by("id"):
            finances.append(jsonable_encoder(operation))
            summary += finances[-1]["amount"] if finances[-1]["type"] == "INCOME" else -finances[-1]["amount"]

        json = jsonable_encoder(person)
        json["finances"] = finances
        json["summary"] = summary
        json["prediction"] = make_predictions(finances, summary)

        return json
    
    def get_people_with_finances(self) -> list[dict[People]]:
        """Get all people with his finances"""

        everything: list[dict[People]] = []

        for person in People.objects.all():
            summary = 0
            finances = []

            for operation in person.finances_set.all().order_by("id"):
                finances.append(jsonable_encoder(operation))
                summary += finances[-1]["amount"] if finances[-1]["type"] == "INCOME" else -finances[-1]["amount"]

            json = jsonable_encoder(person)
            json["finances"] = finances
            json["summary"] = summary
            json["prediction"] = make_predictions(finances, summary)

            everything.append(json)

        return everything
    
    
    def create(self, new_item: CreatePerson) -> People:
        """Create a person"""

        slug = slugify(new_item.name.replace("Ł", "L").replace("ł", "l"))
        person = People.objects.filter(slug=slug)

        if person:
            raise HTTPException(status_code=404, detail="Person already exists")
        
        new_item = jsonable_encoder(new_item)
        new_item["slug"] = slug

        query = People.objects.create(**new_item)

        return query
    
        
    def update(self, new_item: UpdatePerson, slug: SLUGTYPE) -> People:
        """Update a person"""

        query = People.objects.filter(slug=slug)

        if not query:
            raise HTTPException(status_code=404, detail="Person does not exists")
        
        new_slug = slugify(new_item.name.replace("Ł", "L").replace("ł", "l"))
        query = People.objects.filter(slug=new_slug)

        if query:
            raise HTTPException(status_code=404, detail="Person already exists")
        
        new_item = jsonable_encoder(new_item)
        new_item["slug"] = new_slug

        return People.objects.filter(slug=slug).update(**new_item)
    
    
    def delete(self, slug: SLUGTYPE):
        """Delete a person"""

        People.objects.filter(slug=slug).delete()
        return {"detail": "Successfully deleted!"}


people = PeopleCRUD(People)
finances = FinancesCRUD(Finances)
