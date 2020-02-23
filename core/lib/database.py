from django.contrib.auth.models import User
from django.db.utils import IntegrityError
from django import forms

from core.forms import signupForm

def create_user(post_data):

    is_staff = False
    username = post_data["username"]
    email = post_data["email"]
    password = post_data["password"]
    
    try:

        if not signupForm(post_data).is_valid():
            raise ValidationError(_('Invalid Data'), code='invalid')

        new = User(username=username, email=email,
                password=password, is_staff=is_staff)

        new.save()
        return True

    except:
        return False

def check_user(username):

    return User.objects.filter(username=username).exists()