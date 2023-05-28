import '../styles/globals.css'
import '../public/style/main.scss'
import '../node_modules/mdb-ui-kit/css/mdb.min.css'
import '../styles/spinner.scss'
import 'antd/dist/antd.css';
import Router from 'next/router'
import NProgress from 'nprogress';
import '../node_modules/nprogress/nprogress.css'
import { wrapper, store, persistor } from '../redux/store'
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'

Router.onRouteChangeStart = url => NProgress.start();
Router.onRouteChangeComplete = url => NProgress.done();
Router.onRouteChangeError = url => NProgress.done();


function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>)
}

export default wrapper.withRedux(MyApp)