from datetime import date, datetime
from typing import Any, Generic, List, Optional, Type, Union

from app.user.schemas import UserOut
from pydantic import BaseModel, validator

from app.trackerofwork.models import Project, Milestones, Tasks, Schedule


class ProjectBase(BaseModel):
    pass


class CreateProject(ProjectBase):
    pass
    

class UpdateProject(ProjectBase):
    pass


class SingleProject(ProjectBase):
    pass



class MilestonesBase(BaseModel):
    pass


class CreateMilestones(MilestonesBase):
    pass
    

class UpdateMilestones(MilestonesBase):
    pass


class SingleMilestones(MilestonesBase):
    pass



class TasksBase(BaseModel):
    pass


class CreateTasks(TasksBase):
    pass
    

class UpdateTasks(TasksBase):
    pass


class SingleTasks(MilestonesBase):
    pass



class ScheduleBase(BaseModel):
    pass


class CreateSchedule(ScheduleBase):
    pass
    

class UpdateSchedule(ScheduleBase):
    pass


class SingleSchedule(MilestonesBase):
    pass