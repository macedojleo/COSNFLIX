import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UtilityService {
    public _router: Router;

    public apiContainer = {
        'movieList': {
            url: 'movielist'
        }
    };

    constructor(router: Router) {
        this._router = router;
    }

    public navigate(path: string) {
        this._router.navigate([path]);
    }

    public navigateToSignIn() {
        window.location.href = 'Account/Logout';
    }


    public getItemsByStatus(data: any[], status: string): any {
        return data ? data.filter(item => item['status'] === status) : [];
    }

    public handleResponse(data: any[], insert?: any[], insertMapper?: any[]) {
        if (insert && insertMapper) {
            insert.forEach(element => {
                const position = this.getPosition(insertMapper, element);
                data[position]['id'] = element['insert']['id'];
            });
        }
        data.forEach(element => {
            element['dirty'] = false;
            if (element['status'] !== 'DELETE') {
                element['status'] = undefined;
                element['isDel'] = undefined;
            }
        });
    }

    public getPosition(array: any[], element: any) {
        for (const item of array) {
            if (item.token === element.token) {
                return item.idx;
            }
        }
        return -1;
    }
}
