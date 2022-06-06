import { HuStore } from './hu-store';
import { UiStore } from './ui-store';

export class AppStore {
  huStore = new HuStore();
  uiStore = new UiStore();
}

export const appStore = new AppStore();
export const huStore=new HuStore();
export const uiStore = appStore.uiStore;
