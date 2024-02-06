from django.shortcuts import get_object_or_404, render
from musics.models import Music, Album, Genre
from musics.utils import q_search

def albums(request):
    albums = Album.objects.all()
    
    context = {
        'title':'Albums',
        'albums': albums,
    }
    return render(request, 'musics/albums.html', context)

def album(request, album_id):
    album = Album.objects.get(id=album_id)
    musics = Music.objects.filter(album=album)
    music_list = list(musics.values())
    context = {
        'title':'Album',
        'musics': musics,
        'music_list': music_list,
        'album': album,
    }
    return render(request, 'musics/album.html', context)

def search(request):
    genres = Genre.objects.all()
    query = request.GET.get('q', None)
    search_type = request.GET.get('search_type', None)
    albums = None
    musics = None
    music_list = None
    if query:
        musics = q_search(query)
        if musics:
            music_list = list(musics.values())
        if search_type == 'albums':
            albums = q_search(query, search_type)
         
    context = {
        'title': 'Search',
        'genres': genres,
        'musics': musics,
        'albums': albums,
        'music_list': music_list,
    }
    return render(request, 'musics/search.html', context)

def genre(request, genre_slug):
    genre = get_object_or_404(Genre, slug=genre_slug)
    if genre_slug == "musics":
        musics = Music.objects.all()
    else:
        musics = Music.objects.filter(genre=genre)
    music_list = list(musics.values())
        
    context = {
        'title': genre.name,
        'genre': genre,
        'musics': musics,
        'music_list': music_list,
    }
    return render(request, 'musics/genre.html', context)


