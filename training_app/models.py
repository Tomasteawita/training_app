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
    
    def __str__(self) -> str:
        return super().__str__()

class PerWeeDayBlock(models.Model):
    period_week_day = models.ForeignKey(PeriodWeekDay, on_delete = models.CASCADE, null = True, blank = True)
    block = models.ForeignKey(Blocks, on_delete = models.CASCADE, null = True, blank = True)
    def __str__(self) -> str:
        return super().__str__()

class Excercise(models.Model):
    name = models.CharField(max_length=65)
    
    def __str__(self) -> str:
        return super().__str__()

class PerWeeDayBlockExcercise(models.Model):
    per_wee_day_block = models.ForeignKey(PerWeeDayBlock, on_delete = models.CASCADE, null = True, blank = True)
    excercise = models.ForeignKey(Excercise, on_delete = models.CASCADE, null = True, blank = True)
    reps = models.SmallIntegerField()
    kgs = models.SmallIntegerField()
    
    def __str__(self) -> str:
        return super().__str__()

class results(models.Model):
    per_wee_day_block_excercise = models.ForeignKey(PerWeeDayBlockExcercise, on_delete = models.CASCADE, null = True, blank = True)
    PE = models.BooleanField(default = False)
    number = models.SmallIntegerField()
    date = models.DateTimeField()
    user = models.ForeignKey(User, on_delete = models.CASCADE, null = True, blank = True)
    
    def __str__(self) -> str:
        return super().__str__()