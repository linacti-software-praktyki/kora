from django.contrib import admin
from .models import Invoices, Clients, Products



class ProductsAdmin(admin.ModelAdmin):
    list_display: list = ["name","slug","price","quantity"]
    search_fields: list = ["name"]
    list_per_page: list = 10
    ordering: tuple = ("-id",)

admin.site.register(Products, ProductsAdmin)


class InvoicesAdmin(admin.ModelAdmin):
    list_display: list = ["payment", "number", "date","clients","get_products"]
    list_display_links: list = ["number"]
    list_filter: list = ["payment", "number", "date"]
    search_fields: list = ["payment", "number"]
    list_per_page: int = 10
    ordering: tuple = ("-id", )

    def get_products(self, obj):
        return "\n".join([p.name for p in obj.products.all()])

admin.site.register(Invoices, InvoicesAdmin)

class ClientsAdmin(admin.ModelAdmin):
    list_display: list = ["name"]
    search_fields: list = ["name"]
    list_per_page: list = 10
    ordering: tuple = ("-id", )

admin.site.register(Clients, ClientsAdmin)