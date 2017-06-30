import React from 'react';
import 'react-native';
import connectRealm, { getResultsName } from '../connectRealm';

jest.unmock('react-native');
jest.mock('prop-types', () => ({
  object: 'objectPropType',
}));

function setup(options = {}, props = {}, context = {}) {
  class Component extends React.Component {}
  const EnhancedComponent = connectRealm(Component, options);
  const enhancedInstance = new EnhancedComponent(props, context);
  return {
    Component,
    EnhancedComponent,
    enhancedInstance,
  };
}

describe('connectRealm file', () => {
  describe('connectRealm', () => {
    it('should be a function', () => {
      expect(typeof connectRealm).toEqual('function');
    });
    it('should get context types', () => {
      const { EnhancedComponent } = setup();
      expect(EnhancedComponent.contextTypes).toEqual({
        reactRealmInstance: 'objectPropType',
      });
    });
    it('should return an empty object if there is no mapToProps function', () => {
      const options = {
        schemas: [],
      };
      const { enhancedInstance } = setup(options);
      const result = enhancedInstance.getProps();
      expect(result).toEqual({});
    });
    it('should return an object with mapped props when there is a mapToProps function defined', () => {
      const options = {
        schemas: [],
        mapToProps(results, realm, ownProps) {
          return {
            results,
            realm,
            ownProps,
          };
        },
      };
      const props = {
        test: 1,
      };
      const context = {
        reactRealmInstance: {
          realm: true,
        },
      };
      const { enhancedInstance } = setup(options, props, context);
      const result = enhancedInstance.getProps();
      expect(result).toEqual({
        ownProps: props,
        realm: context.reactRealmInstance,
        results: {},
      });
    });
    it('should force update of the view', () => {
      const { enhancedInstance } = setup();
      const spy = jest.spyOn(enhancedInstance, 'forceUpdate');
      enhancedInstance.updateView();
      expect(spy).toBeCalled();
    });
    it('should render original Component', () => {
      const { Component, enhancedInstance } = setup();
      const result = enhancedInstance.render();
      expect(result).toEqual(<Component />);
    });
  });
  describe('getResultsName', () => {
    it('should return a pluralized and camel-cased string of the given value', () => {
      const people = getResultsName('Person');
      expect(people).toEqual('people');
      const listItems = getResultsName('ListItem');
      expect(listItems).toEqual('listItems');
    });
  });
});
