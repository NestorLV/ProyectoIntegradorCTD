import React from "react";
import { shallow, mount, render } from "enzyme";
import "@testing-library/jest-dom";
import ArrivalTimeBar from "./ArrivalTimeBar";
import Booking from "./Booking"
import CalendarBar from "./CalendarBar";
import DetailBar from "./DetailBar";
import FormBooking from "./FormBooking";
import Succeed from "./Succeed";
import TimeOption from "./TimeOption";

import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { createSerializer } from 'enzyme-to-json';

import * as TestRenderer from "react-test-renderer";
import { MemoryRouter, Outlet, Routes, Route, useParams } from "react-router";


Enzyme.configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));

describe("Probando el componente <ArrivalTimeBar/>", () => {
    let wrapper;
    
    beforeEach(() => {
        wrapper = shallow(<ArrivalTimeBar/>)
    });

    it("Deberia mostrar <ArrivalTimeBar/> correctamente", () => {
        expect(wrapper).toMatchSnapshot();
    });

})


describe("Probando el componente <CalendarBar/>", () => {
    let wrapper;
    let props={
        valueDate:[]
    }
    
    beforeEach(() => {
        wrapper = shallow(<CalendarBar {...props}/>)
    });

    it("Deberia mostrar <CalendarBar/> correctamente", () => {
        wrapper = shallow(<CalendarBar {...props}/>)
        expect(wrapper).toMatchSnapshot();
    });


    /*let AxiosGetReservasPorProducto = jest.fn()
    it("probando", () => {
        wrapper = mount(<CalendarBar {...props} AxiosGetReservasPorProducto={AxiosGetReservasPorProducto}/>)
        expect(wrapper).not.toBeNull();
    });*/


})

describe("Probando el componente <DetailBar/>", () => {
    let wrapper;
    
    beforeEach(() => {
        wrapper = shallow(<DetailBar />)
    });

    it("Deberia mostrar <DetailBar/> correctamente", () => {
        expect(wrapper).toMatchSnapshot();
    });

})

describe("Probando el componente <FormBooking/>", () => {
    let wrapper;

    let props={
        setName:jest.fn(),
        setSurname:jest.fn(),
        setEmail:jest.fn(),
        setCity:jest.fn(),
    }

    let props2={
        errorBooking:"error"
    }
    
    beforeEach(() => {
        wrapper = shallow(<FormBooking {...props}/>)
    });

    it("Deberia mostrar <FormBooking/> correctamente", () => {
        expect(wrapper).toMatchSnapshot();
    });

    it("Deberia mostrar <FormBooking/> correctamente", () => {
        wrapper = shallow(<FormBooking {...props2}/>)
        expect(wrapper).toMatchSnapshot();
    });

    it("Deberia llamarse a la funcion setName al cambiar el name", ()=>{
        wrapper.find('input[id="name"]').simulate('change', {
            target: {
                value: 'nuevoNombre',
            },
        });
        expect(props.setName).toBeCalled()
    })

    it("Deberia llamarse a la funcion setSurnme al cambiar el surname", ()=>{
        wrapper.find('input[id="surname"]').simulate('change', {
            target: {
                value: 'nuevoApellido',
            },
        });
        expect(props.setSurname).toBeCalled()
    })

    it("Deberia llamarse a la funcion setEmail al cambiar el mail", ()=>{
        wrapper.find('input[id="email"]').simulate('change', {
            target: {
                value: 'nuevo@mail.com',
            },
        });
        expect(props.setEmail).toBeCalled()
    })

    it("Deberia llamarse a la funcion setCity al cambiar la ciudad", ()=>{
        wrapper.find('input[id="city"]').simulate('change', {
            target: {
                value: 'nuevaCiudad',
            },
        });
        expect(props.setCity).toBeCalled()
    })
})

describe("Probando el componente <Succeed/>", () => {
    let wrapper;
    
    beforeEach(() => {
        wrapper = shallow(<Succeed />)
    });

    it("Deberia mostrar <Succeed/> correctamente", () => {
        expect(wrapper).toMatchSnapshot();
    });
})

describe("Probando el componente <TimeOption/>", () => {
    let wrapper;

    let props={
        setArrivalSchedule:jest.fn()
    }
    
    beforeEach(() => {
        wrapper = shallow(<TimeOption {...props}/>)
    });

    it("Deberia mostrar <TimeOption/> correctamente", () => {
        expect(wrapper).toMatchSnapshot();
    });

    it("Deberia llamar a la funcion setArrivalSchedule al hacer click", ()=>{
        wrapper.find("div").simulate("click")
        expect(props.setArrivalSchedule).toBeCalled()
    })
})