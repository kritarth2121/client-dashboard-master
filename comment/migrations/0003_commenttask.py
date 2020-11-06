# Generated by Django 2.2.6 on 2020-08-03 19:40

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('analytics', '0033_auto_20200803_1430'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('comment', '0002_auto_20200801_2105'),
    ]

    operations = [
        migrations.CreateModel(
            name='CommentTask',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comment', models.CharField(max_length=500)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('parent', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='replies', to='comment.CommentTask')),
                ('task', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='analytics.Work')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]