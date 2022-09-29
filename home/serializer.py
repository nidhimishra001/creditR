from rest_framework.serializers import ModelSerializer
from home.models import Contact

class ContactSerializer(ModelSerializer):
    class Meta:
        Model =Contact
        fields="__all__"

