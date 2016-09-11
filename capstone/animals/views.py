from django.http import HttpResponse, JsonResponse
from django.views import generic
from django.conf.urls.static import static
from requests import *

# Create your views here.

class IndexView(generic.TemplateView):
  # Main index.html.
  template_name = 'animals/index.html'


def EOLforId(request, taxa_name):
  # Get the ID match given a taxa scientific name.
  taxa_id = 0
  r = get('http://eol.org/api/search/1.0.json?q='+ taxa_name + '&page=1&exact=true&filter_by_taxon_concept_id=&filter_by_hierarchy_entry_id=&filter_by_string=&cache_ttl=&key=1ded9f1eb184c38df6511aef3ba552a11b96e4c9')
  r = r.json()

  if r["results"] is not None:
    taxa_id = r["results"][0]["id"]

  return HttpResponse(taxa_id)


def EOLforModalInfo(request, taxa_id):
  # Get and parse the EOL info for a given ID.
  info = {"textStuff": [], "links": [], "pictures": [], "commonName": "", "scientificName": ""}

  r = get('http://eol.org/api/pages/1.0.json?batch=false&id=' + taxa_id + '&images_per_page=10&images_page=1&videos_per_page=0&videos_page=0&sounds_per_page=0&sounds_page=0&maps_per_page=0&maps_page=0&texts_per_page=2&texts_page=1&iucn=false&subjects=overview&licenses=all&details=true&common_names=true&synonyms=true&references=false&taxonomy=false&vetted=0&cache_ttl=&language=en&key=1ded9f1eb184c38df6511aef3ba552a11b96e4c9')
  r = r.json()

  # Assign scientific name.
  info["scientificName"] = r["scientificName"]
  # Assign common name based on EOL english preferred option.
  for name in r["vernacularNames"]:
    if name["language"] == "en":
      try:
        if name["eol_preferred"] == True:
          info["commonName"] = name["vernacularName"]
      except KeyError:
        pass

  for data in r["dataObjects"]:
    # Add image data to 'pictures'    
    if data["mimeType"] == "image/jpeg":
      info["pictures"].append(data["mediaURL"])
    else: 
      # Add source links.
      info["links"].append(data["source"])
  
      # Add text data to 'textStuff'.
      if data["mimeType"] == "text/plain":
        info["textStuff"].append(data["description"])
      elif data["mimeType"] == "text/html":
        info["textStuff"].append(data["description"])


  return JsonResponse(info) 


