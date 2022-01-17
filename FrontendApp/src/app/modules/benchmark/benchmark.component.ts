import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-benchmark',
  templateUrl: './benchmark.component.html',
  styleUrls: ['./benchmark.component.scss'],
})
export class BenchmarkComponent implements OnInit {
  minSizeOptions: { key: string; value: { x: number; y: number } }[] = [
    {
      key: 'small',
      value: { x: 1000, y: 4000 },
    },
    {
      key: 'medium',
      value: { x: 3000, y: 4000 },
    },
    {
      key: 'large',
      value: { x: 6000, y: 4000 },
    },
  ];

  photoQuantity: number[] = [1, 5, 15];

  form: FormGroup = this.fb.group({
    size: ['', Validators.required],
    quantity: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  public saveForm(): void {
    const formValue = this.form.value;

    console.log('formValue :>> ', formValue);
  }
}
