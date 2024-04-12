import { initNeoletterFormWidgets } from 'scrivito-neoletter-form-widgets';
import.meta.glob(['./**/*WidgetClass.ts', './**/*WidgetComponent.tsx'], {
  eager: true,
})

initNeoletterFormWidgets("your instanceId goes here");
export { }
