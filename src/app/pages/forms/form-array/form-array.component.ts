import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

interface FormField {
  label?: string | null;
  name?: string | null;
  description?: string | null;
  optional?: boolean | null;
  type?: string | null;
  values?: any[] | null;
}

@Component({
  selector: 'app-form-array',
  templateUrl: './form-array.component.html',
  styleUrls: ['./form-array.component.scss'],
})
export class FormArrayComponent implements OnInit {
  types: any[] = [
    'text',
    'email',
    'textarea',
    'number',
    'checkbox',
    'radio',
    'select',
    'date',
    'url',
    'color',
    'file',
  ];

  inputValue: string = ''

  field: FormField;
  previewForm = this.formBuilder.group({
    value: ['John Doe'],
  });

  nameFormat = '^[a-z_]{4,15}$';

  form = this.formBuilder.group({
    label: ['', [Validators.required]],
    name: ['', [Validators.required, Validators.pattern(this.nameFormat)]],
    description: [''],
    type: ['', [Validators.required]],
    optional: [false],
    values: [[]],
  });

  constructor(private formBuilder: FormBuilder) {
    this.field = this.form.value;
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe((data) => {
      setTimeout(() => {
        if (
          !['checkbox', 'radio', 'select'].includes(
            this.form.get('type')?.value!
          )
        ) {
          this.form.get('values')?.patchValue([] as any);
        }
        if (
          this.form.get('type')?.value == 'checkbox' &&
          this.previewForm.get('value')?.value!.constructor != Array
        ) {
          this.previewForm.get('value')?.patchValue([] as any);
        }
        if (this.form.get('optional')?.value) {
          this.previewForm.get('value')?.clearValidators();
        } else {
          this.previewForm.get('value')?.addValidators(Validators.required);
        }
      });
      this.field = data;
    });
  }

  addValue() {
    if (this.inputValue && this.inputValue.length > 0) {
      let values: any = this.form.get('values')?.value;
      if (values && values.constructor === Array) {
        values.push(this.inputValue);
      } else {
        values = [this.inputValue];
      }
      this.form.get('values')?.patchValue(values);
    }
  }

  save() {

  }

  removeValue(index: any) {
    let values: any = this.form.get('values')?.value;
    values.splice(index, 1);
    this.form.get('values')?.patchValue(values);
  }

  onCheckboxChange(event: any) {
    const checkedboxes: any = this.previewForm.get('value')?.value;
    if (checkedboxes && checkedboxes.constructor === Array) {
      if (event.target.checked) {
        checkedboxes.push(event.target.value);
      } else {
        const index = checkedboxes.findIndex((x) => x === event.target.value);
        checkedboxes.splice(index, 1);
      }
    }
  }

  get getValue() {
    const value: any = this.previewForm.get('value')?.value;
    if (this.field.type == 'file') {
      const split = value.split('\\');
      return split[split.length - 1];
    }
    return value;
  }
}
