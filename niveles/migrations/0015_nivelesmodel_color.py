# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2016-08-26 03:07
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('niveles', '0014_nivelesmodel_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='nivelesmodel',
            name='color',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]
