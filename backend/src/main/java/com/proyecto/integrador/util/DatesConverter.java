package com.proyecto.integrador.util;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;

public class DatesConverter {

    public static Timestamp dateToTimestamp(Date date){
        Timestamp timestamp = new Timestamp(date.getTime());
        return timestamp;

    }

    public static java.sql.Date convertLocalDateToSqlDate(LocalDate fechaAConvertir) {
        return java.sql.Date.valueOf(fechaAConvertir);
    }

    public static LocalDate convertirSqlDateALocalDate(java.sql.Date fecha) {
        return Instant.ofEpochMilli(fecha.getTime())
                .atZone(ZoneId.systemDefault())
                .toLocalDate();
    }
}
