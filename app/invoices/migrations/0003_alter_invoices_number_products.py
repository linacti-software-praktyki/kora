# Generated by Django 4.1.7 on 2023-04-03 15:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('invoices', '0002_clients_invoices_delete_item'),
    ]

    operations = [
        migrations.AlterField(
            model_name='invoices',
            name='number',
            field=models.IntegerField(max_length=30, unique=True),
        ),
        migrations.CreateModel(
            name='Products',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('slug', models.SlugField(blank=True, unique=True)),
                ('price', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('quantity', models.IntegerField(default=1)),
                ('invoice_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='invoices.invoices')),
            ],
        ),
    ]
