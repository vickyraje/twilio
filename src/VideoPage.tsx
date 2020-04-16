import React from 'react';
import { styled } from '@material-ui/core/styles';

import App from './App';
import AppStateProvider, { useAppState } from './state';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { ConnectOptions } from 'twilio-video';
import ErrorDialog from './components/ErrorDialog/ErrorDialog';
import MenuBar from './components/MenuBar/MenuBar';
import ReconnectingNotification from './components/ReconnectingNotification/ReconnectingNotification';
import Controls from './components/Controls/Controls';
import LocalVideoPreview from './components/LocalVideoPreview/LocalVideoPreview';
import './types';
import Room from './components/Room/Room';
import { VideoProvider } from './components/VideoProvider';
import useRoomState from './hooks/useRoomState/useRoomState';

const Container = styled('div')({
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
});

const Main = styled('main')({
    overflow: 'hidden',
});

class VideoPage extends React.Component{
    render(){
        const connectionOptions: ConnectOptions = {
            bandwidthProfile: {
              video: {
                mode: 'collaboration',
                dominantSpeakerPriority: 'standard',
                renderDimensions: {
                  high: { height: 1080, width: 1920 },
                  standard: { height: 720, width: 1280 },
                  low: { height: 90, width: 160 },
                },
              },
            },
            dominantSpeaker: true,
            maxAudioBitrate: 12000,
            networkQuality: { local: 1, remote: 1 },
            preferredVideoCodecs: [{ codec: 'VP8', simulcast: true }],
          };
          
          const VideoApp = () => {
            const { error, setError } = useAppState();
            return (
              <VideoProvider options={connectionOptions} onError={setError}>
                <ErrorDialog dismissError={() => setError(null)} error={error} />
                <App />
              </VideoProvider>
            );
          };
          const roomState = useRoomState();
        return (
            <>
                <MenuBar />
                <Main>
                    {roomState === 'disconnected' ? <LocalVideoPreview /> : <Room />}
                    <Controls />
                </Main>
                <ReconnectingNotification />
            </>
        );
    }
}
export default VideoPage;