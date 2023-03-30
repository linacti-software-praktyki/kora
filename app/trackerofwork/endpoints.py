from typing import Any, List

from fastapi import APIRouter

from app.blog.api import project
from app.blog.schemas import (AllProjectList, CreateProject, SingleProject, UpdateProject)

router = APIRouter()


@router.post("/worktracker/", status_code=201, response_model=SingleProject)
def create_post(request: CreateProject) -> Any:
    return project.create(obj_in=request)


@router.get("/worktracker/{slug}/", response_model=SingleProject)
def get_project(slug: str) -> Any:
    return project.get(slug=slug)


@router.put("/worktracker/{slug}/", response_model=SingleProject)
def update_project(slug: str, request: UpdateProject) -> Any:
    return project.update(slug=slug, obj_in=request)


@router.delete("/worktracker/{slug}/")
def delete_project(slug: str) -> Any:
    return project.delete(slug=slug)