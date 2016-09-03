from django.core.exceptions import ObjectDoesNotExist


# Retorna un objeto de un modelo si exite si no retorna None
def get_or_none(Model, **kwargs):
    try:
        return Model.objects.get(**kwargs)
    except ObjectDoesNotExist:
        return None
