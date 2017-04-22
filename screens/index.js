import { Navigation } from 'react-native-navigation';

import ThreadsScreen from './ThreadsScreen';
import CommentsScreen from './CommentsScreen';
import Sidebar from './Sidebar';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

let store = createStore(rootReducer, applyMiddleware(thunk));

// register all screens of the app (including internal ones)
export default function registerScreens() {
    console.log("Registering screens");
    Navigation.registerComponent('Sidebar', () => Sidebar, store, Provider);
    Navigation.registerComponent('ThreadsScreen', () => ThreadsScreen, store, Provider);
    Navigation.registerComponent('CommentsScreen', () => CommentsScreen, store, Provider);
}
