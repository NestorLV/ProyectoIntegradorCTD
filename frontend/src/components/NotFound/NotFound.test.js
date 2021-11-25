import React from "react";
import { shallow } from "enzyme";
import "@testing-library/jest-dom";
import NotFound from "./NotFound";

import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { createSerializer } from 'enzyme-to-json';

Enzyme.configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));

describe("Probando el componente <NotFound/>", () => {
    let wrapper;
    
    beforeEach(() => {
        wrapper = shallow(<NotFound/>)
    });

    it("Deberia mostrar <NotFound/> correctamente", () => {
        expect(wrapper).toMatchSnapshot();
    });

})