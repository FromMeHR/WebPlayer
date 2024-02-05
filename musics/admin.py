from django.contrib import admin
from musics.models import Music, Album, Genre

@admin.register(Music)
class MusicAdmin(admin.ModelAdmin):
    list_filter = ('title','artiste','album',)
    list_display = ('title','artiste','album',)
    
@admin.register(Album)
class AlbumAdmin(admin.ModelAdmin):
    list_filter = ('name','image',)
    list_display = ('name','image',)
    
@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('name',)}
    list_filter = ('name','image','color',)
    list_display = ('name','image','color',)