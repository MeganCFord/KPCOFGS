from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.IndexView.as_view(), name='index'),
    url(r'id/(?P<taxa_name>[A-Za-z]*)$', views.EOLforId),
    url(r'info/(?P<taxa_id>[0-9]*)$', views.EOLforModalInfo),
    url(r'tree/(?P<taxa_name>[A-Za-z]*)$', views.loadTree),
]
