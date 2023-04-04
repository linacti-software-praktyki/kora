from app.crud import SLUGTYPE, BaseCRUD
from app.utils import slugify

from django.core.exceptions import ObjectDoesNotExist
from fastapi import HTTPException
from fastapi.encoders import jsonable_encoder

from .models import Clients, Invoices, Products
from .schemas import CreateClient, UpdateClient, CreateInvoices, UpdateInvoices, CreateProduct, UpdateProduct


class InvoicesCRUD(BaseCRUD[Invoices, CreateInvoices, UpdateInvoices, SLUGTYPE]):
    """CRUD Operation for Invoices"""

    def get(self, id: int) -> Invoices | None:
        """Get a single invoice"""

        try:
            query = Invoices.objects.get(id=id)
            return query
        except ObjectDoesNotExist:
            raise HTTPException(status_code=404, detail="This invoice does not exists.")

    def get_multiple(self, limit: int = 100, offset: int = 0) -> list[Invoices]:
        """Get multiple invoices using a query limiting flag"""

        try:
            query = list(Invoices.objects.all())
            query = query[offset:min(len(query), offset + limit)]
            return query
        except ObjectDoesNotExist:
            raise HTTPException(status_code=404, detail="There are no invoices")
        except IndexError:
            raise HTTPException(status_code=404, detail="Not enough invoices")

    def get_operation_by_client(self, slug: SLUGTYPE, id: int) -> Invoices:
        try:
            client = Clients.objects.get(slug=slug)
            operation = client.Invoices_set.all().order_by("id")[id - 1]

            return operation
        except ObjectDoesNotExist:
            raise HTTPException(status_code=404, detail="This invoice does not exists")

    def create(self, slug: SLUGTYPE, new_item: CreateInvoices) -> Invoices:
        """Create a invoice"""

        new_item = jsonable_encoder(new_item)
        client = Clients.objects.get(slug=slug)
        query = client.invoices_set.create(**new_item)

        return query

    def update(self, id: int, slug: str, new_item: UpdateInvoices) -> Invoices:
        """Update a invoice"""

        new_item = jsonable_encoder(new_item)
        query = Invoices.objects.filter(Clients__slug=slug).order_by("id")[id - 1]

        if not query:
            raise HTTPException(status_code=404, detail="This invoice does not exists.")

        return Invoices.objects.filter(id=query.id).update(**new_item)

    def delete(self, id: int, slug: SLUGTYPE):
        """Delete a invoice"""

        operation_id = Invoices.objects.filter(Clients__slug=slug).order_by("id")[id - 1].id
        Invoices.objects.filter(id=operation_id).delete()

        return {"message": "Deleted successfully!"}


class ClientsCRUD(BaseCRUD[Clients, CreateClient, UpdateClient, SLUGTYPE]):
    """CRUD Operation for Clients"""

    def get(self, slug: SLUGTYPE) -> Clients | None:
        """Get single client"""

        try:
            query = Clients.objects.get(slug=slug)
            return jsonable_encoder(query)
        except ObjectDoesNotExist:
            raise HTTPException(status_code=404, detail="This client does not exists.")

    def get_multiple(self, limit: int = 100, offset: int = 0) -> list[Clients]:
        """Get multiple Clients using a query limit and offset flag"""

        try:
            query = list(Clients.objects.all())
            query = query[offset:min(len(query), offset + limit)]
            return query
        except ObjectDoesNotExist:
            raise HTTPException(status_code=404, detail="There are no invoices")
        except IndexError:
            raise HTTPException(status_code=404, detail="Not enough invoices")

    def get_client_with_Invoices(self, slug: SLUGTYPE) -> Clients:
        """Get all invoices belonging to a particular client"""

        client = Clients.objects.get(slug=slug)

        if not client:
            raise HTTPException(status_code=404, detail="This client does not exist")

        summary = 0
        Invoices = []

        for operation in client.Invoices_set.all().order_by("id"):
            Invoices.append(jsonable_encoder(operation))
            summary += Invoices[-1]["amount"] if Invoices[-1]["type"] == "INCOME" else -Invoices[-1]["amount"]

        json = jsonable_encoder(client)
        json["Invoices"] = Invoices

        return json

    def get_Clients_with_Invoices(self) -> list[dict[Clients]]:
        """Get all Clients with his Invoices"""

        everything: list[dict[Clients]] = []

        for client in Clients.objects.all():
            summary = 0
            Invoices = []

            for operation in client.Invoices_set.all().order_by("id"):
                Invoices.append(jsonable_encoder(operation))
                summary += Invoices[-1]["amount"] if Invoices[-1]["type"] == "INCOME" else -Invoices[-1]["amount"]

            json = jsonable_encoder(client)
            json["Invoices"] = Invoices

            everything.append(json)

        return everything

    def create(self, new_item: CreateClient) -> Clients:
        """Create a client"""

        slug = slugify(new_item.name.replace("Ł", "L").replace("ł", "l"))
        client = Clients.objects.filter(slug=slug)

        if client:
            raise HTTPException(status_code=404, detail="client already exists")

        new_item = jsonable_encoder(new_item)
        new_item["slug"] = slug

        query = Clients.objects.create(**new_item)

        return query

    def update(self, new_item: UpdateClient, slug: SLUGTYPE) -> Clients:
        """Update a client"""

        query = Clients.objects.filter(slug=slug)

        if not query:
            raise HTTPException(status_code=404, detail="client does not exists")

        new_slug = slugify(new_item.name.replace("Ł", "L").replace("ł", "l"))
        query = Clients.objects.filter(slug=new_slug)

        if query:
            raise HTTPException(status_code=404, detail="client already exists")

        new_item = jsonable_encoder(new_item)
        new_item["slug"] = new_slug

        return Clients.objects.filter(slug=slug).update(**new_item)

    def delete(self, slug: SLUGTYPE):
        """Delete a client"""

        Clients.objects.filter(slug=slug).delete()
        return {"detail": "Successfully deleted!"}



