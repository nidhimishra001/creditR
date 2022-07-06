from django.contrib import admin
from django.urls import path
from home import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('',views.index,name='home'),
    path('contact',views.contact,name='contact'),
    path('test',views.test,name='test'),
    # path('blogpostform',views.blogpostform,name='blogpostform'),
    path("login",views.loginUser,name='login'),
    path("logout",views.logoutUser,name='logout'),
    path("pet",views.pet,name='pet'),
    path("blogdetails/<int:idd>",views.blogdetails,name='blogdetails'),
    path("allblogs",views.allblogs,name='allblogs'),
    # path('blogpost/<int:idd>', views.blogpost,name="blogpost"),





    # path('me',views.me,name='me'),

    # path('calculator',views.calculator,name='calculator'),
    # path('services',views.services,name='services'),
    # path('reviews',views.reviews,name='reviews'),

    




] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
if settings.DEBUG:
        urlpatterns += static(settings.MEDIA_URL,
                              document_root=settings.MEDIA_ROOT)