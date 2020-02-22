from django.db import models

class ForumUser(models.Model):

    email  = models.CharField(max_length=50)
    username   = models.CharField(max_length=50)
    password     = models.CharField(max_length=50)