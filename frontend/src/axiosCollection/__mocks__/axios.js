export default{
    get:jest.fn(()=> Promise.resolve({data:[
        {}
    ]})),

    get:jest.fn(()=> Promise.reject({error:""})),

    /*post:jest.fn(() => Promise.resolve(
        {
            data:[{}]
        }
    ))*/
}