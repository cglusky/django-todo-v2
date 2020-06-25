from django.contrib import admin
from django.urls import path, include, reverse_lazy
from django.views.generic import RedirectView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('accounts.urls')),
    path('accounts/', include('django.contrib.auth.urls')),
    path('tasks/', include('task.urls')),
    path('', RedirectView.as_view(url=reverse_lazy('task_list_url')), name='redirect'),

]
