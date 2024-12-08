import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public currentTheme = signal('light');
  public currentThemeColor = signal('spring-green');

  loadSavedSettings() {
    const savedTheme = localStorage.getItem('theme');
    const savedThemeColor = localStorage.getItem('themeColor');
    if (savedTheme) {
      this.setTheme(savedTheme);
    }
    if (savedThemeColor) {
      this.setThemeColor(savedThemeColor);
    }
  }

  setTheme(theme: string) {
    this.currentTheme.set(theme);
    this.updateSetting('theme', theme, '-theme');
  }

  setThemeColor(color: string) {
    this.currentThemeColor.set(color);
    this.updateSetting('themeColor', color, '-color');
  }

  private updateSetting(
    localStorageKey: string,
    value: string,
    suffix: string
  ) {
    localStorage.setItem(localStorageKey, value);

    document.documentElement.classList.forEach((className) => {
      if (className.endsWith(suffix)) {
        document.documentElement.classList.remove(className);
      }
    });

    if (value !== (localStorageKey === 'theme' ? 'light' : 'spring-green')) {
      document.documentElement.classList.add(`${value}${suffix}`);
    } else {
      localStorage.removeItem(localStorageKey);
    }
  }
}