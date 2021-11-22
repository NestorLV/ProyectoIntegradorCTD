import Styles from "./styles.module.css"
import Select from "react-select"
import TimeOption from "./TimeOption"

export default function ArrivalTimeBar({setArrivalSchedule}) {
    const times= ["10:00 AM", "11:00 AM","12:00 AM","01:00 PM","02:00 PM","03:00 PM","04:00 PM","05:00 PM","06:00 PM","07:00 PM","08:00 PM","09:00 PM","10:00 PM"]

    const options = times.map((time) => {
        return {
          value: `${time}`,
          label: <TimeOption setArrivalSchedule={setArrivalSchedule} time={time} />,
        };
      })

    /*const options = [
        { value: "10:00 AM", label: "10:00 AM" },
        { value: "11:00 AM", label: "11:00 AM" },
        { value: "12:00 AM", label: "12:00 AM" },
        { value: "01:00 PM", label: "01:00 PM" },
        { value: "02:00 PM", label: "02:00 PM" },
        { value: "03:00 PM", label: "03:00 PM" },
        { value: "04:00 PM", label: "04:00 PM" },
        { value: "05:00 PM", label: "05:00 PM" },
        { value: "06:00 PM", label: "06:00 PM" },
        { value: "07:00 PM", label: "07:00 PM" },
        { value: "08:00 PM", label: "08:00 PM" },
        { value: "09:00 PM", label: "09:00 PM" },
        { value: "10:00 PM", label: "10:00 PM" }
    ]*/

    const customStyles = {
        control: () => ({
            borderRadius:"7px",
            boxShadow: "1px 2px 4px rgba(0, 0, 0, 0.25)",
            display:"flex",
            justifyContent:"space-between",
           
        }),

        placeholder: () => ({
            padding:"15px 10px"
        }),

        valueContainer: () => ({
            display:"flex",
            minWidth:"70%",
        }),
        singleValue: () => ({
            minWidth:"70%",
            padding: "15px 10px",

        }),

        input: () => ({
            opacity:0,
            width:0
        }),

        option: () => ({
            color: "#31363F",
            fontWeight: 700,
            padding: "2px 15px",           
            ':hover': {
                color: '#F0572D',
                cursor: 'pointer',
            },
        }),

        indicatorsContainer: () => ({
            paddingTop:"15px"
        }),

        dropdownIndicator: () => ({
            color: '#F0572D',
            padding: "0 7px",
            transition: "all 1s",
            ':hover': {
                color: '#31363F',
                cursor: 'pointer',
                opacity: "0.5"
            },
        }),
    }

    return (
        <div className={Styles.containerArrival}>
            <h3>Tu horario de llegada</h3>
            <div>
                <h4>Tu habitación va a estar lista para el check-in entre las 10:00 AM y las 11:00 PM</h4>
                <label>Indicá tu horario estimado de llegada</label>
                <div className={Styles.selectContainer}>
                    <Select 
                        options={options} 
                        placeholder="Seleccionar hora" 
                        styles={customStyles} 
                        getOptionValue={(option) => option.value}
                    />
                </div>
            </div>
        </div>
    )
}