from django.db import models

class ForumUser(models.Model):

    user_type = "user"
    email  = models.CharField(max_length=50)
    username   = models.CharField(max_length=50)
    password     = models.CharField(max_length=50)