import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { DYNAMIC_CONFIG_OPTIONS } from './constants';
import { createDynamicConfigProviders } from './dynamic-config.providers';
import { DynamicConfigService } from './dynamic-config.service';
import { ElasticsearchConfigService } from './elasticsearch-config.service';
import {
  DynamicConfigAsyncOptions,
  DynamicConfigOptions,
  DynamicConfigOptionsFactory,
} from './interfaces';

@Global()
@Module({
  providers: [DynamicConfigService],
  exports: [DynamicConfigService],
})
export class DynamicConfigModule {
  /**
   * Registers a configured DynamicConfig Module for import into the current module
   */
  public static register(options: DynamicConfigOptions): DynamicModule {
    return {
      module: DynamicConfigModule,
      providers: createDynamicConfigProviders(options),
    };
  }

  /**
   * Registers a configured DynamicConfig Module for import into the current module
   * using dynamic options (factory, etc)
   */
  public static registerAsync(options: DynamicConfigAsyncOptions): DynamicModule {
    return {
      module: DynamicConfigModule,
      imports: [
        ElasticsearchModule.registerAsync({
          useClass: ElasticsearchConfigService,
        }),
      ],
      providers: [...this.createProviders(options)],
      exports: [...this.createProviders(options)],
    };
  }

  private static createProviders(options: DynamicConfigAsyncOptions): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createOptionsProvider(options)];
    }

    return [
      this.createOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createOptionsProvider(options: DynamicConfigAsyncOptions): Provider {
    if (options.useFactory) {
      return {
        provide: DYNAMIC_CONFIG_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    // For useExisting...
    return {
      provide: DYNAMIC_CONFIG_OPTIONS,
      useFactory: async (optionsFactory: DynamicConfigOptionsFactory) =>
        await optionsFactory.createDynamicConfigOptions(),
      inject: [options.useExisting || options.useClass],
    };
  }
}
