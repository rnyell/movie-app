import { MOVIE_GENRES, TV_GENRES } from "./apis";


interface FetchParams {
  
}

interface Genres {
  id: number;
  name: string;
}


export async function extendedFetch(
  base: string,
  path: string = "",
  params = {}
): Promise<any> {
  const url = new URL(path, base);
  Object.keys(params).forEach((param) =>
    url.searchParams.set(param, params[param])
  );

  try {
    const res = await fetch(url);
    const data = res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}


export function formatRuntime(runtime: number): string {
  const hours = Math.trunc(runtime / 60);
  const mins = runtime % 60;
  const formatted =
    hours === 0
      ? `${mins} m`
      : mins === 0
      ? `${hours} h`
      : `${hours} h ${mins} m`;
  return formatted;
}


export function formatRate(rate: number) {
  let rounded = Math.round(rate * 10) / 10;
  if (String(rounded).length === 1) {
    return `${rounded}.0`;
  }
  return rounded;
}


export function getMovieGenres(genres: Genres[]): string {
  let returnValue = "";

  genres.forEach((genre) => {
    if (genre.name === "Science Fiction") {
      returnValue += "Sci-Fi, ";
      return;
    }
    returnValue += `${genre.name}, `;
  });

  return returnValue.slice(0, -2);
}


export function getMovieGenresBaseOnIds(type: "tv" | "movie", ids: []): string[] {
  if (type === "movie") {
    return ids.map((id) => MOVIE_GENRES[id]);
  } else {
    return ids.map((id) => TV_GENRES[id]);
  }
}


export function getMovieDirector(crew: []) {
  // @ts-ignore //!
  return crew.filter(({ job }) => job === "Director")[0].name
}

export function getMovieCasts() {
  
}


export function generatePagination(currentPage: number, totalPages: number) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
}

export function sortResults(arr: any[]) {
  if (arr.length <= 1) {
    return arr;
  }

  const pivot = arr[arr.length - 1].vote_average;
  const left: any[] = [];
  const right: any[] = [];

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i].vote_average < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return [...sortResults(left), pivot, ...sortResults(right)];
}
