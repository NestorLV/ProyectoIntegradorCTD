import React from "react";
import { shallow } from "enzyme";
import "@testing-library/jest-dom";
import Header from './index';

import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { createSerializer } from 'enzyme-to-json';

Enzyme.configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));

describe("Probando el componente <Header/>", () => {
    let wrapper;
    let setActiveCreate = jest.fn(); //Simula la funcion del set
    let setActiveLogin = jest.fn() //Simula la funcion del set
    let handleClean = jest.fn()
    let handleFavourite = jest.fn()
   
    beforeEach(() => {
        wrapper = shallow(<Header setActiveCreate={setActiveCreate} setActiveLogin={setActiveLogin} handleClean={handleClean} handleFavourite ={handleFavourite}/>)
    });

    it("Deberia mostrar <Header/> correctamente", () => {
        expect(wrapper).toMatchSnapshot();
    });

    it("Deberia retornar 3 etiquetas h3", () => {
        let node = wrapper.find("h3")
        expect(node.length).toEqual(3)
    });

    it("Deberia retornar 3 Links", () => {
        let node = wrapper.find("Link")
        expect(node.length).toEqual(3)
    });

    it("Deberia retornar 2 botones", () => {
        let node = wrapper.find("button")
        expect(node.length).toEqual(2)
    });

    it("Deberia llamar a handleClean cuando se hace click en el logo", ()=>{
        wrapper.find("div.logo").simulate("click")
        expect(handleClean).toBeCalled()
    })

    it("Deberia llamar a handleClean cuando se hace click en el logo", ()=>{
        wrapper.find("h4.seeFavourite").simulate("click")
        expect(handleFavourite).toBeCalled()
    })
});

