from django.contrib import admin
from home.models import Contact,Blog,Pet,Tag,ClientsFeedback


# Register your models here.
admin.site.register(Contact)
admin.site.register(Blog)
admin.site.register(Pet)
admin.site.register(Tag)
admin.site.register(ClientsFeedback)




# class ContactAdmin(admin.ModelAdmin):
#     list_display=['name','phone']

