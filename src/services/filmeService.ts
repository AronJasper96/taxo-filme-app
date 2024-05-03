import { filme } from '../models/filme';
import fs from 'fs';
import csvParser from 'csv-parser';

/**
 * Reads a CSV file located at the given path and returns an array of `filme` objects.
 *
 * @param {string} path - The path to the CSV file.
 * @return {Promise<filme[]>} A promise that resolves to an array of `filme` objects.
 */
export async function lerCSV(path: string): Promise<filme[]> {
  const movielist: filme[] = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(path)
      .pipe(csvParser()) 
      .on('data', (row: { [key: string]: string }) => {
        const result: { [key: string]: any } = {}; 
              const headers = Object.keys(row)[0].split(';');
              let values = Object.values(row).slice(0).join('');
                values = values.split('\n')[0];
                const dados = values.split(';');
          headers.forEach((header, index) => {
              result[header] = dados[index];
          });
      if (result.winner === null || result.winner === undefined) {
        result.winner = ''; 
      }
      const newFilme: filme = {
        year: result.year,
        title: result.title,
        studios: result.studios,
        producers: result.producers,
        winner: result.winner
      };
        movielist.push(newFilme);
      })
      .on('end', () => {
        resolve(movielist);
      })
      .on('error', (err) => {
        reject(err);
      });
  });
}
