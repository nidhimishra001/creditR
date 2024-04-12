# from termios import B1200
from turtle import setundobuffer
from django.shortcuts import render
from home.models import Contact,Pet,Blog
from home.forms import BlogForm
from home.forms import ContactForm
from django.contrib.auth import login,logout,authenticate
from django.shortcuts import redirect
# import pagination setuff
from django.core.paginator import Paginator,EmptyPage,PageNotAnInteger
from django.core.paginator import Paginator
from django.contrib import messages

# Create your views here.

def index(request):
    if(request.user.is_anonymous):
        return redirect("/login")
    else:
      blogs=Blog.objects.all()
      P=Paginator(Blog.objects.all(),3)
      page=request.GET.get('page')
      blogs=P.get_page(page)
      return render(request,'index-2.html',{'blogs':blogs})


def allblogs(request):
    if(request.user.is_anonymous):
        return redirect("/login")
    else:
     blogs=Blog.objects.all()
     P=Paginator(Blog.objects.all(),6)
     page=request.GET.get('page')
     blogs=P.get_page(page)
     return render(request,'allblogs.html',{'blogs':blogs})        

   
def loginUser(request):
     if(request.method=="POST"):
         username=request.POST['username']
         password=request.POST['password']
         user=authenticate(username=username,password=password)
         if user is not None:
            login(request,user)
            return redirect("/")

         else:
              return render(request,'login.html')
     return render(request,'login.html')


def logoutUser(request):
     logout(request)
     return redirect('/login')



def contact(request):
    form=ContactForm()
    if request.method=="POST":
        form=ContactForm(request.POST)
        if(form.is_valid()):
                print("validated")
                form.save()
                messages.add_message(request, messages.INFO, 'This is done')
                return redirect("/")
        else:
                print(form.errors)
                messages.add_message(request, messages.INFO, 'some error ')      
    context={'form':form}    
    return render(request,'index-2.html',context)

   

def blogpostform(request):
    if( request.method=="POST"):
        form=BlogForm(request.POST)
        if form.is_valid():
           print("valid")
           return redirect("index-2.html")
    # blogpostform.save()
    form=BlogForm()
    return render(request,'blogform.html',{'form':form})


 

def blog(request,idd):
    if(request.user.is_anonymous):
        return redirect("/login")
    else:
        blogs=Blog.objects.all()
    P=Paginator(Blog.objects.all(),6)
    page=request.GET.get('page')
    blogs=P.get_page(page)
    context={
                'blogs':blogs
            } 
        # return render(request,'contact.html') 
    return render(request,'blog-details.html',context)      
 
def pet(request):
    pets=Pet.objects.all()
    return render(request,'pet.html',{'pets':pets})  



def blogdetails(request,idd):
    if(request.user.is_anonymous):
        return redirect("/login")
    else:
        blogpost=Blog.objects.get(id=idd)
        blogs=Blog.objects.all()
        P=Paginator(Blog.objects.all(),6)
        page=request.GET.get('page')
        blogs=P.get_page(page)
        
        context={
                'blogpost':blogpost,
                'blogs':blogs
    } 

    #     blogs=Blog.objects.all()
    # P=Paginator(Blog.objects.all(),6)
    # page=request.GET.get('page')
    # blogs=P.get_page(page)
    # return render(request,'blog-details.html',{{'blogs':blogs},context})      
    return render(request,'blog-details.html',context)


def allblogs(request):
    blogs=Blog.objects.all()
    P=Paginator(Blog.objects.all(),6)
    page=request.GET.get('page')
    blogs=P.get_page(page)
    return render(request,'allblogs.html',{'blogs':blogs})  



def test(request):
    return render(request,'test.html')



