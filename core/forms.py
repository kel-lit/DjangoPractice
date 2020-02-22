from django import forms

class signinForm(forms.Form):

    username    = forms.CharField(max_length=50)
    password    = forms.CharField(max_length=50)

class signupForm(forms.Form):

    username    = forms.CharField(max_length=50)
    email       = forms.EmailField(max_length=254)
    password    = forms.CharField(max_length=50)