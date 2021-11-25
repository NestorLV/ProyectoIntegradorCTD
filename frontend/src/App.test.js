import React from "react";
import { shallow } from "enzyme";
import "@testing-library/jest-dom";
import App from "./App";

import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { createSerializer } from 'enzyme-to-json';

Enzyme.configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));

describe("Probando el componente <App/>", () => {
    let wrapper;
    
    beforeEach(() => {
        wrapper = shallow(<App/>)
    });

    it("Deberia mostrar <App/> correctamente", () => {
        expect(wrapper).toMatchSnapshot();
    });

})
