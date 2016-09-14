#
from django.conf.urls import url
from django.contrib import admin

import app.views

urlpatterns = [
    url(r'^$', app.views.inicio, name='inicio'),
    url(r'^plataforma/$', app.views.plataforma),
    url(r'^cambiocontrasenia/$', app.views.cambiocontrasenia, name='cambiocontrasenia'),
]
