import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  public showSpinner = signal(false);

  public show() {
    this.showSpinner.set(true);
  }

  public hide() {
    this.showSpinner.set(false);
  }
}
