# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2016-09-16 16:25
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usuarios', '0002_auto_20160618_1619'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usuariosmodel',
            name='documento',
            field=models.CharField(blank=True, max_length=15, null=True),
        ),
    ]
