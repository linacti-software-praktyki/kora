from django.db import models

PROJECT_TYPES = (
    (0, 'github'),
    (1, 'gitlab'),
    (2, 'bitbucket')
)

# Create your models here.
class Project(models.Model):
    name = models.CharField(unique=True, max_length=300)
    description = models.TextField()
    status = models.CharField(max_length=100)
    type = models.IntegerField(choices=PROJECT_TYPES)
    url = models.URLField()
    credentials = models.CharField(max_length=200)
    created = models.DateTimeField(auto_now=True)
    last_update = models.DateTimeField(auto_now=True)
    #TODO: create a relation to users.
    #TODO: change credentials to an array
