from typing import Generic, List, Optional, Type, TypeVar
from unicodedata import category

from app.crud import SLUGTYPE, BaseCRUD
from app.utils import unique_slug_generator
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Model, Prefetch, query
from fastapi import Depends, HTTPException
from fastapi.encoders import jsonable_encoder

from app.trackerofwork.models import Project
from app.trackerofwork.schemas import CreateCategory, CreatePost, UpdateCategory, UpdatePost


class TrackerCRUD(BaseCRUD[Poject, ProjectPost, ProjectPost, SLUGTYPE]):
    """
    CRUD Operation for blog posts
    """
    
    def get(self, slug: SLUGTYPE) -> Optional[Project]:
        try:
            query = Project.objects.select_related("Milestones", "Tasks", "Schedule").get(slug=slug)
            return query
        except ObjectDoesNotExist:
            raise HTTPException(status_code=404, detail="This project does not exists.")
            
    
    def create(self, obj_in: CreateProject) -> Project:
        slug = unique_slug_generator(obj_in.title)
        project = Project.objects.filter(slug=slug)
        if not project:
            slug = unique_slug_generator(obj_in.title, new_slug=True)
        obj_in = jsonable_encoder(obj_in)
        query = Project.objects.create(**obj_in)
        return query
        

    def update(self, obj_in: UpdateProject, slug: SLUGTYPE) -> Project:
        """
        Update an item.
        """
        self.get(slug=slug)
        if not isinstance(obj_in, list):
            obj_in = jsonable_encoder(obj_in)
        return Project.objects.filter(slug=slug).update(**obj_in)
    

    def delete(self, slug: SLUGTYPE) -> Project:
        """Delete an item."""
        self.model.objects.filter(slug=slug).delete()
        return {"detail": "Successfully deleted!"}

