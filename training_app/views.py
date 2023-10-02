from django.urls import reverse, reverse_lazy
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required

from django.shortcuts import render
from django.views.generic import View
from django.views.generic.edit import (
    CreateView, UpdateView, DeleteView
)
from django.contrib.auth.views import LoginView, LogoutView
from django.contrib.auth.mixins import LoginRequiredMixin

from .forms import *
from .models import *
from .planificador import Planificador

class IndexView(LoginRequiredMixin, View):
    """
    Vista basada en clase para la página de inicio.
    Esta vista muestra una lista de posts y etiquetas únicas relacionadas con los posts.
    Attributes:
        template_name (str): El nombre de la plantilla HTML a utilizar para renderizar la página.

    Method:
        get(self, request): Procesa una solicitud GET para mostrar la página de inicio.
    """
    template_name = 'index.html'
    
    def get(self, request, *args, **kwargs):
    
        return render(request, self.template_name)

class PlanificadorListView(LoginRequiredMixin, View):
    """
    Vista basada en clase para la lista de planificadores.
    Esta vista muestra una lista de planificadores creados por el usuario.
    Attributes:
        template_name (str): El nombre de la plantilla HTML a utilizar para renderizar la página.

    Method:
        get(self, request): Procesa una solicitud GET para mostrar la lista de planificadores.
    """
    template_name = 'planificador/period.html'
    
    def get(self, request, *args, **kwargs):
        planificador = Planificador(request)
        periods = planificador.read_period_week_day_database()
        context = {'periods' : periods}
        return render(request, self.template_name, context = context)
    
    def post(self, request, *args, **kwargs):
        """
        Procesa una solicitud POST para crear un nuevo planificador.
        Args:
            request (HttpRequest): Objeto HttpRequest para acceder a la sesión.
        """
        planificador = Planificador(request)
        planificador.create_period_database()
        periods = planificador.read_period_week_day_database()
        context = {'periods' : periods}
        return render(request, self.template_name, context = context)


class CreateTrainingView(LoginRequiredMixin, View):
    """
    Vista basada en clase para el detalle de un planificador.
    Esta vista muestra el detalle de un planificador.
    Attributes:
        template_name (str): El nombre de la plantilla HTML a utilizar para renderizar la página.

    Method:
        get(self, request): Procesa una solicitud GET para mostrar el detalle de un planificador.
    """
    template_name = 'planificador/create_training.html'
    
    def get(self, request, *args, **kwargs):
        
        return render(request, self.template_name)
    
    def post(self, request, *args, **kwargs):
        """
        Procesa una solicitud POST para crear un nuevo planificador.
        Args:
            request (HttpRequest): Objeto HttpRequest para acceder a la sesión.
        """
        planificador = Planificador(request)
        planificador.create_period_database()
        periods = planificador.read_period_week_day_database()
        context = {'periods' : periods}
        return render(request, self.template_name, context = context)

class SingUpView(CreateView):
    form_class = SingUpForm
    template_name = 'login/singup.html'
    success_url = reverse_lazy('IndexView')

    def form_valid(self, form):
        """
        Procesa el formulario después de una validación exitosa y realiza la autenticación del usuario.

        Args:
            form (Form): El formulario de registro validado.

        Returns:
            HttpResponse: Una respuesta HTTP que redirige al usuario a la página de inicio después del registro exitoso.
        """
        response = super().form_valid(form)
        login(self.request, self.object)
        return response

class LoginView(LoginView):
    template_name = 'login/login.html'

class LogoutView(LogoutView):
    template_name = 'login/logout.html'