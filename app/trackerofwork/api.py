from typing import Generic, List, Optional, Type, TypeVar
from unicodedata import category

from app.crud import SLUGTYPE, BaseCRUD
from app.utils import unique_slug_generator
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Model, Prefetch, query
from fastapi import Depends, HTTPException
from fastapi.encoders import jsonable_encoder

from app.trackerofwork.models import Project, Milestones, Tasks, Schedule
from app.trackerofwork.schemas import CreateProject, UpdateProject, CreateMilestones, UpdateMilestones, CreateTasks, UpdateTasks, CreateSchedule, UpdateSchedule


class ProjectCRUD(BaseCRUD[Project, CreateProject, UpdateProject, SLUGTYPE]):
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


class MilestonesCRUD(BaseCRUD[Milestones, CreateMilestones, UpdateMilestones, SLUGTYPE]):
    """
    CRUD Operation for blog posts
    """
    
    def get(self, slug: SLUGTYPE) -> Optional[Milestones]:
        try:
            query = Milestones.objects.select_related("Project").get(slug=slug)
            return query
        except ObjectDoesNotExist:
            raise HTTPException(status_code=404, detail="This milestones does not exists.")
            
    
    def create(self, obj_in: CreateMilestones) -> Milestones:
        slug = unique_slug_generator(obj_in.title)
        milestones = Milestones.objects.filter(slug=slug)
        if not milestones:
            slug = unique_slug_generator(obj_in.title, new_slug=True)
        obj_in = jsonable_encoder(obj_in)
        query = Milestones.objects.create(**obj_in)
        return query
        

    def update(self, obj_in: UpdateMilestones, slug: SLUGTYPE) -> Milestones:
        """
        Update an item.
        """
        self.get(slug=slug)
        if not isinstance(obj_in, list):
            obj_in = jsonable_encoder(obj_in)
        return Milestones.objects.filter(slug=slug).update(**obj_in)
    

    def delete(self, slug: SLUGTYPE) -> Milestones:
        """Delete an item."""
        self.model.objects.filter(slug=slug).delete()
        return {"detail": "Successfully deleted!"}

    

class TasksCRUD(BaseCRUD[Tasks, CreateTasks, UpdateTasks, SLUGTYPE]):
    """
    CRUD Operation for blog posts
    """
    
    def get(self, slug: SLUGTYPE) -> Optional[Tasks]:
        try:
            query = Tasks.objects.select_related("Project").get(slug=slug)
            return query
        except ObjectDoesNotExist:
            raise HTTPException(status_code=404, detail="This tasks does not exists.")
            
    
    def create(self, obj_in: CreateTasks) -> Tasks:
        slug = unique_slug_generator(obj_in.title)
        tasks = Tasks.objects.filter(slug=slug)
        if not tasks:
            slug = unique_slug_generator(obj_in.title, new_slug=True)
        obj_in = jsonable_encoder(obj_in)
        query = Tasks.objects.create(**obj_in)
        return query
        

    def update(self, obj_in: UpdateTasks, slug: SLUGTYPE) -> Tasks:
        """
        Update an item.
        """
        self.get(slug=slug)
        if not isinstance(obj_in, list):
            obj_in = jsonable_encoder(obj_in)
        return Tasks.objects.filter(slug=slug).update(**obj_in)
    

    def delete(self, slug: SLUGTYPE) -> Tasks:
        """Delete an item."""
        self.model.objects.filter(slug=slug).delete()
        return {"detail": "Successfully deleted!"}



class ScheduleCRUD(BaseCRUD[Schedule, CreateSchedule, UpdateSchedule, SLUGTYPE]):
    """
    CRUD Operation for blog posts
    """
    
    def get(self, slug: SLUGTYPE) -> Optional[Schedule]:
        try:
            query = Schedule.objects.select_related("Tasks").get(slug=slug)
            return query
        except ObjectDoesNotExist:
            raise HTTPException(status_code=404, detail="This schedule does not exists.")
            
    
    def create(self, obj_in: CreateSchedule) -> Schedule:
        slug = unique_slug_generator(obj_in.title)
        schedule = Schedule.objects.filter(slug=slug)
        if not schedule:
            slug = unique_slug_generator(obj_in.title, new_slug=True)
        obj_in = jsonable_encoder(obj_in)
        query = Schedule.objects.create(**obj_in)
        return query
        

    def update(self, obj_in: UpdateSchedule, slug: SLUGTYPE) -> Schedule:
        """
        Update an item.
        """
        self.get(slug=slug)
        if not isinstance(obj_in, list):
            obj_in = jsonable_encoder(obj_in)
        return Schedule.objects.filter(slug=slug).update(**obj_in)
    

    def delete(self, slug: SLUGTYPE) -> Schedule:
        """Delete an item."""
        self.model.objects.filter(slug=slug).delete()
        return {"detail": "Successfully deleted!"}