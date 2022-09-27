import { useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/logo.svg';

import { UserContext } from '../../contexts/user.context';

import { signOutUser } from '../../utils/firebase.utils';

import './navigation.styles.scss'


const Navigation = () => {
  const { currentUser } = useContext(UserContext)

  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <Logo/>
        </Link>
        <div className="navigation-links-container">
          <Link className="navigation-link" to="/shop">
            SHOP
          </Link>
          {
            currentUser ? (
              <span className="navigation-link" onClick={signOutUser}>{' '}SIGN OUT {' '}</span>
            ) : (
              <Link className="navigation-link" to="/auth">
                SIGN IN
              </Link>
            )}

        </div>
      </div>
      <Outlet/>
    </>
  )
}

export default Navigation