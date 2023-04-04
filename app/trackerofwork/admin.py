from django.contrib import admin

from app.trackerofwork.models import Project


class ProjectModelAdmin(admin.ModelAdmin):
    list_display: list = ['name']

# Register your models here.
