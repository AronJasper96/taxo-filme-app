import { Request, Response } from 'express';
import { executarConsulta } from '../services/databaseService';
/**
 * Retrieves the producers with the smallest and largest intervals between their wins.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<void>} A promise that resolves when the function is complete.
 */
export async function produtores(req: Request, res: Response): Promise<void> {
  try {
    const filmes = await executarConsulta(`SELECT * FROM filmes  WHERE winner = 'yes' ORDER BY producers ASC, year ASC`);
    let maxInterval = { producer: null, interval: -1, previousWin: null, followingWin: null };
    let minInterval = { producer: null, interval: Infinity, previousWin: null, followingWin: null };
    for (let i = 0; i < filmes.length - 1; i++) {
      const current = filmes[i];
      const next = filmes[i + 1];
  
      if (current.producers === next.producers) {
        const interval = next.year - current.year;
  
        // 3. Manter o controle do produtor com o maior e menor intervalo.
        if (interval > maxInterval.interval) {
          maxInterval.producer = current.producers;
          maxInterval.interval = interval;
          maxInterval.previousWin = current.year;
          maxInterval.followingWin = next.year;
        }
  
        if (interval < minInterval.interval) {
          minInterval.producer = current.producers;
          minInterval.interval = interval;
          minInterval.previousWin = current.year;
          minInterval.followingWin = next.year;
        }
      }
    }
  
    // 4. Ao final, retornar os resultados no formato especificado.
    const resultado = {
      min: [minInterval],
      max: [maxInterval]
    };
    res.status(200).json(resultado);
  } catch (error) {
    res.status(500).json(error);
  }
}
