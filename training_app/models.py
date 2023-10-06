from django.db import models
from django.contrib.auth.models import User

class Avatar(models.Model):
    user = models.OneToOneField(User, on_delete = models.CASCADE, null = True, blank = True)
    avatar = models.ImageField(upload_to = 'avatars/', null = True, blank = True)
    weight = models.FloatField(null = True, blank = True)
    height = models.FloatField(null = True, blank = True)
    
    def __str__(self) -> str:
        return f'{self.user} - {self.weight} - {self.height}'

class Training(models.Model):
    name = models.CharField(max_length=65)
    user = models.ForeignKey(User, on_delete = models.CASCADE, null = True, blank = True)
    day = models.CharField(max_length=65)
    date = models.DateTimeField()
    status = models.BooleanField(default = False)
    notes = models.TextField(null = True, blank = True)
    
    def __str__(self) -> str:
        return f'{self.name} - {self.user} - {self.date}'

class Blocks(models.Model):
    name = models.CharField(max_length=65)
    
    def __str__(self) -> str:
        return f'{self.name}'


class Excercise(models.Model):
    name = models.CharField(max_length=65)
    
    def __str__(self) -> str:
        return f'{self.name}'

class TrainingBlocks(models.Model):
    training = models.ForeignKey(Training, on_delete = models.CASCADE, null = True, blank = True)
    block = models.ForeignKey(Blocks, on_delete = models.CASCADE, null = True, blank = True)
    excercise = models.ForeignKey(Excercise, on_delete = models.CASCADE, null = True, blank = True)
    reps = models.SmallIntegerField(null = True, blank = True)
    weight = models.FloatField(null = True, blank = True)
    
    def __str__(self) -> str:
        return f'{self.training} - {self.block} - {self.excercise} - {self.reps} - {self.weight}'