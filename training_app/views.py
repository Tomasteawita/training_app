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

from datetime import datetime

from .forms import *
from .models import *
from .training_logic import TrainingLogic



class IndexView(View):
    template_name = 'index.html'
    
    def get(self, request, *args, **kwargs):
        return render(request, self.template_name)

class AccessView(CreateView):
    form_class = SingUpForm
    template_name = 'login/access.html'
    success_url = reverse_lazy('DashboardView')

    def form_valid(self, form):
        response = super().form_valid(form)
        login(self.request, self.object)
        
        return response

class DashboardView(LoginRequiredMixin, View):
    template_name = 'training/dashboard.html'
    
    def get(self, request, *args, **kwargs):
        try:
            avatar = Avatar.objects.get(user = request.user)
        except:
            avatar = None
        training_logic = TrainingLogic(request)
        trainings = training_logic.user_trainings(request.user)
        context = {
            'avatar': avatar,
            'trainings': trainings
        }
        return render(request, self.template_name, context = context)

class ReadTrainingView(LoginRequiredMixin, View):
    template_name = 'training/read_training/read_training.html'
    
    def get(self, request, *args, **kwargs):
        training_logic = TrainingLogic(request)
        training_dict = training_logic.read_training(kwargs['training_id'])
        context = {
            'training': training_dict
        }
        return render(request, self.template_name, context = context)

class UpdateTrainingView(LoginRequiredMixin, View):
    template_name =  'training/update_training/update_training.html'
    
    def get(self, request, *args, **kwargs):
        training_logic = TrainingLogic(request)
        training_dict = training_logic.read_training(kwargs['training_id'])
        
        if not isinstance(training_dict["date"], datetime):
            training_dict["date"] = datetime.strptime(training_dict["date"], '%d de %B de %Y a las %H:%M')
        
        training_dict["date"] = training_dict["date"].strftime('%Y-%m-%d')
        
        context = {
            'training': training_dict
        }
        return render(request, self.template_name, context = context)
    
    def post(self, request, *args, **kwargs):
        training_logic = TrainingLogic(request)
        training_logic.update_training(request.POST, kwargs['training_id'])

        return HttpResponseRedirect(reverse('DashboardView'))

class CreateTrainingView(LoginRequiredMixin, View):
    template_name = 'training/create_training/create_training.html'
    
    def get(self, request, *args, **kwargs):
        return render(request, self.template_name)
    
    def post(self, request, *args, **kwargs):
        training_logic = TrainingLogic(request)
        training_logic.create_training(request.POST, request.user)

        return HttpResponseRedirect(reverse('DashboardView'))

class DeleteTrainingView(LoginRequiredMixin, DeleteView):
    model = Training
    template_name = 'training/delete_training/delete_training.html'
    success_url = reverse_lazy('DashboardView')
        
class SingUpView(CreateView):
    form_class = SingUpForm
    template_name = 'login/singup.html'
    success_url = reverse_lazy('DashboardView')

    def form_valid(self, form):
        response = super().form_valid(form)
        login(self.request, self.object)
        
        return response

class LoginView(LoginView):
    template_name = 'login/login.html'
    
    def get_success_url(self):
        return reverse('DashboardView')

class LogoutView(LogoutView):
    template_name = 'login/logout.html'
    

def finish_training(request, training_id):
    training_logic = TrainingLogic(request)
    training_logic.finish_training(training_id)

    return HttpResponseRedirect(reverse('DashboardView'))