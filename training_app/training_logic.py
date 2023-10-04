from datetime import datetime

from .models import *

class TrainingLogic():

    def __init__(self, request):

        """
        Inicializa una instancia de la clase trainig.

        Args:
            request (HttpRequest): Objeto HttpRequest para acceder a la sesión.
        """
        self.request = request
        self.session = request.session
        training = self.session.get("training")

        if not training:
            self.session["training"] = {}

        self.training = self.session["training"]


    # def save_training(self):
    #     """
    #     Guarda el registro en la sesión.
    #     """
    #     self.session["trainig"] = self.trainig
    #     self.session.modified = True

    def user_trainings(self, user):
        """
        Devuelve los registros de la sesión.
        """
        trainings = Training.objects.filter(user = user).order_by('-date')
        return trainings
    