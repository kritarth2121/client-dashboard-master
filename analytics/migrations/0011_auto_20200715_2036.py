# Generated by Django 2.2.2 on 2020-07-15 15:06

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('analytics', '0010_project_deadline'),
    ]

    operations = [
        migrations.AlterField(
            model_name='work',
            name='deadline',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
