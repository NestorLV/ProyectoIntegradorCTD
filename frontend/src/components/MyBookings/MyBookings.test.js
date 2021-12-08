import React from "react";
import { shallow } from "enzyme";
import "@testing-library/jest-dom";
import MyBookings from "./MyBookings";
import Book from "./Book";

import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { createSerializer } from 'enzyme-to-json';

Enzyme.configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));

describe("Probando el componente <MyBookings/>", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<MyBookings/>)
    });

    it("Deberia mostrar <MyBookings/> correctamente", () => {
        expect(wrapper).toMatchSnapshot();
    });

    
})

describe("Probando el componente <Book/>", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Book/>)
    });

    it("Deberia mostrar <Book/> correctamente", () => {
        expect(wrapper).toMatchSnapshot();
    });
})