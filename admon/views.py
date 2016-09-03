from datetime import datetime

from django.contrib.auth import login
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.views import login as django_login, logout_then_login
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

from django.core.urlresolvers import reverse
from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.views import generic
from django.views.generic import FormView

from admon.forms import loginAdmonForm
from app.utility import get_or_none
from niveles.models import Intento
from usuarios.models import usuariosModel


def ingresar(request):
    return render(request, "ingresar.html")


def login(request):
    """
    Atentica usuarios con un formulario.
    """
    error = False
    email = request.GET.get('email', None)
    DISPLAY_LOGIN_HELP_TEXT = request.session.get(
        'DISPLAY_LOGIN_HELP_TEXT', False)
    DISPLAY_LOGIN_PREPOPULATE_EMAIL = request.session.get(
        'DISPLAY_LOGIN_PREPOPULATE_EMAIL', '')

    if request.method == "POST":
        form = AuthenticationForm(data=request.POST)
        next_ = request.POST.get('next', '/')
        if form.is_valid():
            user = form.get_user()
            django_login(request, user)
            user.last_login = datetime.now()
            user.save()

            redirect_fallback = reverse('actividades')
            if user.is_staff :
                redirect_fallback = reverse('dash_board')


            # delete session helpers
            try:
                del request.session['DISPLAY_LOGIN_HELP_TEXT']
            except:
                pass
            try:
                del request.session['DISPLAY_LOGIN_PREPOPULATE_EMAIL']
            except:
                pass

            next_ = request.POST.get('next', redirect_fallback)
            return HttpResponseRedirect(next_)
    else:
        form = AuthenticationForm(
            initial={'username': DISPLAY_LOGIN_PREPOPULATE_EMAIL}
        )
        next_ = request.GET.get('next', '')

    data = {
        'DISPLAY_LOGIN_HELP_TEXT': DISPLAY_LOGIN_HELP_TEXT,
        "form": form,
        "next": next_,
        "email": email
    }
    return render(request, 'ingresar.html', data)


def logout(request):
    """
    Deslogea y envia al usuario a la pagina del login
    """
    return logout_then_login(request)


# View: maneja la logica de ingreso al sistema
class loginAdmonView(FormView):
    form_class = loginAdmonForm
    template_name = 'ingresar.html'
    success_url = '/admon/'

    # validadores para ingresar
    def form_valid(self, form):
        usuario = get_or_none(usuariosModel, user=form.user_cache)
        if usuario is None:
            form.add_error(None, 'Este usuario no existe')
            return self.form_invalid(form)
        elif not usuario.user.is_active:
            form.add_error(None, 'Esta usuario no esta activo')
            return self.form_invalid(form)
        elif not usuario.user.is_staff:
            form.add_error(None, 'Este usuario no es administrador')
            return self.form_invalid(form)
        else:
            login(self.request, form.user_cache)

        return super(loginAdmonView, self).form_valid(form)


def dashboard(request):
    users = User.objects.filter(is_staff=False)
    ui = request.GET.get('ui', None)
    if ui:
        intento = Intento.objects.filter(user__id=ui)
    else:
        intento = Intento.objects.all()

    data = {
        'intentos': intento,
        'users': users
    }
    return render(request, 'dash_board.html', data)


class SignUpView(generic.CreateView):
    form_class = UserCreationForm
    model = User
    template_name = 'registro.html'
    success_url = '/actividades/'

    def form_valid(self, form):
        data = form.data
        response = super(SignUpView, self).form_valid(form)
        user = usuariosModel.objects.create(
            user=self.object,
            fnacimiento=data['fnacimiento'],
            genero=data['genero'],
            documento=data['documento'],

        )

        # do something with self.object
        return response

    # def post(self, request, *args, **kwargs):
    #     self.object = None
    #     return super(BaseCreateView, self).post(request, *args, **kwargs)