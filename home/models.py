from tabnanny import verbose
from unittest.util import _MAX_LENGTH
from django.db import models
# from ckeditor.fields import RichTextField
from datetime import datetime,date
from ckeditor.fields import RichTextField


# Create your models here.
 
class Contact(models.Model):
    name=models.CharField(max_length=50)
    email=models.CharField(max_length=50,null=True,default=None)
    phone=models.CharField(max_length=40)
    message=models.CharField(max_length=500,null=True,default=None)
    def __str__(self):
        return self.name


class Tag(models.Model):
    tag=models.CharField(max_length=50)
    def __str__(self):
        return self.tag

class Blog(models.Model):
    blogname=models.CharField(max_length=50,null=True,default=None)
    description=models.CharField(max_length=300,null=True,default=None)
    author=models.CharField(max_length=300,null=True,default=None)
    image=models.ImageField(upload_to='media/images/',null=True,default=None)
    date=models.DateField(null=True,default=None)
    editor=RichTextField(blank=True,null=True)
    tags=models.ManyToManyField(Tag,verbose_name="My Tags", null=True,default=None)
    def __str__(self):
        return self.blogname

class Pet(models.Model):
    petname=models.CharField(max_length=20)
    petage=models.CharField(max_length=2)
    def __str__(self):
        return self.petname  


class ClientsFeedback(models.Model):
    image=models.ImageField(upload_to='media/images/',null=True,default=None)
    clientname=models.CharField(max_length=20)
    message=models.CharField(max_length=200)
   
    def __str__(self):
        return self.clientname



class Vir(models.Model):
    tag=models.CharField(max_length=50)
    def __str__(self):
        return self.tag
       






