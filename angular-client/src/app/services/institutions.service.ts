import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DataService } from './data.service';
import { UtilityService } from './utility.service';

@Injectable()
export class InstitutionsService {

    private apiUrl: string;

    constructor(private dataService: DataService,
        private utilityService: UtilityService) {
        this.apiUrl = this.dataService.requestUrlBuilder(this.utilityService.apiContainer['institutionsAggregate'].url);
    }

    public getInstitutions(skip: number, take: number) {
        return this.dataService.get(this.apiUrl);
    }

}
