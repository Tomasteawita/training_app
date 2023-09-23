from datetime import datetime

from .models import *

class Planificador():

    def __init__(self, request):

        """
        Inicializa una instancia de la clase Register.

        Args:
            request (HttpRequest): Objeto HttpRequest para acceder a la sesión.
        """
        self.request = request
        self.session = request.session
        planificador = self.session.get("planificador")

        if not planificador:
            self.session["planificador"] = {}

        self.planificador = self.session["planificador"]


    # def save_register(self):
    #     """
    #     Guarda el registro en la sesión.
    #     """
    #     self.session["register"] = self.register
    #     self.session.modified = True

    def create_days_database(self):

            days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]

            for day in days:
                Days.objects.create(
                    name = day
                )
    def create_weeks_database(self):

            weeks = ["Semana 1", "Semana 2", "Semana 3", "Semana 4"]

            for week in weeks:
                Weeks.objects.create(
                    name = week
                )

    def create_period_database(self):

        new_period = Periods.objects.create(
            name = f"Periodo de {self.request.user}",
            date_creation = datetime.now(),
            user = self.request.user
        )

        all_weeks = Weeks.objects.all()
        if not all_weeks:
            self.create_weeks_database()
            all_weeks = Weeks.objects.all()

        all_days = Days.objects.all()
        if not all_days:
            self.create_days_database()
            all_days = Days.objects.all()

        for week in all_weeks:
            for day in all_days:
                PeriodWeekDay.objects.create(
                    period = new_period,
                    week = week,
                    day = day
                )

    def read_period_week_day_database(self):
        """
        Recupera los datos de estado de los días de la semana para cada período y semana del usuario actual.

        Returns:
            dict: Un diccionario que representa la información de los estados de los días de la semana.

            El diccionario tiene la siguiente estructura:

            {
                'ID del período': {
                    'weeks': {
                        'Nombre de la semana': {
                            'Nombre del día': {'Estado': Verdadero o Falso, 'id_combination': ID},
                            ...
                        },
                        ...
                    },
                    ...
                },
                ...
            }

            Donde 'ID del período' es el identificador único del período,
            'Nombre de la semana' es el nombre de la semana (por ejemplo, 'Semana 1'),
            'Nombre del día' es el nombre del día de la semana (por ejemplo, 'Lunes'),
            'Estado' es verdadero (True) o falso (False) según la disponibilidad de una entrada en la base de datos para ese día en ese período y semana específicos, y 'id_combination' es el ID de la combinación de día/semana/periodo correspondiente.
        """
        periods_dict = {}
        periods = Periods.objects.filter(user=self.request.user)
        num_period = 1
        if not periods:
            return periods_dict

        else:
            for period in periods:
                period_dict = {}
                weeks_dict = {}
                period_week_day = PeriodWeekDay.objects.filter(period=period)

                for week in Weeks.objects.all():
                    day_dict = {}
                    for day in Days.objects.all():
                        matching_entry = period_week_day.filter(week=week, day=day).first()
                        day_info = {
                            'Estado': matching_entry.status if matching_entry else False,
                            'id_combination': matching_entry.id if matching_entry else None
                        }
                        day_dict[day.name] = day_info
                    weeks_dict[week.name] = day_dict

                period_dict['weeks'] = weeks_dict
                periods_dict[str(num_period)] = period_dict
                num_period += 1

            return periods_dict
