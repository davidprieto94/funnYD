from django.conf.urls import url
from django.contrib import admin

from admon.views import login, SignUpView
from admon.views import loginAdmonView, dashboard, logout

urlpatterns = [
    url(r'^admon/$', dashboard, name='dash_board'),
    url(r'^admon/ingresar/$', loginAdmonView.as_view(), name='admon_ingresar'),
    url(r'^play/$', login, name='admon_ingresar'),
    url(r'^ingreso/$', login, name='admon_ingresar'),
    url(r'^logout/$', logout, name='logout'),
    url(r'^registro/$', SignUpView.as_view(), name='registro'),
]