class ProductsCRUD(BaseCRUD[Products, CreateProduct, UpdateProduct, SLUGTYPE]):
    """CRUD Operation for Products"""

    def get(self, slug: SLUGTYPE) -> Products | None:
        """Get single Product"""

        try:
            query = Products.objects.get(slug=slug)
            return jsonable_encoder(query)
        except ObjectDoesNotExist:
            raise HTTPException(status_code=404, detail="This Product does not exists.")

    def get_multiple(self, limit: int = 100, offset: int = 0) -> list[Products]:
        """Get multiple Products using a query limit and offset flag"""

        try:
            query = list(Products.objects.all())
            query = query[offset:min(len(query), offset + limit)]
            return query
        except ObjectDoesNotExist:
            raise HTTPException(status_code=404, detail="There are no invoices")
        except IndexError:
            raise HTTPException(status_code=404, detail="Not enough invoices")

    def get_Product_with_Invoices(self, slug: SLUGTYPE) -> Products:
        """Get all invoices belonging to a particular Product"""

        Product = Products.objects.get(slug=slug)

        if not Product:
            raise HTTPException(status_code=404, detail="This Product does not exist")

        summary = 0
        Invoices = []

        for operation in Product.Invoices_set.all().order_by("id"):
            Invoices.append(jsonable_encoder(operation))
            summary += Invoices[-1]["amount"] if Invoices[-1]["type"] == "INCOME" else -Invoices[-1]["amount"]

        json = jsonable_encoder(Product)
        json["Invoices"] = Invoices

        return json

    def get_Products_with_Invoices(self) -> list[dict[Products]]:
        """Get all Products with his Invoices"""

        everything: list[dict[Products]] = []

        for Product in Products.objects.all():
            summary = 0
            Invoices = []

            for operation in Product.Invoices_set.all().order_by("id"):
                Invoices.append(jsonable_encoder(operation))
                summary += Invoices[-1]["amount"] if Invoices[-1]["type"] == "INCOME" else -Invoices[-1]["amount"]

            json = jsonable_encoder(Product)
            json["Invoices"] = Invoices

            everything.append(json)

        return everything

    def create(self, new_item: CreateProduct) -> Products:
        """Create a Product"""

        slug = slugify(new_item.name.replace("Ł", "L").replace("ł", "l"))
        Product = Products.objects.filter(slug=slug)

        if Product:
            raise HTTPException(status_code=404, detail="Product already exists")

        new_item = jsonable_encoder(new_item)
        new_item["slug"] = slug

        query = Products.objects.create(**new_item)

        return query

    def update(self, new_item: UpdateProduct, slug: SLUGTYPE) -> Products:
        """Update a Product"""

        query = Products.objects.filter(slug=slug)

        if not query:
            raise HTTPException(status_code=404, detail="Product does not exists")

        new_slug = slugify(new_item.name.replace("Ł", "L").replace("ł", "l"))
        query = Products.objects.filter(slug=new_slug)

        if query:
            raise HTTPException(status_code=404, detail="Product already exists")

        new_item = jsonable_encoder(new_item)
        new_item["slug"] = new_slug

        return Products.objects.filter(slug=slug).update(**new_item)

    def delete(self, slug: SLUGTYPE):
        """Delete a Product"""

        Products.objects.filter(slug=slug).delete()
        return {"detail": "Successfully deleted!"}


clients = ClientsCRUD(Clients)
invoices = InvoicesCRUD(Invoices)
products = ProductsCRUD(Products)