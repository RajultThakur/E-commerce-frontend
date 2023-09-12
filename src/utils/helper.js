import { useContext } from 'react';
import AppContext from '../context/appContext';

export default function Utils () {
    const context = useContext(AppContext);
    return [context]
}


