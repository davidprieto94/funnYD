# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2016-09-08 03:13
from __future__ import unicode_literals

import django.core.files.storage
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('niveles', '0017_auto_20160907_2135'),
    ]

    operations = [
        migrations.AlterField(
            model_name='nivelesmodel',
            name='image',
            field=models.ImageField(blank=True, null=True, storage=django.core.files.storage.FileSystemStorage(location=b'C:\\funnYD\\funnyd'), upload_to='./static/images/'),
        ),
    ]
