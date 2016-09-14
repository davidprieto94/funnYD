from django.shortcuts import render
from django.contrib.auth.models import User


def inicio(request):
    return render(request, 'inicio.html')


def registro(request):
    return render(request, "registro.html")


def ingreso(request):
    return render(request, "ingreso.html")


def plataforma(request):
    return render(request, "plataforma.html")


def cambiocontrasenia(request):
    if request.POST:
        u = User.objects.get(username=request.POST.get('login-usuario'), is_admin=False)
        if request.POST.get('login-pass') == request.POST.get('login-pass2'):
            u.set_password(request.POST.get('login-pass'))
            u.save()
            return render(request, "ingreso.html")


    return render(request, "cambiocontrasenia.html")
