# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2016-08-19 15:55
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('actividades', '0006_actividadesmodel_key_press'),
    ]

    operations = [
        migrations.AlterField(
            model_name='actividadesmodel',
            name='key_press',
            field=models.CharField(blank=True, max_length=3, null=True),
        ),
    ]
