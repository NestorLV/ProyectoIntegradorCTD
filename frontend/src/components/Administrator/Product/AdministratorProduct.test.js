import React from "react";
import { shallow, mount, render } from "enzyme";
import "@testing-library/jest-dom";
import CreateProduct from "./CreateProduct";
import CreateProductModal from "./CreateProductModal";
import FormProduct from "./FormProduct";
import FormProductCreate from "./FormProductCreate";
import FormProductUpdate from "./FormProductUpdate";
import OptionsSelect from "./OptionsSelect";
import ProductSelect from "./ProductSelect";
import UpdateSelect from "./UpdateProduct";

import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { createSerializer } from 'enzyme-to-json';


Enzyme.configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));

//PROBANDO ARCHIVO CREATE-PRODUCT

describe("Probando el componente <CreateProduct/>", () => {
    let wrapper;
    
    beforeEach(() => {
        wrapper = shallow(<CreateProduct/>)
    });

    it("Deberia mostrar <CreateProduct/> correctamente", () => {
        expect(wrapper).toMatchSnapshot();
    });

})

//PROBANDO ARCHIVO CREATE-PRODUCT-MODAL

describe("Probando el componente <CreateProductModal/>", () => {
    let wrapper;
    
    beforeEach(() => {
        wrapper = shallow(<CreateProductModal/>)
    });

    it("Deberia mostrar <CreateProductModal/> correctamente", () => {
        expect(wrapper).toMatchSnapshot();
    });

})

//PROBANDO ARCHIVO FORM-PRODUCT

describe("Probando el componente <FormProduct/>", () => {
    let wrapper;
    
    beforeEach(() => {
        wrapper = shallow(<FormProduct/>)
    });

    it("Deberia mostrar <FormProduct/> correctamente", () => {
        expect(wrapper).toMatchSnapshot();
    });

})

//PROBANDO ARCHIVO FORM-PRODUCT-CREATE

describe("Probando el componente <FormProductCreate/>", () => {
    let wrapper;
    
    beforeEach(() => {
        wrapper = shallow(<FormProductCreate/>)
    });

    it("Deberia mostrar <FormProductCreate/> correctamente", () => {
        expect(wrapper).toMatchSnapshot();
    });

})  

//PROBANDO ARCHIVO FORM-PRODUCT-UPDATE

describe("Probando el componente <FormProductUpdate/>", () => {
    let wrapper;
    
    beforeEach(() => {
        wrapper = shallow(<FormProductUpdate/>)
    });

    it("Deberia mostrar <FormProductUpdate/> correctamente", () => {
        expect(wrapper).toMatchSnapshot();
    });

})  

//PROBANDO ARCHIVO OPTIONS-SELECT

describe("Probando el componente <OptionsSelect/>", () => {
    let wrapper;
    
    beforeEach(() => {
        wrapper = shallow(<OptionsSelect/>)
    });

    it("Deberia mostrar <OptionsSelect/> correctamente", () => {
        expect(wrapper).toMatchSnapshot();
    });

})  

//PROBANDO ARCHIVO PRODUCT-SELECT

describe("Probando el componente <ProductSelect/>", () => {
    let wrapper;
    
    beforeEach(() => {
        wrapper = shallow(<ProductSelect/>)
    });

    it("Deberia mostrar <ProductSelect/> correctamente", () => {
        expect(wrapper).toMatchSnapshot();
    });

})  

//PROBANDO ARCHIVO UPDATE-SELECT

describe("Probando el componente <UpdateSelect/>", () => {
    let wrapper;
    
    beforeEach(() => {
        wrapper = shallow(<UpdateSelect/>)
    });

    it("Deberia mostrar <UpdateSelect/> correctamente", () => {
        expect(wrapper).toMatchSnapshot();
    });

})  
