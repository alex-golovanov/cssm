import { persistStore, autoRehydrate } from 'redux-persist/lib'

import configureStore from './configureStore'
import history from './history'

// const persistConfig = {keyPrefix: 'cssm_',	whitelist: ['auth']}

// const authKey = `${persistConfig.keyPrefix}auth`
// const auth = localStorage.getItem(authKey) ? JSON.parse(localStorage.getItem(authKey)) : {}

const store = configureStore( {} )
persistStore(store, {keyPrefix: 'cssm_',	whitelist: ['auth']})

export { store, history }