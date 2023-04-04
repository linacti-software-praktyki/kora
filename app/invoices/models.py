from django.db import models
from datetime import date
PAYMENT_CHOICES = [
    ("CASH", "Cash"),
    ("BANK TRANSFER", "Bank Transfer")
]




class Products(models.Model):
    name: str = models.CharField(max_length=200)
    slug: str = models.SlugField(unique=True, blank=True)
    price: float = models.DecimalField(default=0, max_digits=10, decimal_places=2)
    quantity: int = models.IntegerField(default=1)

    def __str__(self):
        return self.name,self.slug,self.price,self.quantity

class Clients(models.Model):
    name: str = models.CharField(max_length=80, unique=True)
    slug: str = models.SlugField(unique=True, blank=True)

    def __str__(self):
        return self.name


class Invoices(models.Model):
    payment: str = models.CharField(
        max_length=20,
        choices=PAYMENT_CHOICES,
        null=False,
        default="CASH"
    )
    number: int = models.IntegerField(unique=True,max_length=30)
    date: date = models.DateField(default="2000-01-01")    #dodac timezone.now()
    clients: any = models.ForeignKey(Clients, on_delete=models.CASCADE)
    products: any = models.ManyToManyField(Products)



    def __str__(self):
        return f"{self.payment} ({self.date}): {self.number} - {self.clients} - {self.products}"



