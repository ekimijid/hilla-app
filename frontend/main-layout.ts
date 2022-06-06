import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/app-layout';
import '@vaadin/app-layout/vaadin-drawer-toggle.js';
import { views } from 'Frontend/routes';
import { uiStore } from './stores/app-store';
import {Layout} from "Frontend/views/view";

@customElement('main-layout')
export class MainLayout extends Layout {
  connectedCallback() {
    super.connectedCallback();
    this.classList.add('flex', 'h-full', 'w-full');
  }

  render() {
    return html`
      <vaadin-app-layout class="h-full w-full">
        <header slot="navbar" class="w-full flex items-center px-m">
          <vaadin-drawer-toggle></vaadin-drawer-toggle>
          <vaadin-horizontal-layout>
            <div>
              <h1 class="text-l m-m">The Hunnu Food</h1>
            </div>
           <div >
             <a href="/logout" class="ms-auto" ?hidden=${uiStore.offline}> Log out </a>
           </div>
         
          </vaadin-horizontal-layout>
        </header>

        <div slot="drawer">
          <div class="flex flex-col h-full m-l spacing-b-s">
            ${views.map((view) => html` <a href=${view.path}> ${view.title} </a> `)}
          </div>
        </div>
        <div class="h-full">
          <slot><!-- The router puts views here --></slot>
        </div>
      </vaadin-app-layout>
    `;
  }
}
