from django.shortcuts import render


def inicio(request):
    return render(request, 'inicio.html')


def registro(request):
    return render(request, "registro.html")


def ingreso(request):
    return render(request, "ingreso.html")


def plataforma(request):
    return render(request, "plataforma.html")


def cambiocontrasenia(request):



    return render(request, "cambiocontrasenia.html")
