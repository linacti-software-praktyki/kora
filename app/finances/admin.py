from django.contrib import admin
from .models import Finances, People

class FinancesAdmin(admin.ModelAdmin):
    list_display: list = ["type", "description", "amount", "date"]
    list_display_links: list = ["description"]
    list_filter: list = ["type", "description", "amount", "date"]
    search_fields: list = ["type", "description"]
    list_per_page: int = 10
    ordering: tuple = ("-id", )

admin.site.register(Finances, FinancesAdmin)

class PeopleAdmin(admin.ModelAdmin):
    list_display: list = ["name"]
    search_fields: list = ["name"]
    list_per_page: list = 10
    ordering: tuple = ("-id", )

admin.site.register(People, PeopleAdmin)