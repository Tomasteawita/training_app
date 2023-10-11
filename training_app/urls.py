from django.conf import settings
from django.urls import path
from .views import *
from django.conf.urls.static import static


url_training_app = [ 
    path('dashboard/', DashboardView.as_view(), name = "DashboardView"), 
    path('createtraining/', CreateTrainingView.as_view(), name = "CreateTrainingView"), 
    path('readtraining/<int:training_id>/', ReadTrainingView.as_view(), name = "ReadTrainingView"),
    path('updatetraining/<int:training_id>/', UpdateTrainingView.as_view(), name = "UpdateTrainingView"),
    path('deletetraining/<int:pk>/', DeleteTrainingView.as_view(), name = "DeleteTrainingView"),
    path('finish_training/<int:training_id>/', finish_training, name = "finish_training"),
]


urlpatterns = [
    path('', IndexView.as_view(), name = "IndexView"), 
    path('singup/', SingUpView.as_view(), name = "SingUpView"), 
    path('login/', LoginView.as_view(), name = "LoginView"), 
    path('logout/', LogoutView.as_view(), name = "LogoutView"), 
] + url_training_app + static(settings.MEDIA_URL,  document_root = settings.MEDIA_ROOT)