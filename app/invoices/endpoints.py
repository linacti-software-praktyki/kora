from fastapi import APIRouter

from .api import clients, invoices
from .schemas import (CreateClient, UpdateClient, ClientOut, ClientWithInvoicesOut, CreateInvoices, UpdateInvoices, InvoicesOut)

router = APIRouter()


# REPORTS

@router.get("/report/", response_model=list[ClientWithInvoicesOut])
def get_clients_with_invoices():
    """Endpoint to get report all clients with their invoices"""

    return clients.get_clients_with_invoices()


@router.get("/report/{slug}/", response_model=ClientWithInvoicesOut)
def get_client_with_invoices(slug: str):
    """Endpoint to get client with his invoices"""

    return clients.get_client_with_invoices(slug=slug)


@router.get("/report/{slug}/{id}/", response_model=InvoicesOut)
def get_operation_by_client(slug: str, id: int):
    """Endpoint to get single invoice belonging to particular client"""

    return invoices.get_operation_by_client(slug=slug, id=id)


# FINANCIAL OPERATIONS

@router.get("/operations", response_model=list[InvoicesOut])
def get_multiple_invoices(offset: int = 0, limit: int = 10):
    """Endpoint to get multiple invoices based on offset and limit values"""

    return invoices.get_multiple(offset=offset, limit=limit)


@router.post("/operations/{slug}/", response_model=CreateInvoices)
def create_invoice(slug: str, request: CreateInvoices):
    """Create a invoice"""

    return invoices.create(slug=slug, new_item=request)


@router.put("/operations/{slug}/{id}/", response_model=InvoicesOut)
def update_invoice(slug: str, id: int, request: UpdateInvoices):
    """Update the invoice"""

    return invoices.update(id=id, slug=slug, new_item=request)


@router.delete("/operations/{slug}/{id}/")
def delete_invoice(slug: str, id: int):
    """Delete the invoice"""

    return invoices.delete(id=id, slug=slug)


# clients

@router.get("/clients", response_model=list[InvoicesOut])
def get_multiple_clients(offset: int = 0, limit: int = 10):
    """Endpoint to get multiple clients based on offset and limit values"""

    return clients.get_multiple(offset=offset, limit=limit)


@router.get("/clients/{slug}/", response_model=ClientOut)
def get_client(slug: str):
    """Endpoint to get client"""

    return clients.get(slug=slug)


@router.post("/clients/", response_model=CreateClient)
def create_client(request: CreateClient):
    """Endpoint to create a client"""

    return clients.create(new_item=request)


@router.put("/clients/{slug}/", response_model=UpdateClient)
def update_client(slug: str, request: UpdateClient):
    """Endpoint to update a client"""

    return clients.update(new_item=request, slug=slug)


@router.delete("/clients/{slug}")
def delete_client(slug: str):
    """Endpoint to delete a client"""

    return clients.delete(slug=slug)