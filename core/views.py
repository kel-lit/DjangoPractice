from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import AuthenticationForm
from django.http import JsonResponse

from .lib.database import create_user, check_user

# Dashboard
# ---------
@login_required(login_url='signin', redirect_field_name=None)
def dashboard(request):

    return render(request, 'dashboard/home.html')

# Signup
# --------------
def signupView(request):
    
    if request.method == "POST":

        if 'CheckUser' in request.headers:

            is_taken = check_user(request.headers['CheckUser'])

            return JsonResponse({'is_taken': is_taken})

        successful = create_user(request.POST)

        if not successful:
            return render(request, 'accounts/signup.html', {'errors': "There's a problem with signing up right now."})

        else:
            return redirect('core:dashboard')

    else:
        return render(request, 'accounts/signup.html')

# Signin/Signout
# --------------
def signinView(request):
    if request.user.is_authenticated:
        return redirect('core:dashboard')

    if request.method == 'POST':
        form = AuthenticationForm(data=request.POST)
        if form.is_valid(): 
            username = request.POST['username']
            password = request.POST['password']
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('core:dashboard')
            else:
                return redirect('signup')
    else:
        form = AuthenticationForm()
    return render(request, 'accounts/signin.html', {'form': form})

def signoutView(request):
    logout(request)
    return redirect('signin')

# Reset
# ------------
def resetView(request):

    return render(request, 'accounts/reset.html')
