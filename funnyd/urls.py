from django.conf import settings
from django.conf.urls import url, include
from django.conf.urls.static import static
from django.contrib import admin

# from niveles.views import IntentoAPI

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url('', include('app.urls')),
    url('', include('admon.urls')),
    url('', include('actividades.urls')),
    url(r'^api/', include('api.urls', namespace='api')),
    # url(r'^api/niveles/save/$', IntentoAPI.as_view(), name='niveles_save'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
