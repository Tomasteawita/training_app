from django.urls import reverse, reverse_lazy
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect

from django.shortcuts import render
from django.views.generic import View
from django.views.generic.edit import (
    CreateView, UpdateView, DeleteView
)
from django.contrib.auth.views import LoginView, LogoutView
from django.contrib.auth.mixins import LoginRequiredMixin

from .forms import *
from .models import *
from .training_logic import TrainingLogic

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
        # planificador = Planificador(request)
        avatar = Avatar.objects.get(user = request.user)
        training_logic = TrainingLogic(request)
        trainings = training_logic.user_trainings(request.user)
        context = {
            'avatar': avatar,
            'trainings': trainings
        }
        # planificador.read_last_training_database()
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
    template_name = 'training/create_training.html'
    
    def get(self, request, *args, **kwargs):
        return render(request, self.template_name)
    
    def post(self, request, *args, **kwargs):
        """
        Procesa una solicitud POST para crear un nuevo planificador.
        Args:
            request (HttpRequest): Objeto HttpRequest para acceder a la sesión.
        """
        cant_blocks = int(request.POST['meta-cant-blocks'])
        training = {}
        
        for id_block in range(1, cant_blocks + 1):
            current_block = request.POST[f'{id_block}_block_name']     
            cant_exercises = int(request.POST[f'meta_{id_block}_cant_excercise'])
            training[current_block] = {}
            
            for id_excercise in range(1, cant_exercises + 1):
                current_excercise = request.POST[f'{id_block}_{id_excercise}_excercise_name']
                training[current_block][current_excercise] = {
                    'reps': [],
                    'kgs': []
                }
                
                inputs = int(request.POST[f'{id_block}_total_reps'])
                
                for id_input in range(1, inputs + 1):
                    reps = request.POST[f'input_{id_input}_{id_block}_{id_excercise}_reps']
                    kgs = request.POST[f'input_{id_input}_{id_block}_{id_excercise}_kgs']
                    training[current_block][current_excercise]['reps'].append(reps)
                    training[current_block][current_excercise]['kgs'].append(kgs)
        
        # planificador = Planificador(request)
        pk = kwargs['pk']
        # planificador.create_training(training, pk)
        return HttpResponseRedirect(reverse('IndexView'))


        
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