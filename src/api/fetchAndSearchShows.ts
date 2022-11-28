import { Routes } from '@/constants/routes.constant';
import type { Show, ShowSearch } from './models';

const headers = {
  headers: {
    Accept: 'application/json',
  },
};

export async function fetchSingleShow(id: number): Promise<Show> {
  const url = `${Routes.apiShows}/${id}`;
  const response = await fetch(url, headers);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}

export async function fetchSearchShows(search: string): Promise<Show[]> {
  const params = new URLSearchParams({
    q: search,
  }).toString();

  const url = `${Routes.apiSearchShows}?${params}`;
  const response = await fetch(url, headers);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const json = await response.json();
  return json.map((item: ShowSearch): Show => item.show);
}

export async function fetchShows(page: number): Promise<Show[]> {
  const params = new URLSearchParams({
    page: page as unknown as string,
  }).toString();

  const url = `${Routes.apiShows}?${params}`;
  const response = await fetch(url, headers);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}