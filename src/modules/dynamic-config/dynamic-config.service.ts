import { RequestParams } from '@elastic/elasticsearch';
import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { DYNAMIC_CONFIG_OPTIONS } from './constants';
import { DynamicConfigReturn } from './interfaces';

/**
 * Sample interface for DynamicConfigService
 *
 * Customize this as needed to describe the DynamicConfigService
 *
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IDynamicConfigService {}

@Injectable()
/**
 *  You can remove the dependencies on the Logger if you don't need it.  You can also
 *  remove the `async test()` method.
 *
 *  The only thing you need to leave intact is the `@Inject(DYNAMIC_CONFIG_OPTIONS) private _dynamic-configOptions`.
 *
 *  That injected dependency gives you access to the options passed in to
 *  DynamicConfigService.
 *
 */
export class DynamicConfigService implements IDynamicConfigService {
  private readonly logger: Logger;
  constructor(
    @Inject(DYNAMIC_CONFIG_OPTIONS) private _DynamicConfigOptions,
    private readonly elasticsearchService: ElasticsearchService,
  ) {
    this.logger = new Logger('DynamicConfigService');
  }

  /**
   *
   * @param locationId Required: Location ID
   * @param key Optional: Get the value for this specific `key`
   */
  async getLocationConfig(locationId: number | string, key?: string): Promise<DynamicConfigReturn> {
    const options: RequestParams.Search = {
      index: 'configuration-location',
      size: 10000,
      body: {
        query: {
          bool: {
            must: [{ term: { locationId } }, ...(key && [{ term: { key: key.toLowerCase() } }])],
          },
        },
      },
    };

    const { body } = await this.elasticsearchService.search(options);

    const docs = body.hits.hits;

    if (docs.length === 0) {
      throw new NotFoundException('No configuration options found');
    }

    const parsedConfig = docs.reduce((accum, doc) => {
      const { key, value } = doc._source;
      return {
        ...accum,
        [key]: value,
      };
    }, {});

    return parsedConfig;
  }
}
