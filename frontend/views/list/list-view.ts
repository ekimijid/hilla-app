import {html,  render} from 'lit';
import {customElement} from 'lit/decorators.js';
import {View} from 'Frontend/views/view';
import {huStore, uiStore} from 'Frontend/stores/app-store';
import '@vaadin/notification';
import '@vaadin/text-field';
import '@vaadin/button';
import '@vaadin/grid';
import '@vaadin/grid/vaadin-grid-column';
import '@vaadin/horizontal-layout';
import './food-form'
import '@vaadin/avatar';
import {listViewStore} from './list-view-store';
import {GridItemModel} from "@vaadin/grid";
import Food from "Frontend/generated/be/pxl/italent/hillaapp/data/entity/Food";

@customElement('list-view')
export class ListView extends View {
    render() {
        console.log(huStore.foods)
        return html`
            <div class="toolbar flex gap-s">
                <vaadin-text-field
                        placeholder="Filter by name"
                        .value=${listViewStore.filterText}
                        @input=${this.updateFilter}
                        clear-button-visible></vaadin-text-field>
                <vaadin-button @click=${listViewStore.editNew}>
                    Add Food
                </vaadin-button>
            </div>
            <div class="content flex gap-m h-full">
                <vaadin-grid
                        class="grid h-full"
                        .items=${listViewStore.filteredFoods}
                        .selectedItems=${[listViewStore.selectedFood]}
                        @active-item-changed=${this.handleGridSelection}>
                    <vaadin-grid-column path="foodName" auto-width></vaadin-grid-column>
                    <vaadin-grid-column path="description" auto-width></vaadin-grid-column>
                    <vaadin-grid-column path="prijs" auto-width></vaadin-grid-column>
                    <vaadin-grid-column header="Image" .renderer="${this.imageRenderer}" flex-grow="10" auto-width
                    ></vaadin-grid-column>
                </vaadin-grid>
                <food-form
                        class="flex flex-col gap-s"
                        ?hidden=${!listViewStore.selectedFood}></food-form>
            </div>
            <vaadin-notification
                    theme=${uiStore.message.error ? 'error' : 'contrast'}
                    position="bottom-start"
                    .opened=${uiStore.message.open}
                    .renderer=${(root: HTMLElement) =>
                            (root.textContent = uiStore.message.text)}>
            </vaadin-notification>
        `;
    }

    // vaadin-grid fires a null-event when initialized. Ignore it.
    firstSelectionEvent = true;

    handleGridSelection(e: CustomEvent) {
        if (this.firstSelectionEvent) {
            this.firstSelectionEvent = false;
            return;
        }
        listViewStore.setSelectedFood(e.detail.value);
    }

    updateFilter(e: { target: HTMLInputElement }) {
        listViewStore.updateFilter(e.target.value);
    }

    imageRenderer = (root: HTMLElement, _: HTMLElement, model: GridItemModel<Food>) => {
        const food = model.item;
        render(
            html`
                "<div><img style='height: 100px; width: 100px;' src="${food.image}" alt=${food.foodName}/></div>
            `,
            root
        );
    };

    connectedCallback() {
        super.connectedCallback();
        this.classList.add(
            'box-border',
            'flex',
            'flex-col',
            'p-m',
            'gap-s',
            'w-full',
            'h-full'
        );

        this.autorun(() => {
            if (listViewStore.selectedFood) {
                this.classList.add('editing');
            } else {
                this.classList.remove('editing');
            }
        });
    }
}