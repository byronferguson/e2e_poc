import { DYNAMIC_CONFIG_OPTIONS } from './constants';
import { DynamicConfigOptions } from './interfaces';

export function createDynamicConfigProviders(options: DynamicConfigOptions) {
  return [
    {
      provide: DYNAMIC_CONFIG_OPTIONS,
      useValue: options,
    },
  ];
}
