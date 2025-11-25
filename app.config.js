import 'dotenv/config';

const baseConfig = require('./app.json');

export default () => ({
  ...baseConfig,
  expo: {
    ...baseConfig.expo,
    extra: {
      ...baseConfig.expo?.extra,
      openaiApiKey:
        process.env.EXPO_PUBLIC_OPENAI_API_KEY ||
        baseConfig.expo?.extra?.openaiApiKey ||
        ''
    }
  }
});

