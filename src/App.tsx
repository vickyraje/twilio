import React from 'react';
import { styled } from '@material-ui/core/styles';

import Controls from './components/Controls/Controls';
import LocalVideoPreview from './components/LocalVideoPreview/LocalVideoPreview';
import MenuBar from './components/MenuBar/MenuBar';
import ReconnectingNotification from './components/ReconnectingNotification/ReconnectingNotification';
import Room from './components/Room/Room';

import useHeight from './hooks/useHeight/useHeight';
import useRoomState from './hooks/useRoomState/useRoomState';

const Container = styled('div')({
  display: 'grid',
  gridTemplateRows: 'auto 1fr',
});

const Main = styled('main')({
  overflow: 'hidden',
});

export default function App() {
  const roomState = useRoomState();
  const height = useHeight();
  return (
    <Container style={{ height }}>
      <MenuBar />
      <Main>
        {roomState === 'disconnected' ? <LocalVideoPreview /> : <Room />}
        <Controls />
      </Main>
      <ReconnectingNotification />
    </Container>
  );
}
