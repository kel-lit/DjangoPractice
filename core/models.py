from django.db import models

class NewForumUser(models.Model):

    username    = models.CharField(max_length=50)
    email       = models.EmailField(max_length=254)
    password    = models.CharField(max_length=50)
