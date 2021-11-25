import React from "react";
import { shallow } from "enzyme";
import "@testing-library/jest-dom";
import Home from "./Home";

import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { createSerializer } from 'enzyme-to-json';

Enzyme.configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));

describe("Probando el componente <Home/>", () => {
    let wrapper;
    let setActiveCreate = jest.fn(); //Simula la funcion del set
    let setActiveLogin = jest.fn() //Simula la funcion del set

    beforeEach(() => {
        wrapper = shallow(<Home setActiveCreate={setActiveCreate} setActiveLogin= {setActiveLogin}/>)
    });

    it("Deberia mostrar <Home/> correctamente", () => {
        expect(wrapper).toMatchSnapshot();
    });

    
})