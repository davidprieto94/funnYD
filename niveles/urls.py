# coding=utf-8

from django.conf.urls import url
from rest_framework.routers import DefaultRouter

from niveles.views import NivelesViewSet, IntentoViewSet

router = DefaultRouter()
router.register(r'niveles', NivelesViewSet, base_name='niveles')
router.register(r'intentos', IntentoViewSet, base_name='intentos')

urlpatterns = router.urls