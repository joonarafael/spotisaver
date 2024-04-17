import { Artist, Contributor } from "./index";

export type AnalyzeData = {
	unique_tracks: number;
	unique_decades: number;
	contributors: ContributorRecord[];
	contributor_most: string;
	artists: ArtistRecord[];
	artist_most: string;
	added_ats: AddedAtRecord[];
	added_at_most: string;
	contains_explicit: boolean;
	years: YearRecord[];
	year_most: string;
};

export type ContributorRecord = {
	contirubutor: Contributor;
	track_count: number;
};

export type ArtistRecord = {
	artist: Artist;
	track_count: number;
};

export type AddedAtRecord = {
	added_at: string;
	track_count: number;
};

export type YearRecord = {
	year: string;
	track_count: number;
};
