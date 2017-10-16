import { Component } from '@angular/core';

import { GamePage } from '../game/game';
import { ManagePage } from '../manage/manage';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = GamePage;
  tab2Root = ManagePage;

  constructor() {

  }

}
