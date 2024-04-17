# USER MANUAL

This document details the correct usage of the web application constantly up and running [here](https://spotisaver.vercel.app/ "Spotisaver Web Application"). If you are looking for the instructions on how to clone this repository and get your own local server going, check [this manual](./installation_manual.md "Installation Manual").

## General

The application is divided into 4 different pages. You may navigate through 3 of these with the help of the navigation bar located at the top of the screen. The page for analyzing can be through the form on the Home page. Alternatively, route "/analyze" may be inserted straight to the address bar.

### HOME

_Home page_ is the landing page of the website. By giving a valid _Spotify playlist URL_ or _ID_, you may immediately analyze it by pressing the big button. Note! Invalid URLs, or URLs to albums or any other media, will not get through the processing stage. You will be notified with an error message in such case.

### ANALYZE

The _Analyze page_ will provide you with numerous interesting details about your playlist. You may see, of course, all the basic information, like playlist owner and total number of followers, but additionally also information about the most popular artist, oldest and youngest song, etc. will be displayed here. The first 10 tracks of the playlist will be also visible. Read more about the [track list](./user_manual.md#track-list).

### EXPORT

The _Export page_ will parse the complete track list of a given playlist, and prepare it for you in two different file formats; JSON and CSV. You may additionally choose between a more simplified and concise version, or a highly detailed version.

The simpler format will list **track name**, **artists**, **release date**, and **album**. The detailed version, on the other hand, will provide you with a myriad of additional information, such as **who added the song**, **when was it added**, **album type**, **album total tracks**, **URLs for the song source** and **cover art** , and much, much more!

### ABOUT

The _About page_ contains a brief informative text about the project and a shorted user manual for intended use-cases.

## Track List

The track list has a different look depending on whether displayed on the [Analyze page](./user_manual.md#analyze) or [Export page](./user_manual.md#export). On the Analyze page, only 10 songs will be displayed not to keep the page simple, short, and concise. However, while on the Export page, up to 100 songs will be shown as the page does not contain much more information.

Displayed information on the track list will change dynamically depending on the screen size. On a smaller screen, only track name and artist will be shown. On a larger screen, also the album and release date can be seen.

Every title and name on the track list is a hyperlink linking straight to the origin on Spotify.

## Rate Limiter

The web application is protected by a middleware utilizing a very rudimentary rate limiter. So do not get too excited while analyzing your tracks, or the server might apply some breaks!
