import { EventData, Page } from '@nativescript/core';
import { TaskHistoryViewModel } from './task-history-view-model';

export function navigatingTo(args: EventData) {
    const page = <Page>args.object;
    page.bindingContext = new TaskHistoryViewModel();
}