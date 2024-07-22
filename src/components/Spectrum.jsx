import AudioSpectrum from 'react-audio-spectrum';


function Spectrum({audioId}) {

    return (
        <>
            <AudioSpectrum
                id="audio-canvas"
                height={200}
                width={500}
                audioId={audioId}
                capColor={'blue'}
                capHeight={2}
                meterWidth={10}
                meterCount={512}
                meterColor={[
                    { stop: 0, color: '#3a1c71' },   // Deep Purple
                    { stop: 0.5, color: '#d76d77' }, // Soft Pink
                    { stop: 1, color: '#ffaf7b' }    // Light Orange
                ]}
                gap={4}
            />
        </>
    )
}

export default Spectrum