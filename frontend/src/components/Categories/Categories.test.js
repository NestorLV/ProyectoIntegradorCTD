import React from "react";
import { shallow, mount } from "enzyme";
import "@testing-library/jest-dom";
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { createSerializer } from 'enzyme-to-json';
import Category from "./Category";
import Categories from "./index";


Enzyme.configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));

let wrapper;

describe("<Category />", () => {
    let props = {
        handleCategory: jest.fn(), category: "test", key: 1, title: "Hoteles", imageUrl: { url: "test" }, description: "test"
    };

    beforeEach(() => {
        wrapper = shallow(<Category {...props} />);
    });

    it("Renderiza el componente correctamente", () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('Deberia disparar el evento handleCategory al hacer click', () => {
        wrapper = shallow(<Category {...props} />);

        wrapper.find('div.categoryCard').first().props().onClick()
        expect(props.handleCategory).toBeCalled();
    });

    it('Debería renderizar la imagen con la url que viene por props', () => {
        expect(wrapper.find('img').props().src).toBe(props.imageUrl);
    })

    it('Debería renderizar el componente h3 con el titulo title de props', () => {
        expect(wrapper.find('h3').text()).toBe(props.title);
    })

    it('Debería renderizar el componente p con la descripción description de props', () => {
        expect(wrapper.find('p').text()).toBe(props.description);
    })
});

describe("<Categories />", () => {
    let props = {
        category: "test",
        handleCategory: jest.fn(),
    };
   /*  let data = {
        data: {
            Category: [
                {
                    key: 1,
                    title: "Hoteles",
                    imageUrl: "test",
                    description: "test",
                    category: "test",
                    handleCategory: jest.fn()
                }

            ]
        }
    }
    let useEffect = jest.spyOn(React, 'useEffect');

    const mockUseEffect = () => {
        useEffect.mockImplementationOnce(f => f());
    };

    beforeEach(() => {
        wrapper = shallow(<Categories {...props} />);

    });

    it("Renderiza el componente correctamente", () => {
        expect(wrapper).toMatchSnapshot();

    });

    it('El hook useEffect debe devolver un response.data', () => {
        mockUseEffect();
        mockUseEffect();
        wrapper = mount(<Categories {...props} />);
        let axiosData = jest.fn().mockResolvedValue(data);
        expect(axiosData).toHaveBeenCalled();
    });

    it('Debería renderizar el componente Category', () => {
        expect(wrapper.find('Category')).toHaveLength(1);
    });

    it('Debería renderizar el componente h2 con el texto correspondiente', () => {
        expect(wrapper.find('h2').text()).toBe("Buscar por tipo de alojamiento");
    });  */

    let wrapper = mount(<Categories {...props}/>); //Se usa mount para testear el useEffect
    beforeEach(() => {
        wrapper = mount(<Categories {...props}/>);        
    })
    it("Deberia mostrar <Categories/> correctamente", () => {
        expect(wrapper).toMatchSnapshot();
    });


});
