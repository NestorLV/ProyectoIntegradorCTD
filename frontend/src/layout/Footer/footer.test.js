

import React from "react";
import { shallow } from "enzyme";
import "@testing-library/jest-dom";
import Footer from "./index";

import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { createSerializer } from 'enzyme-to-json';

Enzyme.configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));

describe("Probando el componente <Footer/>", () => {
    let footer; 

    beforeEach(() => {
        footer = shallow(<Footer />)
    });

    it("Deberia mostrar <Footer/> correctamente", () => {
        expect(footer).toMatchSnapshot();
    });

    it("Deberia retornar 1 etiqueta h3", () => {
        let node = footer.find("h3")
        expect(node.length).toEqual(1)
    });

    it("Deberia retornar 4 etiquetas img", () => {
        let node = footer.find("img")
        expect(node.length).toEqual(5)
    });
});