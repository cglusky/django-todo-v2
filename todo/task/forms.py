from django import forms
from .models import Task


class TaskForm(forms.ModelForm):
        class Meta:
            model = Task
            fields = ['title']
            
            widgets = {
                'title': forms.TextInput(attrs={'id': 'createTaskFld', 'class': 'form-control', 'placeholder': 'Enter new task...', 'autofocus': '' })
            }