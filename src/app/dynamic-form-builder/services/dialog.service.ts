import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';


interface T extends Object { }

@Injectable({
    providedIn: 'root',
})
export class DialogService {
    configs = new MatDialogConfig();

    constructor(
        private dialog: MatDialog,
    ) {
        this.setDefaultConfigs();
    }

    private setDefaultConfigs(): void {

        this.configs.width = '60vw';
        this.configs.maxWidth = '850px';
        this.configs.hasBackdrop = true;
    }

    public config(configs: MatDialogConfig): DialogService {
        this.configs = configs;

        return this;
    }

    public resetConfig(): DialogService {
        this.setDefaultConfigs();

        return this;
    }

    public setData(data: any): DialogService {
        this.configs.data = data;

        return this;
    }

    public setPanelClass(panelClass: string | string[]): DialogService {
        this.configs.panelClass = panelClass;

        return this;
    }

    public open(content: ComponentType<T>): MatDialogRef<T> {
        return this.dialog.open(content, this.configs);
    }
}
