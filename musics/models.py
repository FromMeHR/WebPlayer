import math
from django.db import models
from colorfield.fields import ColorField
from django.utils.text import slugify


from musics.utils import get_audio_length
from musics.validators import validate_is_audio

class Genre(models.Model):
    COLOR_PALETTE = [
        ("#FFFFFF", "white", ),
        ("#000000", "black", ),
    ]
    name = models.CharField(max_length=50)
    image = models.ImageField(upload_to='images_of_genres')
    color = ColorField(default='#FF0000', samples=COLOR_PALETTE)
    slug = models.SlugField(max_length=200, unique=True, blank=True, null=True)
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        return super().save(*args, **kwargs)
    
    class Meta:
        db_table = 'genre'
        verbose_name = 'Genre'
        verbose_name_plural = 'Genres'

    def __str__(self):
        return self.name

class Album(models.Model):
    name=models.CharField(max_length=400)
    image=models.ImageField(upload_to='images_of_albums')
    
    class Meta:
        db_table = 'album'
        verbose_name = 'Album'
        verbose_name_plural = 'Albums'
    
    def __str__(self):
        return self.name

class Music(models.Model):
    title=models.CharField(max_length=100)
    artiste=models.CharField(max_length=50, unique=True)
    genre = models.ForeignKey(to=Genre, on_delete=models.SET_NULL, blank=True, null=True)
    album=models.ForeignKey(to=Album, on_delete=models.SET_NULL, blank=True, null=True)
    time_length=models.DecimalField(max_digits=20, decimal_places=2, blank=True)
    music=models.FileField(upload_to='musics', validators=[validate_is_audio])
    image=models.ImageField(upload_to='images_of_musics')
    
    class Meta:
        db_table = 'music'
        verbose_name = 'Music'
        verbose_name_plural = 'Musics'
        ordering = ("id",)
        
    def save(self, *args, **kwargs):
        if not self.time_length:
            audio_length = get_audio_length(self.music)
            self.time_length = audio_length
        return super().save(*args, **kwargs)
    
    def time_formatter(self):
        time = int(self.time_length)
        min = math.floor((time % 3600)/60)
        sec = math.floor(time % 60)
        if sec < 10:
            sec = f'0{sec}'
        return f'{min}:{sec}'
    
    def __str__(self):
        return f'{self.title} Artiste: {self.artiste}'
