# CodingSchule - BilKart - Die Bilderkarten-Verwaltung
## Die BilKart App und was ich da lernen kann
Login|Kartenübersicht|Abfragespiel
----|----|----
![Login](https://user-images.githubusercontent.com/16017172/31615491-072004e0-b28a-11e7-8b13-380119916841.PNG) | ![Game](https://user-images.githubusercontent.com/16017172/31615492-0735f73c-b28a-11e7-838c-e9b13d604af1.PNG) | ![PlayGame](https://user-images.githubusercontent.com/16017172/31615493-074b2f12-b28a-11e7-9d7f-b6f96fc9a350.PNG)
[Verbindungsaufbau zu Firebase](https://firebase.google.com/docs/firestore/quickstart)| [Cards](https://ionicframework.com/docs/components/#cards) | [Slides](https://ionicframework.com/docs/api/components/slides/Slides/) und wie man den paginationBulletRender anpasst
[Offline Data](https://firebase.google.com/docs/firestore/manage-data/enable-offline) | [NavController / Page Lifecycle](https://ionicframework.com/docs/api/navigation/NavController/) |
[Input](https://ionicframework.com/docs/api/components/input/Input/)|[Daten lesen mit Firestore](https://firebase.google.com/docs/firestore/query-data/get-data)|
[Storage](https://ionicframework.com/docs/storage/)||
||
**Verwalten**|**Stapel bearbeiten**|**Karte bearbeiten**
![Verwalten](https://user-images.githubusercontent.com/16017172/31615494-076a4a64-b28a-11e7-9571-eda195a11aad.PNG)|![Stapel bearbeiten](https://user-images.githubusercontent.com/16017172/31615495-0782501e-b28a-11e7-8e85-38dc0221c7d1.PNG)|![Karte bearbeiten](https://user-images.githubusercontent.com/16017172/31615497-07d15d08-b28a-11e7-979a-76c31160a876.PNG)
[Lists](https://ionicframework.com/docs/api/components/list/List/)||
[Item Sliding](https://ionicframework.com/docs/api/components/item/ItemSliding/)||
[Fab Button](https://ionicframework.com/docs/api/components/fab/FabButton/)||
[Daten speichern mit Firestore](https://firebase.google.com/docs/firestore/manage-data/add-data)||
||
**Foto erstellen**||
![Foto erstellen](https://user-images.githubusercontent.com/16017172/31615498-07e76918-b28a-11e7-92a4-c8a7face14e2.PNG)||
[Camera](https://ionicframework.com/docs/native/camera/)||
[ActionSheetController](https://ionicframework.com/docs/api/components/action-sheet/ActionSheetController/)||
[ToastController](https://ionicframework.com/docs/api/components/toast/ToastController/)||

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