from django.db import models
from datetime import date

TYPE_CHOICES = [
    ("INCOME", "Income"),
    ("EXPENSE", "Expense")
]

class People(models.Model):
    name: str = models.CharField(max_length=80, unique=True)
    slug: str = models.SlugField(unique=True, blank=True)
    
    def __str__(self):
        return self.name

class Finances(models.Model):
    type: str = models.CharField(
        max_length=7,
        choices=TYPE_CHOICES,
        null=False,
        default="INCOME"
    )
    description: str = models.CharField(max_length=200)
    amount: float = models.DecimalField(default=0, max_digits=10, decimal_places=2)
    cashflow_date: date = models.DateField(default="2000-01-01")

    people: any = models.ForeignKey(People, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.type} ({self.cashflow_date}): {self.description} - {self.amount}"