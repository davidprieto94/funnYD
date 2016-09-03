from django.conf.urls import url
from django.contrib import admin
import actividades.views


urlpatterns = [
    url(r'^actividades/$', actividades.views.listActividades, name='actividades'),
    url(r'^descripcionRD/$', actividades.views.descripcionRD),
    url(r'^baila/$', actividades.views.baila, name='Baila'),
    url(r'^piano/$', actividades.views.piano, name='Piano'),
    url(r'^colores/$', actividades.views.colores, name='Colores'),
    url(r'^rutina/$', actividades.views.rutina, name='Rutina'),
]
