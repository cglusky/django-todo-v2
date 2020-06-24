from django.shortcuts import redirect

def redirect_to_tasks(request):
    return redirect('task_list_url')