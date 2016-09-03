from django.contrib import admin

from niveles.models import nivelesModel, soundModel, Intento

class SoundInline(admin.TabularInline):
    model = soundModel


class NivelesTypeAdmin(admin.ModelAdmin):
    inlines = [SoundInline]
    list_display = ('slug', 'juego',)
    search_fields = ('slug', 'juego',)
    list_editable = ('slug', 'juego',)
    list_per_page = 100


class IntentoAdmin(admin.ModelAdmin):
    list_display = (
        'intentos',
        'cantidad',
    )

admin.site.register(soundModel)
admin.site.register(Intento, IntentoAdmin)
admin.site.register(nivelesModel, NivelesTypeAdmin)