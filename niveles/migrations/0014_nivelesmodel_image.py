# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2016-08-25 23:30
from __future__ import unicode_literals

import django.core.files.storage
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('niveles', '0013_remove_intento_tiempo'),
    ]

    operations = [
        migrations.AddField(
            model_name='nivelesmodel',
            name='image',
            field=models.ImageField(blank=True, null=True, storage=django.core.files.storage.FileSystemStorage(location=b'/code/funnyd'), upload_to='./static/images/'),
        ),
    ]
