import { initNeoletterFormWidgets } from 'scrivito-neoletter-form-widgets';
import.meta.glob(['./**/*WidgetClass.ts', './**/*WidgetComponent.tsx'], {
  eager: true,
})
//TODO: remove instanceId
initNeoletterFormWidgets("your instanceId goes here");
export { }
