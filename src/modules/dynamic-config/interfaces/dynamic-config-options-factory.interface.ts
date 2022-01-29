import { DynamicConfigOptions } from './dynamic-config-options.interface';

export interface DynamicConfigOptionsFactory {
  createDynamicConfigOptions(): Promise<DynamicConfigOptions> | DynamicConfigOptions;
}
