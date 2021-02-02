import { DAYS_AGO_TIMESTAMP } from '../constants/constants';

export default function getDatesForNewsApi() {
  const today = new Date();
  const fromMs = new Date(today.getTime() - DAYS_AGO_TIMESTAMP);
  const from = fromMs.toISOString().substr(0, 10);
  const to = today.toISOString().substr(0, 10);

  return { from, to };
}
