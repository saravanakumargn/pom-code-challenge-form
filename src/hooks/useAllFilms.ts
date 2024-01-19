import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { request, gql } from "graphql-request";
import { AllFilmsData, Film } from "../types/User";

const postsQueryDocument = gql`
  query Query {
    allFilms {
      films {
        id
        title
        director
        releaseDate
      }
    }
  }
`;

const fetchAllFilms = async (): Promise<Film[]> => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const { allFilms } = await request<AllFilmsData>(
    "https://swapi-graphql.netlify.app/.netlify/functions/index",
    postsQueryDocument
  );
  return allFilms.films;
};

export const useAllFilms = (): UseQueryResult<Film[], Error> => {
  return useQuery<Film[], Error>({
    queryKey: ["allFilms"],
    queryFn: fetchAllFilms,
  });
};
