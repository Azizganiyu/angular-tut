import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { FormField } from '../form-array/form-array.component';

interface Files {
  key: string;
  ext: string;
  file: File;
}

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit {
  @Input() fields: FormField[] = [];
  files: Files[] = [];
  @Output() stateChange: any = new EventEmitter<any>();

  form = this.formBuilder.group({
    entries: this.formBuilder.array([]),
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.getForms();

    this.form.get('entries')?.valueChanges.subscribe((data) => {
      let values: any[] = [];
      data.forEach((x: any) => {
        if (x.type != 'file') {
          values.push({
            key: x.name,
            label: x.label,
            type: x.type,
            value: x.value,
          });
        }
      });
      setTimeout(() => {
        this.stateChange.emit({
          data: values,
          status: this.form.valid,
          files: this.files,
        });
      });
    });
  }

  fileProgress(fileInput: any, i: any) {
    let nameArr = fileInput.target.files[0]?.name.split('.');
    let ext = nameArr[nameArr.length - 1];
    // console.log(fileInput.target.files[0])
    let key = this.entries.controls[i].get('name')?.value;
    // console.log(key)
    let indexExist = false;
    let index = 0;
    this.files.forEach((item, i) => {
      if (item.key == key) {
        index = i;
        indexExist = true;
      }
    });
    if (indexExist) {
      this.files[index].file = <File>fileInput.target.files[0];
      this.files[index].ext = ext;
    } else {
      this.files.push({
        key,
        ext,
        file: <File>fileInput.target.files[0],
      });
    }
    // console.log(this.files)
  }

  get entries() {
    return this.form.get('entries') as FormArray;
  }

  getForms() {
    console.log(this.fields)
    this.fields.forEach((item) => {
      const control = this.formBuilder.group({
        name: [item.name],
        label: [item.label],
        type: [item.type],
        optional: [item.optional],
        description: [item.description],
        values: [item.values],
        value:
          item.type == 'checkbox'
            ? item.optional
              ? [[]]
              : [[], [Validators.required]]
            : item.optional
            ? ['']
            : ['', [Validators.required]],
      });
      this.entries.push(control);
    });
  }

  onCheckboxChange(event: any, i: any) {
    const checkedboxes = this.entries.controls[i].get('value')?.value;
    if (checkedboxes && checkedboxes.constructor === Array) {
      if (event.target.checked) {
        checkedboxes.push(event.target.value);
        this.entries.controls[i].get('value')?.patchValue(checkedboxes);
      } else {
        const index = checkedboxes.findIndex((x) => x === event.target.value);
        checkedboxes.splice(index, 1);
        this.entries.controls[i].get('value')?.patchValue(checkedboxes);
      }
    }
  }

  checked(value: string, i: any) {
    const checkedboxes = this.entries.controls[i].get('value')?.value;
    if (checkedboxes && checkedboxes.constructor === Array) {
      if (checkedboxes.includes(value)) {
        return true;
      }
    }
    return false;
  }
}
