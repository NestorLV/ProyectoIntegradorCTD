import React from 'react';
import { shallow, mount } from 'enzyme';
import '@testing-library/jest-dom';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { createSerializer } from 'enzyme-to-json';
import Card from './Card';
import Cards from './index';
import MapModal from "./MapModal";

Enzyme.configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));

let wrapper;

describe('Pruebas en Card', () => {    
let props = { image: "test", cardCategory: "test", name: "test", city: "test", country: "test", description: "test", id: 1, reference: "test", qualification: 10, features: [] }
    it('Debe de mostrarse correctamente con una puntuacion de 10', () => {
        wrapper = shallow(<Card {...props} />);
        expect(wrapper).toMatchSnapshot();
    });

    let props2 = { image: "test", cardCategory: "test", name: "test", city: "test", country: "test", description: "test", id: 1, reference: "test", qualification: 7, features: [] }
    it('Debe de mostrarse correctamente con una puntuacion de 7', () => {
        wrapper = shallow(<Card {...props2} />);
        expect(wrapper).toMatchSnapshot();
    });

    let props3 = { image: "test", cardCategory: "test", name: "test", city: "test", country: "test", description: "test", id: 1, reference: "test", qualification: 5, features: [] }
    it('Debe de mostrarse correctamente con una puntuacion de 5', () => {
        wrapper = shallow(<Card {...props3} />);
        expect(wrapper).toMatchSnapshot();
    });

    let props4 = { image: "test", cardCategory: "test", name: "test", city: "test", country: "test", description: "test", id: 1, reference: "test", qualification: 3, features: [] }
    it('Debe de mostrarse correctamente con una puntuacion de 3', () => {
        wrapper = shallow(<Card {...props4} />);
        expect(wrapper).toMatchSnapshot();
    });

    let props5 = { image: "test", cardCategory: "test", name: "test", city: "test", country: "test", description: "test", id: 1, reference: "test", qualification: 1, features: [] }
    it('Debe de mostrarse correctamente con una puntuacion de 1', () => {
        wrapper = shallow(<Card {...props5} />);
        expect(wrapper).toMatchSnapshot();
    });

    let props6 = { image: "test", cardCategory: "test", name: "test", city: "test", country: "test", description: "test", id: 1, reference: "test", qualification: 12, features: [] }
    it('Debe mostrar un error con una calificacion invalida', () => {
        wrapper = shallow(<Card {...props6} />);
        expect(wrapper).toMatchSnapshot();
    });
});

describe('Pruebas en Cards', () => {   
    let props = { titulo: "test", category:"test", city:"test", search:"test", clickBusqueda:"test" }
    it('Debe de mostrarse correctamente', () => {
        wrapper = shallow(<Cards {...props} />);
        expect(wrapper).toMatchSnapshot();
    });

    let props2 = {  }
    it('Debe de mostrarse correctamente', () => {
        wrapper = shallow(<Cards {...props2} />);
        expect(wrapper).toMatchSnapshot()
    });

});

describe("Probando el componente <MapModal/>", () => {
    let wrapper;
    let props ={
        mapIsOpen:false,
        latitude:-12, 
        longitude:9, 
        closeMapModal: jest.fn()
    }
    
    beforeEach(() => {
        wrapper = shallow(<MapModal {...props}/>)
    });

    it("Deberia mostrar <MapModal> correctamente", () => {
        expect(wrapper).toMatchSnapshot();
    });

})
