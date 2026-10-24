import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import App from './App';

export default function AppWrapper() {
    const { id } = useParams();
    return <App sessionId={id}/>;
}
