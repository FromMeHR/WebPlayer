from django.db.models import Q
from musics.models import Music, Album

def q_search(query, search_type=None):
    keywords = [word for word in query.split()]
    q_objects = Q()

    if search_type == 'albums':
        for token in keywords:
            q_objects |= Q(name__icontains=token)
        return Album.objects.filter(q_objects)

    if keywords:
        for token in keywords:
            q_objects |= Q(title__icontains=token)
            q_objects |= Q(artiste__icontains=token)
            q_objects |= Q(album__name__icontains=token)
        return Music.objects.filter(q_objects)