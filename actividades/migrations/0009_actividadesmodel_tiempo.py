# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2016-08-19 16:58
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('actividades', '0008_actividadesmodel_key_press_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='actividadesmodel',
            name='tiempo',
            field=models.IntegerField(blank=True, max_length=3, null=True),
        ),
    ]
