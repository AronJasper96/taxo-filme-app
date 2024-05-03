//@ts-nocheck 
//@ts-ignore
import sqlite3 from 'sqlite3';
import { filme } from '../models/filme';
import { popularTabelaFilmes } from './databaseService';
import { lerCSV } from '../services/filmeService';
const db = new sqlite3.Database(':memory:');

/**
 * Creates a table named "filmes" in the database if it doesn't already exist.
 *
 * @return {Promise<void>} A promise that resolves when the table is created successfully, or rejects with an error if there was a problem.
 */
export async function criarTabelaFilmes(): Promise<void> {
  return new Promise((resolve, reject) => {
    db.run(`CREATE TABLE IF NOT EXISTS filmes (
      id INTEGER PRIMARY KEY,
      year INTEGER,
      title TEXT,
      studios TEXT,
      producers TEXT,
      winner TEXT
    )`, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}
/**
 * Populates the "filmes" table in the database with data from a CSV file.
 *
 * @return {Promise<void>} A promise that resolves when the table is populated successfully, or rejects with an error if there was a problem.
 */
export async function popularTabelaFilmes(): Promise<void> {
  console.log("Populando tabela filmes...");
  try {
    // Ler os dados do arquivo CSV
    const filmes: filme[] = await lerCSV('./src/files/movielist.csv');
    await criarTabelaFilmes();

    // Inserir os dados na tabela filmes
    for (const filme of filmes) {
      await inserirFilme(filme);
    }
    console.log("Tabela filmes populada com sucesso!");
  } catch (error) {
    console.error("Erro ao popular tabela filmes:", error);
  }
}

/**
 * Inserts a film into the database.
 *
 * @param {filme} filme - The film object to be inserted.
 * @return {Promise<void>} A promise that resolves when the film is successfully inserted, or rejects with an error if there was a problem.
 */
async function inserirFilme(filme: filme): Promise<void> {
  return new Promise((resolve, reject) => {
    db.run(`INSERT INTO filmes (year, title, studios, producers, winner) VALUES (?, ?, ?, ?, ?)`,
      [filme.year, filme.title, filme.studios, filme.producers, filme.winner],
      (err) => {
        if (err) reject(err);
        else resolve();
      }
    );
  });
}


/**
 * Executes a query on the database and returns the result as an array of rows.
 *
 * @param {string} query - The SQL query to be executed.
 * @return {Promise<any[]>} A promise that resolves with an array of rows if the query is successful, or rejects with an error if there was a problem.
 */
export async function executarConsulta(query: string): Promise<any[]> {
  return new Promise((resolve, reject) => {
    db.all(query, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}
