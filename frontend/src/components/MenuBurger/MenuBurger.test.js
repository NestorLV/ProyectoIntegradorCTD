import React from "react";
import { shallow } from "enzyme";
import "@testing-library/jest-dom";
import MenuBurger from "./MenuBurger"
import MenuButton from "./MenuButton";
import { MenuBurgerWrapper } from "./MenuBurgerWrapped";

import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { createSerializer } from 'enzyme-to-json';

Enzyme.configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));

describe("Probando el componente <MenuBurger/>", () => {
    let wrapperMenu; 
    let wrapperBoton;
    let props={
        show:false,
        handleShow: jest.fn()
    }
    beforeEach(() => {
        wrapperMenu = shallow(<MenuBurger />)
        wrapperBoton = shallow(<MenuButton {...props}/>)
    });

    it("Deberia mostrar <MenuBurger/> correctamente", () => {
        expect(wrapperMenu).toMatchSnapshot();
    });

    it("Deberia retornar una cruz para cerrar", () => {
        let node = wrapperMenu.find("div.close")
        expect(node.length).toEqual(1)
    });

    it("Deberia retornar 2 etiquetas h3", () => {
        let node = wrapperMenu.find("h3")
        expect(node.length).toEqual(2)
    });

    it("Deberia visualizarse el menu al hacer click en el boton", ()=>{
        wrapperBoton.find("svg").simulate("click", props.handleShow)
        expect(wrapperMenu.props("show")).toBeTruthy()
    })
});

describe("Probando el componente <MenuButton/>", ()=>{
    let wrapperBoton; 
    beforeEach(() => {
        wrapperBoton = shallow(<MenuButton />)
    });

    it("Deberia mostrar <MenuButton/> correctamente", () => {
        expect(wrapperBoton).toMatchSnapshot();
    });

})

describe("Probando el componente <MenuBurgerWrapper", ()=>{
    let menuBurgerWrapper; 
    beforeEach(() => {
        menuBurgerWrapper = shallow(<MenuBurgerWrapper />)
    });

    it("Deberia mostrar <MenuBurgerWrapper/> correctamente", () => {
        expect(menuBurgerWrapper).toMatchSnapshot();
    });

})
