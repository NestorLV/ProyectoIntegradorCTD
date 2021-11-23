import React from "react";
import { shallow } from "enzyme";
import "@testing-library/jest-dom";
import FormCreate from './FormCreate.jsx';
import FormLogin from "./FormLogin.jsx"

import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { createSerializer } from 'enzyme-to-json';

Enzyme.configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));

describe("Probando el componente <FormCreate/>", () => {
    let wrapper;
    let setActiveCreate = jest.fn(); //Simula la funcion del set
    let setActiveLogin = jest.fn() //Simula la funcion del set
   
    beforeEach(() => {
        wrapper = shallow(<FormCreate setActiveCreate={setActiveCreate} setActiveLogin={setActiveLogin} />)
    });

    it("Deberia mostrar <FormCreate/> correctamente", () => {
        expect(wrapper).toMatchSnapshot();
    });

    it("Deberia retornar una etiqueta h3", () => {
        let node = wrapper.find("h3")
        expect(node.length).toEqual(1)
    });

    it("Deberia retornar un formulario", () => {
        let node = wrapper.find("form")
        expect(node.length).toEqual(1)
    });

    it('Deberia setear el nombre con el valor pasado', () => {
        wrapper.find('input[id="name"]').simulate('change', {
            target: {
                value: 'nuevoNombre',
            },
        });
        expect(wrapper.find('input[id="name"]').prop('value')).toEqual(
            'nuevoNombre',
        );
    });

    it('Deberia setear el apellido con el valor pasado', () => {
        wrapper.find('input[id="surname"]').simulate('change', {
            target: {
                value: 'nuevoApellido',
            },
        });
        expect(wrapper.find('input[id="surname"]').prop('value')).toEqual(
            'nuevoApellido',
        );
    });

    it('Deberia setear el mail con el valor pasado', () => {
        wrapper.find('input[type="email"]').simulate('change', {
            target: {
                value: 'nuevoMail',
            },
        });
        expect(wrapper.find('input[type="email"]').prop('value')).toEqual(
            'nuevoMail',
        );
    });

    it('Deberia setear la contraseña con el valor pasado', () => {
        wrapper.find('input[id="password"]').simulate('change', {
            target: {
                value: 'nuevaContraseña',
            },
        });
        expect(wrapper.find('input[id="password"]').prop('value')).toEqual(
            'nuevaContraseña',
        );
    });

    it('Deberia setear confirmar contraseña con el valor pasado', () => {
        wrapper.find('input[id="confirm-password"]').simulate('change', {
            target: {
                value: 'nuevaContraseña',
            },
        });
        expect(wrapper.find('input[id="confirm-password"]').prop('value')).toEqual(
            'nuevaContraseña',
        );
    });
    it("Deberia traer cinco parrafos de error", ()=>{
        expect(wrapper.find("p.error").length).toEqual(5)
    });

    it("Deberia llamar a event.preventDefault cuando se envia el formulario", ()=>{
        const event = { preventDefault: () => {} }
        jest.spyOn(event, 'preventDefault')
        wrapper.find('form').simulate('submit', event)
                
        expect(event.preventDefault).toBeCalled()
    })


    /*it('Deberia arrojar un mensaje de error por enviar la contraseña con menos de 6 caracteres', () => {
        wrapper.find('input[id="name"]').simulate('change', {
            target: {
                value: 'nuevoNombre',
            },
        });
        
        wrapper.find('input[id="surname"]').simulate('change', {
            target: {
                value: 'nuevoApellido',
            },
        });
        
        wrapper.find('input[type="email"]').simulate('change', {
            target: {
                value: 'nuevoMail@mail.com',
            },
        });
        wrapper.find('input[id="password"]').simulate('change', {
            target: {
                value: '12345',
            },
        });
        wrapper.find('input[id="confirm-password"]').simulate('change', {
            target: {
                value: '1234567',
            },
        });
        wrapper.find("button").simulate("click")
        expect(wrapper.find("div.errorContainer:nth-child(4)").text()).toEqual("")
    });*/

    it('Deberia llamarse la funcion setActiveCreate', () => {
        expect(setActiveCreate).toHaveBeenCalled()
    });

});

describe("Probando el componente <FormLogin/>", () => {
    let wrapper;
    let setActiveCreate = jest.fn(); //Simula la funcion del set
    let setActiveLogin = jest.fn() //Simula la funcion del set
    let setLog = jest.fn()

    beforeEach(() => {
        wrapper = shallow(<FormLogin setActiveCreate={setActiveCreate} setActiveLogin={setActiveLogin} setLog={setLog}/>)
    })

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("Deberia mostrar <FormLogin/> correctamente", () => {
        expect(wrapper).toMatchSnapshot();
    })

    it("Deberia retornar una etiqueta h3", () => {
        let node = wrapper.find("h3")
        expect(node.length).toEqual(1)
    });

    it("Deberia retornar un formulario", () => {
        let node = wrapper.find("form")
        expect(node.length).toEqual(1)
    });

    it('Deberia setear el mail con el valor pasado', () => {
        wrapper.find('input[type="email"]').simulate('change', {
            target: {
                value: 'nuevoMail',
            },
        });
        expect(wrapper.find('input[type="email"]').prop('value')).toEqual(
            'nuevoMail',
        );
    });

    it('Deberia setear la contraseña con el valor pasado', () => {
        wrapper.find('input[type="password"]').simulate('change', {
            target: {
                value: 'nuevaContraseña',
            },
        });
        expect(wrapper.find('input[type="password"]').prop('value')).toEqual(
            'nuevaContraseña',
        );
    });

    it("Deberia traer tres parrafos de error", ()=>{
        expect(wrapper.find("p.error").length).toEqual(3)
    });

    it("Deberia llamar a event.preventDefault cuando se envia el formulario", ()=>{
        const event = { preventDefault: () => {} }
        jest.spyOn(event, 'preventDefault')
        wrapper.find('form').simulate('submit', event)
                
        expect(event.preventDefault).toBeCalled()
    })

});
