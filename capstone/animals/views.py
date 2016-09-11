from django.shortcuts import render
from django.http import HttpResponse
from django.views import generic
from django.conf.urls.static import static

# Create your views here.

class IndexView(generic.TemplateView):
  template_name = 'animals/index.html'


def populateModal(request, taxa):
  print(taxa)

