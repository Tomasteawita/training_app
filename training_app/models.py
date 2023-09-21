from django.db import models
from django.contrib.auth.models import User

class Periods(models.Model):
    name = models.CharField(max_length=65)
    date_creation = models.DateTimeField()
    user = models.ForeignKey(User, on_delete = models.CASCADE, null = True, blank = True)
    
    def __str__(self) -> str:
        return f"{self.name}"

class Weeks(models.Model):
    name = models.CharField(max_length=65)
    
    def __str__(self) -> str:
        return f"{self.name}"

class Days(models.Model):
    name = models.CharField(max_length=65)
    def __str__(self) -> str:
        return f"{self.name}"

class PeriodWeekDay(models.Model):
    period = models.ForeignKey(Periods, on_delete = models.CASCADE, null = True, blank = True)
    week = models.ForeignKey(Weeks, on_delete = models.CASCADE, null = True, blank = True)
    day = models.ForeignKey(Days, on_delete = models.CASCADE, null = True, blank = True)
    status = models.BooleanField(default = False)
    def __str__(self) -> str:
        return super().__str__()

class Blocks(models.Model):
    name = models.CharField(max_length=65)
    reps = models.IntegerField()
    rest = models.TimeField()
    
    def __str__(self) -> str:
        return super().__str__()

class DayBlock(models.Model):
    day = models.ForeignKey(Days, on_delete = models.CASCADE, null = True, blank = True)
    block = models.ForeignKey(Blocks, on_delete = models.CASCADE, null = True, blank = True)
    
    def __str__(self) -> str:
        return super().__str__()

class Excercise(models.Model):
    name = models.CharField(max_length=65)
    PE = models.IntegerField()
    
    def __str__(self) -> str:
        return super().__str__()

class BlockExcercise(models.Model):
    block = models.ForeignKey(Blocks, on_delete = models.CASCADE, null = True, blank = True)
    excercise = models.ForeignKey(Excercise, on_delete = models.CASCADE, null = True, blank = True)
    kg = models.IntegerField()
    num_reps = models.IntegerField()    
    
    def __str__(self) -> str:
        return super().__str__()