from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.IndexView.as_view(), name='index'),
    url(r'modal/(?P<taxa_name>[a-z]*/)$', views.populateModal)
]
