/* Dependencies */
import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import { DynamicConfigOptionsFactory } from './dynamic-config-options-factory.interface';
/* Interfaces */
import { DynamicConfigOptions } from './dynamic-config-options.interface';

export interface DynamicConfigAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useExisting?: Type<DynamicConfigOptionsFactory>;
  useClass?: Type<DynamicConfigOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<DynamicConfigOptions> | DynamicConfigOptions;
}
