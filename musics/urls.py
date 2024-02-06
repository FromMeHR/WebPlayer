from django.urls import path
from musics import views

app_name = 'musics'

urlpatterns = [
    path('search/', views.search, name='search'),
    path('albums/', views.albums, name='albums'),
    path('albums/<int:album_id>', views.album, name='albums_page'),
    path('genre/<slug:genre_slug>', views.genre, name='genre'),
]
