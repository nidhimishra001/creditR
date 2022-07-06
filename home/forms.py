from home.models import Contact,Blog,Tag
from django.forms import ModelForm
from django import forms
# from home import widgets

class ContactForm(ModelForm):
    class Meta:
        model=Contact
        fields= "__all__"



class BlogForm(forms.ModelForm): 
    class Meta:
        model=Blog
        fields= '__all__'     


class Tagform(ModelForm): 
    class Meta:
        model=Tag
        fields= '__all__'           