import React from "react";
import { shallow, mount, render } from "enzyme";
import "@testing-library/jest-dom";
import CarouselModal from "./CarouselModal";
import DateBar from "./DateBar";
import DescriptionBar from "./DescriptionBar";
import FeaturesBar from "./FeaturesBar";
import ImageBar from "./ImageBar";
import InfoBar from "./InfoBar";
import Map from "./Map";
import MapBar from "./MapBar";

import Product from "./Product";
import QualificationBar from "./QualificationBar";
import ScoreBar from "./ScoreBar";
import Share from "./Share";
import TitleBar from "./TitleBar";
import{ createMemoryHistory } from "history"

import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { createSerializer } from 'enzyme-to-json';


Enzyme.configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));

describe("Probando el componente <CarouselModal/>", () => {
    let wrapper;
    let props={
        images:[{ url: "https://media.istockphoto.com/photos/downtown-cleveland-hotel-entrance-and-waiting-taxi-cab-picture-id472899538?s=612x612"},
        { url: "https://media.istockphoto.com/photos/downtown-cleveland-hotel-entrance-and-waiting-taxi-cab-picture-id472899538?s=612x612"},
        { url: "https://media.istockphoto.com/photos/downtown-cleveland-hotel-entrance-and-waiting-taxi-cab-picture-id472899538?s=612x612"},
        { url: "https://media.istockphoto.com/photos/downtown-cleveland-hotel-entrance-and-waiting-taxi-cab-picture-id472899538?s=612x612"},
        { url: "https://media.istockphoto.com/photos/downtown-cleveland-hotel-entrance-and-waiting-taxi-cab-picture-id472899538?s=612x612"},
    ],
        viewerIsOpen:true,
        setCurrentImage: jest.fn(),
        setViewerIsOpen: jest.fn()
    }
   
    beforeEach(() => {
        wrapper = mount(<CarouselModal {...props}/>)
    });

    it("Deberia mostrar <CarouselModal/> correctamente", () => {
        expect(wrapper).toMatchSnapshot();
    });

    it("Deberia cerrarse el carousel al hacer click en la cruz", ()=>{
        wrapper.find("div.closeButton").simulate("click")
        expect(props.setViewerIsOpen).toBeCalled()
    })
})

describe("Probando el componente <DateBar/>", () => {
    let wrapper;
    let props ={
        valueDate:[],
        setValueDate:jest.fn()
    }
    
    beforeEach(() => {
        wrapper = shallow(<DateBar {...props}/>)
    });

    it("Deberia llamar a event.preventDefault cuando se hace click en el boton", ()=>{
        const event = { preventDefault: () => {} }
        jest.spyOn(event, 'preventDefault')
        wrapper.find('button.selectedDatesButton').simulate('click', event)
                
        expect(event.preventDefault).toBeCalled()
    })


})

describe("Probando el componente <DescriptionBar/>", () => {
    let wrapper;
    let props={
        city: {
            id: 1,
            name: "ciudad",
            country: "pais",
        },
        description: "descripcion hotel"
    }
    
    beforeEach(() => {
        wrapper = shallow(<DescriptionBar {...props}/>)
    });

    it("Deberia mostrar <DescriptionBar/> correctamente", () => {
        expect(wrapper).toMatchSnapshot();
    });
})

describe("Probando el componente <FeaturesBar/>", ()=>{
    let wrapper;
    let props={
        features: [
            { id: 1, title: "wifi", state: true },
            { id: 2, title: "pool", state: true },
        ]
    }
    
    beforeEach(() => {
        wrapper = shallow(<FeaturesBar {...props}/>)
    });

    it("Deberia mostrar <FeaturesBar/> correctamente", () => {
        expect(wrapper).toMatchSnapshot();
    });
})

describe("Probando el componente <ImageBar/>", () => {
    let wrapper;
    let images= [
            { url: "https://media.istockphoto.com/photos/downtown-cleveland-hotel-entrance-and-waiting-taxi-cab-picture-id472899538?s=612x612"},
            { url: "https://media.istockphoto.com/photos/downtown-cleveland-hotel-entrance-and-waiting-taxi-cab-picture-id472899538?s=612x612"},
            { url: "https://media.istockphoto.com/photos/downtown-cleveland-hotel-entrance-and-waiting-taxi-cab-picture-id472899538?s=612x612"},
            { url: "https://media.istockphoto.com/photos/downtown-cleveland-hotel-entrance-and-waiting-taxi-cab-picture-id472899538?s=612x612"},
            { url: "https://media.istockphoto.com/photos/downtown-cleveland-hotel-entrance-and-waiting-taxi-cab-picture-id472899538?s=612x612"},
        ]
    let setViewerIsOpen=jest.fn()
    let setShareIsOpen=jest.fn()
    
    beforeEach(() => {
        wrapper = mount(<ImageBar images={images} setShareIsOpen={setShareIsOpen} setViewerIsOpen={setViewerIsOpen} />)
    });

    it("Deberia mostrar <ImageBar/> correctamente", () => {
        expect(wrapper).toMatchSnapshot();
    });
    it("Deberia mostrar <ImageBar/> correctamente con varias imagenes", () => {
        wrapper.find("div.slider").simulate("click") //Simula el click para probar el if de la linea 11 si hay mas de una imagen
        expect(wrapper).toMatchSnapshot();
    });

    it("Deberia llamar a setViewerIsOpen al hacer click en el boton ver mas", ()=>{
        wrapper.find("div.verMas").simulate("click")
        expect(setViewerIsOpen).toHaveBeenCalled()

    })
    it("Deberia llamar a setShareIsOpen al hacer click en el icono de compartir", ()=>{
        wrapper.find("img.iconImage").first().simulate("click")
        expect(setShareIsOpen).toBeCalled()

    })
        
})

