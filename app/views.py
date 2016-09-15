from django.shortcuts import render
from django.contrib.auth.models import User


def inicio(request):
    return render(request, 'inicio.html')

def ingreso(request):
    return render(request, "ingreso.html")


def plataforma(request):
    return render(request, "plataforma.html")


def cambiocontrasenia(request):
    if request.POST:
        print "here"
        print request.POST.get('login-usuario')
        try:
            u = User.objects.get(username=request.POST.get('login-usuario'), is_superuser=False)
            if request.POST.get('login-pass') == request.POST.get('login-pass2'):
                u.set_password(request.POST.get('login-pass'))
                u.save()
                return render(request, "ingreso.html")
        except Exception, e:
            print e


    return render(request, "cambiocontrasenia.html")
