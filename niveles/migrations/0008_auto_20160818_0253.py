# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2016-08-18 02:53
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('niveles', '0007_intento_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='intento',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AddField(
            model_name='intento',
            name='updated_at',
            field=models.DateTimeField(auto_now=True, null=True),
        ),
    ]
