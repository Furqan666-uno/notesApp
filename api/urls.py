from django.urls import path
from .views import RegisterView, LoginView, notes_create, notes_delete


urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('create/', notes_create, name='create'),
    path('delete/<int:pk>/', notes_delete, name='delete'),
]