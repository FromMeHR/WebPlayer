from django.shortcuts import render
from musics.models import Music, Album

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
        'album_name': album.name,
        'album_image': album.image.url,
    }
    return render(request, 'musics/album.html', context)


