import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Request } from '../types/permission';
import { CanItService } from '..';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[canIt]'
})
export class CanItDirective implements OnInit, OnDestroy {
  @Input() canIt: Request;

  private hasView = false;
  private subscription: Subscription;
  

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private canItService: CanItService
  ) { }

  ngOnInit(): void {
    this.subscription = this.canItService.can(this.canIt).subscribe(can => {
      if (can && !this.hasView) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.hasView = true;
        return;
      } 
      
      if (!can && this.hasView) {
        this.viewContainer.clear();
        this.hasView = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
