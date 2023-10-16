from django.test import TestCase
from .models import *
from .training_logic import TrainingLogic
from datetime import datetime
# Create your tests here.

class TrainingLogicTestCase(TestCase):
    
    def setUp(self):
        # Create a user
        self.user = User.objects.create_user('test', '')
        # Create a training
        self.training = Training.objects.create(user = self.user, date = datetime.now(), day = 'Monday')
        
    
    def test_create_training(self):
        """
        Test that a training is created
        """
        self.assertEqual(self.training.user, self.user)
        self.assertEqual(self.training.day, 'Monday')
        
        
        