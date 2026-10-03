import test from 'node:test';
import assert from 'node:assert/strict';

import { ALCOHOL_OPTIONS, RESTING_ECG_OPTIONS, SLOPE_OPTIONS } from './metrics.ts';

test('frontend metric enums match the backend contract expected by /predict', () => {
  assert.deepEqual(SLOPE_OPTIONS, ['Up', 'Flat', 'Down']);
  assert.deepEqual(ALCOHOL_OPTIONS, ['None', 'Low', 'Moderate', 'High']);
  assert.deepEqual(RESTING_ECG_OPTIONS, ['Normal', 'Abnormal']);
});
