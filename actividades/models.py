# coding=utf-8

from __future__ import unicode_literals

import os

from django.db import models
# from django.core.files.storage import FileSystemStorage
from funnyd.settings import STATIC_ROOT, STATIC_URL, PROJECT_ROOT

# PRIVATE_DIR = os.path.join(PROJECT_ROOT)
# fs = FileSystemStorage(location=PRIVATE_DIR)


class actividadesModel(models.Model):
    class Meta:
        verbose_name = 'Actividad'
        verbose_name_plural = 'Actividades'

    nombre = models.CharField(max_length=100, blank=False, null=False)
    key_press = models.CharField(max_length=3, blank=True, null=True)
    key_press_description = models.CharField(max_length=100, blank=True, null=True)
    slug = models.SlugField()
    image = models.ImageField(name='image', blank=True, null=True, upload_to="images")
    tiempo = models.IntegerField(blank=True, null=True)
    color = models.CharField(max_length=50, blank=True, null=True)
    video = models.CharField(max_length=200, blank=True, null=True)

    @property
    def image_url(self):
        return "{0}{1}".format(STATIC_URL, self.image.path.split(STATIC_URL)[1])

    def __str__(self):
        return u'%s' % (self.nombre)

    def __unicode__(self):
        return u'%s' % (self.nombre)

    def nivelesmodel_set_ordered(self):
        return self.nivelesmodel_set.all().order_by("order")
