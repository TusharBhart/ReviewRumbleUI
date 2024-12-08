import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './shared/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Review Rumble';

  constructor(matIconRegistry: MatIconRegistry, sanitizer: DomSanitizer, themeService: ThemeService) {
    themeService.loadSavedSettings();

    matIconRegistry.setDefaultFontSetClass('material-symbols-rounded');
    matIconRegistry.addSvgIcon(
      'github-icon',
      sanitizer.bypassSecurityTrustResourceUrl('github.svg'),
      { viewBox: '0 0 98 96' }
    );
    matIconRegistry.addSvgIcon(
      'github-pull-request',
      sanitizer.bypassSecurityTrustResourceUrl('github-pull-request.svg'),
      { viewBox: '0 0 16 16' }
    );
  }
}
