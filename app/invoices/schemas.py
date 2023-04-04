from pydantic import BaseModel
from datetime import date

class InvoicesBase(BaseModel):
    """Base fields for Invoices"""
    type: str
    description: str
    amount: float
    cashflow_date: date

    class Config:
        orm_mode: bool = True

class CreateInvoices(InvoicesBase):
    """Fields for creating Invoices"""
    ...

class UpdateInvoices(InvoicesBase):
    """Fields for updating Invoices"""
    ...

class InvoicesOut(InvoicesBase):
    """Response for Invoices"""

    id: int

#/////////////////////////////
class ClientsBase(BaseModel):
    """Base fields for Client"""

    name: str

    class Config:
        orm_mode: bool = True

class CreateClient(ClientsBase):
    """Fields for creating Client"""
    ...

class UpdateClient(ClientsBase):
    """Fields for updating Client"""
    ...

class ClientOut(ClientsBase):
    """Response for Client"""

    slug: str
    id: int

class ClientWithInvoicesOut(ClientsBase):
    """Response for a Client with his Invoices operation"""

    slug: str
    Invoices: list[InvoicesOut]
    summary: float
    prediction: str