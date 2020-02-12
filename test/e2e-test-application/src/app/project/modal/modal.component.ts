import {
  Component,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  SimpleChanges
} from '@angular/core';

import { uxManager } from '@kyma-project/luigi-client';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnChanges {
  @Input() public modalActive: boolean;
  @Output() private modalClosed: EventEmitter<null>;

  public constructor() {
    this.modalClosed = new EventEmitter<null>();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.modalActive.currentValue === true) {
      this.openModal();
    }
  }

  private openModal() {
    uxManager().addBackdrop();
  }

  public onCloseModalClick() {
    this.modalClosed.emit();
    uxManager().removeBackdrop();
  }
}
