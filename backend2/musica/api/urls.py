from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("home-data/", views.homeData, name="homeData"),
    path("music-generation/", views.musicGeneration, name="musicGeneration"),
    path("lyrics-generation/", views.lyricsGeneration, name="lyricsGeneration"),
    path("song-details-fetch/", views.songDetailsFetch, name="songDetailsFetch"),
    path("cors-proxy/", views.corsProxy, name="corsProxy"),
]
