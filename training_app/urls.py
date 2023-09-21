from django.conf import settings
from django.urls import path
from .views import *
from django.conf.urls.static import static


url_planificador = [
    path('planificador/', PlanificadorListView.as_view(), name = "PlanificadorListView"),
]

urlpatterns = [
    path('', IndexView.as_view(), name = "IndexView"), 
    path('singup/', SingUpView.as_view(), name = "SingUpView"), 
    path('login/', LoginView.as_view(), name = "LoginView"), 
    path('logout/', LogoutView.as_view(), name = "LogoutView"), 
] + url_planificador + static(settings.MEDIA_URL,  document_root = settings.MEDIA_ROOT)