from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    username= models.CharField(max_length=100, unique=True)
    email= models.EmailField(unique=True)

    USERNAME_FIELD= 'email'
    REQUIRED_FIELDS= ['username']

    def __str__(self):
        return f'{self.username} has {self.email}'
    

class Notes(models.Model):
    title= models.CharField(max_length=100)
    content= models.CharField()
    created_at= models.DateTimeField(auto_now_add=True)
    author= models.ForeignKey(User, on_delete=models.CASCADE, related_name='notes')

    def __str__(self):
        return f'Title: {self.title}'
