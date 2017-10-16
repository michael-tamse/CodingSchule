# CodingSchule - BilKart - Die Bilderkarten-Verwaltung
## google Firebase
![createProject](https://user-images.githubusercontent.com/16017172/31603964-1a5b5834-b262-11e7-8250-1eb134da9f73.png)
"BilKart" als Projekt hinzufügen.

![createProject](https://user-images.githubusercontent.com/16017172/31603965-1a8cbfb4-b262-11e7-9126-6527f3fce9ff.png)
![createProject](https://user-images.githubusercontent.com/16017172/31603966-1aa9ae6c-b262-11e7-81c4-3ae7e658eeab.png)
In die Projekteinstellungen wechseln und unten rechts auf "Firebase zu meiner Web-App hinzufügen" klicken.

![createProject](https://user-images.githubusercontent.com/16017172/31603967-1ac5e244-b262-11e7-8c9f-a73523c307b9.png)
Firebase Einstellungen kopieren oder aufschreiben. Diese Infos werden in der App als erstes abgefragt. Mit diesen Informationen verbindet sich die App gegen google Firebase. (Achtung! Aktuell ohne Autorisierung, daher müssen noch nachfolgende Schritte erfolgen.)

![securityStorage](https://user-images.githubusercontent.com/16017172/31603968-1afd8384-b262-11e7-96c0-8a48c035774e.png)
Storage Security ausschalten.

![securityDatabase](https://user-images.githubusercontent.com/16017172/31603969-1b189ea8-b262-11e7-85ae-6e4cf1428ba6.png)
Cloud Firestore Security ausschalten.

## Ionic
### lokal replizieren
```sh
$ git clone https://github.com/michael-tamse/CodingSchule.git
```

### lokal starten
```sh
$ cd CodingSchule
$ ionic lab
```
### in dem Ionic Viewer starten
```sh
$ ionic link
$ ionic upload
```
und anschliessend in die Ionic View App gehen, sync, fertig :)