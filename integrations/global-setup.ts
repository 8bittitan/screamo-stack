import type { FullConfig } from '@playwright/test';
require('dotenv').config();

async function globalConfig(config: FullConfig) {}

export default globalConfig;
