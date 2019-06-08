import { Component, OnDestroy } from '@angular/core';
import { TypedFormGroup, TypedFormControl } from './typed-form-classes';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface BasicFormObject {
  name: string;
  age: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  form: TypedFormGroup<BasicFormObject>;
  destroySubscriptions = new Subject();

  constructor() {
    this.form = new TypedFormGroup<BasicFormObject>({
      // the generic type here in `TypedFormControl` doesn't have to match the type of the key/value pair in `BasicFormObject`
      name: new TypedFormControl<string>(),
      age: new TypedFormControl<number>()
    });

    // use null instead of undefined? Because of `Must supply a value for form control with name: 'name'.` error
    // this.form.setValue({
    //   name: null,
    //   age: null
    // });

    // this.form.patchValue({
    //   name: null
    // });

    this.form.valueChanges.pipe(takeUntil(this.destroySubscriptions)).subscribe(bfo => {
      console.log(bfo);
    });

    console.log(this.form.value);
  }

  ngOnDestroy() {
    this.destroySubscriptions.next();
    this.destroySubscriptions.complete();
  }
}
