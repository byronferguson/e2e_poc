```
DynamicConfigModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        cloudId: configService.get<string>('ELASTIC_SEARCH_CLOUD_ID'),
        username: configService.get<string>('ELASTIC_SEARCH_CLOUD_USERNAME'),
        password: configService.get<string>('ELASTIC_SEARCH_CLOUD_PASSWORD'),
      }),
    }),
```
