from django.conf import settings
from django.urls import path
from .views import *
from django.conf.urls.static import static


url_training_app = [ 
    path('createtraining/', CreateTrainingView.as_view(), name = "CreateTrainingView"), 
]


urlpatterns = [
    path('', IndexView.as_view(), name = "IndexView"), 
    path('singup/', SingUpView.as_view(), name = "SingUpView"), 
    path('login/', LoginView.as_view(), name = "LoginView"), 
    path('logout/', LogoutView.as_view(), name = "LogoutView"), 
] + url_training_app + static(settings.MEDIA_URL,  document_root = settings.MEDIA_ROOT)