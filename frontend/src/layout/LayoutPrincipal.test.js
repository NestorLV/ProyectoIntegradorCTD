import React from 'react';
import {shallow, mount} from 'enzyme';
import '@testing-library/jest-dom';
import LayoutPrincipal from './LayoutPrincipal';

import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { createSerializer } from 'enzyme-to-json';
Enzyme.configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));

describe("Probando el componente <LayoutPrincipal/>", () => {
    let wrapper;
    
    it("Deberia mostrar <LayoutPrincipal/> correctamente", () => {
        wrapper = shallow(<LayoutPrincipal/>)
        expect(wrapper).toMatchSnapshot();
    });

})