function Playlist({ playlist, currentTrackIndex, onSelectTrack }) {
    return (
        <div className="w-full max-w-md bg-white shadow-md rounded-lg mt-4">
            <h2 className="text-2xl font-bold p-4">Playlist</h2>
            <ul className="divide-y divide-gray-200">
                {playlist.map((track, index) => (
                    <li
                        key={index}
                        className={`p-4 cursor-pointer ${index === currentTrackIndex ? 'bg-blue-100' : ''}`}
                        onClick={() => onSelectTrack(index)}
                    >
                        {track.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Playlist