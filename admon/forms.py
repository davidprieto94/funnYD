# -*- encoding: utf-8 -*-

from django import forms
from django.contrib.auth.forms import AuthenticationForm


# formulario de login
class loginAdmonForm(AuthenticationForm):
    username = forms.CharField(error_messages={'required': 'Ingresa tu Usuario, '}, widget=forms.TextInput(
        attrs={'class': 'form-control ', 'placeholder': 'usuario', 'autofocus': ''}))
    password = forms.CharField(error_messages={'required': 'Ingresa tu Contraseña'},
                               widget=forms.PasswordInput(attrs={'class': 'form-control', 'placeholder': 'Contraseña'}))
