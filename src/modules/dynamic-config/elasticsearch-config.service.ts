import { Inject } from '@nestjs/common';
import { ElasticsearchModuleOptions, ElasticsearchOptionsFactory } from '@nestjs/elasticsearch';
import { DYNAMIC_CONFIG_OPTIONS } from './constants';

export class ElasticsearchConfigService implements ElasticsearchOptionsFactory {
  constructor(@Inject(DYNAMIC_CONFIG_OPTIONS) private readonly dynamicConfigOptions) {}

  createElasticsearchOptions(): ElasticsearchModuleOptions {
    return {
      cloud: {
        id: this.dynamicConfigOptions.cloudId,
      },
      auth: {
        username: this.dynamicConfigOptions.username,
        password: this.dynamicConfigOptions.password,
      },
    };
  }
}
