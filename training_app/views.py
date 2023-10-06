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
    template_name = 'index.html'
    
    def get(self, request, *args, **kwargs):
        avatar = Avatar.objects.get(user = request.user)
        training_logic = TrainingLogic(request)
        trainings = training_logic.user_trainings(request.user)
        context = {
            'avatar': avatar,
            'trainings': trainings
        }
        return render(request, self.template_name, context = context)


class ReadTrainingView(LoginRequiredMixin, View):
    template_name = 'training/read_training.html'
    
    def get(self, request, *args, **kwargs):
        training_logic = TrainingLogic(request)
        training_dict = training_logic.read_training(kwargs['training_id'])
        context = {
            'training': training_dict
        }
        return render(request, self.template_name, context = context)

class CreateTrainingView(LoginRequiredMixin, View):
    template_name = 'training/create_training.html'
    
    def get(self, request, *args, **kwargs):
        return render(request, self.template_name)
    
    def post(self, request, *args, **kwargs):
        training_logic = TrainingLogic(request)
        training_logic.create_training(request.POST, request.user)

        return HttpResponseRedirect(reverse('IndexView'))


        
class SingUpView(CreateView):
    form_class = SingUpForm
    template_name = 'login/singup.html'
    success_url = reverse_lazy('IndexView')

    def form_valid(self, form):
        response = super().form_valid(form)
        login(self.request, self.object)
        
        return response

class LoginView(LoginView):
    template_name = 'login/login.html'

class LogoutView(LogoutView):
    template_name = 'login/logout.html'