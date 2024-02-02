from django.contrib import admin
from musics.models import Music, Album

@admin.register(Music)
class MusicAdmin(admin.ModelAdmin):
    list_filter = ('title','artiste','album')
    list_display = ('title','artiste','album')
    
@admin.register(Album)
class AlbumAdmin(admin.ModelAdmin):
    list_filter = ('name','image',)
    list_display = ('name','image',)