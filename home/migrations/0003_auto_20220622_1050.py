# Generated by Django 2.2.12 on 2022-06-22 10:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0002_auto_20220622_0713'),
    ]

    operations = [
        migrations.AddField(
            model_name='contact',
            name='email',
            field=models.CharField(default=None, max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='contact',
            name='message',
            field=models.CharField(default=None, max_length=500, null=True),
        ),
    ]