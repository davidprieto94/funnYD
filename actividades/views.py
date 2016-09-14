from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from actividades.models import actividadesModel
from niveles.models import nivelesModel


@login_required
def listActividades(request):
    actividades = actividadesModel.objects.all()
    context = {
        'actividades': actividades,
    }

    return render(request, "list_actividades.html", context)

@login_required
def descripcionRD(request):
    return render(request, "descr_rutinadiaria.html")

@login_required
def piano(request):
    slug = request.GET.get('slug', None)
    actividades = actividadesModel.objects.get(nombre='Piano')
    nivel = nivelesModel.objects.filter(slug=slug, juego='Piano').first()
    return render(request, "piano.html", {
        'slug': slug,
        'nivel': nivel,
        'actividades': actividades
    })

@login_required
def baila(request):
    slug = request.GET.get('slug', None)
    actividades = actividadesModel.objects.get(nombre='Baila')
    nivel = nivelesModel.objects.filter(slug=slug, juego='Baila').first()
    return render(request, "baila.html", {
        'slug': slug,
        'nivel': nivel,
        'actividades': actividades
    })

@login_required
def rutina(request):
    slug = request.GET.get('slug', None)
    actividades = actividadesModel.objects.get(nombre='Rutina')
    nivel = nivelesModel.objects.filter(slug=slug, juego='Rutina').first()
    return render(request, "rutina.html", {
        'slug': slug,
        'nivel': nivel,
        'actividades': actividades
    })

@login_required
def colores(request):
    slug = request.GET.get('slug', None)
    actividades = actividadesModel.objects.get(nombre='Colores')
    nivel = nivelesModel.objects.filter(slug=slug, juego='Colores').first()
    return render(request, "colores.html", {
        'slug': slug,
        'nivel': nivel,
        'actividades': actividades
    })
