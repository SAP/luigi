import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

/**
 * This component is using Angular router to navigate between routes
 */

@Component({
  selector: 'app-nav-sync',
  templateUrl: './nav-sync.component.html',
  styleUrls: ['./nav-sync.component.css']
})
export class NavSyncComponent implements OnInit, OnDestroy {
  segments: String[] = ['one', 'two', 'three', 'four'];
  currentSegment: String;
  nextSegment: String;
  subs: Subscription = new Subscription();

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.subs.add(
      this.route.url.subscribe(
        segments => {
          this.currentSegment = segments[segments.length - 1].path;
          const nextIndex = this.segments.indexOf(this.currentSegment) + 1;
          this.nextSegment = this.segments[nextIndex] ? this.segments[nextIndex] : this.segments[0];
        },
        err => {}
      )
    );
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
