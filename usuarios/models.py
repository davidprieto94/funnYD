from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User

# Lista "ENUM" para genero
GENEROS = (
    ('M', 'Masculino'),
    ('F', 'Femenino'),
)


# Modelo de usuarios del sistema
class usuariosModel(models.Model):
    class Meta:
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'

    user = models.OneToOneField(User)
    slug = models.SlugField()
    documento = models.PositiveIntegerField(null=True, blank=True)
    genero = models.CharField(max_length=2, choices=GENEROS, null=False, blank=False)
    fnacimiento = models.DateField()

    # retorna nombre de usuario
    def __str__(self):
        return u'%s' % (self.user)

    def __unicode__(self):
        return u'%s' % (self.user)
