from django.contrib import admin
from django.urls import path, include, reverse_lazy
from django.views.generic import RedirectView
from rest_framework.routers import DefaultRouter
from rest_framework import routers

from .api import  UserViewSet, GroupViewSet

# Project level api router
router_todo = routers.DefaultRouter()
router_todo.register(r'users', UserViewSet)
router_todo.register(r'groups', GroupViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('accounts.urls')),
    path('accounts/', include('django.contrib.auth.urls')),
    path('tasks/', include('task.urls')),
    path('', RedirectView.as_view(url=reverse_lazy('task_list_url')), name='redirect_url'),
    path('api/', include(router_todo.urls)),

]
