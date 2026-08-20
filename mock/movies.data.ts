export interface MovieBanner {
  id: number;
  img: string;
  title: string;
  overviewKey: string; // Key untuk dipanggil di messages jika sinopsis di-translate
}

export interface TopMovie {
  id: number;
  cardImg: string;
  duration: string;
  view: string; // Key untuk dipanggil di messages jika sinopsis di-translate
}

export const TRENDING_MOVIES: TopMovie[] = [
  {
    id: 1,
    cardImg: "/images/img-37.png",
    duration: "1h 30min",
    view: "2K",
  },
  {
    id: 2,
    cardImg: "/images/img-38.png",
    duration: "1h 57min",
    view: "1.5K",
  },
  {
    id: 3,
    cardImg: "/images/img-39.png",
    duration: "2h 10min",
    view: "1.8K",
  },
  {
    id: 4,
    cardImg: "/images/img-40.png",
    duration: "2h 20min",
    view: "3K",
  },
  {
    id: 5,
    cardImg: "/images/img-41.png",
    duration: "2 h 35 m",
    view: "5K",
  },
];

export const POPULAR_SHOWS: TopMovie[] = [
  {
    id: 1,
    cardImg: "/images/img-42.png",
    duration: "1h 30min",
    view: "2K",
  },
  {
    id: 2,
    cardImg: "/images/img-43.png",
    duration: "1h 57min",
    view: "1.5K",
  },
  {
    id: 3,
    cardImg: "/images/img-44.png",
    duration: "2h 10min",
    view: "1.8K",
  },
  {
    id: 4,
    cardImg: "/images/img-45.png",
    duration: "2h 20min",
    view: "3K",
  },
  {
    id: 5,
    cardImg: "/images/img-41.png",
    duration: "2 h 35 m",
    view: "5K",
  },
];
