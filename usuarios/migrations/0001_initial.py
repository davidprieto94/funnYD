# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2016-03-01 20:27
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='usuariosModel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('slug', models.SlugField()),
                ('documento', models.PositiveIntegerField(blank=True, null=True)),
                ('genero', models.CharField(choices=[('M', 'Masculino'), ('F', 'Femenino')], max_length=2)),
                ('fnacimiento', models.DateField()),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