describe("Probando el componente <InfoBar/>", () => {
    let wrapper;
    let props = {
        rules: "normas1,normas2,normas3",
        health: "salud1,salud2,salud3",
        politics: "politicas1,politicas2,politicas3",
    }
    
    beforeEach(() => {
        wrapper = shallow(<InfoBar {...props}/>)
    });

    it("Deberia mostrar <InfoBar/> correctamente", () => {
        expect(wrapper).toMatchSnapshot();
    });
})

describe("Probando el componente <Map/>", () => {
    let wrapper;
    
    beforeEach(() => {
        wrapper = shallow(<Map/>)
    });

    it("Deberia mostrar <Map> correctamente", () => {
        expect(wrapper).toMatchSnapshot();
    });

})

describe("Probando el componente <MapBar/>", () => {
    let wrapper;
    let props ={
        city: {
            id: 1,
            name: "ciudad",
            country: "pais",
        },
        latitude: 4.111784,
        longitude: -73.6396047,
    }
    
    beforeEach(() => {
        wrapper = shallow(<MapBar {...props}/>)
    });

    it("Deberia mostrar <MapBar> correctamente", () => {
        expect(wrapper).toMatchSnapshot();
    });

})

describe("Probando el componente <QualificationBar/>", () => {
    let wrapper;
    
    beforeEach(() => {
        wrapper = shallow(<QualificationBar/>)
    });

    it("Deberia mostrar <QualificationBar/> correctamente", () => {
        expect(wrapper).toMatchSnapshot();
    });

})

/*describe("Probando el componente <Product/>", () => {
    let wrapper; 
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState')
    useStateSpy.mockImplementation((init) => [init, setState]);
    beforeEach(() => {
        wrapper = shallow(<Product />); 
        /*jest.mock('react-router-dom', () => ({
            useParams: jest.fn().mockReturnValue({ id: 1 }),
        }));
        
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
    

    it("Deberia mostrar <Product/> correctamente", () => {
        /*const history = createMemoryHistory();
        const route = '/product/:id';
        history.push(route);

        let props = {
            goBack: history.goBack
        }
        expect(wrapper).toMatchSnapshot();
    });
})*/

describe("Probando el componente <ScoreBar/>", () => {
    let wrapper;
    let props={
        reference:"referencia",
        city: {
            id: 1,
            name: "ciudad",
            country: "pais",
        },
        qualification: 9.1,
    }

    let props2= {
        reference:"referencia",
        city: {
            id: 1,
            name: "ciudad",
            country: "pais",
        },
        qualification: 6.1,
    }

    let props3= {
        reference:"referencia",
        city: {
            id: 1,
            name: "ciudad",
            country: "pais",
        },
        qualification: 5.1,
    }


    let props4= {
        reference:"referencia",
        city: {
            id: 1,
            name: "ciudad",
            country: "pais",
        },
        qualification: 3.1,
    }

    let props5= {
        reference:"referencia",
        city: {
            id: 1,
            name: "ciudad",
            country: "pais",
        },
        qualification: 1.1,
    }

    it("Deberia mostrar <ScoreBar/> correctamente con calificacion de 9.1", () => {
        wrapper = shallow(<ScoreBar {...props}/>)
        expect(wrapper).toMatchSnapshot();
    });

    it("Deberia mostrar <ScoreBar/> correctamente con calificacion de 6.1", () => {
        wrapper = shallow(<ScoreBar {...props2}/>)
        expect(wrapper).toMatchSnapshot();
    });

    it("Deberia mostrar <ScoreBar/> correctamente con calificacion de 5.1", () => {
        wrapper = shallow(<ScoreBar {...props3}/>)
        expect(wrapper).toMatchSnapshot();
    });

    it("Deberia mostrar <ScoreBar/> correctamente con calificacion de 3.1", () => {
        wrapper = shallow(<ScoreBar {...props4}/>)
        expect(wrapper).toMatchSnapshot();
    });

    it("Deberia mostrar <ScoreBar/> correctamente con calificacion de 1.1", () => {
        wrapper = shallow(<ScoreBar {...props5}/>)
        expect(wrapper).toMatchSnapshot();
    });


})


describe("Probando el componente <Titlebar/>", () => {
    let wrapper;
    let props ={
        category: {
            id: 1,
            title: "tituloCategoria",
            description: "descripcionCategoria",
            url: "imagenCategoria"
        },
        name: "nombreHotel",
    }
    beforeEach(() => {
        wrapper = shallow(<TitleBar {...props}/>)
    });

    it("Deberia mostrar <TitleBar/> correctamente", () => {
        expect(wrapper).toMatchSnapshot();
    });

})
