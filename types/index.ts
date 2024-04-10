export type Artist = {
	external_urls?: {
		spotify?: string | null;
	} | null;
	id: string;
	name: string;
	type?: string | null;
};

export type SpotifyImage = {
	height?: number | null;
	url: string;
	width?: number | null;
};

export type Track = {
	added_at?: Date | string | null;
	added_by?: {
		external_urls?: {
			spotify?: string | null;
		} | null;
		id?: string | null;
	} | null;
	track: {
		album: {
			album_type?: string | null;
			artists: Artist[];
			external_urls?: {
				spotify?: string | null;
			} | null;
			id: string;
			images?: SpotifyImage[];
			name: string;
			release_date?: Date | string | null;
			release_date_precision?: string | null;
			total_tracks?: number | null;
			type?: string | null;
		};
		artists: Artist[];
		disc_number?: number | null;
		duration_ms?: number | null;
		explicit?: boolean | null;
		external_urls?: {
			spotify?: string | null;
		} | null;
		id: string;
		name: string;
		popularity?: number | null;
		track_number?: number | null;
		type?: string | null;
	};
};

export type Playlist = {
	collaborative?: boolean | null;
	description?: string | null;
	external_urls?: {
		spotify?: string | null;
	} | null;
	followers?: {
		total?: number | null;
	} | null;
	id: string;
	images?: SpotifyImage[];
	name: string;
	owner: {
		display_name?: string | null;
		external_urls?: {
			spotify?: string | null;
		} | null;
		id: string;
		type?: string | null;
	};
	public: boolean;
};
