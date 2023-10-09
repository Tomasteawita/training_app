from datetime import datetime
from django.db import transaction
import json
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
        translate = {
            'Monday': 'Lunes',
            'Tuesday': 'Martes',
            'Wednesday': 'Miércoles',
            'Thursday': 'Jueves',
            'Friday': 'Viernes',
            'Saturday': 'Sábado',
            'Sunday': 'Domingo'
        }
        
        trainings = Training.objects.filter(user = user).order_by('-date')
        
        for training in trainings:
            training.day = translate[training.day]
            
        return trainings

    def create_training(self, request_post, user):
        """
        Crea un nuevo planificador en la base de datos.
        """
        cant_blocks = int(request_post['meta-cant-blocks'])
        training_date = datetime.strptime(request_post['date'], '%Y-%m-%d')
        day_of_week = training_date.strftime('%A')

        with transaction.atomic():
            new_training = Training.objects.create(
                user=user,
                date=training_date,
                name=request_post['tipo'],
                notes=request_post['notes'],
                status=False,
                day=day_of_week
            )

            for id_block in range(1, cant_blocks + 1):
                current_block_name = request_post[f'{id_block}_block_name']

                current_block, _ = Blocks.objects.get_or_create(name=current_block_name)

                cant_exercises = int(request_post[f'meta_{id_block}_cant_excercise'])

                for id_excercise in range(1, cant_exercises + 1):
                    current_excercise_name = request_post[f'{id_block}_{id_excercise}_excercise_name']

                    current_excercise, _ = Excercise.objects.get_or_create(name=current_excercise_name)

                    inputs = int(request_post[f'{id_block}_total_reps'])

                    for id_input in range(1, inputs + 1):
                        reps = request_post[f'input_{id_input}_{id_block}_{id_excercise}_reps']
                        kgs = request_post[f'input_{id_input}_{id_block}_{id_excercise}_kgs']

                        TrainingBlocks.objects.create(
                            training=new_training,
                            block=current_block,
                            excercise=current_excercise,
                            reps=reps,
                            weight=kgs
                        )

    def update_training(self, request_post, training_id):
        """
        Actualiza un planificador en la base de datos.
        """
        cant_blocks = int(request_post['meta-cant-blocks'])
        training_date = datetime.strptime(request_post['date'], '%Y-%m-%d')
        day_of_week = training_date.strftime('%A')

        with transaction.atomic():
            training = Training.objects.get(id=training_id)

            training.date = training_date
            training.name = request_post['tipo']
            training.notes = request_post['notes']
            training.day = day_of_week

            training.save()

            TrainingBlocks.objects.filter(training=training).delete()

            for id_block in range(1, cant_blocks + 1):
                current_block_name = request_post[f'{id_block}_block_name']

                current_block, _ = Blocks.objects.get_or_create(name=current_block_name)

                cant_exercises = int(request_post[f'meta_{id_block}_cant_excercise'])

                for id_excercise in range(1, cant_exercises + 1):
                    current_excercise_name = request_post[f'{id_block}_{id_excercise}_excercise_name']

                    current_excercise, _ = Excercise.objects.get_or_create(name=current_excercise_name)

                    inputs = int(request_post[f'{id_block}_total_reps'])

                    for id_input in range(1, inputs + 1):
                        reps = request_post[f'input_{id_input}_{id_block}_{id_excercise}_reps']
                        if isinstance(request_post[f'input_{id_input}_{id_block}_{id_excercise}_kgs'], str):
                            kgs = request_post[f'input_{id_input}_{id_block}_{id_excercise}_kgs'].replace(',', '.')
                            kgs = float(kgs)
                        else:
                            kgs = request_post[f'input_{id_input}_{id_block}_{id_excercise}_kgs']

                        TrainingBlocks.objects.create(
                            training=training,
                            block=current_block,
                            excercise=current_excercise,
                            reps=reps,
                            weight=kgs
                        )
    
    def read_training(self, training_id):
        """
        Lee un planificador de la base de datos.
        """
        
        translate = {
            'Monday': 'Lunes',
            'Tuesday': 'Martes',
            'Wednesday': 'Miércoles',
            'Thursday': 'Jueves',
            'Friday': 'Viernes',
            'Saturday': 'Sábado',
            'Sunday': 'Domingo'
        }
        
        training = Training.objects.get(id = training_id)
        
        training_blocks = TrainingBlocks.objects.filter(training=training)
        
        training.day = translate[training.day]
        
        training_dict = {
            'id': training.id,
            'date': training.date,
            'name': training.name,
            'notes': training.notes,
            'status': training.status,
            'day': training.day,
            'blocks': {} 
        }

        for block in training_blocks:
            if block.block.name not in training_dict['blocks']:
                training_dict['blocks'][block.block.name] = {
                    'exercises': {}, 
                }
            
            if block.excercise.name not in training_dict['blocks'][block.block.name]['exercises']:
                training_dict['blocks'][block.block.name]['exercises'][block.excercise.name] = []
            
            exercise_data = {
                'reps': block.reps,
                'weight_kgs': block.weight,
            }
            
            training_dict['blocks'][block.block.name]['exercises'][block.excercise.name].append(exercise_data)
        
        return training_dict
    
    def finish_training(self, training_id):
        """
        Finaliza un planificador en la base de datos.
        """
        training = Training.objects.get(id = training_id)
        training.status = True
        training.save()