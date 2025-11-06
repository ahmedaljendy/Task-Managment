import { dbConfig } from './db.config.js';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource(dbConfig as any);
