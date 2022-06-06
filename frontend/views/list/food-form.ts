import {customElement} from "lit/decorators.js";
import {View} from "Frontend/views/view";
import {Binder, field} from "@hilla/form";
import {listViewStore} from "Frontend/views/list/list-view-store";
import {html} from "lit";
import {huStore, uiStore} from "Frontend/stores/app-store";
import FoodModel from "Frontend/generated/be/pxl/italent/hillaapp/data/entity/FoodModel";

@customElement('food-form')
export class FoodForm extends View {
    protected binder = new Binder(this, FoodModel);

    constructor() {
        super();
        this.autorun(() => {
            if (listViewStore.selectedFood) {
                this.binder.read(listViewStore.selectedFood);
            } else {
                this.binder.clear();
            }
        });
    }

    render() {
        const { model } = this.binder;

        return html`
      <vaadin-text-field
        label="Food name"
        ?disabled=${uiStore.offline}
        ${field(model.foodName)}></vaadin-text-field>
      <vaadin-text-field
        label="Description"
        ?disabled=${uiStore.offline}
        ${field(model.description)}></vaadin-text-field>
      <vaadin-text-field
        label="Prijs"
        ?disabled=${uiStore.offline}
        ${field(model.prijs)}></vaadin-text-field>

      <vaadin-text-field
              label="Image url"
              ?disabled=${uiStore.offline}
              ${field(model.image)}></vaadin-text-field>

      <div class="flex gap-s">
        <vaadin-button
          theme="primary"
          ?disabled=${this.binder.invalid || uiStore.offline}
          @click=${this.save}>
          ${this.binder.value.id ? 'Save' : 'Create'}
        </vaadin-button>
        <vaadin-button
          theme="error"
          ?disabled=${!this.binder.value.id || uiStore.offline}
          @click=${listViewStore.delete}>
          Delete
        </vaadin-button>
        <vaadin-button theme="tertiary" @click=${listViewStore.cancelEdit}>
          Cancel
        </vaadin-button>
      </div>
    `;
    }

    async save() {
        await this.binder.submitTo(listViewStore.save);
        this.binder.clear();
    }
}
