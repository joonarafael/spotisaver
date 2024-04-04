export type Track = {
	added_at?: Date | string | null;
	track?: {
		album?: {
			id?: string | null;
			name?: string | null;
			release_date?: string | null;
			external_urls?: {
				spotify?: string | null;
			} | null;
		} | null;
		artists?:
			| {
					id?: string | null;
					name?: string | null;
					external_urls?: {
						spotify?: string | null;
					} | null;
			  }[]
			| null;
		name?: string | null;
		id?: string | null;
		external_urls?: {
			spotify?: string | null;
		} | null;
	};
};
