from django.shortcuts import render
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import generics, serializers, permissions, status
from rest_framework.decorators import api_view, permission_classes
from .serializers import RegisterSerializer, LoginSerializer, NotesSerializer
from rest_framework.views import APIView
from django.contrib.auth import get_user_model, authenticate
from .models import Notes

User= get_user_model()


class RegisterView(APIView):
    # serializer_class= RegisterSerializer # only used when using generics
    def post(self, request):
        register= RegisterSerializer(data= request.data)
        if not register.is_valid():
            return Response(register.errors, status=status.HTTP_401_UNAUTHORIZED)
        
        username= register.validated_data['username']
        email= register.validated_data['email']
        password= register.validated_data['password']
        password2= register.validated_data['password2']
        
        if password != password2:
            return Response({"message": "Both Passwords do not match. Make sure both passwords are the same."}, status=status.HTTP_400_BAD_REQUEST)
        
        if User.objects.filter(email=email).exists():
            return Response({"message": "User already exists. Try logging in with your credentials."}, status=status.HTTP_400_BAD_REQUEST)

        user= User.objects.create_user(username=username, email=email, password=password)
        return Response({"message": "You have been registered successfully.", "user_id": user.id, "username": user.username, "email": user.email, "password": "***hidden***"}, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    # serializer_class= LoginSerializer
    def post(self, request):
        check= LoginSerializer(data= request.data)
        if not check.is_valid():
            return Response(check.errors, status=status.HTTP_400_BAD_REQUEST)
        
        email= check.validated_data['email']
        password= check.validated_data['password']
        
        user= authenticate(request, username=email, password=password)
        if not user: # if user not found
            return Response({"message": "Credentials do not match."}, status=status.HTTP_404_NOT_FOUND)
        
        refresh= RefreshToken.for_user(user)
        return Response({"message": "Login successfully.", "refresh": str(refresh), "access": str(refresh.access_token)}, status=status.HTTP_200_OK)
        

@api_view(['GET', 'POST'])
@permission_classes([permissions.IsAuthenticated])
def notes_create(request):
    if request.method=='GET':
        your_notes= Notes.objects.filter(author= request.user) # here we are using author bcz in models.py author is foreign key of User, so here user= author
        all_notes= NotesSerializer(your_notes, many= True)
        return Response(all_notes.data)

    if request.method=='POST':
        new_notes= NotesSerializer(data= request.data)
        if new_notes.is_valid():
            new_notes.save(author= request.user)
            return Response(new_notes.data, status=status.HTTP_201_CREATED)
        return Response({"message": "Note can't be created.", "error": new_notes.errors}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([permissions.IsAuthenticated])
def notes_delete(request, pk):
    try:
        note= Notes.objects.get(pk= pk, author= request.user)
    except Notes.DoesNotExist:
        return Response({"message": "Note not found."}, status=status.HTTP_404_NOT_FOUND)
    
    if request.method=='DELETE':
        note.delete()
        return Response({"message": "Note is deleted."}, status=status.HTTP_204_NO_CONTENT)


@api_view(['PUT'])
@permission_classes([permissions.IsAuthenticated])
def update_note(request, pk):
    if request.method=='PUT':
        note= Notes.objects.get(pk=pk, author= request.user)
        update_note= NotesSerializer(note, data= request.data)
        if update_note.is_valid():
            update_note.save()
            return Response(update_note.data, status=status.HTTP_200_OK)
        return Response({'message':"Can't be updated."}, status=status.HTTP_400_BAD_REQUEST)


