interface INavigator {
	getMedia(
		options: { video?: boolean; audio?: boolean; },
		success: (stream: IMediaStream) => void,
		error?: (error: string) => void
	) : void;
	getUserMedia(
		options: { video?: boolean; audio?: boolean; },
		success: (stream: IMediaStream) => void,
		error?: (error: string) => void
	) : void;
	webkitGetUserMedia(
		options: { video?: boolean; audio?: boolean; },
		success: (stream: IMediaStream) => void,
		error?: (error: string) => void
	) : void;
	mozGetUserMedia(
		options: { video?: boolean; audio?: boolean; },
		success: (stream: IMediaStream) => void,
		error?: (error: string) => void
	) : void;
	msGetUserMedia(
		options: { video?: boolean; audio?: boolean; },
		success: (stream: IMediaStream) => void,
		error?: (error: string) => void
	) : void;
}

interface IMediaStream {
	getAudioTracks(): IMediaStreamTrack[];
	getVideoTracks(): IMediaStreamTrack[];
	stop(): void;
}

interface IMediaStreamTrack {
	stop(): void;
}
