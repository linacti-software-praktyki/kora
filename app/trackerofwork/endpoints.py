from typing import Any, List

from fastapi import APIRouter

from app.trackerofwork.api import Project, Milestones, Tasks, Schedule
from app.trackerofwork.schemas import (CreateProject, SingleProject, UpdateProject)
from app.trackerofwork.schemas import (CreateMilestones, SingleMilestones, UpdateMilestones)
from app.trackerofwork.schemas import (CreateTasks, SingleTasks, UpdateTasks)
from app.trackerofwork.schemas import (CreateSchedule, SingleSchedule, UpdateSchedule)

router = APIRouter()


@router.post("/project/", status_code=201, response_model=SingleProject)
def create_post(request: CreateProject) -> Any:
    return project.create(obj_in=request)


@router.get("/project/{slug}/", response_model=SingleProject)
def get_project(slug: str) -> Any:
    return project.get(slug=slug)


@router.put("/project/{slug}/", response_model=SingleProject)
def update_project(slug: str, request: UpdateProject) -> Any:
    return project.update(slug=slug, obj_in=request)


@router.delete("/project/{slug}/")
def delete_project(slug: str) -> Any:
    return project.delete(slug=slug)




@router.post("/milestones/", status_code=201, response_model=SingleMilestones)
def create_milestones(request: CreateMilestones) -> Any:
    return milestones.create(obj_in=request)


@router.get("/milestones/{slug}/", response_model=SingleMilestones)
def get_milestones(slug: str) -> Any:
    return milestones.get(slug=slug)


@router.put("/milestones/{slug}/", response_model=SingleMilestones)
def update_milestones(slug: str, request: UpdateMilestones) -> Any:
    return milestones.update(slug=slug, obj_in=request)


@router.delete("/milestones/{slug}/")
def delete_milestones(slug: str) -> Any:
    return milestones.delete(slug=slug)




@router.post("/tasks/", status_code=201, response_model=SingleTasks)
def create_tasks(request: CreateTasks) -> Any:
    return tasks.create(obj_in=request)


@router.get("/tasks/{slug}/", response_model=SingleTasks)
def get_tasks(slug: str) -> Any:
    return tasks.get(slug=slug)


@router.put("/tasks/{slug}/", response_model=SingleTasks)
def update_tasks(slug: str, request: UpdateMilestones) -> Any:
    return tasks.update(slug=slug, obj_in=request)


@router.delete("/tasks/{slug}/")
def delete_tasks(slug: str) -> Any:
    return tasks.delete(slug=slug)




@router.post("/schedule/", status_code=201, response_model=SingleSchedule)
def create_schedule(request: CreateSchedule) -> Any:
    return schedule.create(obj_in=request)


@router.get("/schedule/{slug}/", response_model=SingleSchedule)
def get_schedule(slug: str) -> Any:
    return schedule.get(slug=slug)


@router.put("/schedule/{slug}/", response_model=SingleSchedule)
def update_schedule(slug: str, request: UpdateMilestones) -> Any:
    return schedule.update(slug=slug, obj_in=request)


@router.delete("/schedule/{slug}/")
def delete_schedule(slug: str) -> Any:
    return schedule.delete(slug=slug)