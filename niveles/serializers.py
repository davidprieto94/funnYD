from rest_framework import serializers

from niveles.models import soundModel, nivelesModel, Intento


class SoundSerializer(serializers.ModelSerializer):
    file_url = serializers.ReadOnlyField()

    class Meta:
        model = soundModel
        fields = (
            'id',
            'nombre',
            'piano_notes',
            'file_url',
            'tiempo',
            'color',
        )


class NivelesSerializer(serializers.ModelSerializer):
    soundmodel_set = SoundSerializer(many=True)

    class Meta:
        model = nivelesModel
        fields = ('nombre', 'slug', 'juego', 'soundmodel_set')

class IntentoSerializer(serializers.ModelSerializer):
    soundmodel_set = SoundSerializer(many=True)

    class Meta:
        model = Intento
        fields = ('observation')
