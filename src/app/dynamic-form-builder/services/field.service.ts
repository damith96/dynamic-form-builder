import { Subject } from 'rxjs';

type FieldData = {
  value: any,
  fieldName: string
}
export class FieldService {
    public readOnly = new Subject<FieldData>();
    public required = new Subject<FieldData>();
    public valueChange = new Subject<FieldData>();
    public visibility = new Subject<FieldData>();
}
