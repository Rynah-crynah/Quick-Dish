# Generated by Django 4.1.2 on 2022-10-27 10:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipes_api', '0002_user_password'),
    ]

    operations = [
        migrations.CreateModel(
            name='Favorite',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('identifier', models.IntegerField()),
                ('image', models.CharField(max_length=2048)),
                ('name', models.CharField(max_length=300)),
            ],
        ),
    ]
