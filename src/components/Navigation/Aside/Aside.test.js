import React from 'react';

import Aside, { SubMenu } from '.';
import NavLink from '../Link';
import paths from '../../../pages/Router/paths';

describe('<Aside /> rendering', () => {
  const onHandler = jest.fn();

  it('should render without crashing', () => {
    const component = shallowWithProvider(
      <Aside handleMobileToggle={onHandler} />
    )({
      auth: {
        userData: {
          isAdmin: true
        }
      }
    });

    expect(component).toMatchSnapshot();
  });

  it('should set the handleMobileToggle prop correctly', () => {
    const { component } = mountWithProvider(
      <Aside handleMobileToggle={onHandler} />
    )({
      auth: {
        userData: {
          isAdmin: true
        }
      }
    });

    expect(
      component
        .find(NavLink)
        .at(1)
        .prop('onClick')
    ).toEqual(onHandler);

    expect(
      component
        .find(NavLink)
        .at(0)
        .prop('onClick')
    ).toEqual(onHandler);

    expect(
      component
        .find(NavLink)
        .at(2)
        .prop('onClick')
    ).toEqual(onHandler);
  });

  it('should not render the /users link if it the user is not an admin', () => {
    const { component } = mountWithProvider(
      <Aside handleMobileToggle={onHandler} />
    )({
      auth: {
        userData: {
          isAdmin: false
        }
      }
    });

    expect(
      component.contains(
        <NavLink to={paths.USERS} onClick={onHandler}>
          Users
        </NavLink>
      )
    ).toBeFalsy();
  });

  it('should render the /users link if it the user is an admin', () => {
    const { component } = mountWithProvider(
      <Aside handleMobileToggle={onHandler} />
    )({
      auth: {
        userData: {
          isAdmin: true
        }
      }
    });

    expect(
      component.contains(
        <NavLink to={paths.USERS} onClick={onHandler}>
          Users
        </NavLink>
      )
    ).toBeFalsy();
  });

  it('should render the <SubMenu /> component if the user is an admin', () => {
    const { component } = mountWithProvider(
      <Aside handleMobileToggle={onHandler} />
    )({
      auth: {
        userData: {
          isAdmin: true
        }
      }
    });

    expect(component.exists(SubMenu)).toBeTruthy();
  });

  it('should not render the <SubMenu /> component if the user is not an admin', () => {
    const { component } = mountWithProvider(
      <Aside handleMobileToggle={onHandler} />
    )({
      auth: {
        userData: {
          isAdmin: false
        }
      }
    });

    expect(component.exists(SubMenu)).toBeFalsy();
  });
});
