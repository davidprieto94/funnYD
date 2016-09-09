from __future__ import unicode_literals

import os

from django.contrib.auth.models import User
# from django.core.files.storage import FileSystemStorage
from django.db import models

from actividades.models import actividadesModel
from funnyd.settings import STATIC_URL, PROJECT_ROOT

# PRIVATE_DIR = os.path.join(PROJECT_ROOT)
# fs = FileSystemStorage(location=PRIVATE_DIR)

class nivelesModel(models.Model):
    nombre = models.CharField(max_length=100, blank=False, null=False)
    slug = models.SlugField()
    juego = models.CharField(max_length=50, blank=False, null=False)
    color = models.CharField(max_length=50, blank=True, null=True)
    actividad = models.ForeignKey(actividadesModel)
    image = models.ImageField(name='image', blank=True, null=True, upload_to="images")

    class Meta:
        verbose_name = 'Nivel'
        verbose_name_plural = 'Niveles'

    def __str__(self):
        return u'%s | %s' % (self.actividad.nombre, self.nombre)

    def __unicode__(self):
        return u'%s | %s' % (self.actividad.nombre, self.nombre)

class soundModel(models.Model):
    nombre = models.CharField(max_length=100, blank=False, null=False)
    file = models.FileField(upload_to='funnyd/static/sounds/')
    piano_notes = models.TextField(blank=True, null=True)
    nivel = models.ForeignKey(nivelesModel)
    tiempo = models.IntegerField('Tiempo en Segundos', blank=True, null=True)
    color = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        verbose_name = 'Cancion'
        verbose_name_plural = 'Canciones'

    def __str__(self):
        return u'%s | %s | %s' % (self.nivel.actividad.nombre, self.nivel.nombre, self.nombre)

    def __unicode__(self):
        return u'%s | %s | %s' % (self.nivel.actividad.nombre, self.nivel.nombre, self.nombre)

    @property
    def file_url(self):
        print self.file.path
        try:
            return "{0}{1}".format(STATIC_URL, self.file.path.split(STATIC_URL)[1])
        except Exception, e:
            try:
                return "{0}{1}".format(STATIC_URL, self.file.path.split("\\static\\")[1])
            except Exception, e:
                pass
            return ""


class Intento(models.Model):
    piano_notes = models.TextField(blank=True, null=True)
    intentos = models.IntegerField(blank=True, null=True)
    cantidad = models.IntegerField(blank=True, null=True)
    time = models.IntegerField(blank=True, null=True)
    sound = models.ForeignKey(soundModel)
    user = models.ForeignKey(User, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)
    observation = models.TextField(blank=True, null=True)

    def __str__(self):
        return u'%s | %s | %s' % (self.sound.nivel.actividad.nombre, self.sound.nivel.nombre)