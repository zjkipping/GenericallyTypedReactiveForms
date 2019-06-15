import { FormGroup, AbstractControl, ValidatorFn, AbstractControlOptions, AsyncValidatorFn, FormControl, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

export type ValidatorOrOptsType = ValidatorFn | ValidatorFn[] | AbstractControlOptions | null;
export type AsyncValidatorType = AsyncValidatorFn | AsyncValidatorFn[] | null;

export abstract class TypedAbstractControl<T> extends AbstractControl {
  // Would I need to just recreate this abstract class with the generic as the type instead of `any`s?
  // If that's the case should I recreate the FormControl/Group/Array using this new abstract?
}

export class TypedFormArray<T> extends FormArray {
  value!: T[];
  valueChanges!: Observable<T>;

  setValue(value: T[]) {
    super.setValue(value);
  }

  patchValue(
    value: T[],
    options?: {
      onlySelf?: boolean | undefined;
      emitEvent?: boolean | undefined;
    } | undefined
  ) {
    super.patchValue(value, options);
  }

  constructor(
    controls: TypedAbstractControl<T>[],
    validatorOrOpts?: ValidatorOrOptsType,
    asyncValidator?: AsyncValidatorType
  ) {
    super(controls, validatorOrOpts, asyncValidator);
  }
}

export class TypedFormControl<T> extends FormControl {
  value!: T | null;
  valueChanges!: Observable<T>;

  // use null instead of undefined? Because of `Must supply a value for form control with name: 'name'.` error
  setValue(value: T | null) {
    super.setValue(value);
  }

  patchValue(
    value: T,
    options?: {
      onlySelf?: boolean | undefined;
      emitEvent?: boolean | undefined;
    } | undefined
  ) {
    super.patchValue(value, options);
  }

  constructor(
    formState?: T,
    validatorOrOpts?: ValidatorOrOptsType,
    asyncValidator?: AsyncValidatorType
  ) {
    super(formState, validatorOrOpts, asyncValidator);
  }
}

export class TypedFormGroup<T> extends FormGroup {
  value!: T;
  valueChanges!: Observable<T>;

  // use null instead of undefined? Because of `Must supply a value for form control with name: 'name'.` error
  setValue(value: { [K in keyof T]: T[K] | null }) {
    super.setValue(value);
  }

  patchValue(
    value: Partial<T>,
    options?: {
      onlySelf?: boolean | undefined;
      emitEvent?: boolean | undefined;
    } | undefined
  ) {
    super.patchValue(value, options);
  }

  constructor(
    // using `TypedAbstractControl` here means that TS won't inforce a that the generic type matches the `T[K]`
    controls: { [K in keyof T]: TypedAbstractControl<T[K]> },
    validatorOrOpts?: ValidatorOrOptsType, asyncValidator?: AsyncValidatorType) {
    super(controls, validatorOrOpts, asyncValidator);
  }
}
