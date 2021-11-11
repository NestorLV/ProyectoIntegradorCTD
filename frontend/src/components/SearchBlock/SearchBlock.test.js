import React from 'react';
import {shallow, mount} from 'enzyme';
import '@testing-library/jest-dom';
import Calendar from './Calendar';
import CityOption from './CityOption';
import SearchBlock from "./SearchBlock";
import SearchForm from './SearchForm';
import SelectCity from './SelectCity';
import SelectDate from './SelectDate';

import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { createSerializer } from 'enzyme-to-json';
Enzyme.configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));

describe('Pruebas en <Calendar />', () => {
    let wrapper;
   
    beforeEach(() => {
        wrapper = shallow(<Calendar />);
    });

    it("Deberia llamar a event.preventDefault cuando se hace click en el boton de aplicar", ()=>{
        const event = { preventDefault: () => {} }
        let handleSelected= jest.fn()
        jest.spyOn(event, 'preventDefault')
        wrapper = shallow(<Calendar handleSelected={handleSelected}/>);
        wrapper.find('button').simulate('click', event)
                
        expect(event.preventDefault).toBeCalled()
    });

});

describe('Pruebas en <CityOption />', () => {  
    let wrapper = shallow(<CityOption />);

    beforeEach(() => {
        wrapper = shallow(<CityOption />);
    })

    it("Deberia mostrar <CityOption/> correctamente", () => {
        expect(wrapper).toMatchSnapshot();
    });
    it('<CityOption /> deberia renderizar la ciudad en props', () => {
        const city = 'Buenos Aires';
        const jsxCityOption = shallow(<CityOption city={city}/>);
        expect(jsxCityOption).toMatchSnapshot();
    });
    it('<CityOption /> deberia renderizar el pais en props', () => {
        const country = 'Argentina';
        const jsxCityOption = shallow(<CityOption country={country}/>);
        expect(jsxCityOption).toMatchSnapshot();
    });
    it('should render one <CityOption>', () => {
        expect(wrapper.find('h3')).toHaveLength(2);
    });

    it("Deberia llamar a handleCity cuando se hace click en la ciudad deseada", ()=>{
        let handleCity = jest.fn()
        wrapper = shallow(<CityOption handleCity={handleCity}/>);
        wrapper.find('h3.titleCity').simulate('click', handleCity)
                
        expect(handleCity).toBeCalled()
    })

    it("Deberia llamar a handleCity cuando se hace click en el pais", ()=>{
        let handleCity = jest.fn()
        wrapper = shallow(<CityOption handleCity={handleCity}/>);
        wrapper.find('h3.titleCountry').simulate('click', handleCity)
                
        expect(handleCity).toBeCalled()
    })
});

describe("Pruebas en <SearchBlock/>", ()=>{
    let wrapper;
   
    beforeEach(() => {
        wrapper = shallow(<SearchBlock />);
    });
    it("Deberia mostrar <SearchBlock/> correctamente", () => {
        expect(wrapper).toMatchSnapshot();
    });

})

describe("Pruebas en <SearchForm/>", ()=>{
    let wrapper;
   
    beforeEach(() => {
        wrapper = shallow(<SearchForm />);
    });
    it("Deberia mostrar <SearchForm/> correctamente", () => {
        expect(wrapper).toMatchSnapshot();
    });

    it("Deberia llamar a handleSearch cuando se hace click en el boton", ()=>{
        let handleSearch = jest.fn()
        wrapper = shallow(<SearchForm handleSearch={handleSearch}/>);
        wrapper.find('button').simulate('click', handleSearch)
                
        expect(handleSearch).toBeCalled()
    })
})

describe('Pruebas en <SelectCity />', () => {
    let wrapper = mount(<SelectCity />); //Se usa mount para testear el useEffect
    beforeEach(() => {
        wrapper = mount(<SelectCity />);
        
    })
    it("Deberia mostrar <SelectCity/> correctamente", () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('<SelectCity /> se renderiza bien', () => {
        const placeholder='¿A dónde vamos?';
        const jsxSelectCity = shallow(<SelectCity />);
        expect(jsxSelectCity).toMatchSnapshot();
    })

});

describe('Pruebas en <SelectDate />', () => {
    let wrapper = shallow(<SelectDate />);
    beforeEach(() => {
        wrapper = shallow(<SelectDate />);
    })

    it("Deberia mostrar <SelectDate/> correctamente", () => {
        expect(wrapper).toMatchSnapshot();
    });

    it("Deberia llamar a event.preventDefault cuando se hace click en el boton", ()=>{
        const event = { preventDefault: () => {} }
        let handleToggle= jest.fn()
        jest.spyOn(event, 'preventDefault')
        wrapper = shallow(<SelectDate handleToggle={handleToggle}/>);
        wrapper.find('button').simulate('click', event)
                
        expect(event.preventDefault).toBeCalled()
    });

});