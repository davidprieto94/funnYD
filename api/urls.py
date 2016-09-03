from django.conf.urls import patterns, include, url

from actividades import views

urlpatterns = patterns(
    '',
    url(r'^niveles/', include('niveles.urls', namespace='niveles')),
)

