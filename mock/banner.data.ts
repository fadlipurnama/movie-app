
export interface MovieBanner {
  id: number;
  img: string;
  title: string;
  overviewKey: string; // Key untuk dipanggil di messages jika sinopsis di-translate
}
export const HERO_BANNER_MOVIES: MovieBanner[] = [
  {
    id: 1,
    img: "/images/page-banner-1.png",
    title: "Avengers: Endgame",
    overviewKey: "avengersEndgame",
  },
  {
    id: 2,
    img: "/images/page-banner-2.png",
    title: "Thunderbolts*",
    overviewKey: "thunderbolts",
  },
  {
    id: 3,
    img: "/images/page-banner-3.png",
    title: "Kingdom of the Planet of the Apes",
    overviewKey: "planetOfApes",
  },
  {
    id: 4,
    img: "/images/page-banner-4.png",
    title: "Mission: Impossible - The Final Reckoning",
    overviewKey: "missionImpossible",
  },
];