from django.db import models


class Project(models.Model):
    name = models.CharField(max_length=50)
    
    def __str__(self):
        return self.name


class Milestones(models.Model):
    description = models.CharField(max_length=200)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.description


class Tasks(models.Model):
    task = models.CharField(max_length=60)
    description = models.CharField(max_length=200)
    status = models.CharField(max_length=30)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)

    def __str__(self):
        return self.description


class Schedule(models.Model):
    start_date = models.DateField()
    end_date = models.DateField()
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.start_date