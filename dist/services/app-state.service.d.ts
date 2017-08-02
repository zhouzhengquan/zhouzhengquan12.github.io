import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
export declare class AppStateService {
    samplesLanguage: Subject<string>;
    error: BehaviorSubject<any>;
    loading: Subject<boolean>;
    initialized: BehaviorSubject<any>;
    rightPanelHidden: BehaviorSubject<any>;
    authModalOpened: BehaviorSubject<boolean>;
    searchContainingPointers: BehaviorSubject<string | null[]>;
    securities: BehaviorSubject<any>;
    openAuthModal(opened: any): void;
    startLoading(): void;
    stopLoading(): void;
}
