# Generated by Django 4.1.7 on 2023-04-03 15:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('invoices', '0003_alter_invoices_number_products'),
    ]

    operations = [
        migrations.AlterField(
            model_name='invoices',
            name='number',
            field=models.IntegerField(unique=True),
        ),
    ]
