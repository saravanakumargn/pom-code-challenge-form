export type UserFormData = {
  firstName: string;
  lastName: string;
  favoriteFilm?: string;
};

export interface AllFilmsData {
  allFilms: {
    films: Film[];
  };
}

export interface Film {
  id: string;
  title: string;
  director: string;
  releaseDate: string;
}
