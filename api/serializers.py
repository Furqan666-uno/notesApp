from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from .models import Notes


class RegisterSerializer(serializers.Serializer):
    username= serializers.CharField(max_length=100)
    email= serializers.EmailField()
    password= serializers.CharField(write_only=True)
    password2= serializers.CharField(write_only=True)
    

class LoginSerializer(serializers.Serializer):
    password= serializers.CharField(write_only=True)
    email= serializers.EmailField()
    

class NotesSerializer(serializers.ModelSerializer):
    class Meta:
        model= Notes
        fields= ['id', 'title', 'content', 'created_at', 'author']
        extra_kwargs= {'author': {'read_only': True}}