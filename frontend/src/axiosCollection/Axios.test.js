import React from "react";
import { shallow, mount, render } from "enzyme";
import "@testing-library/jest-dom";
import mockAxios from "./__mocks__/axios";

import AxiosSearchBlock from "./SearchBlock/AxiosSearchBlock"
import {AxiosGetProductById,AxiosGetCalificarProducto, AxiosGetReservasPorProducto, AxiosGetProductScore, AxiosGetCategories, AxiosGetCities, AxiosGetFeatures } from "./Product/AxiosProduct"
import  { AxiosGetProductosRecomendados, AxiosGetProductosFavoritos, AxiosGetProductosPorCiudadFechaYCategoria, AxiosCreateFavourite, AxiosGetProductoFavorito } from "./Cards/AxiosCards"
import { AxiosGetReservationsByUserId } from "./MyBookings/AxiosMyBookings";

import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { createSerializer } from 'enzyme-to-json';

Enzyme.configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));

//PROBANDO ARCHIVO AXIOS SEARCH BLOCK

describe("Probando AxiosGetAllCities", () => {
    it("Deberia llamarse al axios get una vez", async () => {
        let setData=jest.fn()
        let setErrorMessage=jest.fn()

        mockAxios.get.mockImplementationOnce(() => Promise.resolve({
            data:[
                {}
            ]
        }))
        
        await AxiosSearchBlock(setData, setErrorMessage)
        expect(mockAxios.get).toHaveBeenCalledTimes(1)
       
    })
})

//PROBANDO AXIOS MYBOOKINGS

describe("Probando AxiosGetReservationsByIdUser", () => {
    it("Deberia llamarse al axios get una vez", async () => {
        
        let setData=jest.fn()
        let setLoading=jest.fn()
        let setErrorMessage=jest.fn()
        
        mockAxios.get.mockImplementationOnce(() => Promise.resolve({
            data:[
                {}
            ]
        }))
        
        await AxiosGetReservationsByUserId(setData, setLoading, setErrorMessage)
        expect(mockAxios.get).toHaveBeenCalledTimes(1)
       
    })
})


//PROBANDO ARCHIVO AXIOS PRODUCT

describe("Probando AxiosGetProductById", () => {
    it("Deberia llamarse al axios get una vez", async () => {
        
        let setProd=jest.fn()
        let setLoading=jest.fn()
        let setErrorMessage=jest.fn()
        
        mockAxios.get.mockImplementationOnce(() => Promise.resolve({
            data:[
                {}
            ]
        }))
        
        await AxiosGetProductById(setProd, setLoading, setErrorMessage)
        expect(mockAxios.get).toHaveBeenCalledTimes(1)
       
    })
})


/*describe("Probando AxiosCalificarProducto", () => {
    it("Deberia llamarse al axios get una vez", async () => {
        
        let setCalificacion_text=jest.fn()
        let setErrorMessage=jest.fn()
        
        mockAxios.post.mockImplementationOnce(() => Promise.resolve({
            data:[
                {}
            ]
        }))
        
        await AxiosGetCalificarProducto(setCalificacion_text, setErrorMessage)
        expect(mockAxios.post).toHaveBeenCalledTimes(1)
       
    })
})
*/
describe("Probando AxiosGetReservasPorProducto", () => {
    it("Deberia llamarse al axios get una vez", async () => {
        
        let setReservas=jest.fn()
        let setErrorMessage=jest.fn()
        
        mockAxios.get.mockImplementationOnce(() => Promise.resolve({
            data:[
                {}
            ]
        }))
        
        await AxiosGetReservasPorProducto(setReservas, setErrorMessage)
        expect(mockAxios.get).toHaveBeenCalledTimes(1)
       
    })
})

describe("Probando AxiosGetProductScore", () => {
    it("Deberia llamarse al axios get una vez", async () => {
        
        let setStartIndex=jest.fn()
        
        mockAxios.get.mockImplementationOnce(() => Promise.resolve({
            data:[
                {}
            ]
        }))
        
        await AxiosGetProductScore(setStartIndex)
        expect(mockAxios.get).toHaveBeenCalledTimes(1)
       
    })
})

describe("Probando AxiosGetCategories", () => {
    it("Deberia llamarse al axios get una vez", async () => {
        
        let setLoading=jest.fn()
        let setOptionsCategories=jest.fn()
        let setErrorMessage=jest.fn()
        
        mockAxios.get.mockImplementationOnce(() => Promise.resolve({
            data:[
                {}
            ]
        }))
        
        await AxiosGetCategories(setLoading, setOptionsCategories, setErrorMessage)
        expect(mockAxios.get).toHaveBeenCalledTimes(1)
       
    })
})





describe("Probando AxiosGetFeatures", () => {
    it("Deberia llamarse al axios get una vez", async () => {
        mockAxios.get.mockImplementationOnce(() => Promise.resolve({
            data:[
                {}
            ]
        }))
        
        await AxiosGetFeatures()
        expect(mockAxios.get).toHaveBeenCalledTimes(1)
       
    })
})

describe("Probando AxiosGetCities", () => {
    it("Deberia llamarse al axios get una vez", async () => {

        let setLoading= jest.fn()
        let setOptionsCities= jest.fn()
        let setErrorMessage = jest.fn()

        mockAxios.get.mockImplementationOnce(() => Promise.resolve({
            data:[
                {}
            ]
        }))
        
        await AxiosGetCities(setLoading, setOptionsCities, setErrorMessage)
        expect(mockAxios.get).toHaveBeenCalledTimes(1)
       
    })
})

//PROBANDO ARCHIVO AXIOS CARDS

describe("Probando AxiosGetProductosRecomendados", () => {
    it("Deberia llamarse al axios get una vez", async () => {
        let setData=jest.fn()
        let setLoading = jest.fn()
        let setTitulo=jest.fn()
        let setErrorMessage=jest.fn()

        mockAxios.get.mockImplementationOnce(() => Promise.resolve({
            data:[
                {}
            ]
        }))
        
        await AxiosGetProductosRecomendados(setData, setLoading, setTitulo, setErrorMessage) 
        expect(mockAxios.get).toHaveBeenCalledTimes(1)
       
    })
})

describe("Probando AxiosGetProductosFavoritos", () => {
    it("Deberia llamarse al axios get una vez", async () => {
       
        let setListadoFavoritos=jest.fn()
        let setErrorMessage=jest.fn()

        mockAxios.get.mockImplementationOnce(() => Promise.resolve({
            data:[
                {}
            ]
        }))
        
        await AxiosGetProductosFavoritos(setListadoFavoritos, setErrorMessage)
        expect(mockAxios.get).toHaveBeenCalledTimes(1)
       
    })
})

describe("Probando AxiosGetProductoFavorito", () => {
    it("Deberia llamarse al axios get una vez", async () => {
       
        let setLike=jest.fn()
        let setErrorMessage=jest.fn()

        mockAxios.get.mockImplementationOnce(() => Promise.resolve({
            data:[
                {}
            ]
        }))
        
        await AxiosGetProductoFavorito(setErrorMessage, setLike)
        expect(mockAxios.get).toHaveBeenCalledTimes(1)
       
    })
})


