import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { MonacoLoaderService } from '@app/core/monaco-loader.service';

@Directive({
  selector: '[appMonacoLoader]'
})
export class MonacoLoaderDirective {
  @Input() set loadMonacoEditor(value: any) {
    this.monacoLoaderService.monacoPath = value;
  }

  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef, private monacoLoaderService: MonacoLoaderService) {
    monacoLoaderService.isMonacoLoaded.subscribe(isLoaded => {
      if (isLoaded) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
      else {
        this.viewContainer.clear();
      }
    });
  }

}
