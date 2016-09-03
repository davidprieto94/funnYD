from rest_framework import status as status_code
from rest_framework import viewsets
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from niveles.models import nivelesModel as Niveles, Intento, soundModel
from niveles.serializers import NivelesSerializer, IntentoSerializer


class NivelesViewSet(viewsets.ReadOnlyModelViewSet):
    authentication_classes = (SessionAuthentication, )
    permission_classes = IsAuthenticated,
    serializer_class = NivelesSerializer
    queryset = Niveles.objects.all()

    def list(self, request):
        nivel = request.GET.get('nivel', None)
        juego = request.GET.get('juego', None)
        if nivel and juego:
            queryset = Niveles.objects.filter(juego=juego, slug=nivel)
        else:
            queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request):
        post = request.data
        sound_id = post.get('sound_id')
        piano_notes = post.get('piano_notes', None)
        intentos = post.get('intentos', None)
        cantidad = post.get('cantidad', None)
        time = post.get('time', None)
        # try:
        sound = soundModel.objects.get(pk=sound_id)
        intento = Intento.objects.create(
            sound=sound,
            piano_notes=piano_notes,
            intentos=intentos,
            cantidad=cantidad,
            user=request.user,
            time=time,
        )
        response = {
            "intento": intento.id,
        }
        status = status_code.HTTP_200_OK


        return Response(response, status)


class IntentoViewSet(viewsets.ReadOnlyModelViewSet):
    authentication_classes = (SessionAuthentication, )
    permission_classes = IsAuthenticated,
    serializer_class = IntentoSerializer
    queryset = Niveles.objects.all()

    def post(self, request):
        post = request.data
        intento_id = post.get('id')
        observation = post.get('observation', None)

        intento = Intento.objects.get(pk=intento_id)
        intento.observation = observation
        intento.save()

        response = {
            "intento": intento.id,
        }
        status = status_code.HTTP_200_OK
        return Response(response, status)

